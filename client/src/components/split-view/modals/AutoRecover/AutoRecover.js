import React, { useState } from "react"
import './AutoRecovery.css';
import Button from "react-bootstrap/Button";
function AutoRecover(props) {
  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <h3>Data has been found!</h3>
        <h3>Do you wish to continue?</h3>
        { props.children }
      </div>
    </div>
  ):"";
}

export default AutoRecover;
