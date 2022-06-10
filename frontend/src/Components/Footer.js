import React from "react";

const Footer = (props) => {
  const count = props.count;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#ddd",
        padding: "2px 0px 2px 0px",
        height: 50,
        display: "flex",
        justifyContent: "end",
      }}
    >
      <h4 style={{ fontSize: 14, paddingRight: "2rem" }}>
        Total Number of Orders: {count}
      </h4>
    </div>
  );
};

export default Footer;
