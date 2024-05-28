import React from 'react';
import 'boxicons/css/boxicons.min.css';


const Cards = ({name, image, price, rating, id}) => {

    const totalRating = 5;
    const ratings = Math.floor(rating.average)
  return (
    <div className="card" id={id}>
        <img src={image} alt={`pics-${id}`} />
        <div className="details">
              <h5>{name}</h5>
            <h4>{price}</h4>
            <div className="rating">
            {[...Array(totalRating)].map((_, index) => (
              <i className='bx bxs-star' key={index + 1} style={{color: index < ratings ? 'yellow' : '' }}></i>
            ))}
            </div>
            <span><strong>Reviews: </strong> {rating.reviews}</span>
        </div>
    </div>
  )
}

export default Cards