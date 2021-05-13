import React from 'react'
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';
export default function Checkout() {
    const [{basket,user}, dispatch] = useStateValue();
    return (
        <div className="checkout">
        <div className="checkout_left">
        <img className="checkout_ad" src="https://m.media-amazon.com/images/G/01/VisualSearch/arview/block2new1._CB1554928723_.png" alt="" />
        
        <div>
        <h3>Hello, {user?.email}</h3>
        <h2 className="checkout_title">Your shopping basket</h2>
        
        {basket?.map(item => (
            <CheckoutProduct
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating} />
        ))}
        


        </div>
        </div>
        <div className="checkout_right">
        <Subtotal />
        
        </div>
            
        </div>
    )
}
