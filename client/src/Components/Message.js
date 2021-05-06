import React from 'react';
import { Alert } from 'reactstrap';

const getStyle =(props)=>{
    let color = "";
    if(props.message.msgError)
      color = "danger";
    else
      color = "light border-dark";
    return color
}  

const Message =props=> {
  return (
        <Alert color={getStyle(props)} className="text-center font-weight-bold s">
           {!props.message.msgBody ? props.message
           : props.message.msgBody
           }  
        </Alert>
  );
}

export default Message;