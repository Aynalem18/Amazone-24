import React from "react";
import classes from "./Header.module.css"
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import LowerHeader from "./LowerHeader";
import { BiCart } from "react-icons/bi";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from '../../Utility/Firebase'
import Us_Flag from "../../assets/Us_Flag.jpeg"


function Header() {

    const[{ user,basket},dispatch]= useContext(DataContext);

    const totalItem = basket?.reduce((amount,item) =>{
        return (item?.amount ||0)  + amount;
    }, 0);
        
    return (
        
        <section className={classes.fixed}>
            <section >
                <div className={classes.header__container}>
                    <div className={classes.logo__container}>
                        
                        <Link to="/">
                            <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon log" />
                        </Link>
                       <div className={classes.delivery}>
                        <span>
                           <SlLocationPin/>
                            
                        </span>
                        
                        
                        <div>
                            <p>Delivered to</p>
                            <span>United States</span>
                        </div>
                        </div>
                    </div>

                    <div className={classes.search}>
                        
                        <select name="" id="">
                            <option value="">All</option>
                            
                        </select>
                        <input type="text" /> 
                        <BsSearch size={38} />
                        </div>

                 <div className={classes.order__container}>
                       <Link to="" className={classes.header_language}>
              <img src={Us_Flag} alt="us_flag" />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
                       
                       
                       <Link to={!user &&"/auth"}>
                       
                       <div>
                        {user ? (
                                   <> 
                                   <p>Hello  {user?.email?.split("@")[0]}</p>
                                   <span onClick={() =>auth.signOut()}>Sign Out</span>
                                   </>

                                ):(
                                    <>
                                    <p> Hello,Sign In</p>
                                    <span>Account & Lists</span>
                                    </>
                                    

                                )}
                        
                        </div>
                        
                            
                        

                       </Link>
                       
                       <Link to="/orders">
                        <p>returns</p>
                        <span>& Orders</span>
                       </Link>
                       
                       <Link to="/cart" className={classes.cart}>
                        <BiCart size={35}/>

                       <span>{totalItem}</span>
                       </Link>
                </div>
                </div>
                
            </section>

            <LowerHeader/>
        </section>
        
            
            
            
            
    );
}

export default Header

