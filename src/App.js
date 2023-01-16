import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import ToDoList from './Components/ToDoList/ToDoList'
import { UserDataContextProvider } from './AppContext'
import SignUp from './Components/Auth/SignUp'
import Login from './Components/Auth/Login'
import PrivateRoute from './Components/PrivateRoute'
import ResetPass from './Components/ResetPass'

function App() {

  return (
    <HashRouter>
      <UserDataContextProvider>
        <Routes>
          <Route path='/' exact element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/resetPass' element={<ResetPass />} />
          <Route path='/todos' element={<PrivateRoute><ToDoList></ToDoList></PrivateRoute>} />
        </Routes>
      </UserDataContextProvider>
    </HashRouter>
  )
}

export default App