import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Addons from './components/Addons';
import Events from './components/Events';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Highlights from './components/Highlights';
import ContactUs from './components/ContactUs';
import BookNow from './components/BookNow';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <>
              <Hero />
              <Highlights />
              <Services />
            </>
          } />
          <Route path="about" element={<AboutUs />} />
          <Route path="events" element={<Events />} />
          <Route path="addons" element={<Addons />} />
          <Route path="menu" element={<Menu />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="testimonials" element={
            <>
              <Testimonials />
            </>
          } />
          <Route path="contact" element={
            <>
              <ContactUs />
              <BookNow />
            </>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
