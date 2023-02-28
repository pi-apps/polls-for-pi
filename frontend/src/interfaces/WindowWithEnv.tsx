export default interface WindowWithEnv extends Window {
  __ENV?: {
    backendURL: string, // REACT_APP_BACKEND_URL environment variable
    sandbox: "true" | "false", // REACT_APP_SANDBOX_SDK environment variable - string, not boolean!
    viteBackendURL: string, // VITE_BACKEND_URL environment variable
    viteSandbox: "true" | "false", // VITE_SANDBOX_SDK environment variable - string, not boolean!
    viteLocalhost: "true" | "false", // VITE_LOCALHOST environment variable - string, not boolean!
  }
}