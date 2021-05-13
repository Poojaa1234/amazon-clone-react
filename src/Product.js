import React from 'react';
import './Product.css';
import {useStateValue} from './StateProvider';

export default function Product({id,title,image,price,rating}) {
    const [{basket},dispatch] = useStateValue();
    const addToBasket = ()=>{
        // dispatch the item into data layer
        dispatch({
            type:'ADD_TO_BASKET',
            item:{
                id:id,
                title:title,
                image:image,
                price:price,
                rating:rating
            }
        })

    }
    return (
        <div className="Product">
        <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
            <small>$</small>
            <small>{price}</small>
        </p>
        <div className="product_rating">
        {Array(rating).fill().map((_,i)=>(
            <p>*</p>
        ))}
        
        </div>
        </div>
        <img src={image} alt="" />

        <button onClick={addToBasket}>Add to Basket</button>
        
            
        </div>
    )
}
