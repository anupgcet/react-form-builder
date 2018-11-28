
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import {prettifyJSON} from '../../util/jsonPrettier/jsonPrettier';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: "rgb(244, 245, 247)",
    color: "rgb(66, 82, 110)"
  },
});

function JSONViewer(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Paper  elevation={1}>
      <AppBar position="static" color="primary">
           
            <Typography variant="h6" color="inherit">
                Task Configuration
            </Typography>
        </AppBar>
        <br/>
        <pre>
        {prettifyJSON(props.fieldRef)}
        </pre>

      </Paper>
    </div>
  );
}

JSONViewer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JSONViewer);
