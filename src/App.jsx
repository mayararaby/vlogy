import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Home } from './pages/home';
// import { Error } from './pages/error';
// import { ContactInfo } from './pages/contactInfo';
// import { Contacts } from './pages/contacts';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
// import { FavoriteList } from './pages/favorite';
// import { AddContact } from './pages/add';
// import { EditContact } from './pages/edit';
import { fetchPosts } from './services/callPostsService';
import { Home } from './pages/home/home.jsx';
import { Posts } from './pages/posts/posts.jsx';
import "./index.css"
import { setPosts } from './redux/actions/index.js';
import { Notification } from './components/notification/Notification.jsx';
import { Error } from './pages/error/error.jsx';
import { Favorite } from './pages/favorite/favorite.jsx';
function App() {
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationOptions, setNotificationOptions] = useState({ type: "", msg: "" })
  
  const dispatch = useDispatch()
  useEffect(() => {
    loadPosts()

  }, [])

  /**
   * Fetch init posts
   */
  const loadPosts = async () => {
    const posts = await fetchPosts();
    if (posts)
      dispatch(setPosts(posts));
    else {
      setOpenNotification(true)
      setNotificationOptions({ type: "error", msg: "Failed to load new posts" })
    }
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/myFavorite" element={<Favorite />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
      <Notification type={notificationOptions.type} open={openNotification} msg={notificationOptions.msg} close={setOpenNotification} />

    </>
  )
}

export default App
