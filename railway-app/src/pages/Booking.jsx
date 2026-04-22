import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trainsData } from '../data/trains';
import { BookingService } from '../services/BookingService';
import WagonSelector from '../components/WagonSelector';
import SeatMap from '../components/SeatMap';
import BookingForm from '../components/BookingForm';

const mockWagons = [
    { id: 'w1', number: '01', type: 'Купе', totalSeats: 36 },
    { id: 'w2', number: '02', type: 'Плацкарт', totalSeats: 54 }
];

const Booking = () => {
    const { trainId } = useParams();
    const navigate = useNavigate();
    const train = trainsData.find(t => t.id === trainId);

    const [selectedWagon, setSelectedWagon] = useState(mockWagons[0].id);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);

    useEffect(() => {
        const booked = BookingService.getBookedSeats(trainId, selectedWagon);
        setBookedSeats(booked);
        setSelectedSeats([]);
    }, [trainId, selectedWagon]);

    const handleSeatToggle = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    const handleBookingSubmit = (passengerData) => {
        BookingService.saveBooking({
            trainId,
            wagonId: selectedWagon,
            seats: selectedSeats,
            passenger: passengerData
        });
        alert(`Успішно! Квитки на потяг ${train.trainNumber} заброньовано.`);
        navigate('/');
    };

    if (!train) return <div className="state-message">Рейс не знайдено</div>;

    const currentWagonInfo = mockWagons.find(w => w.id === selectedWagon);

    return (
        <div className="page-container">
            <h2>Оформлення: Потяг {train.trainNumber} ({train.route})</h2>
            
            <div className="booking-layout">
                <div className="booking-main">
                    <WagonSelector 
                        wagons={mockWagons} 
                        selectedWagon={selectedWagon} 
                        onSelect={setSelectedWagon} 
                    />
                    <SeatMap 
                        totalSeats={currentWagonInfo.totalSeats} 
                        bookedSeats={bookedSeats} 
                        selectedSeats={selectedSeats} 
                        onSeatToggle={handleSeatToggle} 
                    />
                </div>
                <div className="booking-sidebar">
                    <BookingForm 
                        selectedSeatsCount={selectedSeats.length} 
                        onSubmit={handleBookingSubmit} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Booking;