import React, { useEffect, useState } from 'react'
import classes from './Results.module.css' 
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProductCard from '../../Components/Product/ProductCard'
import { productUrl } from '../../Api/endPoints'
import Loader from '../../Components/Loader/Loader'

function Results() {
    const [results, setResults] = useState([]);   
    const [isLoading, setLoading] = useState(true);  
    const {categoryName} = useParams();

    

     useEffect(() => {
        setLoading(true);  
        axios.get(`${productUrl}/products/category/${categoryName}`)
            .then((res) => {
                setResults(res.data); 
                console.log(res.data);
                setLoading(false);  
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);  
            });
    }, [categoryName]);  
    
    return (
        <LayOut>
            
                <section>
                    <h1 style={{ padding: "30px" }}>Results</h1>
                    <p style={{ padding: "30px" }}>Category/{categoryName}</p>
                    <hr />
                    <div className={classes.products_container}>
                        {results?.map((product) => (
                            <ProductCard
                                key={product.id} 
                                product={product}  
                                renderDesc={false} 
                                renderAdd={true}
                                 
                            />
                        ))}
                    </div>
                </section>
           
        </LayOut>
    );
}

export default Results;
