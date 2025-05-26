// src/App.tsx
import { useEffect, useState } from 'react';

import { SignupPage } from './pages/auth/signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignInPage } from './pages/auth/signin';
import SplashScreen from './components/splashScreen';
import { Dashboard } from './pages/user/dashboard';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    
    <BrowserRouter>
      <Routes>
        {showSplash && <Route path="/" element={<SplashScreen />} />}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/dashboard' element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
