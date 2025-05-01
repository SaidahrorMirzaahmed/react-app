import { Outlet } from "react-router-dom";
import cls from "./MainLayout.module.css";
import { Header } from "../Header/Header";
import { ToastContainer } from "react-toastify";

export const MainLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className={cls.mainLayout}>
        <Header />
        <div className={cls.mainWrapper}>
          <Outlet />
          <footer className={cls.footer}>
            React Question Cards Application | {currentYear} <br />
            by Sayidahror Mirzaakhmedov
          </footer>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
