import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const ProductContext = createContext();

const ProductContextProvider = (props) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(9);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setItems(data.products));
  }, []);

  const addProduct = (newItem) => {
    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: newItem.id,
        title: newItem.title,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems([newItem, ...items]);
      });
  };

  const deleteProduct = (id) => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) =>
        setItems((prevItems) => prevItems.filter((item) => item.id !== id))
      );
  };

  const editProduct = (editedProduct) => {
    fetch(`https://dummyjson.com/products/${editedProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedProduct = { ...editedProduct };

        const index = items.findIndex((item) => item.id == updatedProduct.id);

        if (index !== -1) {
          const updatedItems = [...items];
          updatedItems[index] = updatedProduct;
          setItems(updatedItems);
        }
      });
      console.log(items)
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <ProductContext.Provider
      value={{
        items,
        addProduct,
        deleteProduct,
        editProduct,
        counter,
        setCounter,
        goBack,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
