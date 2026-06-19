import {useState, useEffect} from 'react';
import LoginForm from './components/LoginForm';
import loginService from './services/loginService';
import blogService from './services/blogService';
import BlogList from './components/BlogList';
import UserStatusBar from './components/UserStatusBar';
import NewBlogForm from './components/NewBlogForm';
import InfoBar from './components/InfoPopup';

function App() {
  const [token, setToken] = useState(() => {
    return window.localStorage.getItem('token') || null;
  });
  const [user, setUser] = useState(() => {
    const storedUser = window.localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [blogs, setBlogs] = useState([]);

  const [infoMessage, setInfoMessage] = useState(null);
  const [isCritical, setIsCritical] = useState(false);

  const showPopup = (message, isCritical = false) => {
    setIsCritical(isCritical);
    setInfoMessage(message);
    setTimeout(() => setInfoMessage(''), 3000);
  }

  const handleLogin = async (username, password) => {
    try {
      const {token: loginToken, ...loggedinUser} = await loginService.login({username, password});
      setUser(loggedinUser);
      setToken(loginToken);
      window.localStorage.setItem('token', loginToken);
      window.localStorage.setItem('user', JSON.stringify(loggedinUser));
    } catch (error) {
      if (error.response.status === 401) {
        showPopup(error.response.data.error, true);
      } else {
        console.log(error);
      }
    }
  }

  const logout = () => {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
  }

  const handleBlogCreation = async (title, author, url) => {
    const newBlog = {title, author, url};
    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      showPopup(`Blog ${createdBlog.title} by ${createdBlog.author} is added`);
    } catch (error) {
      if (error.response.status === 401) {
        showPopup('session expired', true);
        logout();
      }
      if (error.response.status === 400) {
        showPopup(error.response.data.error, true);
      } else {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    blogService.setToken(token);
  }, [token]);

  useEffect(() => {
    if (!user) {
      return;
    }

    async function getBlogs() {
      try {
        const allBlogs = await blogService.getAll();
        setBlogs(allBlogs);
      } catch (error) {
        console.log('get all blogs error', error);
      }
    }
    getBlogs();
  }, [user]);

  return (
    <div>
      <InfoBar message={infoMessage} isCritical={isCritical} />
      {!user && <LoginForm onSubmit={handleLogin} />}
      {user &&
        <div>
          <UserStatusBar user={user} onLogout={logout} />
          <NewBlogForm onSubmit={handleBlogCreation} />
          <BlogList blogs={blogs} />
        </div>}
    </div>
  );
}

export default App;