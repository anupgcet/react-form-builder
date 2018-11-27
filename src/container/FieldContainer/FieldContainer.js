import React, {Component} from 'react';

import FieldEditor from '../../components/FieldEditor/FieldEditor';
import JSONViewer from '../../components/JSONViewer/JSONViewer';

const fieldContainer = (props) => {
  return(
    props.fieldRef.type === 'json' ? (
      <JSONViewer fieldRef={props.fieldRef}/>
    ):(
      <FieldEditor fieldChange={props.fieldChange} fieldRef={props.fieldRef}/>
    )
  )
}

export default fieldContainer;