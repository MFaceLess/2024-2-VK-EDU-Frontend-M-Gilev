import { Navigate } from "react-router-dom";


export function PrivateRoute ({children}) {
    if (localStorage.getItem('access') && localStorage.getItem('refresh')) {
        return children;
    }
    return <Navigate to='/auth' replace/>;
}