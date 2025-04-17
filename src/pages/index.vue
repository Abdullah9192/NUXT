<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

interface FileInfo {
  name: string;
  path: string;
  modified_date: string;
  content: string;
}

const files = ref<FileInfo[]>([]);
const error = ref<string>('');
const isLoading = ref(false);
const isTauriEnv = ref(false);
const { $tauri } = useNuxtApp();

// Check if we're in a Tauri environment
onMounted(() => {
  isTauriEnv.value = typeof window !== 'undefined' && !!window.__TAURI__;
  console.log('Running in Tauri environment:', isTauriEnv.value);
  
  // Initial load
  refreshFiles();
});

async function refreshFiles() {
  if (isLoading.value) return;
  
  try {
    isLoading.value = true;
    error.value = '';
    
    // Clear the files array before fetching new files
    files.value = [];
    
    if (!$tauri?.invoke) {
      throw new Error('Tauri plugin not initialized');
    }
    
    files.value = await $tauri.invoke('get_txt_files');
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e);
    console.error('Error refreshing files:', e);
  } finally {
    isLoading.value = false;
  }
}

async function viewFile(file: FileInfo) {
  try {
    if (!$tauri?.invoke) {
      throw new Error('Tauri plugin not initialized');
    }
    
    const content = await $tauri.invoke('read_file', { path: file.path });
    // Update the file content in the UI
    file.content = content;
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e);
    console.error('Error viewing file:', e);
  }
}
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Text File Viewer</h1>
      <div class="flex items-center gap-2">
        <span v-if="!isTauriEnv" class="text-amber-500 text-sm">
          Running in web mode (mock data)
        </span>
        <UButton
          icon="i-lucide-refresh-cw"
          @click="refreshFiles"
          :loading="isLoading"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Loading...' : 'Refresh' }}
        </UButton>
      </div>
    </div>

    <UAlert
      v-if="error"
      type="error"
      :title="error"
      class="mb-4"
    />

    <ol v-if="files.length > 0" class="space-y-6">
      <li v-for="file in files" :key="file.path" class="p-4 border rounded-lg">
        <h2 class="text-xl font-semibold mb-2">{{ file.path }}</h2>
        <p class="text-gray-600 italic mb-4">Last modified: {{ file.modified_date }}</p>
        <div class="flex justify-between items-center mb-4">
          <UButton
            icon="i-lucide-eye"
            @click="viewFile(file)"
          >
            View Content
          </UButton>
        </div>
        <p v-if="file.content" class="whitespace-pre-wrap">{{ file.content }}</p>
      </li>
    </ol>

    <p v-else-if="!error && !isLoading" class="text-gray-600 text-center py-8">
      No text files found. Please set the VARO_PATH environment variable to a directory containing .txt files.
    </p>
    
    <div v-if="isLoading && !error" class="text-center py-8">
      <p class="text-gray-600">Loading files...</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #45a049;
}
</style>

<script lang="ts">
// Add TypeScript declaration for window.__TAURI__
declare global {
  interface Window {
    __TAURI__: {
      invoke: (cmd: string, args?: any) => Promise<any>;
    };
  }
}
</script>