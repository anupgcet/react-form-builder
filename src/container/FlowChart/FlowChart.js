import React, {Component} from 'react';
import FlowChart from 'flow-chart'

const flowChart = () => {
    const diagram = {
        items: [
          {
            id: 'a',
            type: 'decision',
            x: 250,
            y: 120,
            width: 100
          },
          {
            id: 'b',
            type: 'process',
            x: 250,
            y: 20
          },
          {
            id: 'c',
            type: 'terminator',
            x: 20,
            y: 20,
            height: 20,
            width: 20
          }
      
        ],

        style: { backgroundColor: 'azure' },
        height: 800,
        width: 680
      }
    return (
       <FlowChart diagram={diagram} editable />
    )
}

export default flowChart;