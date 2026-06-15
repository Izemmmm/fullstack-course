import {Router} from 'express';
import Blog from '../models/blog.js';
import User from '../models/user.js';

const router = Router();

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1, blogs: 1});
  response.json(blogs);
});

router.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', {username: 1, name: 1, blogs: 1});

  if (blog) {
    response.json(blog);
  }
  else {
    response.sendStatus(404);
  }
});

router.post('/', async (request, response) => {
  const body = request.body;
  const user = await User.findById(body.userId);
  if (!user) {
    return response.status(400).json({error: 'userId is missing or invalid'});
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes
  });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

router.put('/:id', async (request, response) => {
  const {user, ...updateData} = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updateData,
    {returnDocument: 'after', runValidators: true }
  );

  if (!updatedBlog) {
    return response.status(404).json({ error: 'not found' });
  }

  response.json(updatedBlog);
});

router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.sendStatus(204);
});

export default router;