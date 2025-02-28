const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const rootReducer = (state = initialState, action) => {
  let updatedCart;

  switch (action.type) {
    case "CartAdd":
      const existingItem = state.cart.find((item) => item.id === action.payload.id);

      if (existingItem) {
        updatedCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedCart = [...state.cart, action.payload];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };

    case "CartRemove":
      updatedCart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };

    case "CartUpdate":
      updatedCart = state.cart.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };

    default:
      return state;
  }
};

export default rootReducer;
