import { ProductContext } from "../central-store/ProductContext";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { items, goBack } = useContext(ProductContext);
  const { productId } = useParams();

  const product = items.find((item) => item.id == productId);

  return (
    <section>
      <h1>Product details</h1>
      <button className="list-button back" onClick={goBack}>
        Go back
      </button>
      <div className="details-page">
        <img className="details-thumbnail" src={product.thumbnail} />
        <div>
          <h2 className="details-title">{product.title}</h2>
          <p className="details-price">{product.price}$</p>
          <p className="details-description">{product.description}</p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
