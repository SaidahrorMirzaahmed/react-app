import { useLocation, useNavigate } from "react-router-dom";
import cls from "./ForbiddenPage.module.css";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

export const ForbiddenPage = () => {
  const { isAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  console.log("location", location);

  useEffect(() => {
    if (isAuth) {
      navigate(location.state.from || "/");
    }
  }, [isAuth]);

  return <h2 className={cls.title}>Page is forbidden</h2>;
};
