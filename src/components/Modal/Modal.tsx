import React, { ReactNode, useEffect, useRef } from 'react';

import './Modal.css';

/* ********** MODAL WRAPPER ********** */
interface ModalProps {
	children: ReactNode;
	show: boolean;
	closeModal: () => void;
}

export function Modal({ children, show, closeModal }: ModalProps) {
	const refModal = useRef(null);

	useEffect(() => {
		if (show) {
			document.body.classList.add('fixed');
		}
		return () => {
			document.body.classList.remove('fixed');
		};
	}, [show]);

	useEffect(() => {
		const timer = setTimeout(() => {
			// @ts-ignore
			refModal.current.focus();
		}, 100);
		return () => clearTimeout(timer);
	}, [show]);

	const handleKeyDown = (event: any) => {
		if (event.key === 'Escape') {
			closeModal();
		}
	};

	return (
		<div className={`modal-wrapper ${show ? 'modal-wrapper-opened' : ''}`} onMouseDown={closeModal} role="presentation" data-testid="modal">
			<div
				ref={refModal}
				tabIndex={0}
				role="button"
				onKeyDown={handleKeyDown}
				className={`modal ${show ? 'modal-opened' : ''}`}
				onMouseDown={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="content">{children}</div>
			</div>
		</div>
	);
}

/* ********** MODAL WRAPPER ********** */

/* ********** MODAL HEADER ********** */

interface ModalHeaderProps {
	title: string;
}

export function ModalHeader({ title }: ModalHeaderProps) {
	return <div className="modal-header">{title}</div>;
}

/* ********** MODAL HEADER ********** */

/* ********** MODAL BODY ********** */

interface ModalBodyProps {
	children: ReactNode;
	show: boolean;
}

export function ModalBody({ show, children }: ModalBodyProps) {
	const refModalBody = useRef(null);

	useEffect(() => {
		if (show) {
			setTimeout(() => {
				// @ts-ignore
				refModalBody.current.scrollTop = 0;
			}, 250);
		}
	}, [show]);

	return (
		<div className="modal-body" ref={refModalBody}>
			{children}
		</div>
	);
}

/* ********** MODAL BODY ********** */

/* ********** MODAL FOOTER ********** */

interface ModalFooterProps {
	children: ReactNode;
}

export function ModalFooter({ children }: ModalFooterProps) {
	return <div className="modal-footer">{children}</div>;
}
