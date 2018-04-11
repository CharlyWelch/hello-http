const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { assert, expect } = chai;
const app = require('../lib/app');

describe('HTTP app', () => {

    it('Says Hello stranger on GET with no params', () => {
        return chai.request(app)
            .get('/greeting')
            .then(response => {
                assert.equal(response.text, 'Hello stranger!');
            });
    });

    it('Says Hello {name} if given a name', () => {
        return chai.request(app)
            .get('/greeting/Norman')
            .then(response => {
                assert.equal(response.text, 'Hello Norman!');
            });
    });

    it('Says {salutation} {name} if given a name and salutation', () => {
        return chai.request(app)
            .get('/greeting/Norman?salutation=Yo')
            .then(response => {
                assert.equal(response.text, 'Yo Norman!');
            });
    });

    it('returns a fact on /fact path', () => {
        return chai.request(app)
            .get('/fact')
            .then(response => {
                expect(response.body).to.have.property('fact');
            });
    });
    
    it('returns a sea fact on /seafact path', () => {
        return chai.request(app)
            .get('/seafact')
            .then(response => {
                expect(response.body).to.have.property('seaFact');
            });
    });

    it('sends 404 response if path not found', () => {
        return chai.request(app)
            .get('/nope')
            .then(response => {
                assert.equal(response.status, 404);
            }); 
    });
});