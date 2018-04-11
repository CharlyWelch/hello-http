const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { assert } = chai;
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
});