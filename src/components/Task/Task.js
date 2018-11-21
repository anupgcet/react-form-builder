import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Field from '../Field/Field'
const styles = theme => ({
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
      border: '1px solid #E7E8EA'
    },
    margin: {
      margin: theme.spacing.unit * 2,
    },
    padding: {
      padding: `0 ${theme.spacing.unit * 2}px`,
    },
  });

class Task extends Component{
    render(){
        const { classes, theme } = this.props;
        return(
            <FormControl index={this.props.index} className={classes.formControl} onClick={this.props.onClick}>
            <AppBar position="static" className={classes.margin}>
              <Tab label={this.props.taskLabel} />
            </AppBar>
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