import { useEffect, useState } from 'react';
import { HeaderSection } from '../../components/header/header';
import { fetchPosts } from '../../services/callPostsService';
import { setPosts } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { NewPost } from '../../components/newPost/newPostCard.jsx';
import "./index.css";
import { PostCard } from '../../components/postCard/postCard.jsx';

export const Posts = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const availablePosts = useSelector((state) => state.posts);

  console.log({availablePosts});

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

  const loadPosts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const posts = await fetchPosts(page);
      const allPosts = [...availablePosts, ...posts];
      dispatch(setPosts(allPosts));
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <HeaderSection />
      <div className="posts-main-container">
        <div className='posts-content'>
          <div className='post-card'>
            <NewPost />
          </div>
          <div className='post-card'>
            {loading && <div>Loading ...</div>}
            {availablePosts.map((post) => (
              <div key={post.id} className='card-info cards-posts-container'>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
