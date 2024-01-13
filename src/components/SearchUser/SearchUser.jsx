import { Avatar, Card, CardHeader } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../Redux/Auth/auth.action';
import { createChat } from '../../Redux/Message/message.action';

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const {message, auth} = useSelector(store => store);
  const handleSearchUser = (e) => {
    setUsername(e.target.value);
    console.log("search user..");
    dispatch(searchUser(username))
  }

  const handleClick = (id) => {
    dispatch(createChat({userId:id}))
    console.log(id);
  }
  return (
    <div>
      <div className="py-5 relative">
        <input type="text" className='bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full' placeholder='search user...' onChange={handleSearchUser}/>
        {
        username && (
          auth.searchUser.map((item) => <Card key={item.id} className='absolute w-full cursor-pointer z-10 top-[4.5rem]'>
          <CardHeader onClick={() => {
            handleClick(item.id)
            setUsername("")
          }} 
          avatar={<Avatar src='https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=600'/>}
          title={item.firstName + " " + item.lastName} subheader={item.firstName.toLowerCase() + "_" + item.lastName.toLowerCase()}/>
        
        </Card>)
        )
      }
      </div>
      
    </div>
  )
}

export default SearchUser