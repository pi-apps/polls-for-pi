import 'normalize.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './defaults.css';

import { Browse, Home, Shop } from './pages';

import Notfound from './notfound';

const routing = (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Browse />} />
      <Route path="/shop" element={<Shop />} />
      <Route element={Notfound} />
    </Routes>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));