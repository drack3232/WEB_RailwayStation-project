export const BookingService = {
    saveBooking: (bookingData) => {
        const bookings = JSON.parse(localStorage.getItem('railway_bookings')) || [];
        bookings.push({ ...bookingData, id: Date.now() });
        localStorage.setItem('railway_bookings', JSON.stringify(bookings));
    },
    getBookedSeats: (trainId, wagonId) => {
        const bookings = JSON.parse(localStorage.getItem('railway_bookings')) || [];
        return bookings
            .filter(b => b.trainId === String(trainId) && b.wagonId === String(wagonId))
            .flatMap(b => b.seats);
    }
};