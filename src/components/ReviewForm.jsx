import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
    const [review, setReview] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(review);
        setReview('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Escribe tu reseña..."
            />
            <button type="submit">Enviar Reseña</button>
        </form>
    );
};

export default ReviewForm;