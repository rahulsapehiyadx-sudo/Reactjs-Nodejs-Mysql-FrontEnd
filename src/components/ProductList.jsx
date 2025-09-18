import { useState, useEffect } from "react";
import styles from "./ProductList.module.css";

import {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from "../pages/api";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setform] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProduct();
      setProducts(data);
    } catch (error) {
      alert("failed to fetch the products", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      alert("failed to fetch the categories", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateProduct(editingId, form);
        setEditingId(null);
      } else {
        await addProduct(form);
      }
      setform({ name: "", price: "", description: "", category: "" });
      fetchProducts();
    } catch (error) {
      alert("failed to save product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  const startEdit = (product) => {
    setform({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category_id,
    });
    setEditingId(product.id);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Product Management</h2>

      {/* Form */}
      <div className={styles.form}>
        <input
          className={styles.input}
          value={form.name}
          placeholder="Product name"
          onChange={(e) => setform({ ...form, name: e.target.value })}
        />

        <input
          className={styles.input}
          type="number"
          value={form.price}
          placeholder="Product price"
          onChange={(e) => setform({ ...form, price: e.target.value })}
        />

        <input
          className={styles.input}
          type="text"
          value={form.description}
          placeholder="Product description"
          onChange={(e) => setform({ ...form, description: e.target.value })}
        />

        <select
          className={styles.select}
          value={form.category}
          onChange={(e) => setform({ ...form, category: e.target.value })}
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.category_id}>
              {c.name}
            </option>
          ))}
        </select>

        <button className={styles.button} onClick={handleSubmit}>
          {editingId ? "Update" : "Add"} Product
        </button>
      </div>

      {/* Product list */}
      <ul className={styles.productList}>
        {products.map((p) => {
          const categoryName =
            categories.find((c) => c.category_id == p.category_id)?.name ||
            "no category";

          return (
            <li key={p.id} className={styles.productItem}>
              <span>
                {p.name} - ₹{p.price} ({categoryName})
              </span>
              <div className={styles.actions}>
                <button onClick={() => startEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
