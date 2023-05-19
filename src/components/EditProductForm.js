import { useContext, useState } from "react";
import { ProductContext } from "../central-store/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditProductForm.css";
import "../styles/ProductItem.css";

const EditProductForm = () => {
  const { items, editProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const { productId } = useParams();

  const product = items.find((item) => item.id == productId);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [imageSource, setImageSource] = useState(product.thumbnail);
  const [isValid, setIsValid] = useState(true);

  // console.log(product)

  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const changePriceHandler = (event) => {
    setPrice(event.target.value);
  };

  const changeDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const changeImageHandler = (event) => {
    setImageSource(event.target.value);
  };

  const editedProduct = {
    ...product,
    title,
    price,
    description,
    thumbnail: imageSource,
  };
  console.log(editedProduct);
  const submitHandler = (event) => {
    event.preventDefault();

    if (
      title.trim().length === 0 ||
      price.length === 0 ||
      description.trim().length === 0 ||
      imageSource.trim().length === 0
    ) {
      setIsValid(false);
      return;
    }
    
    editProduct(editedProduct);
    
    navigate("/");
  };
  
  return (
    <div>
      <h1>Edit Product</h1>
      <form  onSubmit={submitHandler}>
      {!isValid && (
          <p className="invalid-edit invalid-alert">Please enter valid information!</p>
        )}
        <section className="product-item">
        <section className="product-left">
          <img className="product-thumbnail" src={imageSource} />

          <div className="product-info">
            <div>
              <input
                placeholder="Product name"
                className="product-title"
                type="text"
                defaultValue={title}
                onChange={changeTitleHandler}
              />
              <textarea
                placeholder="Product description"
                className="product-description"
                defaultValue={description}
                onChange={changeDescriptionHandler}
              />
            </div>
            <input
              placeholder="Product price"
              className="product-price"
              type="number"
              defaultValue={price}
              onChange={changePriceHandler}
            />
            <input
              placeholder="https:// url-to-the-image"
              type="text"
              defaultValue={imageSource}
              onChange={changeImageHandler}
              id="imageInput"
            />
          </div>
        </section>
        <section className="product-buttons editing">
          <button id="submit" className="buttons" type="submit">
            EDIT PRODUCT
          </button>
        </section>
        </section></form>
    </div>
  );
};

export default EditProductForm;
