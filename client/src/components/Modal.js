import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom'
import styled from 'styled-components';

const Container = styled.div`
	margin: 2rem auto;
	width: 30%;
	background: #dee2e5;
	display: flex;
	justify-content: center;
	border-radius: 10px;
	@media only screen and (max-width: 1080px) {
		width: 50%;
	}
	@media only screen and (max-width: 768px) {
		width: 65%;
	}
	@media only screen and (max-width: 600px) {
		width: 95%;
	}
`;
const ModalCover = styled.aside`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
   z-index: 10;
  background: rgba(0, 0, 0, 0.8);
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 2.5em 1.5em 1.5em 1.5em;
  background-color: #fff;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  border-radius: 10px;
  @media screen and (min-width: 500px) {
    left: 50%;
    top: 50%;
    height: auto;
    transform: translate(-50%, -50%);
    max-width: 30em;
    max-height: calc(100% - 1em);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5em;
  line-height: 1;
  background: #f6f6f7;
  border: 0;
  box-shadow: 0;
  cursor: pointer;
  svg {
    width: 25px;
    height: 25px;
    fill: transparent;
    stroke: black;
    stroke-linecap: round;
    stroke-width: 2;
  }
`;


function useClickOutside(ref, onModalClose) {
  function handleStatusChange(e) {
    if (!ref.current.contains(e.target)) {
      onModalClose();
    }
  }
  document.addEventListener('click', handleStatusChange)
  return function cleanup() {
    document.removeEventListener('click', handleStatusChange)
  };
}

const Modal = ({ onModalClose, onKeyDown, children}) => {

  const modalRef = useRef(null);

  useEffect(() => useClickOutside(modalRef, onModalClose));

    return createPortal(
      <Container ref={modalRef}>
        <ModalCover
          tag="aside"
          role="dialog"
          tabIndex="-1"
          aria-modal="true"
          className="modal-cover"
          onKeyDown={onKeyDown}
        >
          <ModalContainer className="modal-area">
          <CloseButton
            aria-label="Close Modal"
            className="modal-close"
            onClick={onModalClose}
          >
            <svg viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </CloseButton>
              {children}
          </ModalContainer>
        </ModalCover>
      </Container>,
      document.body
    );
  };

export default Modal
