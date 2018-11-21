import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import Task from './components/Task/Task';


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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
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

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    activeTaskIndex : 0,
    tasks : [
    ]
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  addTask = () => {
    const tasks = this.state.tasks;
    tasks.push({
      label : 'Task ',
      fields : []
    })
    this.setState(state => ({ tasks: tasks}));
  };

  addAssignee = () => {
    const tasks = this.state.tasks;
    const fields = tasks[this.state.activeTaskIndex].fields
    fields.push({
      type : 'text',
      label : 'Assignee',
      value : 'Test Everything'
    })
    this.setState(state => {
      return { tasks : tasks};
    }
      );
  };

  addField = () => {
    const tasks = this.state.tasks;
    const fields = tasks[this.state.activeTaskIndex].fields
    fields.push({
      type : 'text',
      label : 'Comment',
      value : 'Test Comment'
    })
    this.setState(state => {
      return { tasks : tasks};
    }
      );
  };

  addDate = () => {
    const tasks = this.state.tasks;
    const fields = tasks[this.state.activeTaskIndex].fields
    fields.push({
      type : 'date',
      label : 'Due Date'
    })
    this.setState(state => {
      return { tasks : tasks};
    }
      );
  };

  updateActiveTaskIndex = (event) => {
    const index = parseInt(event.currentTarget.attributes["index"].value);
    this.setState(state => ({ activeTaskIndex: index}));
  }

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Add Task'].map((text, index) => (
            <ListItem button key={text}  onClick={this.addTask}>
              <LibraryAdd />
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
        <ListItem 
               button key="Add Assignee"
               onClick={this.addAssignee}>
               <PlaylistAdd />
              <ListItemText primary="Add Assignee" />
            </ListItem>
            <ListItem 
               button key="Add Field"
               onClick={this.addField}>
              <PlaylistAdd />
              <ListItemText primary="Add Field"/>
            </ListItem>
            <ListItem 
               button key="Add Due Date"
               onClick={this.addDate}>
               <PlaylistAdd />
              <ListItemText primary="Add Due Date"/>
            </ListItem>
        </List>
      </div>
    );

    const tasks = this.state.tasks.map((task, index)=>{
      return (
      <Task 
         onClick={this.updateActiveTaskIndex} 
         taskLabel={task.label+index} 
         fields={task.fields}
         key={index}
         index={index}
         />
      )
    })

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Workflow Builder
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swap with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {tasks}
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);