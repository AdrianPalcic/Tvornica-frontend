import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Ponude from './pages/Ponude';
import PonudePost from './pages/PonudePost';
import Vjencanja from './pages/Vjencanja';
import VjencanjaPost from './pages/VjencanjaPost';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/vjencanja" element={<Vjencanja />} />
          <Route path="/ponude" element={<Ponude />} />
          <Route path="/ponude/:id" element={<PonudePost />} />
          <Route path="/vjencanja/:id" element={<VjencanjaPost />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
