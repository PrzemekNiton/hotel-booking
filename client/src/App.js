import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeView from './screens/HomeView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<HomeView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;