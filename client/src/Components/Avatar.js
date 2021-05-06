import React from 'react';

const Avatar = (props) => {
    let className = '';
        if (props.thumbnail) {
            className += 'avatarThumbnail rounded-circle';
        }else{
            className += 'avatarNav rounded-circle';
        }
    return(
        <>
        {props.user.avatar ? 
            <div>
               <img src={props.user.avatar} alt="avatar" className={className} />
            </div> 
            : 
            <div className={className}>
            {props.thumbnail ? <h3 className="initials">
                  {props.user.username.slice(0, 1).toUpperCase()}
                  </h3> 
                  :  <span className="initials">
                  {props.user.username.slice(0, 1).toUpperCase()}
                  </span> }
            </div> 
        }
    </>
    )
}

export default Avatar;