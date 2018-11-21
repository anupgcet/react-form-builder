import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';

import Field from '../Field/Field';
import TaskCard from '../TaskCard/TaskCard';

const styles = theme => ({
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 250,
      border: '1px solid #E7E8EA'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 220,
      }
  });

class Task extends Component{
    render(){
        const { classes, theme } = this.props;
        return(
            <FormControl index={this.props.index} className={classes.formControl} onClick={this.props.onClick}>
            <AppBar position="static">
              <Tab label={this.props.taskLabel} />
            </AppBar>
            <TextField
          id="standard-select-currency-native"
          select
          label="Task Sequence"
          className={classes.textField}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select Task Sequence"
          margin="normal"
        >
          <option value="" />
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
        </TextField>
            <Field fields={this.props.fields}/>
            </FormControl>
        )
    }
}

Task.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
  };

export default withStyles(styles, { withTheme: true })(Task);;