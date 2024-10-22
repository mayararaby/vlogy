import { setPosts } from "../redux/actions";
import { deleteRemotePost, updateRemotePost } from "../services/callPostsService";

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