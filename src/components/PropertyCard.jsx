import React from 'react';

const PropertyCard = ({ property }) => {
    return (
        <div className="property-card">
            <img src={property.image} alt={property.title} />
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>Precio: {property.price}</p>
            <p>Ubicación: {property.location}</p>
        </div>
    );
};

export default PropertyCard;