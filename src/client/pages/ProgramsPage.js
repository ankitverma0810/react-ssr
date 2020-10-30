import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { getPrograms } from '../store/actions/index';
import Filter from '../components/Filter/Filter';
import ProgramList from '../components/Program/ProgramList/ProgramList';

const useStyles = makeStyles((theme) => ({
	heading: {
		paddingTop: '10px'
	},
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary
	}
}));

const ProgramsPage = ({ programs, getPrograms, location }) => {
	const classes = useStyles();
	const [launchYear, setLaunchYear] = React.useState();
    const [successfulLaunch, setSuccessfulLaunch] = React.useState();
    const [successfulLanding, setSuccessfulLanding] = React.useState();

	useEffect(() => {
		let params = { limit: process.env.LIMIT, launch_year: launchYear, launch_success: successfulLaunch, land_success: successfulLanding };
		getPrograms(params);
	}, [launchYear, successfulLaunch, successfulLanding]);

	/* Helmet is used to set titles and meta tags for SEO friendly applications.
	First use Helmet tag here and then in renderer.js file incase of server side rendering */
	const head = () => {
		return (
			<Helmet>
				<title>{`SpaceX Launch Programs`}</title>
				{/* open graph protocol attribute for social media websites. Refer: https://ogp.me */}
				<meta property="og:title" content="SpaceX Launch Programs" />
			</Helmet>
		)
	}

	return (
		<React.Fragment>
			{head()}
			<h1 className={classes.heading}>SpaceX Launch Programs</h1>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6} lg={3}>
					<Paper className={classes.paper}>
						<Filter
							launchYear={launchYear}
							setLaunchYear={setLaunchYear}
							successfulLaunch={successfulLaunch}
							setSuccessfulLaunch={setSuccessfulLaunch}
							successfulLanding={successfulLanding}
							setSuccessfulLanding={setSuccessfulLanding} />
					</Paper>
				</Grid>

				<Grid item xs={12} sm={6} lg={9}>
					<ProgramList programs={programs} />
				</Grid>
			</Grid>
		</React.Fragment>
	)
};

const mapStateToProps = ({ programs }) => {
	return { programs: programs.data }
}

const loadData = (store) => {
	return store.dispatch(getPrograms({ limit: process.env.LIMIT }));
}

export default {
	component: connect(mapStateToProps, { getPrograms })(ProgramsPage),
	loadData
};