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
import { Loading as LoadingComponent } from '../../components/loading/loading.jsx';
export const Posts = () => {

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const availablePosts = useSelector((state) => state.posts);

  const [allFilterdposts, setAllFilterdPosts] = useState(availablePosts)
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationOptions, setNotificationOptions] = useState({ type: "", msg: "" })
  const [searchOptions, setSearchOptions] = useState({ title: "", body: "" })

  /**
   * Add sceoll listner to check if user at the end of the page to get new posts
   */
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 5 &&
        !loading
      ) {
        loadPosts();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  /**
   * @description Get new posts
   * @returns {0} return the function is loading is active
   */
  const loadPosts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const posts = await fetchPosts(page);
      if (posts) {
        const allPosts = [...availablePosts, ...posts];
        setPage((prevPage) => prevPage + 1);
        dispatch(setPosts(allPosts));
      } else {
        setOpenNotification(true)
        setNotificationOptions({ type: "error", msg: "Failed to fetch posts" })
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Apply filter
   */
  useEffect(() => {
    const filteredPosts = availablePosts.filter(post => {
      return post.title.startsWith(searchOptions.title) && post.body.startsWith(searchOptions.body)
    })
    setAllFilterdPosts(filteredPosts)
  }, [searchOptions])

  /**
   * Update displyed posts
   */
  useEffect(() => {
    setAllFilterdPosts(availablePosts);
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
            <NewPost allPosts={allFilterdposts} setOpenNotification={setOpenNotification} setNotificationOptions={setNotificationOptions} />
          </div>
          <div className='post-card'>
            {loading && <LoadingComponent />}

            {allFilterdposts.map((post, i) => (
              <div key={post.id} className='card-info cards-posts-container'>
                <PostCard post={post} postIndex={i} allPosts={allFilterdposts} setOpenNotification={setOpenNotification} setNotificationOptions={setNotificationOptions} />
              </div>
            ))}
          </div>
        </div>

        <Ads />
      </div>
      <Notification type={notificationOptions.type} open={openNotification} msg={notificationOptions.msg} close={setOpenNotification} />

    </div>
  );
};
