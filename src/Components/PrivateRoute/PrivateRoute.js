import {Route,Redirect} from 'react-router-dom';
import React, {useContext} from 'react';
import {UserContext} from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    
    const [loggedinUser,setLoggedinUser] = useContext(UserContext);
    console.log(setLoggedinUser);
    return (
          <Route
         {...rest}
         render={({ location }) =>
          loggedinUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />  
    );
};

export default PrivateRoute;