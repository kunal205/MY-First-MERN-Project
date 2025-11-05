import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Products from "./Products.jsx";
import { getAllProducts } from "../utility/ProductSlice.js";
const ProductsContainer = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <div className="container-fluid ">
      <div className="row">
        {productList.map((elm, ind) => (
          <Products key={ind} elm={elm} />
        ))}
      </div>
    </div>
  );
};

export default ProductsContainer;
