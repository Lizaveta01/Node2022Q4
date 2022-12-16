import request from 'supertest';
import { server } from '../index';

afterEach(() => {
  server.close();
});

describe("API test", () => {
  describe("GET", () => {

    it("should respond with a 200 status code", async () => {
      const response = await request(server).get("/api/users")

      expect(response.statusCode).toBe(200)
    })


  })

});
