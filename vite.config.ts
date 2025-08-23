import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  // VITE_ 접두사만 로드
  const { VITE_API_BASE_URL } = loadEnv(mode, process.cwd(), 'VITE_')
  const target = VITE_API_BASE_URL || 'http://localhost:8080'

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          secure: false,
          // 백엔드가 /api 프리픽스 없이 처리한다면 주석 해제
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
