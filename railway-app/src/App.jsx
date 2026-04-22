import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
const BookingPlaceholder = () => <div className="state-message">Тут буде схема вагону (Лаба 10)</div>;

function App() {
    return (
        <Router>
            <div className="top-nav">
                <a href="/">Головна (Розклад)</a>
            </div>
            <div className="app-layout">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/booking/:trainId" element={<BookingPlaceholder />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;