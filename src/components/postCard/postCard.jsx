import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import "./index.css"
import { setPosts } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { deleteRemotePost, updateRemotePost } from '../../services/callPostsService';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { addFavorite, deletePost, handleEditPosts } from '../../helpers/crudHelpers';

export const PostCard = ({ post, allPosts, setOpenNotification, setNotificationOptions, postIndex }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditMode, setEndbleEditMode] = useState(false);

    const dispatch = useDispatch();
    const [currentPost, setPost] = useState({
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
        isFavortie: post.isFavortie
    });
   
    const handleChange = (event) => {
        const { name, value } = event.target
        setPost((prev) => ({ ...prev, [name]: value }));
    };


    return (
        <Card sx={{ minWidth: 275, width: '100%', maxWidth: 1000 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    <div className='display-card-title-section'>


                        <span>{isEditMode ? (<input type='text' name='title' value={currentPost.title} placeholder='Title' className='add-post-input add-post-heading ' onChange={handleChange} />
                        ) : (`${post.id}.${post.title}`)}</span>
                        <div>
                            <span>{!isEditMode ? <EditIcon onClick={()=>(setEndbleEditMode(true))} /> : (currentPost.body.trim() || currentPost.title.trim() ? 
                                <SaveIcon onClick={()=>(handleEditPosts(allPosts, postIndex, post, currentPost, dispatch, setOpenNotification, setNotificationOptions, setEndbleEditMode))} /> : null)}</span>
                            {!isEditMode && <span onClick={()=>addFavorite(allPosts, dispatch, postIndex)} >{post.isFavortie ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}</span>}
                            {!isEditMode && <span><DeleteIcon onClick={()=>deletePost(post,setOpenNotification, setNotificationOptions,allPosts, dispatch ) } color="error" /></span>}
                        </div>
                    </div>
                </Typography>

                <Typography variant="h6" component="div">
                    {
                        isEditMode ? (<textarea
                            name='body'
                            className='add-post-input'
                            value={currentPost.body}
                            onChange={handleChange}
                            placeholder="Type something... 😊"
                        />) : (isExpanded ? post.body : post.body.slice(0, 20))
                    }

                </Typography>
            </CardContent>
            {post.body.length > 20 && !isEditMode && <CardActions>

                {isExpanded ? <Button size="small" onClick={() => (setIsExpanded(!isExpanded))} >Read Less</Button> :
                    <Button size="small" onClick={() => (setIsExpanded(!isExpanded))} >Read More</Button>}

            </CardActions>}

        </Card>
    );
};
