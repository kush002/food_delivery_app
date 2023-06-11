import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

export const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

export const ModalOverlay = (props) => {
  return (
    <div
      className={props.class ? props.class : classes.modal}
      style={props.style}
    >
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay class={props.class} style={props.style}>
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
