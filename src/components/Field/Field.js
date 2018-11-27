import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 220,
    }
  });

class Field extends Component{
    render(){
        const { classes, theme } = this.props;
        const fields = this.props.fields.map((item,index)=>{
            switch(item.type){
              case 'text' :
              return (
               
               <TextField
                 id="standard-name"
                 key={index}
                 label={item.label}
                 className={classes.textField}
                 defaultValue={item.value}
                 margin="normal"
                 onClick= { () => this.props.click(this.props.taskIndex)}
               />
             );
             case 'date' :
              return (
               
               <TextField
                 id="standard-name"
                 key={index}
                 label={item.label}
                 type="date"
                 className={classes.textField}
                 defaultValue={new Date().toISOString().substr(0,10)}
                 margin="normal"
                 onClick= { () => this.props.click(this.props.taskIndex)}
               />
             );

             case 'default':
              return null;
            }
             return null;
           })
           return fields;
    }
}
Field.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
  };
export default withStyles(styles, { withTheme: true })(Field);

