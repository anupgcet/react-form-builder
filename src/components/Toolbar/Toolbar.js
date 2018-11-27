import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  }
});

class Toolbar extends Component{
    render(){
        const { classes, theme } = this.props;

        const toolbar = (
          <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
              {['Add Task'].map((text, index) => (
                <ListItem button key={text}  onClick={this.props.actions.addTask}>
                  <LibraryAdd />
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            <Collapse in={!this.props.showTaskToolabr} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem 
                   button key="Add Assignee"
                   onClick={this.props.actions.addAssignee}
                   className={classes.nested}>
                   <PlaylistAdd />
                  <ListItemText primary="Add Assignee" />
                </ListItem>
                <ListItem 
                   button key="Add Field"
                   onClick={this.props.actions.addField}
                   className={classes.nested}>
                  <PlaylistAdd />
                  <ListItemText primary="Add Field"/>
                </ListItem>
                <ListItem 
                   button key="Add Due Date"
                   onClick={this.props.actions.addDate}
                   className={classes.nested}>
                   <PlaylistAdd />
                  <ListItemText primary="Add Due Date"/>
                </ListItem>
            </List>
            </Collapse>
            </List>
          </div>
        );
        return toolbar;
    }
}

Toolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
  };

export default withStyles(styles, { withTheme: true })(Toolbar);;