import axios from 'axios';
import WindowWithEnv from "../interfaces/WindowWithEnv";

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && (_window.__ENV.viteBackendURL || _window.__ENV.backendURL);
const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true });

export default axiosClient;