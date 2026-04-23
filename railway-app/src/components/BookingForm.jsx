import styles from './BookingForm.module.css';

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
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <h4>Оформлення квитків (Обрано: {selectedSeatsCount})</h4>
            
            <div className={styles.formGroup}>
                <label>ПІБ пасажира</label>
                <input type="text" name="name" className={styles.formInput} required />
            </div>
            
            <div className={styles.formGroup}>
                <label>Телефон</label>
                <input type="tel" name="phone" className={styles.formInput} required pattern="[0-9]{10,13}" placeholder="+380..." />
            </div>
            
            <div className={styles.formGroup}>
                <label>Email</label>
                <input type="email" name="email" className={styles.formInput} required />
            </div>
            
            <button type="submit" className={styles.submitBtn}>
                Підтвердити бронювання
            </button>
        </form>
    );
};

export default BookingForm;