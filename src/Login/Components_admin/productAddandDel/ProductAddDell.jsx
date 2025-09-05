import React, { useState } from "react";
import axios from "axios";

const ProductAddDell = () => {
  const [form, setForm] = useState({
    title: "",
    text: "",
    pls1: "",
    pls2: "",
    pls3: "",
    price: "",
    colors: "",
  });
  const [imgFile, setImgFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("img", imgFile);
      Object.keys(form).forEach((key) => data.append(key, form[key]));

      await axios.post("http://localhost:5000/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Product qo‘shildi!");
      setForm({ title: "", text: "", pls1: "", pls2: "", pls3: "", price: "", colors: "" });
      setImgFile(null);
    } catch (err) {
      alert("❌ Xato: " + err.message);
    }
  };

  return (
    <div>
      <h2>Yangi Product qo‘shish</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} value={form.title} />
        <input name="text" placeholder="Text" onChange={handleChange} value={form.text} />
        <input type="file" name="img" onChange={handleFileChange} />
        <input name="pls1" placeholder="Image 1" onChange={handleChange} value={form.pls1} />
        <input name="pls2" placeholder="Image 2" onChange={handleChange} value={form.pls2} />
        <input name="pls3" placeholder="Image 3" onChange={handleChange} value={form.pls3} />
        <input name="price" placeholder="Price" onChange={handleChange} value={form.price} />
        <input name="colors" placeholder="Colors (comma separated)" onChange={handleChange} value={form.colors} />
        <button type="submit">Qo‘shish</button>
      </form>
    </div>
  );
};

export default ProductAddDell;
