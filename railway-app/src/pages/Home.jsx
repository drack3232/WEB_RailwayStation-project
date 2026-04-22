import TrainList from '../components/TrainList';

const Home = () => {
    return (
        <div className="page-container">
            <h2>Розклад рейсів</h2>
            <TrainList />
        </div>
    );
};

export default Home;