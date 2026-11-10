import './App.css';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component';
import { onAuthStateChanged } from 'firebase/auth'
import { onSnapshot } from 'firebase/firestore';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignOutPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser:null
    }
  }

  unsubscribeFromAuth = null;
  // unsubscribeFromSnapshot = null;

   
componentDidMount() {
  this.unsubscribeFromAuth = onAuthStateChanged(
    auth,
    async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        if (userRef) {
          onSnapshot(userRef, (snapshot) => {
           this.setState({
            currentUser:{
              id: snapshot.id,
              ...snapshot.data()
            }
           })
          });
        
        }

      } else {
        this.setState({ currentUser: userAuth });
      }
    }
  );
}

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div >
        <Header  currentUser={this.state.currentUser}/>  
        <Routes>
          <Route  path='/' element={<Homepage/>} />
          <Route path='/signin' element={<SignInAndSignOutPage/>} />
          <Route path='/shop' element={<ShopPage/>} />
        </Routes>

      </div>
    );
  }
}

export default App;