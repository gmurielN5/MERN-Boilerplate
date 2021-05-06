import React, { useState, useEffect } from "react";
import { Row, Col, Label, Button } from 'reactstrap';

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
const Editable = ({
  childRef,
  type,
  text,
  placeholder,
  children,
  ...props
}) => {

  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

// Event handler while pressing any key while editing
  const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey]; // All keys array

  /* 
    - For textarea, check only Escape and Tab key and set the state to false
    - For everything else, all three keys will set the state to false
  */
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
    }
  };

  // Conditional rendering to add font styling
  let className = '';
  if (props.header) {
      className += 'formheader';
  }

  //Conditional to render col size
  let size=8;
  if (props.editButton) {
    size = 12;
  }

  return (
    <section {...props}>
    <Row>
        {isEditing ? (
            <Col sm={size} className="text-left"
            onBlur={() => setEditing(false)}
            onKeyDown={e => handleKeyDown(e, type)}
            >
            {children}
            </Col>
        ) : (
            <Col sm={size} className="text-left" onClick={() => setEditing(true)}>
            <Label className={className}> 
                { text || placeholder || "Editable content"}
            </Label>
            </Col>
        )}

      {props.editButton ? 
      null
      :
        <Col sm={4} className="text-right">
        {isEditing ? (
            <Button 
            color="light"
            onClick={(e)=>{setEditing(false)}}
            >Cancel</Button>   
        ) : (
            <Button 
            color="light"
            onClick={(e)=>{setEditing(true)}}
            >Edit</Button>
        )}
        </Col>
      }
    </Row>
    </section>
  );
};

export default Editable;