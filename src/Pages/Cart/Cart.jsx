import { useContext } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import classes from './Cart.module.css';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import { Link } from 'react-router-dom';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import {Type} from '../../Utility/action.type'
import LayOut from '../../Components/LayOut/LayOut';
function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const incerement =(item) =>{
    dispatch({
      type:Type.ADD_TO_BASKET,
      item
    })
  }
  const decrement = (id) =>{
    dispatch({
      type:Type.REMOVE_FROM_BASKET,
      id 
    })

  }

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello {user ? user.name : 'Guest'}</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket.length === 0 ? (
            <p>Oops! No items in your cart. Browse our products!</p>
          ) : (
            basket.map((item, i) => {
              return <section className={classes.cart_product}>
              <ProductCard
                key={i}
                product={item}
                renderDesc={true}
                flex={true}
                renderAdd={false}
                
              />
              <div className={classes.btn_container}>
                <button  className ={classes.btn} onClick={() =>incerement(item)}>
                  <IoIosArrowUp size={25} />
                </button>

                <span>{item.amount}</span>
                <button  className ={classes.btn} onClick={()=>decrement(item.id)}>
                  <IoIosArrowDown  size={25}/>
                </button>
              </div>
              </section>
              })
          )
          }
        </div>

        {basket.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>

            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>

            <Link to='/payments'>Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
