import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider.jsx";

export const useAuth = () => {
  return useContext(AuthContext);
};
