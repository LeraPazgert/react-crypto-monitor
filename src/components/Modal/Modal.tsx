import React from "react";
import "./Modal.scss";

interface ModalProps {
    active: boolean
    setActive: (active: boolean) => void
    children: React.ReactNode,
}

const Modal = ({ active, setActive, children }: ModalProps) => {
    return (
        <div className={active ? "modal active" : "modal"}>
            <button onClick={() => setActive(false)} className='close-button'>X</button>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;