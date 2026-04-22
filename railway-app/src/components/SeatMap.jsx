const SeatMap = ({ totalSeats, bookedSeats, selectedSeats, onSeatToggle }) => {
    const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

    return (
        <div className="seat-map-container">
            <h4>Схема місць:</h4>
            <div className="legend">
                <span className="legend-item"><span className="seat-indicator free"></span> Вільне</span>
                <span className="legend-item"><span className="seat-indicator selected"></span> Обране</span>
                <span className="legend-item"><span className="seat-indicator booked"></span> Заброньоване</span>
            </div>
            <div className="seat-grid">
                {seats.map(seat => {
                    const isBooked = bookedSeats.includes(seat);
                    const isSelected = selectedSeats.includes(seat);
                    
                    let seatClass = 'seat free';
                    if (isBooked) seatClass = 'seat booked';
                    else if (isSelected) seatClass = 'seat selected';

                    return (
                        <button 
                            key={seat}
                            disabled={isBooked}
                            className={seatClass}
                            onClick={() => onSeatToggle(seat)}
                        >
                            {seat}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SeatMap;