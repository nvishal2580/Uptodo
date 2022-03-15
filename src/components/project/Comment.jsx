import React, { Component, useState } from 'react';
import { MentionsInput, Mention } from 'react-mentions'

function Comment({handleSubmit}) {

    const [users,setUsers] = useState([
        {
          _id: '123',
          name: { first: 'John', last: 'Reynolds' }
        },
        {
          _id: '234',
          name: { first: 'Holly', last: 'Reynolds' }
        },
        {
          _id: '345',
          name: { first: 'Ryan', last: 'Williams' }
        }
      ]);

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
        return (users.map(myUser => ({
            id: myUser._id,
            display: `${myUser.name.first} ${myUser.name.last}`
          })));
    }

  return (
    <div className='flex w-full items-center'>
        
        <div className='w-5/6 border-2'>
        <MentionsInput
          value={value}
          onChange={handleChange}
          markup="@{{__type__||__id__||__display__}}"
          placeholder="Type anything, use the @ symbol to tag other users."
          className="mentions w-full rounded-lg px-2 py-2"
          
        >
          <Mention
            type="user"
            trigger="@"
            data={userMentionData}
            className="mentions__mention bg-cyan-200"
          />
        </MentionsInput>
        </div>
        
        <div className='w-1/6 ml-3'>
            <button onClick={handleFormSubmit} className='py-1 px-2 rounded-md bg-orange-400 hover:bg-orange-500 text-white'>
                Comment
            </button>
        </div>
    </div>
  )
}

export default Comment