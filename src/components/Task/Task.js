import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Field from '../Field/Field';

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
      },
      grow: {
        flexGrow: 1,
      },
  });

class Task extends Component{
    render(){
        const { classes, theme } = this.props;
        const color = this.props.active ? "primary" : "default";
        const fieldRef = {
          label : this.props.taskLabel,
          taskIndex : this.props.index,
          type: "task"
        }
        return(
            <FormControl index={this.props.index} className={classes.formControl}>
            
            <AppBar position="static" color={color}>
            <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow} onClick={
              () => {this.props.onClick(this.props.index);this.props.fieldEditor('right', true, fieldRef);}
              }>
            {this.props.taskLabel}
            </Typography>
              <IconButton
              aria-owns="menu-appbar"
              aria-haspopup="true"
              color="inherit"
                >
                  <DeleteForeverIcon onClick={() => this.props.onDelete(this.props.index)}/>
              </IconButton>
              </Toolbar>
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
              defaultValue={1}
              helperText="Please select Task Sequence"
              margin="normal"
              onClick={()=>this.props.onClick(this.props.index)}
          >
            <option value="" />
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
        </TextField>
            <Field fields={this.props.fields} onDelete={this.props.onDelete}  fieldChange={this.props.fieldChange} fieldEditor={this.props.fieldEditor} updateActiveIndex={this.props.onClick} taskIndex={this.props.index}/>
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