// src/App.tsx
import { useEffect, useState } from 'react';
import SplashScreen from './components/SplashScreen';
import { SignupPage } from './pages/signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignInPage } from './pages/signin';

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
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
