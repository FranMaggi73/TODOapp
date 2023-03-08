import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import todosRouter from './routes/todos.js';
import authRouter from './routes/auth.js';

const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
    keys: ['9fh12j473d89j1fhfas']
}));

app.use(todosRouter);
app.use(authRouter);

app.listen(5000, () => {
  console.log('Server started on port 5000')
});