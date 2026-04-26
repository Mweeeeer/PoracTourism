import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  async function register(email, password, name) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user doc
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      role: "user", // Default role
      createdAt: new Date().toISOString()
    });

    return user;
  }

  function login(email, password) {
    if (email === "merwin@gmail.com" && password === "merwin") {
      const adminUser = { uid: "hardcoded_admin", email: "merwin@gmail.com", displayName: "Merwin" };
      setCurrentUser(adminUser);
      setIsAdmin(true);
      return Promise.resolve(adminUser);
    }
    
    if (!auth) return Promise.reject(new Error("Firebase Auth is not initialized."));
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    if (currentUser?.uid === "hardcoded_admin") {
      setCurrentUser(null);
      setIsAdmin(false);
      return Promise.resolve();
    }
    if (!auth) return Promise.resolve();
    return signOut(auth);
  }

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // If we already have the hardcoded admin, don't overwrite it
      setCurrentUser(prevUser => {
        if (prevUser?.uid === "hardcoded_admin") return prevUser;
        return user;
      });

      if (user) {
        // Check if admin
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          
          setIsAdmin(prevIsAdmin => {
             // If we already have the hardcoded admin, stay admin
             if (prevIsAdmin && currentUser?.uid === "hardcoded_admin") return true;
             return docSnap.exists() && docSnap.data().role === "admin";
          });
        } catch (error) {
          console.error("Error fetching user role", error);
          setIsAdmin(prev => currentUser?.uid === "hardcoded_admin" ? true : false);
        }
      } else {
        setIsAdmin(prev => currentUser?.uid === "hardcoded_admin" ? true : false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser?.uid]);

  const value = {
    currentUser,
    isAdmin,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
