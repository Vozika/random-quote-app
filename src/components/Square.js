import React from "react";

export default function Square(props) {
  return (
    <div>
      <div className={props.squarebgcolor + " square"}  onClick={props.getbusy}></div>
    </div>
  );
}
