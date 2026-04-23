import { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [selectedWagon, setSelectedWagon] = useState('w1');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);

    const toggleSeat = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    const clearSelection = () => {
        setSelectedSeats([]);
    };

    return (
        <BookingContext.Provider value={{
            selectedWagon, 
            setSelectedWagon,
            selectedSeats, 
            toggleSeat, 
            clearSelection,
            bookedSeats, 
            setBookedSeats
        }}>
            {children}
        </BookingContext.Provider>
    );
};