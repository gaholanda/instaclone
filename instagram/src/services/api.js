import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:3333' -> via iOS Simulator no Mac
    // baseURL: '<IP DA MAQUINA>:3333'  -> via USB
    // baseURL: 'http://10.0.3.2:3333'  -> via Genymotion
    // baseURL: 'http://10.0.3.2:3333'  -> via Genymotion
    // baseURL: 'http://10.0.2.2:3333'  -> via Android Studio
    baseURL: 'http://10.0.2.2:3333'
})

export default api