import { setPosts } from "../redux/actions";
import { addNewRemotePost, deleteRemotePost, updateRemotePost } from "../services/callPostsService";

/**
 * @function
 * @description Update selected post by using its index
 * @param {Array} allPosts Array of objects each object is post
 * @param {Number} postIndex  Current post index
 * @param {Object} post Selected post 
 * @param {Obkect} currentPost The updated post 
 * @param {Function} dispatch 
 * @param {Function} setOpenNotification State function to display notification
 * @param {Function} setNotificationOptions State function to set notification options
 * @param {Function} setEndbleEditMode State function to enable and disable edit mode
 */
export const handleEditPosts = async (allPosts, postIndex, post, currentPost, dispatch, setOpenNotification, setNotificationOptions, setEndbleEditMode) => {
    const statusCode = await updateRemotePost(post.id, { title: currentPost.title, body: currentPost.body })

    console.log({statusCode})
    if (statusCode == 200) {
        const updatedPosts = allPosts.map((post, i) => {
            if (i === postIndex) {
                return {
                    ...currentPost,
                    isFavorite: post.isFavorite
                };
            }
            return post;
        });
        dispatch(setPosts(updatedPosts));
    } else {
        setOpenNotification(true)
        setNotificationOptions({ type: "error", msg: "Failed to edit post" })
    }
    setEndbleEditMode(false)

}

/**
 * @function
 * @description Delte selected object by having id 
 * @param {Object} post Selected post 
 * @param {Function} setOpenNotification State function to display notification
 * @param {Function} setNotificationOptions State function to set notification options
 * @param {Array} allPosts Array of objects each object is post
 * @param {Function} dispatch 
 */
export  const deletePost = async (post,setOpenNotification, setNotificationOptions,allPosts, dispatch ) => {
    const resultCode = await deleteRemotePost(post.id)
    if (resultCode === 200) {
        setOpenNotification(false)
        setNotificationOptions({ type: "success", msg: "Post Deleted Successfully" })
        const updatedPosts = allPosts.filter(currentPost => currentPost.id !== post.id)
        dispatch(setPosts(updatedPosts));
        setOpenNotification(true)
    }else{
        setOpenNotification(true)
        setNotificationOptions({type:"error", msg:"Failed to delete post"})
    }
}

/**
 * @function
 * @description Add post to favorite
 * @param {Array} allPosts Array of objects each object is post
 * @param {Number} postIndex  Current post index
 * @param {Function} dispatch 
 */
export  const addFavorite = (allPosts, dispatch, postIndex) => {
    const updatedPosts = allPosts.map((currentPost, i) => {
        if (i === postIndex) {
            return {
                ...currentPost,
                isFavorite: !currentPost.isFavorite
            };
        }
        return currentPost;
    });

    dispatch(setPosts(updatedPosts));
}

/**
 * @function
 * @description Add new post 
 * @param {Function} setOpenNotification State function to display notification
 * @param {Function} setNotificationOptions State function to set notification options
 * @param {Object} post Selected post 
 * @param {Array} allPosts Array of objects each object is post
 * @param {Function} dispatch 
 * @param {Function} setPost State function to reset post state
 */
export const addNewPost= async(setOpenNotification,setNotificationOptions,post, allPosts,dispatch,setPost   ) =>{
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