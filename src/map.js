const db = new Map();

function vals(map) {
  return Array.from(map.values());
}

export async function getAnimals(params) {
  let animals = vals(db);
  if(params.name) {
    animals = animals.filter(animal => animal.name.includes(params.name));
  }
  return {status: 'ok', animals: animals};
}

export async function getAnimal(name) {
  if(!name) {
    return {status: 'badRequest', message: 'No name provided.'};
  }
  if(db.has(name)) {
    return {status: 'ok', animal: db.get(name)};
  }
  return {status: 'notFound'};
}

export async function addAnimal(animal) {
  if(!animal){
    return {status: 'badRequest', message: 'No animal provided.'};
  }
  if(db.has(animal.name)) {
    return {status: 'alreadyExists', animal: animal};
  }
  db.set(animal.name, animal);
  return {status: 'created', animal: animal};
}

export async function clearAnimals() {
  db.clear();
  return {status: 'cleared'};
}
