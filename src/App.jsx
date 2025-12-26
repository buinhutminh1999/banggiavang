import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeComponent from './Component/HomeComponent';
import AdminPage from './Component/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
