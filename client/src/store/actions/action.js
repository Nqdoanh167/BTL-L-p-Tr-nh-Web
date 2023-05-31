/** @format */

export const addToCart = (book) => {
   return {
      type: 'ADD_TO_CART',
      payload: book,
   };
};

export const removeFromCart = (book) => {
   return {
      type: 'REMOVE_FROM_CART',
      payload: book,
   };
};
export const addToBuy = (book) => {
   return {
      type: 'ADD_TO_BUY',
      payload: book,
   };
};

export const removeFromBuy = (book) => {
   return {
      type: 'REMOVE_FROM_BUY',
      payload: book,
   };
};
export const addUser = (user) => {
   return {
      type: 'ADD_USER',
      payload: user,
   };
};

export const removeUser = (user) => {
   return {
      type: 'REMOVE_USER',
      payload: user,
   };
};
