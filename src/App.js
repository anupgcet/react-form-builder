import React, {Component} from 'react';

import WorkflowBuilder from './container/WorkflowBuilder/WorkflowBuilder';
import FlowChart from './container/FlowChart/FlowChart';

class App extends Component {
  render(){
    return(
      <div>
      <WorkflowBuilder/>
      {/* <FlowChart/> */}
      </div>
    )
  }
};

export default App;