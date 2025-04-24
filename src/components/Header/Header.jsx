import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import ReactLogo from "../../assets/react.svg";
import cls from "./Header.module.css";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={cls.header}>
      <p onClick={() => navigate("/")}>
        <img src={ReactLogo} alt="react logo" />
        <span>ReactCards</span>
      </p>

      <div className={cls.headerButtons}>
        <Button onClick={() => navigate("/addquestion")}>Add</Button>
        <Button>Login</Button>
      </div>
    </header>
  );
};
