import React from 'react';

type SelectProps = {
	register: any;
	options: {
		[key: string]: any;
	}[];
	name: string;
	label?: string;
	onChange?: (event: any) => void;
	firstOption?: boolean;
	firstOptionLabel?: string;
	defaultValue?: any;
};

export default function Select({ register, options, name, label, onChange, defaultValue }: SelectProps) {
	return (
		<div className="flex flex-col uppercase mb-8">
			{label && (
				<label htmlFor={name} className="text-xs mb-1.5 uppercase">
					{label}
				</label>
			)}
			<select
				{...register(name)}
				onChange={onChange}
				className='className="h-10 rounded bg-neutral-800 p-2 border border-transparent outline-none focus:bg-gray-800"'
				defaultValue={defaultValue}
			>
				{defaultValue && (
					<option disabled value="Select">
						{defaultValue}
					</option>
				)}
				{options.map((item) => (
					<option key={item.value} value={item.value}>
						{item.label || item.value}
					</option>
				))}
			</select>
		</div>
	);
}
