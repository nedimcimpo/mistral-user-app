import React from 'react';

type ButtonProps = {
	label: string;
	onClick?: () => void;
	className?: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
	disabled?: boolean;
};

const defaultProps = {
	type: 'button'
};

export default function Button({ label, onClick, type, className, disabled }: ButtonProps) {
	return (
		<button className={`h-10 rounded px-4 py-2 bg-cyan-900 hover:bg-cyan-800 ${className}`} onClick={onClick} type={type} disabled={disabled}>
			{label}
		</button>
	);
}

Button.defaultProps = defaultProps;
