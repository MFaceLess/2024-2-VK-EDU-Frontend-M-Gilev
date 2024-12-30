import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


export function PublicRoute ({children}) {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('access') && localStorage.getItem('refresh'));

    useEffect(() => {
        const interval = setInterval(() => {
          const auth = localStorage.getItem("access") && localStorage.getItem("refresh");
          setIsAuth(auth);
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);

    if (isAuth) {
        return <Navigate to='/' replace/>;
    }

    return children;
}