import Server from 'socket.io';
import express from 'express';
import cors from 'cors';
import http from 'http';

import createPlayer from '../player';
import routes  from './routes';
import configureStore from './store';
import { bindPlayerToActions } from './actions';

const app = express();
const server = http.Server(app);

const log = (req, res, next)  => {
  console.log('req', req.originalUrl);
  return next();
};

const store = configureStore();
const player = createPlayer();

export default ({ port }) => {

  const io = new Server(server);

  const actions = bindPlayerToActions(player, store);

  app.use(cors());
  app.use('/', log, routes(actions));

  store.subscribe(() => {
    io.emit('state', store.getState());
  });

  io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.emit('state', store.getState());
  });

  server.listen(port);

  console.log(`Server started on ${port}`);

  return io;
};
