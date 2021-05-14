import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/challenge-808c2/us-central1/api' // This is where we have API URL ( cloud function)
})

export default instance;