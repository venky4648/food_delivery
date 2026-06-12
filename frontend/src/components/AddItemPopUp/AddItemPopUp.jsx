import { useState, useContext } from "react";
import "./AddItemPopUp.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import PropTypes from "prop-types";

const AddItemPopUp = ({ setShowAddItem }) => {
  const { url, fetchFoodList, token } = useContext(StoreContext);

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        alert("Food item added successfully!");
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad"
        });
        setImage(false);
        fetchFoodList();
        setShowAddItem(false);
      } else {
        alert("Failed to add food: " + response.data.message);
      }
    } catch (error) {
      console.error("Add food error:", error);
      alert("Error adding food item: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="add-item-popup">
      <form onSubmit={onSubmitHandler} className="add-item-popup-container">
        <div className="add-item-popup-title">
          <h2>Add Food Item</h2>
          <img onClick={() => setShowAddItem(false)} src={assets.cross_icon} alt="Close" />
        </div>

        <div className="add-item-popup-inputs">
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <div className="upload-area">
                {image ? (
                  <img className="preview-img" src={URL.createObjectURL(image)} alt="Preview" />
                ) : (
                  <div className="upload-placeholder">
                    <span className="upload-icon">📁</span>
                    <span>Click to upload image</span>
                  </div>
                )}
              </div>
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </div>

          <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              name="name"
              placeholder="Type name here"
              required
            />
          </div>

          <div className="add-product-desc flex-col">
            <p>Product Description</p>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              name="description"
              rows="3"
              placeholder="Write description here"
              required
            />
          </div>

          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product Category</p>
              <select onChange={onChangeHandler} name="category" value={data.category}>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>

            <div className="add-price flex-col">
              <p>Product Price ($)</p>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="number"
                name="price"
                placeholder="20"
                min="0.01"
                step="0.01"
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="add-btn">
          Add Food Item
        </button>
      </form>
    </div>
  );
};

AddItemPopUp.propTypes = {
  setShowAddItem: PropTypes.func.isRequired,
};

export default AddItemPopUp;
