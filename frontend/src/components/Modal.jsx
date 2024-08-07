import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ closeModal, children }) => {
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        }
    }, []);

    return createPortal(
        <>
            <div className="fixed top-0 right-0 left-0 bottom-0 bg-white opacity-80" onClick={closeModal}></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-2/6 sm:w-8/12 sm:h-2/6 md:w-7/12 lg:w-5/12">
                {children}
            </div>
        </>,
        document.querySelector(".portalModelDiv")
    );
}

export default Modal;