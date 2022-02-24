import React from 'react';

import './Switch.css';

type ToggleProps = {
	name: string;
	register: any;
};

export default function Switch({ name, register }: ToggleProps) {
	return (
		<div data-spec="switch">
			<label className="switch">
				<input type="checkbox" name={name} {...register(name)} />
				<span className="slider round" />
			</label>
		</div>
	);
}
