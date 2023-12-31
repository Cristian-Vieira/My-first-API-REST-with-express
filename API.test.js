const request = require('supertest');
const { app, closeServer } = require('./API');

describe('Testes para os Endpoints da API', () => {
  let chilliId;

  // Teste para o endpoint POST /chillies
  describe('POST /chillies', () => {
    it('Teste 1: adicionar uma nova pimenta', async () => {
      const newChilli = { name: 'Habanero', scoville: 350000 };

      const res = await request(app).post('/chillies').send(newChilli);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toEqual(newChilli.name);
      expect(res.body.scoville).toEqual(newChilli.scoville);

      chilliId = res.body.id; // Salva o ID da pimenta para ser usado nos testes posteriores
    });
  });

  // Teste para o endpoint GET /chillies
  describe('GET /chillies', () => {
    it('Teste 2: retornar todas as pimentas', async () => {
      const res = await request(app).get('/chillies');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  // Teste para o endpoint GET /chillies/:id
  describe('GET /chillies/:id', () => {
    it('Teste 3: retornar uma pimenta específica por ID', async () => {
      const res = await request(app).get(`/chillies/${chilliId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBeDefined();
    });

    it('Teste 4: retornar um status 404 se a pimenta não for encontrada', async () => {
      const res = await request(app).get('/chillies/999');
      expect(res.statusCode).toEqual(404);
    });
  });

  // Teste para o endpoint PUT /chillies/:id
  describe('PUT /chillies/:id', () => {
    it('Teste 5: atualizar uma pimenta existente por ID', async () => {
      const updatedChilli = { name: 'Ghost Pepper', scoville: 1000000 };

      const res = await request(app).put(`/chillies/${chilliId}`).send(updatedChilli);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toEqual(updatedChilli.name);
      expect(res.body.scoville).toEqual(updatedChilli.scoville);
    });

    it('Teste 6: retornar um status 400 se a pimenta não for encontrada', async () => {
      const res = await request(app).put('/chillies/999').send({ name: 'Invalid Chilli' });
      expect(res.statusCode).toEqual(400);
    });
  });

  // Teste para o endpoint DELETE /chillies/:id
  describe('DELETE /chillies/:id', () => {
    it('Teste 7: excluir uma pimenta por ID', async () => {
      const res = await request(app).delete(`/chillies/${chilliId}`);
      expect(res.statusCode).toEqual(200);
    });

    it('Teste 8: retornar um status 400 se a pimenta não for encontrada', async () => {
      const res = await request(app).delete('/chillies/999');
      expect(res.statusCode).toEqual(400);
    });
  });

  // Encerra o servidor após a conclusão dos testes
  afterAll(async () => {
    await closeServer();
  });
});
