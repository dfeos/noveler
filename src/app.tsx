import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';

const App: React.FC = () => {
    return (
        <Router>
            <Layout />
        </Router>
    );
};

export default App;