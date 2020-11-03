import React from 'react';
import propTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import ProgramItem from '../ProgramItem/ProgramItem';

const ProgramList = ({ programs }) => {
	return (
		<Grid container spacing={2} data-test="component-program-list">
			{programs.map(program => {
				return (
					<Grid key={program.flight_number} item xs={12} lg={3}>
						<ProgramItem program={program} />
					</Grid>
				)
			})}
		</Grid>
	)
}

ProgramList.propTypes = {
	programs: propTypes.array.isRequired
}

export default ProgramList;