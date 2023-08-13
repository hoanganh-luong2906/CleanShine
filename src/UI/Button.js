import React from "react";

const Button = (props) => {
  const backgroundColor = props.backgroundColor;
  const borderRadius = props.borderRadius;
  const padding = props.padding;
  return (
    <button
      style={{
        backgroundColor: backgroundColor,
        border: "none",
        borderRadius: borderRadius,
        padding: padding,
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
