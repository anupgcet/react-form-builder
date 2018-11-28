import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

import AutoCompleteField from '../Field/AutoCompleteField';

const styles = theme => ({
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 300,
      border: '1px solid #E7E8EA'
    },
    formGroup: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minwidth: 270,
      },
      textField: {
        margin: theme.spacing.unit,
        minwidth: 270,
      }
  });

class FieldEditor extends Component{
    state = {
        create: true,
        approve: false,
        complete: false,
        reassign:true
      };
    
      handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
      };

    render(){
        const { classes, theme } = this.props;
        const { create, approve, complete, reassign } = this.state;
        const isField = this.props.fieldRef.type === 'field';

        let valueField = "";
        if(this.props.fieldRef.type === 'field'){
          switch(this.props.fieldRef.fieldType){
            case 'text' :
            valueField =  (
              <TextField
                 id="value"
                 label="Value"
                 className={classes.textField}
                 defaultValue={this.props.fieldRef.value}
                 onChange={(e)=>this.props.fieldChange(e, "value", this.props.fieldRef, this.props.fieldRef.type)}
                 margin="normal"
               />
           );
           break;
           case 'date' :
           valueField = (<TextField
                 id="value"
                 label="Value"
                 type="date"
                 className={classes.textField}
                 defaultValue={this.props.fieldRef.value}
                 onChange={(e)=>this.props.fieldChange(e, "value", this.props.fieldRef, this.props.fieldRef.type)}
                 margin="normal"
               />)
               break;
           case 'autocomplete' :
           valueField =  (
            <AutoCompleteField field={this.props.fieldRef} fieldChange={this.props.fieldChange}/>
           )
            break;
           case 'default':
            return null;
          }
        }

        return(
            <FormControl index={this.props.index} className={classes.formControl} onClick={this.props.onClick}>
            <AppBar position="static">
              <Tab label={"Edit "+this.props.fieldRef.label+(isField?" Field":" Settings")} />
            </AppBar>
            <TextField
                 id="label"
                 label="Label"
                 className={classes.textField}
                 defaultValue={this.props.fieldRef.label}
                 onChange={(e)=>this.props.fieldChange(e, "label", this.props.fieldRef, this.props.fieldRef.type)}
                 margin="normal"
               />
             {valueField}
               
            <FormLabel component="legend">Appearance</FormLabel>
          <FormGroup className={classes.formGroup}>
            <FormControlLabel
              control={
                <Checkbox checked={create} onChange={this.handleChange('create')} value="create" color="primary"/>
              }
              label="Create"
            />
            <FormControlLabel
              control={
                <Checkbox checked={approve} onChange={this.handleChange('approve')} value="approve" color="primary"/>
              }
              label="Approve"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={complete}
                  onChange={this.handleChange('complete')}
                  color="primary"
                  value="complete"
                />
              }
              label="Complete"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reassign}
                  color="primary"
                  onChange={this.handleChange('reassign')}
                  value="reassign"
                />
              }
              label="Reassign"
            />
          </FormGroup>
        </FormControl>
        )
    }
}

FieldEditor.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
  };

export default withStyles(styles, { withTheme: true })(FieldEditor);;