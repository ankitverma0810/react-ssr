import React from 'react';

import Grid from '@material-ui/core/Grid';
import ProgramItem from '../ProgramItem/ProgramItem';

const ProgramList = ({ programs }) => {
    return (
        <Grid container spacing={2}>
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

export default ProgramList;