import db from './db';

// create table animals ( name varchar(36) primary key, home varchar(36), size varchar(36) );

export async function getAnimal(name) {
  return new Promise((resolve, reject) => {
    if(!name) {
      resolve({status: 'badRequest', message: 'No name provided.'});
    }
    db.any('select name, home, size from animals where name = $1',
           [name] )
      .then(data => {
        if(data.length == 0) {
          resolve({status: 'notFound'});
        }
        else if(data.length > 1) {
          resolve({status: 'error',
                   message: `Expected a single animal, but found ${data.length}.`});
        }
        resolve({status: 'ok', animal: data[0]});
      })
      .catch(error => {
        resolve({status: 'error', error: error});
      });
  });
}

export async function getAnimals(params) {
  return new Promise((resolve, reject) => {
    db.any('select name, home, size from animals')
      .then(data => {
        resolve({status: 'ok', animals: data});
      })
      .catch(error => {
        resolve({status: 'error', error: error});
      });
  });
}

export function addAnimal(animal) {
  return new Promise((resolve, reject) => {
    if(!animal) {
      resolve({status: 'badRequest', message: 'No animal provided.'});
    }
    db.none('insert into animals (name, home, size) values ($1, $2, $3)',
            [animal.name, animal.home, animal.size])
      .then(data => {
        resolve({status: 'created', animal: animal});
      })
      .catch(error => {
        resolve({status: 'error', error: error});
      });
  });
}

export function clearAnimals() {
  return new Promise((resolve, reject) => {
    db.none('delete from animals')
      .then(_ => resolve({status: 'cleared'}))
      .catch(error => resolve({status: 'error', error: error}));
  });
}
