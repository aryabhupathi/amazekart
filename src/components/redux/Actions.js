export const cartAdd = (product) => ({
  type: "CartAdd",
  payload: product,
});

export const cartRemove = (id) => ({
  type: "CartRemove",
  payload: id,
});

export const cartUpdate = (id) => ({
  type: "CartUpdate",
  payload: id,
});
