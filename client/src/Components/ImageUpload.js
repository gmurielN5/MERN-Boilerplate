import React from 'react';

import { Input, Label } from 'reactstrap';

const ImageUpload =({ value, text, handleFileChange })=>{
     
    return(
        <>
        <Label for="file-upload" className="btn btn-light">
            {text}
        </Label> 
            <Input
                type="file"
                value={value}
                name="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileChange}
                placeholder="upload image"
                isRequired={true}
            />
        </>
    );
}

export default ImageUpload;