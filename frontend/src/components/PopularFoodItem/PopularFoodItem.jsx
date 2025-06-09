import React, { useContext, useState } from 'react'
import add_icon_white from '../../assets/add_icon_white.png'
import add_icon_green from '../../assets/add_icon_green.png'
import remove_icon_red from '../../assets/remove_icon_red.png'

import './PopularFoodItem.css'
import { StoreContext } from '../../context/StoreContext'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
const FoodItem = ({id,name,price,description,image}) => {
  
  const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext)
   const [isExpanded, setIsExpanded] = useState(false)

  const toggleDescription = () => {
    setIsExpanded(!isExpanded)
  }
  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className="food-item-image"  src={image} alt="" />
          
        
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>       
        </div>
        <p className='food-item-desc'>
          {isExpanded ? description : `${description.substring(0, 100)}... `}
          <span
            onClick={toggleDescription}
            style={{ color: 'blue', cursor: 'pointer', fontWeight: '500', opacity:"0.7" }}
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </span>
        </p>
        <p className='food-item-price'>₹{price}</p>
      </div>
    </div>
  )
}

export default FoodItem
