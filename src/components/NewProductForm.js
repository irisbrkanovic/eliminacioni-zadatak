import { React, useContext, useState } from "react";
import { ProductContext } from "../central-store/ProductContext";
import { useNavigate } from "react-router-dom";
import "../styles/NewProductForm.css";

const NewProductForm = (props) => {
  const { addProduct, goBack } = useContext(ProductContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageSource, setImageSource] = useState("");
  const [isValid, setIsValid] = useState(true);

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

  const submitHandler = (event) => {
    event.preventDefault();

    const newProduct = {
      id: Math.random().toString(),
      title,
      price,
      description,
      thumbnail: imageSource,
    };

    if (
      title.trim().length === 0 ||
      price.trim().length === 0 ||
      description.trim().length === 0 ||
      imageSource.trim().length === 0
    ) {
      setIsValid(false);
      return;
    }

    addProduct(newProduct);

    setTitle("");
    setPrice("");
    setDescription("");
    setImageSource("");
    props.hideForm(false);
    navigate("/");
  };

  return (
    <section>
      <h1>Add new product</h1>
      <form id="new-product-form" onSubmit={submitHandler}>
        {!isValid && (
          <p className="invalid-alert">Please enter valid information!</p>
        )}
        <label htmlFor="title-input">Product name</label>
        <input
          id="title-input"
          type="text"
          value={title}
          onChange={changeTitleHandler}
        />
        <label htmlFor="price-input">Price</label>
        <input
          id="price-input"
          type="number"
          value={price}
          onChange={changePriceHandler}
        />
        <label htmlFor="description-input">Description</label>
        <textarea
          id="description-input"
          value={description}
          autoCapitalize="yes"
          onChange={changeDescriptionHandler}
        />
        <label htmlFor="imageInput">Picture URL</label>
        <input
          id="imageInput"
          type="text"
          placeholder="https://url-to-the-image"
          value={imageSource}
          onChange={changeImageHandler}
        />
        <div className="form-buttons">
          <button className="form-button" type="submit" onClick={goBack}>
            Go back
          </button>
          <button id="submit" className="form-button" type="submit">
            Add product
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewProductForm;
