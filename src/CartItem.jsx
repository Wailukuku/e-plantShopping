import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import  './ProductList';


const CartItem = (props) => {
  const cart = useSelector(state => state.cart.items); // Récupère les items du panier dans le state
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total =0
    cart.map((item)=>{
              const cost = parseFloat(item.cost.toString().substring(1)) || 0;
              const quantity = parseInt(item.quantity, 10) || 0;
        total += cost*quantity;

    })
    return total;
    // return cart.map((total, item) => {
    //         const cost = parseFloat(item.cost.toString().substring(1)) || 0;
    //         const quantity = parseInt(item.quantity, 10) || 0;
    //     total + cost * quantity, 0});
  };

  // Handle continue shopping button click
  const handleContinueShopping= (e) => {
 
    if (props.navigateToPlantList) {
        props.navigateToPlantList();
    }
  };
  // Handle incrementing item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 })); // Met à jour la quantité
  };

  // Handle decrementing item quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })); // Diminue la quantité
    } else {
      handleRemove(item); // Supprime l'item si la quantité tombe à 0
    }
  };

  // Handle removing an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // Supprime l'item du panier
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.toString().substring(1)) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;
    return (cost * quantity);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };
  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Price: {item.cost}</div>
              <div className="cart-item-quantity">
                <button 
                  className="cart-item-button cart-item-button-dec" 
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button 
                  className="cart-item-button cart-item-button-inc" 
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button 
                className="cart-item-delete" 
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e)=>handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
