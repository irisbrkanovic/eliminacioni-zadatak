import { useState } from "react";
import "./App.css";
import ProductContextProvider from "./central-store/ProductContext";
import NewProductForm from "./components/NewProductForm";
import ProductsList from "./components/ProductsList";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import EditProductForm from "./components/EditProductForm";

function App() {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <ProductContextProvider>
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route exact path="/product/add" element={<NewProductForm hideForm={setIsShown} />} />
            <Route exact path="/product/edit/:productId" element={<EditProductForm />} />
            <Route path="/product/:productId" element={<ProductDetails  />} />
          </Routes>
        </ProductContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
