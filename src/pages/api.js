import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";

// Base axios instance
const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  timeout: 5000,
});

//  Add an intercepter to attach the JWT token (if you use authMiddleware)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Register
export async function registerUser({ username, email, password }) {
  try {
    const res = await API.post("/register", { username, email, password });
    toast.success(res.data.message || "Registered successfully!");
    return { ok: true, data: res.data };
  } catch (error) {
    toast.error(error.response?.data?.message || "Registration failed! ");
    return { ok: false, data: null };
  }

}

// Login 
export async function loginUser({ email, password }) {
  try {
    const res = await API.post("/login", {email, password });

    // save token to localstorage
    if (res.data.token) {
      localStorage.setItem("token", res.data.token)
    }
    toast.success(res.data.message || "Login successful!");
    return { ok: true, data: res.data }
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed!")
    return { ok: false, data: null }; 
  }
}


// categories
export const getCategories = async () => {
  try {
    const res = await API.get(`/getAllCategory`);

    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};


export const addCategory = async (category) => {
  try {
    const res = await API.post(`/createCategory`, category);
    return res.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};


export const getProduct = async () => {
  try {
    const res = await API.get(`/getAll-product`)
    return res.data;
  } catch (error) {
    console.error("Error getting products", error);
    throw error; 
  }
}

export const addProduct = async (product) => {
  try {
    const res = await API.post(`/create-product`, product);
    return res.data;
  } catch (error) {
    console.error("Error adding product", error);
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const res = await API.put(`/updateProductby-Id/${id}`, product);
    return res.data;
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await API.delete(`/deleteProductby-Id/${id}`, product);
    return res.data;
  } catch (error) {
    console.error("Error deleting the product", error);
    throw error;
  }
};
