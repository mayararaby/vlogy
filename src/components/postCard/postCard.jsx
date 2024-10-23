import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import "./index.css"
import { useDispatch } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { addFavorite, deletePost, handleEditPosts } from '../../helpers/crudHelpers';

/**
 * @module Post
 * @description Post card and apply actions on it
 * @param {Object} param0 
 * @returns {JSX}
 */
export const PostCard = ({ isFavorite, post, allPosts, setOpenNotification, setNotificationOptions, postIndex }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditMode, setEndbleEditMode] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    const [currentPost, setPost] = useState({
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
        isFavorite: post.isFavorite
    });

    /**
     * @deprecated  Current post data to edit it
     * @param {Object} event 
     */
    const handleChange = (event) => {
        const { name, value } = event.target
        setPost((prev) => ({ ...prev, [name]: value }));
    };


    return (
        <Card sx={{ minWidth: 275, maxWidth: 400 }} className='pl-7 pr-7'>
            <CardContent>
                <Typography variant="h6" component="div">
                    <div className='display-card-title-section'>
                        <span>
                            {isEditMode ? (
                                <input
                                    type='text'
                                    name='title'
                                    value={currentPost.title}
                                    placeholder='Title'
                                    className='add-post-input add-post-heading'
                                    onChange={handleChange}
                                />
                            ) : (
                                `${post.id}.${post.title}`
                            )}
                        </span>

                        {!isFavorite && (
                            <div>
                                <IconButton onClick={handleMenuOpen}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={isMenuOpen}
                                    onClose={handleMenuClose}
                                >
                                    {!isEditMode ? (
                                        <MenuItem className="card-menu-item" onClick={() => {
                                            setEndbleEditMode(true);
                                            handleMenuClose();
                                        }}>
                                            <EditIcon fontSize="small" />
                                            Edit
                                        </MenuItem>
                                    ) : (
                                        <MenuItem className="card-menu-item"
                                            disabled={!currentPost.body.trim() && !currentPost.title.trim()}
                                            onClick={() => {
                                                handleEditPosts(allPosts, postIndex, post, currentPost, dispatch, setOpenNotification, setNotificationOptions, setEndbleEditMode);
                                                handleMenuClose();
                                            }}>
                                            <SaveIcon fontSize="small" />
                                            Save
                                        </MenuItem>
                                    )}
                                    {!isEditMode && (
                                        <MenuItem className="card-menu-item" onClick={() => {
                                            addFavorite(allPosts, dispatch, postIndex);
                                            handleMenuClose();
                                        }}>
                                            {post.isFavorite ? <FavoriteIcon color="error" fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                                            Favorite
                                        </MenuItem>
                                    )}
                                    {!isEditMode && (
                                        <MenuItem className="card-menu-item" onClick={() => {
                                            deletePost(post, setOpenNotification, setNotificationOptions, allPosts, dispatch);
                                            handleMenuClose();
                                        }}>
                                            <DeleteIcon color="error" fontSize="small" />
                                            Delete
                                        </MenuItem>
                                    )}
                                </Menu>
                            </div>
                        )}
                    </div>
                </Typography>

                <Typography component="div">
                    {isEditMode ? (
                        <textarea
                            name='body'
                            className='add-post-input'
                            value={currentPost.body}
                            onChange={handleChange}
                            placeholder="Type something... 😊"
                        />
                    ) : (
                        isExpanded ? post.body : post.body.slice(0, 20)
                    )}
                </Typography>
            </CardContent>

            {post.body.length > 20 && !isEditMode && (
                <CardActions>
                    {isExpanded ? (
                        <Button size="small" onClick={() => setIsExpanded(!isExpanded)}>Read Less</Button>
                    ) : (
                        <Button size="small" onClick={() => setIsExpanded(!isExpanded)}>Read More</Button>
                    )}
                </CardActions>
            )}
        </Card>

    );
};
