import { useState, useEffect } from "react";
import { getCategories, addCategory } from "../pages/api";

export default function CategoriesList() {
  const [Categories, setCategories] = useState([]);
  const [newcategories, setNewcategories] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      alert("ok")
      setCategories(data);
      console.log(data,"ek minute ");
      
    } catch (error) {
      alert("Failed to fetch categories");
    }
  };

  const handleAddCategories = async () => {
    try {
      if (!newcategories) return;
      await addCategory({ name: newcategories });
      setNewcategories("");
      fetchCategories();
    } catch (error) {
      alert("Failed to add category");
    }
  };

  return (
    <>
      <div>
        <h2>categories</h2>
        <input
          type="text"
          value={newcategories}
          placeholder="Add category"
          onChange={(e) => setNewcategories(e.target.value)}
        />

        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={handleAddCategories}
        >Add categories</button>
      </div>

      <ul>
        {Categories.map((c) => (
          <li key={c.id}>
            {c.name} {c.category_id ? `(category: ${c.category_id})` : ""}
          </li>
        ))}
      </ul>
    </>
  );
}

