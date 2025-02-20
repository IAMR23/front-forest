import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <img src={property.image} alt={property.title} className="w-full h-48 object-cover rounded"/>
      <h3 className="text-xl font-bold mt-2">{property.title}</h3>
      <p className="text-gray-600">${property.price} / mes</p>
      <Link to={`/propiedad/${property.id}`} className="text-blue-600 hover:underline mt-2 inline-block">
        Ver detalles
      </Link>
    </div>
  );
}

export default PropertyCard;
