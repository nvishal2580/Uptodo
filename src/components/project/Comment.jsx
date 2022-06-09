import React, { useState } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import defaultStyle from './DefaultStyle';

function Comment({handleSubmit,membersList}) {

    const [value,setValue] = useState("");
    const [planeText,setPlainText] = useState("");

    const handleChange = (event, newValue, newPlainTextValue, mentions) => {
        // console.log(newValue, newPlainTextValue, mentions)
        setValue(newValue);
        setPlainText(newPlainTextValue);
      }

      const handleFormSubmit = () => {
        if(planeText && planeText.length > 2){
          handleSubmit(value,planeText);
        }
        setValue("");
        setPlainText("");
      }


    const userMentionData = () => {
        return (membersList.map(myUser => ({
            id: myUser.id,
            display: myUser.name
          })));
    }

  return (
    <div className='flex items-center'>
        
        <div className='w-[450px] '>
        <MentionsInput
          singleLine
          value={value}
          onChange={handleChange}
          markup="@{{__type__||__id__||__display__}}"
          placeholder="Type anything, use the @ symbol to tag other users."
          className=" w-[450px] "
          style={defaultStyle}
          
        >
          <Mention
            type="user"
            trigger="@"
            data={userMentionData}
            className="mentions__mention bg-cyan-200 z-50"
          />
        </MentionsInput>
        </div>
        
        <div className=' ml-3'>
            <button onClick={handleFormSubmit} className='py-1 px-2 rounded-md bg-orange-400 hover:bg-orange-500 text-white'>
                Comment
            </button>
        </div>
    </div>
  )
}

export default Comment