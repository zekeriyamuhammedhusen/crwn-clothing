import "./App.css";
import React from "react";
import { createStructuredSelector } from "reselect";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage/homepage.component";
import { connect } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignOutPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.action";
import CheckoutPage from "./pages/checkout/checkout.component";

import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        this.unsubscribeFromSnapshot = onSnapshot(userRef, (snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(null);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth && this.unsubscribeFromAuth();

    this.unsubscribeFromSnapshot && this.unsubscribeFromSnapshot();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/signin"
            element={
              this.props.currentUser ? (
                <Navigate to="/" replace />
              ) : (
                <SignInAndSignOutPage />
              )
            }
          />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:category" element={<ShopPage />} />
          <Route exact path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
