import axios from 'axios';

class AuthService {
  constructor() {
    
    const service = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true
    });
    this.service = service;
  }
  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }
  logout = () => {
    return this.service.post('/logout')
    .then(response => response.data)
  }
  signup = (username, password) => {
    return this.service.post('/signup', {username, password})
    .then(response => response.data)
  }
  createTask = (title, description) => {
    return this.service.post('/tasks/create', {title, description})
    .then(response => response.data)
  }
  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data)
  }
  getTasks = () => {
    return this.service.get('/tasks')
    .then(response => response.data)
  }
  editTask = (task) => {
    return this.service.post(`/tasks/edit/${task._id}`, task)
    .then(response => response.data)
  }
  deleteTask = (task) => {
    return this.service.post(`/tasks/delete/${task._id}`, task)
    .then(response => response.data)
  }
}



export default AuthService;