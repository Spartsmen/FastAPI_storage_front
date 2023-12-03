import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Импорт функции jwtDecode

interface DecodedToken {
  exp?: number;
  [key: string]: any;
}

// Функция для проверки истечения срока действия токена
function isTokenExpired(token: string): boolean {
  const decodedToken = jwtDecode<DecodedToken>(token); // Явно указываем тип декодированного токена
  const currentTime = Date.now() / 1000;
  return decodedToken.exp ? decodedToken.exp < currentTime : true;
}

const instance = axios.create({
  baseURL: 'http://localhost:80',
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('access_token');
  if (token) {
    if (isTokenExpired(token)) {
      window.localStorage.removeItem('access_token');
      // Дополнительные действия (например, перенаправление)
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Если сервер возвращает код 401, перенаправляем пользователя на страницу логина
      window.location.href = 'http://localhost:5173/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
