import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import PropertyList from '../components/PropertyList';

const Home = () => {
    const [properties, setProperties] = useState([
        {
            id: 1,
            title: 'Departamento en el Centro',
            description: 'Amplio departamento cerca de la universidad.',
            price: '$500/mes',
            location: 'Belisario Quevedo',
            image: 'https://via.placeholder.com/150',
        },
        // Más propiedades...
    ]);

    const handleSearch = (term) => {
        // Lógica de búsqueda
        console.log('Buscando:', term);
    };

    return (
        <div>
            <Header />
            <SearchBar onSearch={handleSearch} />
            <PropertyList properties={properties} />
            <Footer />
        </div>
    );
};

export default Home;