// src/App.tsx
import { useEffect, useState } from 'react';
import SplashScreen from './components/SplashScreen';
import { SignupPage } from './pages/signup';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {showSplash ? <SplashScreen /> : <SignupPage />}
    </div>
  );
}

export default App;
