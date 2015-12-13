import { Router } from 'express';

export default (actions) => {

  const routes = Router();

  routes.get('/play', (req, res) => {
    actions.startPlayback('aac-128');
    res.status(204).send();
  });

  routes.get('/stop', (req, res) => {
    actions.stopPlayback();
    res.status(204).send();
  });

  routes.get('/mute', (req, res) => {
    actions.mute(true);
    res.status(204).send();
  });

  routes.get('/unmute', (req, res) => {
    actions.mute(false);
    res.status(204).send();
  });

  routes.get('/volume', (req, res) => {
    if( req.query.volume ) {
      actions.volume(req.query.volume);
    }
    res.status(204).send();
  });

  return routes;

};
