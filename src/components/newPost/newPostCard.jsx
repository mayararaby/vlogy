import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';

/**
 * @module NewPost 
 * @description Creating new post and append it to old posts 
 * @param {Object} param0 
 * @returns {JSX}
 */
export const NewPost = ({allPosts, setOpenNotification , setNotificationOptions}) => {
    const [post, setPost] = useState({
        title:"",
        body:"",
        isFavorite:false
    });

    const dispatch = useDispatch ()

    /**
     * @description Get new post data
     * @param {Object} event 
     */
    const handleChange = (event) => {
        const {name , value }= event.target
        setPost((prev) => ({ ...prev, [name]: value }));
    };

   

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
                <Button disabled={!post.body.trim() && !post.title.trim()} variant="contained" sx={{ backgroundColor: "#978695", padding: "16px" }} startIcon={<AddIcon />} onClick={()=>(addNewPost(setOpenNotification,setNotificationOptions,post, allPosts,dispatch,setPost))}>
                    Add
                </Button>
            </CardActions>
        </Card>
    );
}