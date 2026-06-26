import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import loginService from './services/loginService';
import blogService from './services/blogService';
import BlogList from './components/BlogList';
import NewBlogForm from './components/NewBlogForm';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import Blog from './components/Blog';
import { Alert, Container } from '@mui/material';
import PageBar from './components/PageBar';

function App() {
  const [token, setToken] = useState(() => {
    return window.localStorage.getItem('token') || null;
  });
  const [user, setUser] = useState(() => {
    const storedUser = window.localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const match = useMatch('/blogs/:id');
  const openedBlog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null;

  const showNotification = (message, severity = 'success') => {
    console.log(severity);
    setNotification({ message, severity });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = async(username, password) => {
    try {
      const { token: loginToken, ...loggedinUser } = await loginService.login({ username, password });

      setUser(loggedinUser);
      setToken(loginToken);
      window.localStorage.setItem('token', loginToken);
      window.localStorage.setItem('user', JSON.stringify(loggedinUser));

      navigate('/');
    } catch (error) {
      if (error.response.status === 401) {
        showNotification(error.response.data.error, 'error');
      } else {
        console.log(error);
      }
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');

    navigate('/');
  };

  const handleBlogCreation = async(title, author, url) => {
    const newBlog = { title, author, url };
    try {
      const createdBlog = await blogService.create(newBlog);
      const detailedBlog = await blogService.getById(createdBlog.id);
      setBlogs(blogs.concat(detailedBlog));
      showNotification(`Blog ${createdBlog.title} by ${createdBlog.author} is added`);
      navigate('/');
    } catch (error) {
      if (error.response.status === 401) {
        showNotification('session expired', 'error');
        logout();
      }
      if (error.response.status === 400) {
        showNotification(error.response.data.error, 'error');
      } else {
        console.log(error);
      }
    }
  };

  const handleSort = (isAscending) => {
    const sortedBlogs = blogs.toSorted((blog1, blog2) => blog1.likes - blog2.likes);
    if (!isAscending) {
      return setBlogs(sortedBlogs.toReversed());
    }
    setBlogs(sortedBlogs);
  };

  const handleLike = async(id, newLikes) => {
    try {
      const updatedBlog = await blogService.update(id, { likes: newLikes });
      setBlogs(blogs.map(blog => {
        if (blog.id === updatedBlog.id) {
          return { ...blog, likes: updatedBlog.likes };
        }
        return blog;
      }));
    } catch (error) {
      if (error.response.status === 401) {
        showNotification('session expired', 'error');
        logout();
      } else {
        console.log(error);
      }
    }
  };

  const handleDelete = async(id) => {
    const confirmation = window.confirm('Are you sure you want to delete this user?');
    if (!confirmation) {
      return;
    }

    try {
      await blogService.remove(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
      navigate('/');
    } catch (error) {
      if (error.response.status === 401) {
        showNotification('session expired', 'error');
        logout();
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    blogService.setToken(token);
  }, [token]);

  useEffect(() => {
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
    <Container>
      <PageBar user={user} onLogout={logout} />
      {notification && (
        <Alert severity={notification.severity}>
          {notification.message}
        </Alert>
      )}
      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} handleSort={handleSort} />} />
        <Route path="/new_blog" element={<NewBlogForm onSubmit={handleBlogCreation} />} />
        <Route path="/login" element={<LoginForm onSubmit={handleLogin} />} />
        <Route path="/blogs/:id" element={<Blog blog={openedBlog}
          handleDelete={handleDelete} handleLike={handleLike} userId={user?.id} />} />
      </Routes>
    </Container>
  );
}

export default App;
