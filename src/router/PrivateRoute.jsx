import { Navigate } from "react-router-dom";
import useAuthValue from "../hooks/useAuthValue";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuthValue();

  if (loading) {
    return <h3>Loading</h3>;
  }

  if (!user) {
    return <Navigate to="/signIn"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
