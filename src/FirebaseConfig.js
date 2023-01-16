import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY , //'AIzaSyBAEx_tpsL_HRwnAhzC8E_xtFVjtaoY-4M',
    authDomain: process.env.REACT_APP_AUTH_DOMAIN, //'todo-list-24124.firebaseapp.com',
    projectId: process.env.REACT_APP_PROJECT_ID, //'todo-list-24124',
    storageBucket: process.env.REACT_APP_STORAGE_BUCKETREACT_APP_STORAGE_BUCKET, //'todo-list-24124.appspot.com',
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID, //'770683609707',
    appId: process.env.REACT_APP_APP_ID //'1:770683609707:web:43fa0d596b061d8cc2472e'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore()