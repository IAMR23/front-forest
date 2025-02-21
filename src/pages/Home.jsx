// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getProperties } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error al obtener propiedades:", error);
      }
    };

    fetchProperties();
  }, []);

  // Configuración del carrusel
  const settings = {
    dots: true, // Muestra puntos de navegación
    infinite: true, // Reproduce en bucle
    speed: 500,
    slidesToShow: 3, // Número de propiedades visibles
    slidesToScroll: 1,
    autoplay: true, // Reproducción automática
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="container mx-auto">
      <SearchBar />
      <h1 className="text-3xl font-bold mb-4 text-center">Propiedades Disponibles</h1>
      
      {properties.length === 0 ? (
        <p className="text-center">No hay propiedades disponibles.</p>
      ) : (
        <Slider {...settings}>
          {properties.map(property => (
            <div key={property._id} className="p-4">
              <PropertyCard property={property} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default Home;
