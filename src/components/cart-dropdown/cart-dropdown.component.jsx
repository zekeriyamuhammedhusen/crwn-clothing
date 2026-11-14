import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import CustemButton from "../custem-button/custem-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.action";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, toggleCartHidden }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
    toggleCartHidden();
  };

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <div className="empty-message">Your cart is empty</div>
        )}
      </div>
      <CustemButton onClick={handleCheckout}>GO TO CHECKOUT</CustemButton>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
