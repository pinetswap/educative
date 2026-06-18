import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Wallet from './pages/Wallet'
import Footer from './components/Footer'
import WalletUnlock from './pages/WalletUnlock'
import LoadingGif from './pages/LoadingGif'
import { useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import AdminLogin from './components/AdminLogin'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

function ProtectedDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#703d92]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <Dashboard />;
}

function Layout({ children }) {
  const location = useLocation();

  // Hide Header/Footer only on the * (loading) route
  const hideLayout = location.pathname === "/";

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/wallet' element={<Wallet />} />
          <Route path='/unlock' element={<WalletUnlock />} />
          <Route path='/home' element={<Home />} />
          <Route path='/loading' element={<LoadingGif />} />
          <Route path='/all-023-main-234-alert0' element ={<ProtectedDashboard/>}/>
          {/* Redirect all unknown paths to loading */}
          <Route path='*' element={<LoadingGif />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App
