import {addAnimal,
        clearAnimals,
        getAnimal,
        getAnimals} from '../src/postgres.js';

describe('db', () => {
  it('wut', async () => {
    expect.assertions(9);
    let result = null;

    result = await clearAnimals();
    expect(result.status).toEqual('cleared');

    result = await getAnimals();
    expect(result.status).toEqual('ok');
    expect(result.animals).toEqual([]);

    let giraffe = {name: 'giraffe',
                   home: 'savannah',
                   size: 'big'};
    result = await addAnimal(giraffe);
    expect(result.status).toEqual('created');
    expect(result.animal).toEqual(giraffe);

    result = await getAnimals();
    expect(result.status).toEqual('ok');
    expect(result.animals).toEqual([giraffe]);

    result = await getAnimal('giraffe');
    expect(result.status).toEqual('ok');
    expect(result.animal).toEqual(giraffe);
  });
});
