import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import {Dishes} from './Components/Dishes'
import Home from './Components/Home'
import {Login} from './Components/Login'
import { Products } from './Components/Products'
import {Signup} from './Components/Signup'
import { ProductsContextProvider } from './Global/ProductsContext'
// import { DishesContext } from './Global/DishesContext'
// import { CartContextProvider } from './Global/CartContext'
import { auth, db } from './Config/Config'
import { AuthProvider } from "./contexts/AuthContext"
import ForgotPassword from './Components/ForgotPassword'
import { CartContextProvider } from './Global/CartContext'
import {Cart} from './Components/Cart'
import { Cashout } from './Components/Cashout'






export class App extends Component {
    
    state = {
        user: null,
    }


    componentDidMount() {

        // getting user info for navigation bar
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('SignedUpUsersData').doc(user.uid).get().then(snapshot => {
                    this.setState({
                        user: snapshot.data().Name
                    })
                })
            }
            else {
                this.setState({
                    user: null
                })
            }
        })

    }

    render(){
        return(
       
           <>
            <ProductsContextProvider>
            <CartContextProvider>
            <BrowserRouter>
              <AuthProvider>
                <Switch>
                    <Route exact path='/' component={()=><Home user={this.state.user} />} />
                    <Route  exact path="/dishes"  component={()=><Products user={this.state.user} />} />
                    <Route  exact path="/login" component={Login} />
                    <Route  exact path="/signup" component={Signup} />
                    <Route path="/fpass" component={ForgotPassword} />
                    <Route path="/cartproducts" component={()=><Cart user={this.state.user} />}/>
                    <Route path='/cashout' component={() => <Cashout user={this.state.user} />} />
                </Switch>
                </AuthProvider>
              </BrowserRouter>
            </CartContextProvider>
            </ProductsContextProvider>
           </>
           
      
        )
    }
}


export default App