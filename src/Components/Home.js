import React,{useState, useEffect} from 'react'
import Navbar from './Navbar'
// import {Products} from './Products'
import {db} from '../Config/Config'
import "../Stylesheets/rests.css"
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { auth } from '../Config/Config'


const Home = ({ user }) => {

  const history = useHistory();

  useEffect(() => {
    // forcing user to signup
    auth.onAuthStateChanged(user => {
        if (!user) {
            history.push('/login');
        }
    })
})
    const [searchKey, setSearchKey] = React.useState("");
    const [filterType, setFilterType] = React.useState("");
   // state of products
   const [products, setProducts]=useState([]);
     
   // getting products function
   const getProducts = async ()=>{
       const products = await db.collection('Restaurants').get();
       const productsArray = [];
       for (var snap of products.docs){
           var data = snap.data();
           data.ID = snap.id;
           productsArray.push({
               ...data
           })
           if(productsArray.length === products.docs.length){
               setProducts(productsArray);
           }
       }
   }

   useEffect(()=>{
       getProducts();
   },[])
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
            placeholder="Search Restaurants"

          />
          <select
            className="form-control mt-3"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            
            <option value="">All</option>
            <option value="surat">Surat</option>
            <option value="ahmedabad">Ahmedabad</option>

          </select>
        </div> 
        </div>
      
        <div className="row">
        {products.filter(obj=>obj.name.toLowerCase().includes(searchKey))
            .filter((obj)=>obj.category.toLowerCase().includes(filterType))
           .map((product) => {
              return (
                <div className="col-md-4">
                  <div className="m-2 p-1 product position-relative">
                    <div className="product-content">
                      <p>{product.name}</p>
                      <div className="text-center">
                        <img
                          src={product.imageURL}
                          alt=""
                          className="product-img"
                        />
                      <p>{product.address}</p>
                      <p>{product.number}</p>
                      </div>
                    </div>
                    <div className="product-actions">
                      {/* <h2>{product.price} RS/-</h2> */}
                      <div className="d-flex">
                      <Link className='btn btn-outline-info' to="/dishes">Dishes</Link> 
                       
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
       
       </div>
    </>
  )
}

export default Home