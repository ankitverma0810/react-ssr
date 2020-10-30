import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    activeButton: {
        backgroundColor: theme.palette.primary.dark
    },
    divider: {
        marginBottom: '15px'
    },
    sections: {
        paddingBottom: '20px'
    },
    headings: {
        padding: '10px 0',
        textAlign: 'center'
    }
}));

const Filter = (props) => {
    const { launchYear, setLaunchYear, successfulLaunch, setSuccessfulLaunch, successfulLanding, setSuccessfulLanding } = props;
    const classes = useStyles();
    const launchYears = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

    return (
        <React.Fragment>
            <Typography variant="h4">Filters</Typography>
            <div className={classes.sections}>
                <Typography variant="body1" className={classes.headings}>Launch Year</Typography>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    {launchYears.map((year) => {
                        return (
                            <Grid item xs={6} className={"text-center"} key={year}>
                                <Button
                                    variant="contained"
                                    className={launchYear === year ? classes.activeButton : null}
                                    color="primary"
                                    onClick={(event) => setLaunchYear((year === launchYear) ? null : year)}>
                                    {year}</Button>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>

            <div className={classes.sections}>
                <Typography variant="body1" className={classes.headings}>Successful Launch</Typography>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    <Grid item xs={6} className={"text-center"}>
                        <Button
                            variant="contained"
                            className={successfulLaunch === true ? classes.activeButton : null}
                            color="primary"
                            onClick={(event) => setSuccessfulLaunch((successfulLaunch === true) ? null : true)}>
                            True</Button>
                    </Grid>
                    <Grid item xs={6} className={"text-center"}>
                        <Button
                            variant="contained"
                            className={successfulLaunch === false ? classes.activeButton : null}
                            color="primary"
                            onClick={(event) => setSuccessfulLaunch((successfulLaunch === false) ? null : false)}>
                            False</Button>
                    </Grid>
                </Grid>
            </div>

            <div className={classes.sections}>
                <Typography variant="body1" className={classes.headings}>Successful Landing</Typography>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    <Grid item xs={6} className={"text-center"}>
                        <Button
                            variant="contained"
                            className={successfulLanding === true ? classes.activeButton : null}
                            color="primary"
                            onClick={(event) => setSuccessfulLanding((successfulLanding === true) ? null : true)}>
                            True</Button>
                    </Grid>
                    <Grid item xs={6} className={"text-center"}>
                        <Button
                            variant="contained"
                            className={successfulLanding === false ? classes.activeButton : null}
                            color="primary"
                            onClick={(event) => setSuccessfulLanding((successfulLanding === false) ? null : false)}>
                            False</Button>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}

export default Filter;