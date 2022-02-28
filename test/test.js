const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiJsonSchemaAjv = require('chai-json-schema-ajv')
const server = require('../index')
const expect = chai.expect

chai.use(chaiHttp)
chai.should()
chai.use(chaiJsonSchemaAjv);

let token = ""
listingID = ""

describe('sell-buy REST API tests', () => {

    // GET all listings
    describe('GET /listings', function () {
        it('should return status 200 and not error', function (done) {
            chai.request(server)
                .get('/api/listings')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    done();
                })
        })
    })

    // GET all listings
    describe('GET /listings', function () {
        it('should return a array of objects', function (done) {
            chai.request(server)
                .get('/api/listings')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res.body).to.be.an('array')
                    expect(res.body[0]).to.be.an('object')
                    done();
                })
        })
    })

    // GET single listing
    describe('GET /listings/:listingID', function () {
        it('should return status 200 and not error', function (done) {
            chai.request(server)
                .get('/api/listings/621be5840eff42e143166498')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    done();
                })
        })
    })

    // GET single listing
    describe('GET /listings/:listingID', function () {
        it('should return object', function (done) {
            chai.request(server)
                .get('/api/listings/621be5840eff42e143166498')
                .end(function (err, res) {
                    expect(res.body).to.be.an('object')
                    done();
                })
        })
    })

    // GET listings by category
    describe('GET /listings/:category', function () {
        it('should return status 200 and not error', function (done) {
            chai.request(server)
                .get('/api/listings/category/lelut')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    done();
                })
        })
    })

    // GET listings by category
    describe('GET /listings/:category', function () {
        it('should return an array of objects', function (done) {
            chai.request(server)
                .get('/api/listings/category/lelut')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res.body).to.be.an('array')
                    expect(res.body[0]).to.be.an('object')
                    done();
                })
        })
    })

    // GET listings by location
    describe('GET /listings/:location', function () {
        it('should return status 200 and not error', function (done) {
            chai.request(server)
                .get('/api/listings/location/oulu')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    done();
                })
        })
    })

    // GET listings by location
    describe('GET /listings/:location', function () {
        it('should return an array of objects', function (done) {
            chai.request(server)
                .get('/api/listings/location/oulu')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res.body).to.be.an('array')
                    expect(res.body[0]).to.be.an('object')
                    done();
                })
        })
    })

    // GET listings by date
    describe('GET /listings/:date', function () {
        it('should return status 200 and not error', function (done) {
            chai.request(server)
                .get('/api/listings/date/20220226')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    done();
                })
        })
    })

    // GET listings by date
    describe('GET /listings/:date', function () {
        it('should return an array of objects', function (done) {
            chai.request(server)
                .get('/api/listings/date/20220226')
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res.body).to.be.an('array')
                    expect(res.body[0]).to.be.an('object')
                    done();
                })
        })
    })

    // POST new user
    describe('POST /users', function () {
        it('should return error 400 because required information missing', function (done) {
            chai.request(server)
                .post('/api/users')
                .send({
                    "username": "user12345",
                    "name": "Matti Meikälälinen",
                    "password": "salasana",
                    "email": "joonas.kinn@gmail.com"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(400)
                    done();
                })
        })
    })

    // POST new user
    describe('POST /users', function () {
        it('should return status 200', function (done) {
            chai.request(server)
                .post('/api/users')
                .send({
                    "username": "user12345",
                    "name": "Matti Meikälälinen",
                    "phone": "0404040404",
                    "password": "salasana",
                    "email": "email@somedomain.com"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    done();
                })
        })
    })

    // POST login
    describe('POST /login', function () {
        it('should return status 401 when wrong password given', function (done) {
            chai.request(server)
                .post('/api/login')
                .send({
                    "username": "user12345",
                    "password": "vaarasalasana"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401)
                    done();
                })
        })
    })

    // POST login
    describe('POST /login', function () {
        it('should return status 200 and access token', function (done) {
            chai.request(server)
                .post('/api/login')
                .send({
                    "username": "user12345",
                    "password": "salasana"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body.token).to.be.an('string')
                    token = res.body.token
                    done();
                })
        })
    })

    // POST new listing
    describe('POST /listings', function () {
        it('should return error 401 because token missing', function (done) {
            chai.request(server)
                .post('/api/listings')
                .send({
                    "title": "Auto",
                    "description": "Punainen auto",
                    "category": "Autot",
                    "location": "oulu",
                    "images": ["https://www.mallaway.co.za/wp-content/uploads/2019/07/car-exhibition-equipment-model-toy-crash-1447501-pxhere.com_.jpg"],
                    "price": 12000,
                    "deliverytype": "pickup"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401)
                    done();
                })
        })
    })

    // POST new listing
    describe('POST /listings', function () {
        it('should return error 400 because required information missing', function (done) {
            chai.request(server)
                .post('/api/listings')
                .auth(token, { type: 'bearer' })
                .send({
                    "description": "Punainen auto",
                    "category": "Autot",
                    "location": "oulu",
                    "images": ["https://www.mallaway.co.za/wp-content/uploads/2019/07/car-exhibition-equipment-model-toy-crash-1447501-pxhere.com_.jpg"],
                    "price": 12000,
                    "deliverytype": "pickup"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(400)
                    done();
                })
        })
    })

    // POST new listing
    describe('POST /listings', function () {
        it('should return status 200', function (done) {
            chai.request(server)
                .post('/api/listings')
                .auth(token, { type: 'bearer' })
                .send({
                    "title": "Auto",
                    "description": "Punainen auto",
                    "category": "Autot",
                    "location": "oulu",
                    "images": ["https://www.mallaway.co.za/wp-content/uploads/2019/07/car-exhibition-equipment-model-toy-crash-1447501-pxhere.com_.jpg"],
                    "price": 12000,
                    "deliverytype": "pickup"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    listingID = res.body.id
                    done();
                })
        })
    })

    // PUT update listing
    describe('PUT /listings/:listingID', function () {
        it('should return status 401 because token missing', function (done) {
            chai.request(server)
                .put('/api/listings/' + listingID)
                .send({
                    "price": 9900,
                    "description": "Sininen auto"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(401)
                    done();
                })
        })
    })

    // PUT update listing
    describe('PUT /listings/:listingID', function () {
        it('should return status 200 and object', function (done) {
            chai.request(server)
                .put('/api/listings/' + listingID)
                .auth(token, { type: 'bearer' })
                .send({
                    "price": 9900,
                    "description": "Sininen auto"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done();
                })
        })
    })

    // DELETE listing
    describe('DELETE /listings/:listingID', function () {
        it('should return error 401 because token missing', function (done) {
            chai.request(server)
                .delete('/api/listings/' + listingID)
                .end(function (err, res) {
                    expect(res).to.have.status(401)
                    done();
                })
        })
    })

    // DELETE listing
    describe('DELETE /listings/:listingID', function () {
        it('should return status 200', function (done) {
            chai.request(server)
                .delete('/api/listings/' + listingID)
                .auth(token, { type: 'bearer' })
                .end(function (err, res) {
                    expect(res).to.have.status(200)
                    done();
                })
        })
    })
})

server.close()