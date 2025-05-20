import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
 server: {
  host: '0.0.0.0',   // cho phép truy cập từ bên ngoài (máy host hoặc container khác)
  port: 5174,
  strictPort: true,
  allowedHosts: [
      'enjoyed-molly-smoothly.ngrok-free.app' // Thêm tên miền ngrok tĩnh 
    ],
  proxy: {
      '/n2': {
        target: 'http://backend:8080', // Dùng tên dịch vụ Docker
        changeOrigin: true,
        secure: false,  // thêm để tránh lỗi SSL nếu dùng https sai
      },
    },
  },
});
