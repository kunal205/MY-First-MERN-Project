import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProducts } from "../utility/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
export default function ProductDetailsPage() {
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    product: {
      rating,
      title,
      description,
      price,
      images,
      stock,
      brand,
      warrantyInformation,
      minimumOrderQuantity,
      reviews,
    },
  } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getSingleProducts(id));
  }, [id]);
  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    alert(isWishlisted ? "Removed from wishlist" : "Added to wishlist!");
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    alert("redirecting to cart");
  };
  console.log("images:", images);
  return (
    <div className="bg-secondary-subtle">
      <div className="container py-4">
        <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
          <div className="row g-4 p-4 p-md-5">
            {/* Image Gallery */}
            <div className="col-md-6 position-relative">
              <div className="mb-3  pb-5 rounded-2 border w-100">
                <div id="carouselExample" class="carousel slide">
                  <div class="carousel-inner">
                    {Array.isArray(images) &&
                      images.map((imageSrc, index) => (
                        <div
                          key={imageSrc}
                          className={`carousel-item ${
                            index === 0 ? "active" : ""
                          }`}
                        >
                          <img
                            src={imageSrc}
                            className="d-block w-100"
                            alt={`Product image ${index + 1}`}
                          />
                        </div>
                      ))}
                  </div>
                  <button
                    onClick={handleWishlist}
                    className="position-absolute top-0 end-0 m-3 shadow border border-none"
                    style={{
                      ...styles.wishlistBtn,
                      ...(isWishlisted ? styles.wishlistBtnActive : {}),
                    }}
                  >
                    <span style={styles.heartIcon}>
                      {isWishlisted ? "❤️" : "🤍"}
                    </span>
                  </button>
                  <button
                    class=" btn btn-black position-absolute top-50 start-0"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                  >
                    <IoArrowBackOutline />
                  </button>
                  <button
                    class="btn btn-black position-absolute top-50 end-0"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                  >
                    <IoArrowForwardOutline />
                  </button>
                </div>
              </div>
            </div>
            {/* Product Details */}
            <div className="col-md-6">
              <h1 className="display-5 fw-bold mb-2">{title}</h1>

              <div
                className="d-flex align-items-center mb-3"
                style={{ gap: "1rem" }}
              >
                rating: {rating}
                <div className="d-flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        color: i < Math.floor(rating) ? "#ffc107" : "#dee2e6",
                        fontSize: "1.2rem",
                      }}
                    >
                      {i < Math.floor(rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className="d-flex align-items-baseline mb-3"
                style={{ gap: "1rem" }}
              >
                <h2 className="display-4 fw-bold mb-0">${price}</h2>
              </div>
              <p className="text-muted mb-4">{description}</p>
              {/* Quantity */}
              <div className="mb-4">
                <h5 className="fw-semibold mb-3">Quantity</h5>
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "1rem" }}
                >
                  <button
                    onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                    style={styles.quantityBtn}
                  >
                    -
                  </button>
                  <span style={styles.quantityDisplay}>{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity((q) =>
                        q < minimumOrderQuantity ? q + 1 : minimumOrderQuantity
                      )
                    }
                    style={styles.quantityBtn}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="d-flex mb-4" style={{ gap: "1rem" }}>
                <button
                  onClick={handleAddToCart}
                  style={{ ...styles.actionBtn, ...styles.actionBtnDark }}
                  className="flex-fill m-0"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  style={{ ...styles.actionBtn, ...styles.actionBtnPrimary }}
                  className="flex-fill p-1"
                >
                  Buy Now
                </button>
              </div>
              {/*Details Section*/}
              <div>
                <h3 className="border-dark border-bottom text-center">
                  Details
                </h3>
                <p className="fw-bold">
                  Brand : <span className="fw-light">{brand}</span>
                </p>
                <p className="fw-bold">
                  Warranty :
                  <span className="fw-light">{warrantyInformation}</span>
                </p>
                <p className="fw-bold">
                  InStock : <span className="fw-light">{stock}</span>
                </p>
              </div>
              {/* Reviews Section*/}
              <div>
                <h3 className="border-dark border-bottom text-center">
                  Reviews
                </h3>
                <label className="form-label fw-medium">your Comment</label>
                <input
                  className="form-control form-control-lg"
                  placeholder="your Comment"
                  type="text"
                  name="reviews"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                />
                <button className="btn btn-primary">Post</button>
                {Array.isArray(reviews) &&
                  reviews.map((elm) => (
                    <div className="border-bottom" key={elm.reviewerName}>
                      <p className="fw-bold my-0 d-inline">
                        {elm.reviewerName}
                      </p>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          style={{
                            color:
                              i < Math.floor(elm.rating)
                                ? "#ffc107"
                                : "#dee2e6",
                            fontSize: "1.2rem",
                          }}
                        >
                          {i < Math.floor(elm.rating) ? "★" : "☆"}
                        </span>
                      ))}
                      <p className="fw-bold">
                        Posted On:
                        <span className="fw-light">
                          {elm.date.slice(0, 10)}
                        </span>
                      </p>
                      <p className="fw-light">{elm.comment}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wishlistBtn: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
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
  sizeBtn: {
    padding: "0.5rem 1.25rem",
    border: "2px solid #dee2e6",
    borderRadius: "0.5rem",
    background: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: 500,
  },
  sizeBtnActive: {
    borderColor: "#0d6efd",
    background: "#e7f1ff",
    color: "#0d6efd",
    transform: "scale(0.95)",
  },
  quantityBtn: {
    width: "40px",
    height: "40px",
    border: "2px solid #dee2e6",
    borderRadius: "0.5rem",
    background: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1.2rem",
    transition: "all 0.3s ease",
  },
  quantityDisplay: {
    fontSize: "1.25rem",
    fontWeight: 600,
    minWidth: "50px",
    textAlign: "center",
  },
  actionBtn: {
    padding: "1rem",
    borderRadius: "0.75rem",
    fontWeight: 600,
    border: "none",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  actionBtnDark: {
    background: "#212529",
    color: "white",
  },
  actionBtnPrimary: {
    background: "#0d6efd",
    color: "white",
  },
  featureIcon: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  notification: {
    position: "fixed",
    top: "2rem",
    right: "2rem",
    background: "#198754",
    color: "white",
    padding: "1rem 1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 9999,
    animation: "slideIn 0.3s ease",
  },
};
