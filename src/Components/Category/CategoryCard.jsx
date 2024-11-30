import React from 'react'
import { Link } from 'react-router-dom'; 
import classes from './Category.module.css'

function CategoryCard({data}) {
  console.log(data) 

return (
    <div className={classes.category}>
      <Link to={`/category/${data.name}`} >
        <span>
          <h2>{data.title}</h2>
        </span>
        
        <img src={data?.imgLink } alt='' />
        <p>Shop now</p>
      </Link>
    </div>
  );
}
export default CategoryCard