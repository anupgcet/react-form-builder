
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function JSONViewer(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
      <AppBar position="static" color="primary">
           
            <Typography variant="h6" color="inherit">
                Task Configuration
            </Typography>
        </AppBar>
        <br/>

        <Typography component="p">
          {JSON.stringify(props.fieldRef.tasks)}
        </Typography>
      </Paper>
    </div>
  );
}

JSONViewer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JSONViewer);
