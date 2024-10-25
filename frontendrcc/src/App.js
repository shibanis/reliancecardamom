import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SuppliersPage from './pages/SuppliersPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './pages/NavBar';
import SalesPage from './pages/SalesPage';
import PoolingAuction from "./pages/PoolingAuction";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/sales" element={<SalesPage />}></Route>
            <Route path="/auction" element={<PoolingAuction />}></Route>
            <Route path="/suppliers" element={<SuppliersPage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
