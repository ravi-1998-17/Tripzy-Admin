import axios from "axios";

const API_KEY = "AIzaSyCpTMhsXf_LZVVE48VGCKqsSRGEAOA7fo4";
const DB_URL = "https://tripzy-de9a4-default-rtdb.firebaseio.com";

// AUTH (SIGN UP / LOGIN)
export async function signUp(email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
  const res = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });
  return res.data;
}

export async function signIn(email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
  const res = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });
  return res.data;
}

// PRODUCTS

// Fetch all products (public)
export async function fetchProducts() {
  const res = await axios.get(`${DB_URL}/products.json`);
  return res.data;
}

// Create product (admin)
export async function createProduct(product, idToken) {
  const res = await axios.post(
    `${DB_URL}/products.json?auth=${idToken}`,
    product
  );
  return res.data;
}

// Update product fields
export async function updateProduct(productId, patch, idToken) {
  const res = await axios.patch(
    `${DB_URL}/products/${productId}.json?auth=${idToken}`,
    patch
  );
  return res.data;
}

// // Delete product
export async function deleteProduct(productId, idToken) {
  const res = await axios.delete(
    `${DB_URL}/products/${productId}.json?auth=${idToken}`
  );
  return res.data;
}

// Update ONLY quantity when order placed
export async function updateProductQty(productId, newQty, idToken) {
  const res = await axios.patch(
    `${DB_URL}/products/${productId}.json?auth=${idToken}`,
    { quantity: newQty }
  );
  return res.data;
}

// ADDRESS — Save per user

export async function saveAddress(userId, address, idToken) {
  const res = await axios.post(
    `${DB_URL}/users/${userId}/addresses.json?auth=${idToken}`,
    address
  );
  return res.data;
}

// // ORDERS — Save order

export async function saveOrder(order, idToken) {
  const res = await axios.post(`${DB_URL}/orders.json?auth=${idToken}`, order);
  return res.data;
}


// ORDERS (ADMIN)

// Fetch all orders
export async function fetchOrders() {
  const res = await axios.get(`${DB_URL}/orders.json`);
  return res.data;
}

// Update order status
export async function updateOrderStatus(orderId, status, idToken) {
  const res = await axios.patch(
    `${DB_URL}/orders/${orderId}.json?auth=${idToken}`,
    { status }
  );
  return res.data;
}
