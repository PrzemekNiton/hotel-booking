import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeView from './screens/HomeView';
import BookingView from './screens/BookingView';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/home" element={<HomeView />} />
          <Route path="/book/:hotelid" element={<BookingView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;