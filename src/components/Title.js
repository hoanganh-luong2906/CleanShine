import React from "react";
const Title = (props) => {
  const color = props.color;
  const fontSize = props.fontSize;
  const fontWeight = props.fontWeight;
  const padding = props.padding;
  return (
    <div
      style={{
        color: color,
        fontSize: fontSize,
        fontWeight: fontWeight,
        fontFamily: "Work Sans",
        padding: padding,
      }}
      className="text-center"
    >
      {props.title}
    </div>
  );
};

export default Title;
