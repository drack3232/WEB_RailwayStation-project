import { useState, useEffect } from 'react';
import TrainCard from './TrainCard';
import { api } from '../services/api';

const TrainList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [trains, setTrains] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrains = async () => {
            setIsLoading(true);
            const data = await api.getTrains();
            setTrains(data);
            setIsLoading(false);
        };
        fetchTrains();
    }, []);

    const filteredTrains = trains.filter(train => 
        train.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
        train.trainNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return <div className="state-message">Завантаження розкладу (API-запит)...</div>;

    return (
        <div className="list-container">
            <div className="search-panel">
                <input 
                    type="text" 
                    placeholder="Пошук за маршрутом або номером..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-input"
                />
            </div>
            {filteredTrains.length === 0 ? (
                <div className="state-message">Рейсів не знайдено.</div>
            ) : (
                <div className="grid-container">
                    {filteredTrains.map(train => <TrainCard key={train.id} train={train} />)}
                </div>
            )}
        </div>
    );
};

export default TrainList;