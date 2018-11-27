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
import VisibilityIcon from '@material-ui/icons/Visibility';

import Task from '../../components/Task/Task';
import WorkflowToolbar from '../../components/Toolbar/Toolbar';
import FieldContainer from '../FieldContainer/FieldContainer';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
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
    backgroundColor: "rgb(244, 245, 247)",
    color: "rgb(66, 82, 110)"
  },
  rightDrawer: {
    minWidth: 300,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  grow: {
    flexGrow: 1,
  },
});

class WorkflowBuilder extends React.Component {
  state = {
    mobileOpen: false,
    activeTaskIndex : 0,
    taskCounter:0,
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
        let taskCounter = this.state.taskCounter;
        tasks.push({
          label : 'Task '+ taskCounter,
          fields : [],
          active : true
        })
        taskCounter++;
        this.setState(state => ({taskCounter: taskCounter, tasks: tasks, activeTaskIndex : (tasks.length-1)}));
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
          label : 'Due Date',
          value : new Date().toISOString().substr(0,10)
        })
        this.setState(state => {
          return { tasks : tasks};
        }
          );
      },

      deleteTask : (taskIndex) => {
        let tasks = [...this.state.tasks];
        let  activeTaskIndex = this.state.activeTaskIndex;
        activeTaskIndex = activeTaskIndex == taskIndex || activeTaskIndex == tasks.length -1 ? tasks.length -2:activeTaskIndex;
        tasks.splice(taskIndex,1);
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
            <Typography variant="display1" color="inherit" noWrap className={classes.grow}>
              Workflow Builder
            </Typography>
            <IconButton
              aria-owns="menu-appbar"
              aria-haspopup="true"
              color="inherit"
                >
                  <VisibilityIcon onClick={() => this.toggleDrawer("right", true, {
                    type : 'json',
                    tasks : this.state.tasks
                  })}/>
              </IconButton>
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
              <WorkflowToolbar showTaskToolabr={this.state.tasks.length <=0 } actions={this.actions}/>
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
        <Drawer anchor="right" 
               open={this.state.right} 
               onClose={()=>this.toggleDrawer('right', false, this.state.fieldRef)}
               classes={{
                paper: classes.rightDrawer,
              }}>
          <div
            tabIndex={0}
            role="button"
          >
            <FieldContainer fieldChange={this.fieldChange} fieldRef={this.state.fieldRef}/>
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