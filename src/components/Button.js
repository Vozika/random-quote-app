import React from "react";

export default function Button(props) {

  return (
    <div>
        <button onClick={props.getbusy} className="button">{props.text}</button>
    </div>
  );
}