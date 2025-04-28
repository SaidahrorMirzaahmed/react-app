import cls from "./Badge.module.css";

export const Badge = ({ children, variant }) => {
  return <div className={`${cls.badge} ${cls[variant]}`}>{children}</div>;
};
