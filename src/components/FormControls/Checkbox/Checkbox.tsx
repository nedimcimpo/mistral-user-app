import React from 'react';

import './Checkbox.css'

type CheckboxProps = {
	name: string;
	label: string;
	id?: string;
	register: any;
	value: any
};

export default function Checkbox({ label, name, register, id, value }: CheckboxProps) {
	return (
		<div data-spec="checkbox" className="flex">
			<label htmlFor={id} className="flex items-center mb-2 cursor-pointer">
				<input
					type="checkbox"
					name={name}
					id={id}
					value={value}
					{...register(name)}
					className="checkbox appearance-none h-6 w-6 cursor-pointer mr-2 rounded bg-neutral-800 checked:bg-gray-700"
				/>
				{label}
			</label>
		</div>
	);
}
