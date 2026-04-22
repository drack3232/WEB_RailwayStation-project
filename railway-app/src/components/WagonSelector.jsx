const WagonSelector = ({ wagons, selectedWagon, onSelect }) => {
    return (
        <div className="wagon-selector">
            <h4>Виберіть вагон:</h4>
            <div className="button-group">
                {wagons.map(wagon => (
                    <button 
                        key={wagon.id}
                        className={`btn-secondary ${selectedWagon === wagon.id ? 'active' : ''}`}
                        onClick={() => onSelect(wagon.id)}
                    >
                        Вагон {wagon.number} ({wagon.type})
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WagonSelector;
