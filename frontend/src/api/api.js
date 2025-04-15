import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Adjust this to match your Spring Boot backend path
});

export default api;
