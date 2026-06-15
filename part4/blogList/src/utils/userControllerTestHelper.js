export const initialUsers = [
  {
    username: 'coolguy123',
    name: 'ilya volkov',
    password: '123abc',
    blogs: []
  },
  {
    username: 'oxotnik51',
    name: 'vova dum',
    password: '123456789',
    blogs: []
  }
];

export const expectedInitialUsers = [
  {
    username: 'coolguy123',
    name: 'ilya volkov',
    blogs: []
  },
  {
    username: 'oxotnik51',
    name: 'vova dum',
    blogs: []
  }
];

export const newUser = {
  username: 'newguy',
  name: 'new guy',
  password: 'qwerty',
  blogs: []
};

export const url = '/api/users';