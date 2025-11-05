import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProducts } from "../utility/ProductSlice";
const WishList = () => {
  return (
    <>
      <div>
        <div className="shadow-lg border-0">
          <div className="text-dark bg-primary p-4">
            <div className="d-flex align-items-center">
              <i className="bi bi-heart-fill fs-1 me-3"></i>
              <div>
                <h2 className="mb-0 ">My Wishlist</h2>
                <p className="mb-0 opacity-75">Save items you love for later</p>
              </div>
            </div>
          </div>
          <div className=" p-4">
            {WishList.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-heart display-1 text-muted"></i>
                <h3 className="mt-3 text-muted">Your wishlist is empty</h3>
                <p className="text-muted">Start adding items you love!</p>
              </div>
            ) : (
              WishList.map((item) => (
                <div key={item.id} className="mb-3 border">
                  <div className="body">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <span style={{ fontSize: "3rem" }}>{images}</span>
                      </div>
                      <div className="col">
                        <h5 className="card-title mb-1">{title}</h5>
                        <h4 className="text-danger fw-bold mb-0">${price}</h4>
                      </div>
                      <div className="col-auto">
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => moveToCart(product)}
                        >
                          <i className="bi bi-cart-plus"></i> Add to Cart
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeFromWishlist(products.id)}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default WishList;
