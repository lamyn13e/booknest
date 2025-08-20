import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081', // đỡ phải lặp lại
  withCredentials: true,             // luôn gửi cookie JSESSIONID
});

// (Tuỳ chọn) Bắt lỗi 401/403 chung
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // ví dụ: tự động chuyển về login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
