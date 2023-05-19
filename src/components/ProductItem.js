import { useContext } from "react";
import { ProductContext } from "../central-store/ProductContext";
import { Link } from "react-router-dom";
import "../styles/ProductItem.css";

const ProductItem = (props) => {
  const { items, deleteProduct, editProduct, imageSource } =
    useContext(ProductContext);

  const deleteProductHandler = (id) => {
    deleteProduct(id);
  };
  const editProductHandler = (id) => {
    editProduct(id);
  };

  const thisProduct = props.product;
  return (
    <li className="product-item" key={thisProduct.id}>
      <section className="product-left">
        <img className="product-thumbnail" src={thisProduct.thumbnail} />

        <div className="product-info">
          <div>
            <h2 className="product-title">{thisProduct.title}</h2>
            <p className="product-description">{thisProduct.description}</p>
          </div>
          <p className="product-price">{thisProduct.price}$</p>
        </div>
      </section>

      <section className="product-buttons">
        <Link className="buttons details" to={`/product/${thisProduct.id}`}>
          View details
        </Link>
        <Link className="buttons edit" to={`/product/edit/${thisProduct.id}`}>
          Edit
        </Link>
        <button
          className="buttons delete"
          onClick={() => deleteProductHandler(thisProduct.id)}
        >
          Delete
        </button>
      </section>
    </li>
  );
};

export default ProductItem;
