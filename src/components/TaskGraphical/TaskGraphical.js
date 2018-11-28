import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
    minWidth: 200
  },
});

function handleDelete() {
  alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick() {
  alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

function OutlinedChips(props) {
  const { classes } = props;
  const fieldRef = {
    label : props.taskLabel,
    taskIndex : props.index,
    type: "task"
  }
  return (
    <div className={classes.root}>
      <Chip
        icon={<FaceIcon />}
        label={props.taskLabel}
        clickable
        className={classes.chip}
        color={props.active?"primary":"default"}
        onDelete={() => props.onDelete(props.index)}
        onClick={
            () => {props.onClick(props.index);props.fieldEditor('right', true, fieldRef);}
            }
        variant="outlined"
      />
    </div>
  );
}

OutlinedChips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedChips);
