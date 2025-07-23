import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";

const useAuthValue = () => {
  return useContext(AuthContext);
};

export default useAuthValue;
