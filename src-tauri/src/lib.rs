// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::env;
use std::fs;
use std::path::Path;
use chrono::{DateTime, Local};
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
struct FileInfo {
    path: String,
    modified_date: String,
    content: String,
}

#[tauri::command]
async fn get_txt_files() -> Result<Vec<FileInfo>, String> {
    // Get VARO_PATH environment variable
    let varo_path = env::var("VARO_PATH").map_err(|_| "VARO_PATH environment variable not set".to_string())?;
    
    // Check if path exists
    let path = Path::new(&varo_path);
    if !path.exists() {
        return Err("VARO_PATH does not point to an existing directory".to_string());
    }
    
    // Collect all .txt files
    let mut files = Vec::new();
    for entry in fs::read_dir(path).map_err(|e| e.to_string())? {
        let entry = entry.map_err(|e| e.to_string())?;
        let path = entry.path();
        
        if path.is_file() && path.extension().and_then(|s| s.to_str()) == Some("txt") {
            let metadata = fs::metadata(&path).map_err(|e| e.to_string())?;
            let modified: DateTime<Local> = metadata.modified()
                .map_err(|e| e.to_string())?
                .into();
            
            let content = fs::read_to_string(&path).map_err(|e| e.to_string())?;
            
            files.push(FileInfo {
                path: path.to_string_lossy().into_owned(),
                modified_date: modified.format("%Y-%m-%d %H:%M:%S").to_string(),
                content,
            });
        }
    }
    
    Ok(files)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_txt_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
