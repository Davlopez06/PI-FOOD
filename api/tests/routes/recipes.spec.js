/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Carne',
  summary:"Algo",
  healthScore: 50,
  steps:"Algo",
  diets:["Vegan"]
};
async function clean(){
  await Recipe.sync({ force: true })
}

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('POST /recipes', () => {
    it('Create', () =>{
    clean()
      agent.post('/recipes')
      .send({
        name: 'Milanesa a la napolitana',
        summary:"Algo",
        healthScore: 50,
        steps:"Algo",
        diets:["Vegan"]
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql({exito:"Guardo con exito"})
      })
    }
    );
    (Recipe.findAll())
    .then(db=>console.log(JSON.stringify(db)))
    
    it('Same name', () =>{
    clean()
    Recipe.create(recipe)
    agent.post('/recipes')
    .send(recipe)
    .expect(500)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      expect(res.body).to.deep.eql({ error:"Error en la creacion"})
    })}
  );
    it('Send insufficient data', () =>{
      clean()
      agent.post('/recipes')
      .send({
        name: 'Milanesa a la napolitana',
        summary:"Algo",
        healthScore: 50,
        diets:["Vegan"]
      })
      .expect(500)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.deep.eql({error:"Datos insuficientes"})
      })
    }
    );   
  it('Invalit diet', () =>{
  clean()
  agent.post('/recipes')
  .send({
    name: 'Milanesa a la napolitana',
    summary:"Algo",
    healthScore: 50,
    steps:"Algo",
    diets:[]
  })
  .expect(500)
  .expect('Content-Type', /json/)
  .expect(function (res) {
    expect(res.body).to.deep.eql({error:"Error en la diet"})
  })}
);
  });
});
