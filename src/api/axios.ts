import axios from 'axios';


const api = axios.create({ baseURL: 'http://localhost:5000/' })

export default api;

export const EndPoints = { sales: 'sales', products: 'products', events: 'events' }