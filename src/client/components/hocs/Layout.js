import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: '0 15px'
	}
}));

const Layout = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{props.children}
			<p className={"text-center"}>Developed by: {process.env.AUTHOR}</p>
		</div>
	)
}

export default Layout;