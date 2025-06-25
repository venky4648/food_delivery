import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems,setCartItems]=useState({}); 

  const addToCart = (itemId)=>{
    if (!cartItems[itemId]){
      setCartItems((prev)=>({...prev,[itemId]:1}));
    }

    else{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
    }
  }


  const removeFromCart = (itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
  }

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((acc, [itemId, quantity]) => {
      const item = food_list.find((food) => food._id === itemId);
      return acc + (item ? item.price * quantity : 0);
    }, 0);
  };
  

  

  const contextValue = {
    cartItems,
    food_list,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalCartAmount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreContextProvider;