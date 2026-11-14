import React from "react";
import CustemButton from "../custem-button/custem-button.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => (
  <div className="cart-dropdown">
    <div className="cart-items" />
    <CustemButton>GO TO CHECKOUT</CustemButton>
  </div>
);

export default CartDropdown;
