import { Router } from 'express';
import { error } from './util';
import * as repo from './map';

const routes = Router();

routes.get('/', (req, res) => {
  res.render('index', { title: 'Animals' });
});

routes.get('/api/animals', (req, res) => {
  repo.getAnimals(req.query)
    .then(({status, animals}) => {
      if(status === 'ok') {
        res.status(200).json(animals);
      }
      else {
        error(res, 500, `Unexpected status: ${status}`);
      }
    });
});

routes.get('/api/animals/:name', (req, res) => {
  const name = req.params.name;

  repo.getAnimal(name)
    .then(({status, message, animal}) => {

      if(status === 'ok') {
        res.status(200)
          .format({html: () => res.send('<p>' + animal.name + '</p>'),
                   text: () => res.send(animal.name),
                   json: () => res.json(animal)});

      }
      else if( status === 'notFound' ) {
        error(res, 404, `Found no animal named ${name}.`);
      }
      else if( status === 'badRequest' ) {
        error(res, 400, message );
      }
      else {
        error(res, 500, `Unexpected status: ${status}`);
      }
    });
});

routes.post('/api/animals', (req, res) => {
  repo.addAnimal(req.body)
    .then(({status, message, animal}) => {
      if(status === 'created'){
        res.status(201).send(animal);
      }
      else if(status === 'alreadyExists') {
        error(res, 409, `${animal.name} already exists.`);
      }
      else if(status === 'badRequest') {
        error(res, 409, `${animal.name} already exists.`);
      }
      else {
        error(res, 500, `Unexpected status: ${status}`);
      }
  });
});

routes.delete('/api/animals', (req, res) => {
  repo.clearAnimals(req.body)
    .then(({status}) => {
      if(status === 'cleared') {
        res.status(204).send();
      }
      else {
        error(res, 500, `Unexpected status: ${status}`);
      }
    });
});

export default routes;
