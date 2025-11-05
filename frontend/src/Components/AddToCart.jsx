import React, { useState } from "react";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <>
      <div className="container-fuild">
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white">
            <div className="d-flex align-items-center">
              <i className="bi bi-cart-fill fs-1 me-3"></i>
              <div>
                <h2 className="mb-0">Shopping Cart</h2>
                <p className="mb-0 opacity-75">
                  Review your items before checkout
                </p>
              </div>
            </div>
          </div>
          <div className="card-body p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-cart display-1 text-muted"></i>
                <h3 className="mt-3 text-muted">Your cart is empty</h3>
                <p className="text-muted mb-4">
                  Add some items to get started!
                </p>
                <button
                  className="btn btn-pink btn-lg"
                  onClick={() => setCurrentPage("wishlist")}
                >
                  <i className="bi bi-heart-fill"></i> Browse Wishlist
                </button>
              </div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="card item-card mb-3 border">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span style={{ fontSize: "3rem" }}>{item.image}</span>
                        </div>
                        <div className="col">
                          <h5 className="card-title mb-1">{item.name}</h5>
                          <h4 className="text-primary fw-bold mb-0">
                            ${item.price.toFixed(2)}
                          </h4>
                        </div>
                        <div className="col-auto">
                          <div className="btn-group me-2">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <button
                              className="btn btn-outline-secondary"
                              style={{
                                minWidth: "60px",
                                pointerEvents: "none",
                              }}
                            >
                              {item.quantity}
                            </button>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                          <button
                            className="btn btn-danger"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <hr className="my-4" />
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="mb-0">Total:</h3>
                  <h2 className="mb-0 text-primary fw-bold">
                    ${cartTotal.toFixed(2)}
                  </h2>
                </div>
                <button className="btn btn-primary btn-lg w-100 py-3">
                  <i className="bi bi-credit-card"></i> Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToCart;
