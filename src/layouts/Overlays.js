import React from "react";
import classes from "./Overlays.module.css";
const Overlays = (props) => {
  return <div className={classes.backGround}>{props.children}</div>;
};

export default Overlays;
