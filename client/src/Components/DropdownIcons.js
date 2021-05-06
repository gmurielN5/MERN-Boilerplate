import React, { useState } from 'react';
import { InputGroup, Input, InputGroupButtonDropdown, Label,
          DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { PlusCircleFill,
         Camera,
         Code,
         ChatQuote,
         ThreeDots } from 'react-bootstrap-icons';

const DropdownIcons= (props) => {
  const [dropdownOpen, setOpen] = useState(false);
  const [inputState, setInputState]= useState('');
  const [isEditing, setEditing] = useState(false);

 
  const handleInputState=(state)=>{
    setInputState(state);
    setEditing(true);
  }

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <InputGroup>
       
        <InputGroupButtonDropdown direction="right" addonType="prepend" isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle>
              <PlusCircleFill size={24} style={{ fill: 'black' }}/>
          </DropdownToggle>

          <DropdownMenu className="dropDownIcons border-0">
            <DropdownItem onClick={()=>handleInputState("image")}><Camera  size={24}/></DropdownItem>
            <DropdownItem onClick={()=>handleInputState("video")}><Code  size={24}/></DropdownItem>
            <DropdownItem onClick={()=>handleInputState("blockquote")}><ChatQuote  size={24}/></DropdownItem>
            <DropdownItem onClick={()=>handleInputState("section")}><ThreeDots  size={24}/></DropdownItem>
          </DropdownMenu>      
        </InputGroupButtonDropdown>

      {!isEditing && 
        <Input 
          type="textarea"
          name="body"
          value={props.body}
          placeholder="Tell your Story..."
          onChange={props.handleContent}
          className="border-0"
        />
      }
      
      {inputState==="image" && 
      <>
        <Label for="file-upload" className="btn btn-light">
            Upload
        </Label> 
            <Input
                  type="file"
                  name="file"
                  value={props.image}
                  id="file-upload"
                  accept="image/*"
                  onChange={props.handleFileChange}
                  placeholder="upload image"
                  isRequired={true}
            />
      </>
      }

      {inputState==="video" && 
        <Input 
          className="border-0"
          placeholder={inputState}
        />
      }
      {inputState==="blockquote" && 
        <Input 
          type="textarea"
          name="blockquote"
          value="blockquote"
          placeholder="Tell your Story..."
          onChange={props.handleContent}
          className="border-0"
         />
      }
      {inputState==="section" && 
        <Input 
          className="border-0"
          placeholder={inputState}
        />
      } 
      </InputGroup>
  );
}

export default DropdownIcons;