import React, { useContext, useState } from 'react';
import classes from './Payment.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/Firebase';
import { useNavigate } from 'react-router-dom';

import { Type } from '../../Utility/action.type';

function Payment() {
  const[{user,basket},dispatch] = useContext(DataContext)
  console.log(user);

   const totalItem = basket?.reduce((amount,item) =>{
        return item.amount  + amount;
    }, 0);
    const total = basket?.reduce((amount,item) =>{
        return item.price * item.amount + amount;
    }, 0);

    const [cardError , setCardError] = useState(null)
    const[processing, setProcessing] = useState(false)

    const stripe =  useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleChange =(e) => {
      // console.log(e);
      e?.error?.message? setCardError(e?.error?.message ): setCardError('')

    }

    const handlePayment =async (e) =>{
      e.preventDefault();
      try {
        setProcessing(true);
        // 1. 
      // backend || function ----> contact to the client secret
        const response = await axiosInstance({
          method:"POST",
          url:`/payment/create?total=${total*100}`,

        });
        // console.log(response.data);
        const clientSecret = response.data?.clientSecret;
         // 2 . client side (react side confirmation)
         const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, { payment_method: { card: elements.getElement(CardElement),

          }
        });
        // console.log(paymentIntent);
         // 3 .afer the confirmation --> order firestore  database save ,clear basket
         await db
         .collection("users")
         .doc(user.uid)
         .collection("orders")
         .doc(paymentIntent.id).set({
          basket:basket,
          amount:paymentIntent.amount,
          created :paymentIntent.created,
         });
        //  empty the basket
        dispatch({type:Type.EMPTY_BASKET});


         setProcessing(false);
         navigate("/orders",{state:{msg:"You Have Placed New Order"}})

      } catch (error) {
        console.log(error)
        setProcessing(false)
        

      }


      

     

     

    }

  return (
    <LayOut>
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>
      {/* payments method */}
      <section className={classes.payment}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delevery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>{user?.address?.street || '1234 Georgia Ave, NW'}</div>
            <div>{user?.address?.city || 'Washington, DC'}</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Riview itesms and delivery</h3>
          <div>
            {
              basket?.map((item) => <ProductCard product = {item} flex=
            {true}/>) 
            }

          </div>

        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error handler */}
                {cardError && <small style={{color:"red"}}>{cardError}</small>}
                {/* card  element*/}
                <CardElement onChange={handleChange}/>
                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span>
                      Total Order | <CurrencyFormat amount={total}/>
                    </span>
                  </div>
                  <button type="submit">
                    {
                      processing?(
                        <div className={classes.loader}>
                          <ClipLoader color='gray' size={12}/>
                        <p>Please Wait...</p>
                        </div>
                        
                        
                      ) : "Pay Now"
                     
                      
                    }
                    
                  </button>
                  
                </div>

              </form>
            </div>

          </div>
        </div>

      </section>
    </LayOut>
  )
}

export default Payment