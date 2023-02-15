import { ConfigProvider, theme } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.render(<React.StrictMode>
  <Router>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <App />
    </ConfigProvider>
  </Router>
</React.StrictMode>,
document.getElementById('root'));