import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';

import MenuIcon from '@material-ui/icons/Menu';

import Task from '../../components/Task/Task';
import WorkflowToolbar from '../../components/Toolbar/Toolbar';
import FieldEditor from '../FieldEditor/FieldEditor';

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
  }
});

class WorkflowBuilder extends React.Component {
  state = {
    mobileOpen: false,
    activeTaskIndex : 0,
    tasks : [
    ],
    flow : [[]],
    fieldRef : null
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  actions = {
    addTask : () => {
        const tasks = this.state.tasks.map((item,index)=>{
          item.active = false;
          return item;
        });
        tasks.push({
          label : 'Task '+tasks.length,
          fields : [],
          active : true
        })
        this.setState(state => ({ tasks: tasks, activeTaskIndex : (tasks.length-1)}));
      },
    
      addAssignee : () => {
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
      },
    
      addField : () => {
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
      },
    
      addDate : () => {
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
      },

      deleteTask : (taskIndex) => {
        let tasks = [...this.state.tasks];
        tasks.splice(taskIndex,1);
        const  activeTaskIndex = tasks.length - 1;
          tasks = tasks.map((item,index)=>{
            if(activeTaskIndex == index){
              item.active = true;
            }else{
              item.active = false;
            }
            return item;
          });
        
        this.setState(state => ({ tasks: tasks, activeTaskIndex: activeTaskIndex}));
      },
  }


  updateActiveTaskIndex = (taskIndex) => {
    const tasks = this.state.tasks.map((item,index)=>{
      if(taskIndex == index){
        item.active = true;
      }else{
        item.active = false;
      }
      return item;
    });
    this.setState(state => ({ activeTaskIndex: taskIndex}));
  }

  toggleDrawer = (side, open, fieldRef) => {
    this.setState({
      [side]: open,
      fieldRef:fieldRef
    });
  };
  
  fieldChange = (event, fieldId, fieldRef, type) => {
    let tasks = [...this.state.tasks];
    let field = tasks[fieldRef.taskIndex];
    if('field' == type){
      field = field.fields[fieldRef.index];
    }
    field[fieldId] = event.currentTarget.value;
    this.setState(state => ({ tasks: tasks}));
  }
  
  render() {
    const { classes, theme } = this.props;

    const tasks = this.state.tasks.map((task, index)=>{
      return (
      <Task 
         onClick={this.updateActiveTaskIndex} 
         taskLabel={task.label} 
         fields={task.fields}
         fieldEditor={this.toggleDrawer}
         key={index}
         index={index}
         active={task.active}
         onDelete={this.actions.deleteTask}
         click={this.updateActiveTaskIndex}
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
            <Typography variant="display1" color="inherit" noWrap position="center">
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
              <WorkflowToolbar actions={this.actions}/>
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
               <WorkflowToolbar showTaskToolabr={this.state.tasks.length <=0 } actions={this.actions}/>
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {tasks}
        </main>
        <Drawer anchor="right" open={this.state.right} onClose={()=>this.toggleDrawer('right', false, this.state.fieldRef)}>
          <div
            tabIndex={0}
            role="button"
          >
            <FieldEditor fieldChange={this.fieldChange} fieldRef={this.state.fieldRef}/>
          </div>
        </Drawer>
      </div>
    );
  }
}

WorkflowBuilder.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(WorkflowBuilder);