
const test = require("supertest")
const express = require("express")

const app = express()

describe("Endpoint test", () => {
  it('creates a get request on /', async () => {
    test(app)
    .get('/')
    .expect(function (res) {
      var code = 200;
      expect(res.status).toBe(code);
      done();
    })
  })
})