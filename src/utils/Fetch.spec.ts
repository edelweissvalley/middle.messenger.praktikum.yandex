import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import chai, { expect } from 'chai';
import mock from 'xhr-mock';

import { Fetch } from './fetch';

export const httpTransport: Fetch = new Fetch();

chai.use(deepEqualInAnyOrder);

describe('<<<---FETCH--->>>', () => {
  describe("Тест GET-запросы", () => {
    beforeEach(() => mock.setup());
    afterEach(() => mock.teardown());

    it('Корректный GET-запрос', async () => {
      mock.get('/test/get', (req, res) => {
        expect(req.method()).to.equal('GET');
        expect(req.url().toString()).to.equal('/test/get');

        return res.status(200).body('{"data":{"id":"abc-123"}}');
      });

      const response = await httpTransport.get('/test/get');
      expect(response.response).to.deep.equalInAnyOrder({ data: { id: 'abc-123' } });
    });
  });

  describe("Тест POST-запросы", () => {
    beforeEach(() => mock.setup());
    afterEach(() => mock.teardown());

    it('Корректность введённого метода', async () => {
      mock.post("/test/post", (req, res) => {
        expect(req.method()).to.equal("POST");
        return res.status(200).body('{"someResponse":"value2"}');
      });

      await httpTransport.post("/test/post");
    });

    it("Корректность введённого url", async () => {
      mock.post("/test/post", (req, res) => {
        expect(req.url().toString()).to.equal("/test/post");
        return res.status(200).body('{"someResponse":"value2"}');
      });

      await httpTransport.post("/test/post");
    });

    it("Корректность json header", async () => {
      mock.post("/test/post", (req, res) => {
        expect(req.header("Content-Type")).to.equal("application/json");

        return res.status(200).body('{"someResponse":"value2"}');
      });

      await httpTransport.post("/test/post", {
        data: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it("Корректность json payload", async () => {
      mock.post("/test/post", (req, res) => {
        expect(req.header("Content-Type")).to.equal("application/json");
        expect(req.body()).to.equal('{"someData":"value"}');
        return res.status(200).body("{}");
      });

      await httpTransport.post("/test/post", {
        data: JSON.stringify({ someData: "value", }),
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it('Корректность данных', async () => {
      mock.post("/test/post", (req, res) => {
        expect(req.header("Content-Type")).to.equal("application/json");
        expect(req.body()).to.equal('{"someData":"value"}');
        return res.status(200).body('{"someResponse":"value2"}');
      });

      const response = await httpTransport.post("/test/post", {
        data: JSON.stringify({ someData: "value" }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.response).to.deep.equalInAnyOrder({ someResponse: "value2" });
    });
  });

  describe("Тест PUT-запросы", () => {
    beforeEach(() => mock.setup());
    afterEach(() => mock.teardown());

    it('Корректность введённого метода', async () => {
      mock.put("/test/put", (req, res) => {
        expect(req.method()).to.equal("PUT");
        return res.status(200).body('{"someResponse":"value2"}');
      });

      await httpTransport.put("/test/put");
    });

    it("Корректность введённого url", async () => {
      mock.put("/test/put", (req, res) => {
        expect(req.url().toString()).to.equal("/test/put");
        return res.status(200).body('{"someResponse":"value2"}');
      });

      await httpTransport.put("/test/put");
    });

    it("Корректность json header", async () => {
      mock.put("/test/put", (req, res) => {
        expect(req.header("Content-Type")).to.equal("application/json");
        return res.status(200).body('{"someResponse":"value2"}');
      });

      await httpTransport.put("/test/put", {
        data: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it("Корректность json payload", async () => {
      mock.put("/test/put", (req, res) => {
        expect(req.header("Content-Type")).to.equal("application/json");
        expect(req.body()).to.equal('{"someData":"value"}');
        return res.status(200).body("{}");
      });

      await httpTransport.put("/test/put", {
        data: JSON.stringify({ someData: "value" }),
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it('Корректность данных', async () => {
      mock.put("/test/put", (req, res) => {
        expect(req.header("Content-Type")).to.equal("application/json");
        expect(req.body()).to.equal('{"someData":"value"}');
        return res.status(200).body('{"someResponse":"value2"}');
      });

      const response = await httpTransport.put("/test/put", {
        data: JSON.stringify({ someData: "value" }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.response).to.deep.equalInAnyOrder({ someResponse: "value2" });
    });
  });

  describe("Тест DELETE-запросы", () => {
    beforeEach(() => mock.setup());
    afterEach(() => mock.teardown());

    it('Корректность введённого метода', async () => {
      mock.delete("/test/delete", (req, res) => {
        expect(req.method()).to.equal("DELETE");
        return res.status(200).body('{"someResponse":"value2"}');
      });

      await httpTransport.delete("/test/delete");
    });

    it('Корректность введённого url', async () => {
      mock.delete("/test/delete", (req, res) => {
        expect(req.url().toString()).to.equal("/test/delete");
        return res.status(200).body('{"someResponse":"value2"}');
      });

      await httpTransport.delete("/test/delete");
    });

    it('Корректность json header', async () => {
      mock.delete("/test/delete", (req, res) => {
        expect(req.header("Content-Type")).to.equal("application/json");
        return res.status(200).body('{"someResponse":"value2"}');
      });

      await httpTransport.delete("/test/delete", {
        data: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it('Корректность json payload', async () => {
      mock.delete("/test/delete", (req, res) => {
        expect(req.header("Content-Type")).to.equal("application/json");
        expect(req.body()).to.equal('{"someData":"value"}');
        return res.status(200).body("{}");
      });

      await httpTransport.delete("/test/delete", {
        data: JSON.stringify({ someData: "value" }),
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it('Корректность данных', async () => {
      mock.delete("/test/delete", (req, res) => {
        expect(req.header("Content-Type")).to.equal("application/json");
        expect(req.body()).to.equal('{"someData":"value"}');
        return res.status(200).body('{"someResponse":"value2"}');
      });

      const response = await httpTransport.delete("/test/delete", {
        data: JSON.stringify({ someData: "value" }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.response).to.deep.equalInAnyOrder({ someResponse: "value2" });
    });
  });
});
