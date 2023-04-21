import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove,set ,update} from 'firebase/database';
import { firebaseApp } from './firebase';
import { getAuth } from 'firebase/auth';
import Header from '@/components/header';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const db = getDatabase(firebaseApp);
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    if (!user) {
      // User not authenticated
      return;
    }
    const cartItemsRef = ref(db, `users/${user.uid}/cartItems`);
    const unsubscribe = onValue(cartItemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = Object.values(data);
        setCartItems(items);
      } else {
        setCartItems([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };    
  const deleteFromCart = (cartItemKey) => {
    const db = getDatabase(firebaseApp);
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    if (!user) {
      // User not authenticated
      return;
    }
  
    const cartItemRef = ref(db, `users/${user.uid}/cartItems/${cartItemKey}`);
    remove(cartItemRef);
    setCartItems(cartItems.filter((cartItem) => cartItem.cartItemKey !== cartItemKey));
  };
  
 
  
  
  const ClearCart = () => {
    const db = getDatabase(firebaseApp);
    const auth = getAuth(firebaseApp);
    const currentUser = auth.currentUser;
    if (!currentUser) {
      // User not authenticated
      return;
    }
        // Remove the cart item from the real-time database
    const cartItemRef = ref(db, `users/${currentUser.uid}/cartItems/`);
    remove(cartItemRef);

  }
  
  
  
  

  


  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="flex items-center space-x-4 py-2">
                <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="flex-1">
                  <h2 className="font-bold">{item.name}</h2>
                  <p className="text-gray-500">{item.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <p>${item.price}</p>
                  <button
                    className="text-red-600 hover:text-red-700 font-bold"
                    onClick={() => deleteFromCart(item.cartItemKey)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 gap-4 text-right">
            <p className="font-bold text-2xl">Total Price: ${calculateTotalPrice()}</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4">
              Checkout
            </button>
            <button className="bg-blue-500 ml-5 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4" onClick={ClearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}
