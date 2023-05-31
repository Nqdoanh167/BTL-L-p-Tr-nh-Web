/** @format */

const initState = {
   buy: [],
   cart: [],
   user: [],
};
const rootReducer = (state = initState, action) => {
   switch (action.type) {
      case 'REMOVE_FROM_CART':
         let cart = state.cart;
         cart = cart.filter((item) => item.id !== action.payload.id);
         return {...state, cart};
      case 'ADD_TO_CART':
         let carts = state.cart;
         let cartAdd = {
            id: action.payload.id,
            title: action.payload.title,
            image: action.payload.image,
            quantity: action.payload.quantity,
         };
         let checkcart = 0;
         for (let i = 0; i < carts.length; i++) {
            if (carts[i].id === cartAdd.id) {
               carts[i].quantity += cartAdd.quantity;
               checkcart = 1;
               break;
            }
         }
         if (checkcart === 1) {
            return {...state, cart: [...carts]};
         }
         return {...state, cart: [...state.cart, cartAdd]};
      case 'REMOVE_FROM_BUY':
         let buy = state.buy;
         buy = buy.filter((item) => item.id !== action.payload.id);
         return {...state, buy};
      case 'ADD_TO_BUY':
         let buys = state.buy;
         let buyAdd = {
            id: action.payload.id,
            title: action.payload.title,
            image: action.payload.image,
         };
         let check = 0;
         for (let i = 0; i < buys.length; i++) {
            if (buys[i].id === buyAdd.id) {
               buys[i].count += buyAdd.count;
               check = 1;
               break;
            }
         }
         if (check === 1) {
            return {...state, buy: [...buys]};
         }
         return {...state, buy: [...state.buy, buyAdd]};
      case 'REMOVE_USER':
         let user = state.user;
         user = user.filter((item) => item.id !== action.payload.id);
         return {...state, user};
      case 'ADD_USER':
         let userAdd = {
            id: action.payload.id,
            // name: action.payload.name,
            email: action.payload.email,
         };

         return {...state, user: [...state.user, userAdd]};

      default:
         return state;
   }
};
export default rootReducer;
