import * as React from 'react';
import { Component, ErrorInfo, ReactNode } from 'react';
import Button from 'components/Button';

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
	handleRedirect = () => {
		window.location.assign('/');
	};

	public state: State = {
		hasError: false
	};

	public static getDerivedStateFromError(_: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	public render() {
		const { hasError } = this.state;
		if (hasError) {
			return (
				<div className="w-screen h-screen flex justify-center items-center flex-col">
					<div>Sorry.. there was an error</div>
					<div className='mt-20'>
						<Button label="Reutrn to Home" onClick={this.handleRedirect} />
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
