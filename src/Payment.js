import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, {useState, useEffect} from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link , useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import axios from './axios';
import { db } from './firebase';

export default function Payment({id,image,title,price,rating}) {
    const [{basket,user},dispatch]=useStateValue();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret,setClientSecret]=useState(true);
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();
    
    useEffect(() => {
        // Generate the special stripe secrect which allows us to change
        // a CustomElementRegistry
        const getClientSecret = async () =>{
             const response = await axios ({
                // headers : {  
                //    'Access-Control-Allow-Origin' : '*' ,  
                //   },
                 method:'post',
                 // Stripe expects the total in a currencies subunits
                 url : `/payments/create?total=${getBasketTotal(basket) * 100 }`
             })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
        
    }, [basket]);

    console.log("The secret is ",clientSecret)
    console.log("User is",user.uid)
    
    const handleSubmit = async (event)=>{
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method:{
                card : elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=>{
                // paymentIntent = payment confirmation
                db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount : paymentIntent.amount,
                    created : paymentIntent.created
                })

                setSucceeded(true);
                setError(null)
                setProcessing(false);

                dispatch({
                    type:'EMPTY_BASKET'
                })

                history.replace('/orders');
            })


    }
    const handleChange = (event) =>{
        //Listen for change in CardElement
        // And display any errors as the customer types their card details
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "");

    }

    return (
        <div className="Payment">
        <div className="payment_container">
        <h1>
            Checkout  (<Link to="/checkout">
            {basket?.length} items</Link>)
        </h1>
             {/* Payment section delivery address */}
             <div className="payment_section">
                <div className="payment_title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment_address">
                    <p>{user?.email}</p>
                    <p>1234 React Lane</p>
                    <p>Mumbai, India</p>
                </div>
             </div>

             {/* Payment section Review Items */}
        <div className="payment_section">
            <div className="payment_title">
                <h3>Review Items and Delivery</h3>
            </div>
            <div className="payment_items">
                {basket.map(item=>(
                    <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                    />
                ))}
            </div>
        </div>

             {/* Payment section Payment Method */}
        <div className="payment_section">
            <div className="payment_title">
                <h3>Delivery Address</h3>
            </div>
            <div className="payment_details">
                {/* Stripe Payment */}
                <form onSubmit={handleSubmit}>
                    <CardElement onChange={handleChange} />
                    <div className="payment_priceContainer">
                         <CurrencyFormat
                         renderText={(value)=> (
                             <>
                             <h3>Order Total: {value}</h3>
                             </>
                         )}
                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType={"text"}
                        thousandSeperator={true}
                        prefix={"$"}
                          />
                        
                        <button disabled={processing
                         || disabled || succeeded}>
                             <span>{processing ? <p>Processing</p> :
                             "Buy Now"}</span>
                         </button>
                    </div>
                </form>

                {error && <div>{error}</div>}
            
            </div>
        </div>


        </div>    
        </div>
    )
}
