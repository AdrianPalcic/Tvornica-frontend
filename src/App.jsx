import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Ponude from './pages/Ponude';
import PonudePost from './pages/PonudePost';
import Vjencanja from './pages/Vjencanja';
import VjencanjaPost from './pages/VjencanjaPost';
import BesplatneStvari from "./pages/BesplatneStvari"
import { HelmetProvider } from 'react-helmet-async';
import CookiePopup from './components/CookiePopup';
import { useEffect } from 'react';
import useNukeGoogleTranslateBar from './components/useNukeGoogleTranslateBar';

function App() {

  useNukeGoogleTranslateBar();

  return (
    <>
      <HelmetProvider>
        <BrowserRouter>
          <CookiePopup />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/vjencanja" element={<Vjencanja />} />
            <Route path="/ponude" element={<Ponude />} />
            <Route path="/ponude/:id" element={<PonudePost />} />
            <Route path="/vjencanja/:id" element={<VjencanjaPost />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/besplatne-stvari" element={<BesplatneStvari />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </>
  )
}

export default App
