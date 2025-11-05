import React, { useState } from "react";
import { IoStar } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Products = ({
  elm: { title, thumbnail, rating, id, price, discountPercentage },
}) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { user } = useSelector((state) => state.users);
  const handleWishlist = (e) => {
    e.stopPropagation();
    navigate("/wishlist");
  };
  const handleAddCart = (e) => {
    e.stopPropagation();
    navigate("/addtocart");
  };
  const discountedPrice = () => {
    const newPrice = price - (price * discountPercentage) / 100;
    return newPrice.toFixed(2);
  };
  console.log({ id });
  return (
    <>
      <div
        className="col-6 col-md-4 col-lg-3 my-1 my-md-3 "
        style={{ cursor: "pointer" }}
      >
        <div
          onClick={() => navigate(`/singleProduct/${id}`)}
          className="items card ms-md-1 text-center border border-black"
          style={{ height: "60vh" }}
        >
          <img
            src={thumbnail}
            className="card-img-top position-relative"
            alt=".."
            style={{ height: "33vh" }}
          />
          <button
            onClick={handleWishlist}
            className="position-absolute top-25 end-0 m-2 shadow"
            style={{
              ...styles.wishlistBtn,
              ...(isWishlisted ? styles.wishlistBtnActive : {}),
            }}
          >
            <span style={styles.heartIcon}>{isWishlisted ? "❤️" : "🤍"}</span>
          </button>
          <div className="card-body">
            <h5 className="card-title m-auto">{title}</h5>
            <p className="fw-lighter">
              Rating:{rating}
              <IoStar
                style={{
                  color: "#ffc107",
                  fontSize: "1.2rem",
                  marginBottom: "5px",
                  marginLeft: "3px",
                }}
              />
            </p>
            <h5 className="d-inline-flex  m-auto">
              price:${discountedPrice()}
            </h5>
            <h6 className="d-inline-flex">
              <span className="text-decoration-line-through d-inline-flex ms-2">
                ${price}
              </span>
              <sup className="fs-6 text-danger">{discountPercentage}%off</sup>
            </h6>
            <button
              onClick={handleAddCart}
              className="btn btn-primary d-block mx-auto mt-2 p-2"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const styles = {
  wishlistBtn: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  heartIcon: {
    fontSize: "1.5rem",
  },
};
export default Products;
