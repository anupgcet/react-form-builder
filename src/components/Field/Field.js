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
    myRef = React.createRef();
    render(){
        const { classes, theme } = this.props;
        const fields = this.props.fields.map((item,index)=>{
          const fieldRef = {
            label : item.label,
            taskIndex : this.props.taskIndex,
            index : index,
            value : item.value,
            type: "field",
            fieldType:item.type
          }

          const fieldClick = () =>{
            this.props.fieldEditor('right', true, fieldRef);
            this.props.updateActiveIndex(this.props.taskIndex);
          }
            switch(item.type){
              case 'text' :
              return (
               <TextField
                 key={index}
                 label={item.label}
                 className={classes.textField}
                 onClick={fieldClick}
                 value={item.value}
                 margin="normal"
               />
             );
             case 'date' :
              return (
               
               <TextField
                 key={index}
                 label={item.label}
                 type="date"
                 className={classes.textField}
                 onClick={fieldClick}
                 value={item.value}
                 margin="normal"
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