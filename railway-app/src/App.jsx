import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import { BookingProvider } from './context/BookingContext';
import './App.css';

function App() {
    return (
        <BookingProvider>
            <Router>
                <nav className="top-nav">
                    <Link to="/">Табло рейсів</Link>
                </nav>
                <div className="app-layout">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/booking/:trainId" element={<Booking />} />
                    </Routes>
                </div>
            </Router>
        </BookingProvider>
    );
}

export default App;