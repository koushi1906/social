import { Avatar, Card, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import StoryCircle from './StoryCircle';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from '../Post/PostCard';
import CreatePostModal from '../CreatePost/CreatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction } from '../../Redux/Post/post.action';

const MiddlePart = () => {
  const story = [1,1,1,1];
  const posts = [1,1,1,1];

  const[openCreatePostModal, setopenCreatePostModal] = useState(false);
  const handleCloseCreatePostModal = () => setopenCreatePostModal(false);
  const dispatch = useDispatch();
  const {post} =useSelector(store => store);
  console.log('post store', post);
  const handleOpenCreatePostModal = () => {
    setopenCreatePostModal(true);
    console.log("open post modal");
  }

  useEffect(() => {
    dispatch(getAllPostAction())
  }, [post.newComment])
  return (
    <div className='px-20'>
      <section className="flex items-center p-5 rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
        <Avatar sx={{width:"5rem", height:"5rem"}}>
          <AddIcon sx={{fontSize:"3rem"}}/>
        </Avatar>
        <p>New</p>
        </div>
        {story.map((item) => <StoryCircle />)}
      </section>

      <Card className='p-5 mt-5'>
        <div className="flex justify-between">
          <Avatar/>
          <input readOnly type='text' onClick={handleOpenCreatePostModal} placeholder='Create new post..' className='outline-none w-[90%] rounded-full px-5 bg-transparent border border-[#3b4054]' />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <ImageIcon />
            </IconButton>
            <span>Media</span>
          </div>
          <div className="flex items-center">
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <VideocamIcon />
            </IconButton>
            <span>Video</span>
          </div>
          <div className="flex items-center">
            <IconButton color='primary' onClick={handleOpenCreatePostModal}>
              <ArticleIcon />
            </IconButton>
            <span>Write Article</span>
          </div>
        </div>
      </Card>
      <div className="mt-5 space-y-5">
        {post.posts.map((item) => <PostCard item={item}/>)}
      </div>
      <div className="">
        <CreatePostModal handleClose={handleCloseCreatePostModal} open={openCreatePostModal}/>
      </div>
    </div>  
  )
}

export default MiddlePart