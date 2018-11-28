import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import AutoCompleteField from './AutoCompleteField'

const styles = theme => ({
    textField: {
      margin: theme.spacing.unit,
      minWidth: 220,
    },
    root : {
      display :"inline-flex"
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
            fieldType:item.type,
            autoComplete: item.autoComplete
          }

          const fieldClick = () =>{
            this.props.fieldEditor('right', true, fieldRef);
            this.props.updateActiveIndex(this.props.taskIndex);
          }
            switch(item.type){
              case 'text' :
              case 'autocomplete' :
              return (
                <div className={classes.root}>
               <TextField
                 key={index}
                 label={item.label}
                 className={classes.textField}
                 onClick={fieldClick}
                 value={item.value}
                 margin="normal"
               />
                <IconButton
              aria-owns="menu-appbar"
              aria-haspopup="true"
              color="inherit"
                >
                  <DeleteForeverIcon onClick={() => this.props.onDelete(this.props.taskIndex, index)}/>
              </IconButton>
               </div>
             );
             case 'date' :
             return (
               <div className={classes.root}>
              <TextField
                key={index}
                label={item.label}
                className={classes.textField}
                onClick={fieldClick}
                value={new Date(item.value).toLocaleDateString()}
                margin="normal"
              />
               <IconButton
             aria-owns="menu-appbar"
             aria-haspopup="true"
             color="inherit"
               >
                 <DeleteForeverIcon onClick={() => this.props.onDelete(this.props.taskIndex, index)}/>
             </IconButton>
              </div>
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