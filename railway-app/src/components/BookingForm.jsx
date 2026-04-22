const BookingForm = ({ onSubmit, selectedSeatsCount }) => {
    if (selectedSeatsCount === 0) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        onSubmit({
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email')
        });
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h4>Оформлення квитків (Обрано місць: {selectedSeatsCount})</h4>
            <div className="form-group">
                <label>ПІБ пасажира</label>
                <input type="text" name="name" className="form-input" required />
            </div>
            <div className="form-group">
                <label>Телефон</label>
                <input type="tel" name="phone" className="form-input" required pattern="[0-9]{10,13}" placeholder="+380..." />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" className="form-input" required />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Підтвердити бронювання</button>
        </form>
    );
};

export default BookingForm;