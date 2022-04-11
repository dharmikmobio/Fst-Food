/* eslint-disable no-unreachable */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const CartReducer = (state, action) => {

    const { shoppingCart, totalPrice, totalQty } = state;

    let product;
    let index;
    let updatedPrice;
    let updatedQty;

    switch (action.type) {

        case 'ADD_TO_CART':

            const check = shoppingCart.find(product => product.id === action.id);
            if (check) {
                toast.info('this product is already in your cart', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                // console.log('product alredy added')
                return state;
            }
            else {
                product = action.product;
                product['qty'] = 1;
                product['TotalProductPrice'] = product.price * product.qty;
                updatedQty = totalQty + 1;
                updatedPrice = totalPrice + product.price;
                return {
                    shoppingCart: [product, ...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            }
            break;

        case 'INC':
            product = action.cart;
            product.qty = ++product.qty;
            product.TotalProductPrice = product.qty * product.price;
            updatedQty = totalQty + 1;
            updatedPrice = totalPrice + product.price;
            index = shoppingCart.findIndex(cart => cart.id === action.id);
            shoppingCart[index] = product;
            return {
                shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
            }
            break;

        case 'DEC':
            product = action.cart;
            if (product.qty > 1) {
                product.qty = product.qty - 1;
                product.TotalProductPrice = product.qty * product.price;
                updatedPrice = totalPrice - product.price;
                updatedQty = totalQty - 1;
                index = shoppingCart.findIndex(cart => cart.id === action.id);
                shoppingCart[index] = product;
                return {
                    shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            }
            else {
                return state;
            }
            break;

        case 'DELETE':
            const filtered = shoppingCart.filter(product => product.id !== action.id);
            product = action.cart;
            updatedQty = totalQty - product.qty;
            updatedPrice = totalPrice - product.qty * product.price;
            return {
                shoppingCart: [...filtered], totalPrice: updatedPrice, totalQty: updatedQty
            }
            break;

        case 'EMPTY':
            return {
                shoppingCart: [], totalPrice: 0, totalQty: 0
            }

        default:
            return state;

    }

}
