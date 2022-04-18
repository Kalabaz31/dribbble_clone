import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

import "./Modal.scss";
const Modal = ({ yPosition, openModal, children, onClose }) => {
  const modalRef = useRef();
  

  if (!openModal) return null;

  return ReactDOM.createPortal(
    <div
      className="app__modal"
      ref={modalRef}
      style={{
        position: "fixed",
        top: `${yPosition}px`,
      }}
    >
      <div
        className="overlay"
        onClick={onClose}
        style={{
          position: "fixed",
          top: `${yPosition}px`,
        }}
      >
        <button className="btnClose">
          <AiOutlineClose />
        </button>
      </div>

      <div className="modal-content">
        <button className="btnClose" onClick={onClose}>
          <AiOutlineClose />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
