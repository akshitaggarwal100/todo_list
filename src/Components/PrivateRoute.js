import React from 'react'
import { useUserDataContext } from '../AppContext'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  const { currentUser } = useUserDataContext()

  if (currentUser) {
    return children
  }
  else {
    return <Navigate to='/login' />
  }

}