import ProductItem from "./ProductItem";
import { ProductContext } from "../central-store/ProductContext";
import { useContext, useState } from "react";
import "../styles/ProductsList.css";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const { items, counter, setCounter } = useContext(ProductContext);
  // console.log(items);

  const seeMore = () => {
    setCounter(counter + 9);
  };

  const visibleItems = items.slice(0, counter);

  return (
    <div className="home-page">
      <h1>Online store</h1>
      <Link
        className="list-button add-product-button"
        to="/product/add"
      >
        Add product
      </Link>

      <ul>
        {visibleItems.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
        {counter < items.length && <button className="list-button see-more" onClick={seeMore}>See more</button>}
      </ul>
    </div>
  );
};

export default ProductsList;
