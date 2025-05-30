import React from 'react'
import {Route, Redirect} from 'react-router-dom';

const GlobalProtectedRoute = ({component: Component, ...rest}) => {
  let token = ''
  if (sessionStorage.getItem('token') !== null) {
    token = sessionStorage.getItem('token')
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props}/>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {from: props.location},
            }}/>
        )}
    />
  )
}

export default GlobalProtectedRoute
