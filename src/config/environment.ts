export const environment = {
  production: import.meta.env.PROD || false,
  apiUrl: import.meta.env.VITE_API_URL || 'https://localhost:7081/api'
};
