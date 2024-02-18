import { NavLink } from "react-router-dom";
import classNames from "classnames";
import "./Header.scss";


export const Header = () => {
  const getLinkClassNav = ({ isActive }: { isActive: boolean }) =>
    classNames("header__nav-link", { "header__nav--is-active": isActive });

  return (
    <header className="header pb-2.5">
      <nav className="header__nav">
        <NavLink className={getLinkClassNav} to={"/"}>
          Home
        </NavLink>
        <NavLink className={getLinkClassNav} to={"/articles"}>
          Articles
        </NavLink>
        <NavLink className={getLinkClassNav} to={"/article-form"}>
          Create article
        </NavLink>
      </nav>
    </header>
  );
};
