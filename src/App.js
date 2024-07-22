import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import '@/App.css';
import PublicRouter from './pages/public/PublicRouter';
import AdminRouter from './pages/admin/AdminRouter';
import AuthRouter from './pages/auth/AuthRouter';
import AuthGuard from './_helpers/AuthGuard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/*" element={<PublicRouter />} />
      
        <Route path="/admin/*" element={
          <AuthGuard>
            <AdminRouter />
          </AuthGuard>
        } />
        <Route path="/auth/*" element={<AuthRouter />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;