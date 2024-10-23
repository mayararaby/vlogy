import { useEffect, useState } from 'react';
import { HeaderSection } from '../../components/header/header';
import { fetchPosts } from '../../services/callPostsService';
import { setPosts } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { NewPost } from '../../components/newPost/newPostCard.jsx';
import "./index.css";
import { PostCard } from '../../components/postCard/postCard.jsx';
import { Notification } from '../../components/notification/Notification.jsx';
import { SearchCard } from '../../components/searchCard/searchCard.jsx';
import { Profile } from '../../components/profile/profile.jsx';
import { Ads } from '../../components/ads/adsSection.jsx';

export const Favorite = () => {
  const availablePosts = useSelector((state) => state.posts)
  const favoritePosts = availablePosts.filter(post=>post.isFavorite)
  const [allFilterdposts, setAllFilterdPosts] = useState(favoritePosts)
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationOptions, setNotificationOptions] = useState({ type: "", msg: "" })
  const [searchOptions, setSearchOptions] = useState({ title: "", body: "" })


  useEffect(() => {
    const filteredPosts = availablePosts.filter(post => {
      return post.title.startsWith(searchOptions.title) && post.body.startsWith(searchOptions.body)
    })
    setAllFilterdPosts(filteredPosts)
  }, [searchOptions])

  /**
   * Filter Favorite posts
   */
  useEffect(() => {
    const availablePostsFavorite = availablePosts.filter(post=>post.isFavorite)
    setAllFilterdPosts(availablePostsFavorite);
  }, [availablePosts]);


  return (
    <div className="bg-white">
      <HeaderSection />
      <div className='posts-layout-container'>

        <div className='profile-layout-section'>
          <Profile />
          <div><SearchCard searchOptions={searchOptions} setSearchOptions={setSearchOptions} /></div>
        </div>

        <div className='posts-content'>
          <div className='post-card'>
            {allFilterdposts.length ? allFilterdposts.map((post, i) => (
              <div key={post.id} className='card-info cards-posts-container'>
                <PostCard isFavorite={true} post={post} postIndex={i} allPosts={allFilterdposts} setOpenNotification={setOpenNotification} setNotificationOptions={setNotificationOptions} />
              </div>
            )):<div className='favorite-empty'> No posts in favorite</div>}
          </div>
        </div>

        <Ads />
      </div>
      <Notification type={notificationOptions.type} open={openNotification} msg={notificationOptions.msg} close={setOpenNotification} />

    </div>
  );
};
