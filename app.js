const express = require('express');
const app = express();
const usersRouter = require('./routes/users');

app.use(express.json()); // Middleware for JSON bodies

app.use('/users', usersRouter); // Mount users router

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});