import React from "react";
import HeadingLine from "../components/HeadingLine";
import HeadingBar from "./HeadingBar";
import './Header.css'
const Header = () => {
  return (
    <>
      <nav>
        <HeadingLine />
        <HeadingBar />
      </nav>
    </>
  );
};

export default Header;
