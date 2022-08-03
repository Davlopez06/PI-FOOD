const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({summary:"Algo", healthScore: 50, steps:"Algo"})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana',summary:"Algo", healthScore: 50, steps:"Algo" });
      });
    });
    describe('summary', () => {
      it('should throw an error if summary is null', (done) => {
        Recipe.create({name:"Carne con arroz", healthScore: 50, steps:"Algo"})
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a valid summary', () => {
        Recipe.create({ name: 'Milanesa a la napolitana',summary:"Algo", healthScore: 50, steps:"Algo" });
      });
    });
    describe('healthScore', () => {
      it('should throw an error if healthScore is null', (done) => {
        Recipe.create({name: 'Milanesa a la napolitana',summary:"Algo", steps:"Algo"})
          .then(() => done(new Error('It requires a valid healthScore')))
          .catch(() => done());
      });
      it('should work when its a valid healthScore', () => {
        Recipe.create({ name: 'Milanesa a la napolitana',summary:"Algo", healthScore: 50, steps:"Algo" });
      });
    });
    describe('steps', () => {
      it('should throw an error if steps is null', (done) => {
        Recipe.create({name: 'Milanesa a la napolitana',summary:"Algo", healthScore: 50})
          .then(() => done(new Error('It requires a valid steps')))
          .catch(() => done());
      });
      it('should work when its a valid steps', () => {
        Recipe.create({ name: 'Milanesa a la napolitana',summary:"Algo", healthScore: 50, steps:"Algo" });
      });
    });
  });
});


