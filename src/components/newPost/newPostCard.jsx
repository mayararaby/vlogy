import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { setPosts } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { addNewRemotePost } from '../../services/callPostsService';

export const NewPost = ({allPosts, setOpenNotification , setNotificationOptions}) => {
    const [post, setPost] = useState({
        title:"",
        body:"",
        isFavorite:false
    });

    const dispatch = useDispatch ()
    const handleChange = (event) => {
        const {name , value }= event.target

        setPost((prev) => ({ ...prev, [name]: value }));
    };

    const addNewPost= async() =>{
        setOpenNotification(false)
        const result = await addNewRemotePost()
        if(result?.id){
            setOpenNotification(true)
            setNotificationOptions({type:"success",msg:"Post Added Successfully"})
            const newPost = [{...post, id:result.id} , ...allPosts]
            dispatch(setPosts(newPost));
            setPost({
                title:"",
                body:"",
                isFavorite:false
            });
        }else{
            setOpenNotification(true)
            setNotificationOptions({type:"error", msg:"Failed to add new post"})
        }

    }

    return (
        <Card className='pl-7  pr-7' sx={{ minWidth: 275}}>
            <CardContent>
                <Typography variant="h4" component="div">
                    New Post
                </Typography>

                <div>
                    <input type='text' name='title' value={post.title} placeholder='Title' className='add-post-input add-post-heading '  onChange={handleChange} />
                    <textarea
                        name='body'
                        className='add-post-input'
                        value={post.body}
                        onChange={handleChange}
                        placeholder="Type something... 😊"
                    />
                </div>
            </CardContent>
            <CardActions>
                <Button disabled={!post.body.trim() && !post.title.trim()} variant="contained" sx={{ backgroundColor: "#978695", padding: "16px" }} startIcon={<AddIcon />} onClick={addNewPost}>
                    Add
                </Button>
            </CardActions>
        </Card>
    );
}