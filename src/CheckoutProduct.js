import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';

export default function CheckoutProduct({id,image,title,price,rating}) {
    
    const [{basket},dispatch]=useStateValue();
    const removeFromBakset=()=>{
        dispatch({
            type:'REMOVE_FROM_BASKET',
            item:{
                id:id
                
            }
        })
    }
    
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct_image" src={image} alt="" />
        
        <div className="checkoutProduct_info">
            <p className="checkoutProduct_title">{title}</p>
            
            <p className="checkoutProduct_price">
                <small>$</small>
                <strong>{price}</strong>
            </p>

        <div className="CheckoutProduct_rating">
        {Array(rating).fill().map((_,i)=>(
            <p>*</p>
        ))}
        
        </div>
            <button onClick={removeFromBakset}>Remove from basket</button>
        </div>
            
        </div>
    )
}
