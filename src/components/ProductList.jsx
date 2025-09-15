import { useState, useEffect } from "react";

import { getProduct, addProduct, updateProduct, deleteProduct, getCategories } from "../pages/api";

export const ProductList=() =>{
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form, setform] = useState({ name: "", price: "", description:"", category: ""})
    const [editingId, setEditingId] = useState(null);


    useEffect(() => {
        fetchProducts();
        fetchCategories(); 
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProduct();
                setProducts(data)
                console.log("Products fetch hogye bhai");
                
        } catch (error) {
            alert("failed to fetch the products",error);
        }
    }

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
                setCategories(data)
                console.log("categories fetch hogyi bhai");
                
        } catch (error) {
            alert("failed to fetch the categories", error);
        }
    }

    const handleSubmit = async () => {
        try {
            if (editingId) {
                await updateProduct(editingId, form);
                setEditingId(null);
            } else {
                await addProduct(form);
            }
            setform({ name: "",price: "", description: "", category: ""});
            fetchProducts();
        } catch (error) {
            alert("failed to save product")
            
        }
    }
    
    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            fetchProducts();
        } catch (error) {
            alert("Failed to delete product")    
        }
    }
      const startEdit = (product) => {
        setform({ name: product.name , price: product.price, description: product.description, category: product.category_id });
        setEditingId(product.id)  

      };


    return (
        <>
        <h2>Product</h2>
        <input 
        value={form.name}
        placeholder="Product name"
        onChange={(e) => setform({ ...form, name: e.target.value})} />

        <input 
        type="number"
        value={form.price}
        placeholder="Product  price"
        onChange={(e) => setform({ ...form , price: e.target.value})}  />

        <input 
        type="text"
        value={form.description}
        placeholder="product description"
        onChange={(e) => setform({ ...form, description: e.target.value })} />

        <select 
        value={form.category} 
        onChange={(e) => setform({ ...form, category: e.target.value })}>

            <option value="">Select category</option>

            {/* Categories list */}
            {categories.map((c) => (
                <option key={c.id} value={c.id}>
                    {c.name}
                </option>
            ))}
        </select>

        <button onClick={handleSubmit}>
            {editingId ? "Update": "Add" } Product
        </button>

        {/* Product list */}
        <ul>
        {products.map((p) => {
          const categoryName =
            categories.find((c) => c.id === p.category_id)?.name || "No category";

          return (
            <li key={p.id}>
              {p.name} - ₹{p.price} ({categoryName})
              <button onClick={() => startEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </li>

          )
            })}
        </ul>
        </>
    )
}