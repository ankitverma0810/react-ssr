import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary
    }
}));

const ProgramItem = ({ program }) => {
    const classes = useStyles();
    const [dense, setDense] = React.useState(true);

    const renderMissions = () => {
        if(program.mission_id.length) {
            return program.mission_id.map(id => {
                return (
                    <ListItem key={id}>
                        <ListItemText
                            primary={id}
                        />
                    </ListItem>
                )
            });
        } else {
            return <ListItem><ListItemText primary={'No Mission Found!'} /></ListItem>
        }
    }

    return (
        <Paper className={classes.paper}>
            <img src={program.links.mission_patch_small} className={"w-100"} />
            <Typography variant="h4" color="secondary" style={{ paddingTop: '15px' }}>{program.mission_name} #{program.flight_number}</Typography>
            <p><strong>Mission Ids:</strong></p>
            <List dense={dense} className={"padding-0"}>
                {renderMissions()}
            </List>
            <p><strong>Launch Year:</strong> {program.launch_year}</p>
            <p><strong>Successful Launch:</strong> {JSON.stringify(program.launch_success)}</p>
            <p><strong>Successful Landing:</strong> {JSON.stringify(program.land_success)}</p>
        </Paper>
    )
};

export default ProgramItem;