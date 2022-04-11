import React, { useContext ,useEffect  } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
// import { CartContext } from '../Global/CartContext'
import "../Stylesheets/products.css"
import Navbar from './Navbar'
import { useHistory } from 'react-router-dom'
import { auth } from '../Config/Config'
import { CartContext } from '../Global/CartContext'

export const Products = ({ user }) => {

  const history = useHistory();

  useEffect(() => {
      // forcing user to signup
      auth.onAuthStateChanged(user => {
          if (!user) {
              history.push('/login');
          }
      })
  })

    const { products } = useContext(ProductsContext);
    const [searchKey, setSearchKey] = React.useState("");
    const [filterType, setFilterType] = React.useState("");
    
    
    // const data = useContext(CartContext);
    // console.log(data);
    const { dispatch } = useContext(CartContext);

    return (
        <>
        <Navbar  user={user}/>
        <div className="container">
        <div className="d-flex w-50 align-items-center my-3 justify-content-center">
           <input
            type="text"
            value={searchKey}
            style={{"marginTop": "16px"}}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            className="form-control mx-2"
            placeholder="Search Dishes"

          />
          <select
            className="form-control mt-3"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            
            <option value="">All</option>
            <option value="drink">Drink</option>
            <option value="desserts">Desserts</option>
            <option value="pizza">Pizza</option>
            <option value="lunch">Lunch</option>
          </select>
        </div> 
        </div>
            {products.length !== 0 && <h1>Dishes</h1>}
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.filter(obj=>obj.dishname.toLowerCase().includes(searchKey))
               .filter((obj)=>obj.category.toLowerCase().includes(filterType))
                .map(product => (
                    <div className='product-card' key={product.id}>
                        <div className='product-img'>
                            <img src={product.dishURL} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.dishname}
                        </div>
                        <div className='product-price'>
                             {product.category}
                    </div>
                        <div className='product-price'>
                            Rs {product.price}.00
                    </div>
                        <button className='addcart-btn'onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.id, product })}>ADD TO CART</button>
                    </div>
                ))}
            </div>
        </>
    )
}
