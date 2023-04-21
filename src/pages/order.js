import React, { useState } from "react";
import Link from 'next/link';
import { auth } from '../pages/firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react'
import Header from '@/components/header';
import food from "@/components/food";
import { ref, push, set, onValue } from "firebase/database";
import { db } from '../pages/firebase'

export default function Order() {
    const [user, setUser] = useAuthState(auth);
    const [cartItems, setCartItems] = useState([]);

    const googleAuth = new GoogleAuthProvider();
    const login = async () => {
      const results = await signInWithPopup(auth, googleAuth);
      const { user } = results;
      const userInfo = {
        name: user.displayName,
        email: user.email
      }
    }

    useEffect(() => {
      console.log(user);
    }, [user]);

    useEffect(() => {
      if (!user) {
        return;
      }

      const cartItemsRef = ref(db, `users/${user.uid}/cartItems`);
      onValue(cartItemsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const items = Object.values(data);
          setCartItems(items);
        } else {
          setCartItems([]);
        }
      });
    }, [user]);

    const addToCart = (item) => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        // User not authenticated
        return;
      }
    
      const cartItem = {
        id: item.id,
        image_url: item.image_url,
        name: item.name,
        price: item.price,
        cartItemKey: null // add a new property to store the key
      };
    
      const cartItemsRef = ref(db, `users/${user.uid}/cartItems`);
      const newCartItemRef = push(cartItemsRef);
      const newCartItemKey = newCartItemRef.key;
      cartItem.cartItemKey = newCartItemKey; // save the key as a property
      console.log("newCartItemKey: ", newCartItemKey); // add this line to check the value of newCartItemKey
      set(ref(db, `users/${user.uid}/cartItems/${newCartItemKey}`), cartItem);      
      setCartItems([...cartItems, cartItem]);
    };
    
    

    const signOut = async () => {
      await auth.signOut();
    };

    if (!user) {
      return (
        <div className="flex flex-col justify-center items-center h-screen">
          <p className="text-4xl font-bold text-purple-600 mb-4">Please sign in to view this page.</p>
          <button onClick={login} className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none">Sign In</button>
        </div>
      );
    }
    return (
        <><Header />
        <h1 className="text-4xl flex justify-center max-auto items-center font-bold font-mono mt-2">Order here!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {food.map((item) => (
                <div key={item.name} className="bg-white rounded-lg shadow-md max-auto  shadow-gray-500 p-4">
                    <img src={item.image_url} alt={item.name} className="h-32 w-full object-cover mb-4 rounded-lg shadow-md" />
                    <h2 className="text-lg font-medium mb-2 text-purple-600">{item.name}</h2>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium">${item.price}</span>
                        <span className="text-sm text-purple-600">{item.calories} calories</span>
                    </div>
                    <ul className="mt-4">
                        <p className="text-l font-bold text-purple-500">Ingredients:-</p>
                        {item.ingredients.map((ingredient) => (
                            <li key={ingredient} className="text-gray-700 text-sm">{ingredient}</li>
                        ))}
                        <button className="px-4 py-2 float-right bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none" onClick={() => addToCart(item)}>Add to Cart</button>

                    </ul>

                </div>

            ))}
            
        </div>
        </>
      );

}
      