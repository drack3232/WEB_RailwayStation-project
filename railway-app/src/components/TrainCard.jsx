import { Link } from 'react-router-dom';

const TrainCard = ({ train }) => {
    return (
        <div className="card">
            <div className="card-header">
                <span className="accent-text">Потяг #{train.trainNumber}</span>
                <span className="text-muted">Час у дорозі: {train.duration}</span>
            </div>
            <h3 className="card-title">{train.route}</h3>
            <div className="card-footer">
                <span className="text-primary">Відправлення: {train.departureTime}</span>
                <Link to={`/booking/${train.id}`} className="btn-primary">Придбати квиток</Link>
            </div>
        </div>
    );
};

export default TrainCard;