import { trainsData } from '../data/trains';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    getTrains: async () => {
        await delay(500);
        return trainsData;
    },
    
    getBookedSeats: async (trainId, wagonId) => {
        await delay(300);
        const bookings = JSON.parse(localStorage.getItem('railway_bookings')) || [];
        return bookings
            .filter(b => b.trainId === String(trainId) && b.wagonId === String(wagonId))
            .flatMap(b => b.seats);
    },
    
    saveBooking: async (bookingData) => {
        await delay(600);
        const bookings = JSON.parse(localStorage.getItem('railway_bookings')) || [];
        bookings.push({ ...bookingData, id: Date.now() });
        localStorage.setItem('railway_bookings', JSON.stringify(bookings));
        return { success: true };
    }
};