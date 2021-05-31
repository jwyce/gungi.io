import React from 'react';
import { MobileView } from 'react-device-detect';
import Alert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';

export const MobileWarning: React.FC<{}> = () => {
	return (
		<MobileView>
			<div style={{ position: 'fixed', top: '5em', width: '100%' }}>
				<Alert severity="warning" style={{ opacity: 0.9, padding: '0 5px' }}>
					<AlertTitle style={{ fontWeight: 600 }}>Mobile Detected</AlertTitle>
					Parts of the site do not support mobile or touch.
				</Alert>
			</div>
		</MobileView>
	);
};
