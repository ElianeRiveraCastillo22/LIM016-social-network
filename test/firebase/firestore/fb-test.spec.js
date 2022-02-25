import {
  updatePost, addLike,
} from '../../../src/firebase/firestore/fb-test.js';

jest.mock('../../../src/firebase/configuraciones.js');

describe('updatePost', () => {
  it('Actualiza el post', async () => {
    const result = await updatePost(null, 'valor');
    expect(result).toStrictEqual({description: 'valor'});
  });
  it('No recibe valor', () => {});
});

describe('addLike', () => {
  it('Agrega el like', async () => {
    const result = await addLike(null, 'valor');
    expect(result).toStrictEqual({like: 'valor'});
  });
  it('No agrega el like', () => {});
});
