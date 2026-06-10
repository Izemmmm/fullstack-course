import {Router} from 'express';
import Blog from '../models/blog.js';

const router = Router();

router.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  }
  else {
    response.sendStatus(404);
  }
});

router.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

router.put('/:id', async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id);
  if (!blogToUpdate) {
    return response.status(404).json({error: 'not found'});
  }
  
  blogToUpdate.set(request.body);
  const updatedBlog = await blogToUpdate.save();
  response.json(updatedBlog);
});

router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.sendStatus(204);
});

export default router;