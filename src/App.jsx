import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Intro from './components/Intro';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Addons from './components/Addons';
import Events from './components/Events';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Highlights from './components/Highlights';
import EventCategories from './components/EventCategories';
import PerfectSetup from './components/PerfectSetup';
import ContactUs from './components/ContactUs';
import BookNow from './components/BookNow';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Booking from './components/Booking';
import MyBookings from './components/MyBookings';
import AdminDashboard from './components/AdminDashboard';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <>
              <Hero />
              <Intro />
              <Highlights />
              <PerfectSetup />
              <EventCategories />
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
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="booking" element={<Booking />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
