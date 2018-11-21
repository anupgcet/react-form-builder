import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
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
            </List>
            <Divider />
            <Hidden smUp={this.props.showTaskToolabr} implementation="css">
            <List>
                <ListItem 
                   button key="Add Assignee"
                   onClick={this.props.actions.addAssignee}>
                   <PlaylistAdd />
                  <ListItemText primary="Add Assignee" />
                </ListItem>
                <ListItem 
                   button key="Add Field"
                   onClick={this.props.actions.addField}>
                  <PlaylistAdd />
                  <ListItemText primary="Add Field"/>
                </ListItem>
                <ListItem 
                   button key="Add Due Date"
                   onClick={this.props.actions.addDate}>
                   <PlaylistAdd />
                  <ListItemText primary="Add Due Date"/>
                </ListItem>
            </List>
            </Hidden>
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