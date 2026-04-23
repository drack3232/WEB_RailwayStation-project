import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { trainsData } from '../data/trains';
import { useBooking } from '../context/BookingContext';
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        selectedWagon, 
        setSelectedWagon,
        selectedSeats, 
        toggleSeat, 
        clearSelection,
        bookedSeats, 
        setBookedSeats
    } = useBooking();

    useEffect(() => {
        const fetchSeats = async () => {
            const booked = await api.getBookedSeats(trainId, selectedWagon);
            setBookedSeats(booked);
            clearSelection();
        };
        fetchSeats();
    }, [trainId, selectedWagon]);

    const handleBookingSubmit = async (passengerData) => {
        setIsSubmitting(true);
        await api.saveBooking({
            trainId,
            wagonId: selectedWagon,
            seats: selectedSeats,
            passenger: passengerData
        });
        setIsSubmitting(false);
        alert(`Успішно! Квитки на потяг ${train.trainNumber} заброньовано.`);
        clearSelection();
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
                        onSeatToggle={toggleSeat} 
                    />
                </div>
                <div className="booking-sidebar">
                    {isSubmitting ? (
                        <div className="state-message">Обробка транзакції...</div>
                    ) : (
                        <BookingForm 
                            selectedSeatsCount={selectedSeats.length} 
                            onSubmit={handleBookingSubmit} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Booking;