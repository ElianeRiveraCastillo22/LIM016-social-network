export const auth = jest.fn();
auth.currentUser = {
  uid: 'fake-user-id',
};

export const setDoc = jest.fn((document, values) => Promise.resolve(values));

export const doc = jest.fn((db, collection, docID) => Promise.resolve({}));

export const db = jest.fn({});

export const updateDoc = jest.fn((theDoc, obj) => Promise.resolve(obj));

export const addDoc = jest.fn();

export const collection = jest.fn((db, obj) => Promise.resolve({}));
