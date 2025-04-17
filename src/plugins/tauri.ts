import { invoke } from '@tauri-apps/api/core'

export default defineNuxtPlugin((nuxtApp) => {
  // Check if we're in a browser environment
  if (process.client) {
    return {
      provide: {
        tauri: {
          invoke: async (cmd: string, args?: any) => {
            try {
              // Check if we're in a Tauri environment
              if (typeof window !== 'undefined' && window.__TAURI__) {
                return await window.__TAURI__.invoke(cmd, args)
              }
              
              // Mock implementation for web mode
              console.log(`[MOCK] Tauri invoke: ${cmd}`, args)
              
              // Return mock data based on the command
              if (cmd === 'get_txt_files') {
                return [
                  { 
                    name: 'example1.txt', 
                    path: '/path/to/example1.txt',
                    modified_date: new Date().toLocaleString(),
                    content: ''
                  },
                  { 
                    name: 'example2.txt', 
                    path: '/path/to/example2.txt',
                    modified_date: new Date(Date.now() - 86400000).toLocaleString(), // Yesterday
                    content: ''
                  }
                ]
              } else if (cmd === 'read_file') {
                return `This is mock content for file: ${args?.path || 'unknown'}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.`
              }
              
              return null
            } catch (error) {
              console.error('Tauri invoke error:', error)
              throw error
            }
          }
        }
      }
    }
  }
  
  // Return a dummy implementation for SSR
  return {
    provide: {
      tauri: {
        invoke: async () => {
          throw new Error('Tauri is not available during SSR')
        }
      }
    }
  }
}) 