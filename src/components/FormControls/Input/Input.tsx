import React from 'react';

type InputProps = {
	name: string;
	label?: string;
	type: string;
	placeholder?: string;
	register: any;
	disabled?: boolean;
	error?: any;
	onChange?: (event: any) => void
};

const defaultProps = {
	type: 'text',
	disabled: false,
	placeholder: ''
};

export default function Input({ name, label, type, placeholder, register, disabled, error, onChange }: InputProps) {
	return (
		<div className="flex flex-col mb-8 relative">
			{label && (
				<label htmlFor={name} className="text-xs mb-1.5 uppercase">
					{label}
				</label>
			)}
			<input
				{...register(name)}
				type={type}
				placeholder={placeholder}
				disabled={disabled}
				className="h-10 rounded bg-neutral-800 p-4 border border-transparent outline-none focus:bg-gray-800"
				onChange={onChange}
			/>
			{error && <div className="absolute text-xs -bottom-4">{error.message}</div>}
		</div>
	);
}

Input.defaultProps = defaultProps;
