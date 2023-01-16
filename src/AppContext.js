import React, { useState, useEffect, useContext } from "react"
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth"
import { auth } from "./FirebaseConfig"

const UserDataContext = React.createContext(null)

export function UserDataContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || {})  // the user is stored here as state

    function signup( email, password) {
        return createUserWithEmailAndPassword(auth, email, password)   // the user sign up
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)    // user login
    }

    const googleProvider = new GoogleAuthProvider()
    function signInWithGoogle() {         // user signin with google
        return signInWithPopup(auth, googleProvider)
    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {     // whenever authentication status changes
            setCurrentUser(user)            // set the user to logged in user or null
            localStorage.setItem('user', JSON.stringify(user))
        })

        return unsubscribe
    }, [])

    const value = { currentUser, signup, login, signInWithGoogle, logout, resetPassword }

    return (
        < UserDataContext.Provider value={value} >
            {children}
        </UserDataContext.Provider >
    )
}

export function useUserDataContext() {
    return useContext(UserDataContext)
}