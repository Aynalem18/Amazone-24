import React,{useContext, useEffect,useState} from 'react'
import classes from './Orders.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { db } from '../../Utility/Firebase'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'

function Orders() {
  const [{user},dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() =>{
    if(user){
      db.collection('users')
      .doc(user.uid)
      .collection("orders")
      .orderBy("created","desc")
      .onSnapshot((snapshot) =>{
        console.log(snapshot);
        setOrders(
          snapshot.docs.map((doc) =>({
          id:doc.id,
          data:doc.data(),
        }))
      );

        });

    }else{
      setOrders([]);

    }

  },[]);

  return (
    <LayOut>
        <section className={classes.container}>
          <div className={classes.order__container}>
            <h2>Your Orders</h2>
            {
              orders?.length == 0 && 
              <div style={{padding: "20px"}}>You Don,t Have Orders Yet.</div>

            }
            {/* Ordered Items */}
            <div>
              {
                orders?.map((eachOrder,index) =>{
                  return(
                    <div key={index}>
                      <hr />
                      <p>Order ID: {eachOrder?.id}</p>
                      {
                       eachOrder?.data?.basket?.map(order =>{
                       return <ProductCard

                        flex={true}
                        product={order}
                        key={order.id}
                        
                        />;

                       })}
                    </div>
                  );

                }) }

            </div>
          </div>
        </section>
    </LayOut>
  )
}

export default Orders