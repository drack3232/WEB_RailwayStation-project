import { useState } from 'react';
import TrainCard from './TrainCard';
import { trainsData } from '../data/trains';

const TrainList = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTrains = trainsData.filter(train => 
        train.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
        train.trainNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

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