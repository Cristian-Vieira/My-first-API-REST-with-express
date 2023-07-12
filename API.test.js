const request = require('supertest');
const app = require('./API'); 

describe('Testes para os Endpoints da API', () => {
  let chilliId;

  // Teste para o endpoint POST /chillies
  describe('POST /chillies', () => {
    it('deve adicionar uma nova pimenta', async () => {
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
    it('deve retornar todas as pimentas', async () => {
      const res = await request(app).get('/chillies');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  // Teste para o endpoint GET /chillies/:id
  describe('GET /chillies/:id', () => {
    it('deve retornar uma pimenta específica por ID', async () => {
      const res = await request(app).get(`/chillies/${chilliId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBeDefined();
      expect(res.body.scoville).toBeDefined();
    });

    it('deve retornar um status 400 se a pimenta não for encontrada', async () => {
      const res = await request(app).get('/chillies/999');
      expect(res.statusCode).toEqual(400);
    });
  });

  // Teste para o endpoint PUT /chillies/:id
  describe('PUT /chillies/:id', () => {
    it('deve atualizar uma pimenta existente por ID', async () => {
      const updatedChilli = { name: 'Ghost Pepper', scoville: 1000000 };

      const res = await request(app).put(`/chillies/${chilliId}`).send(updatedChilli);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toEqual(updatedChilli.name);
      expect(res.body.scoville).toEqual(updatedChilli.scoville);
    });

    it('deve retornar um status 400 se a pimenta não for encontrada', async () => {
      const res = await request(app).put('/chillies/999').send({ name: 'Invalid Chilli' });
      expect(res.statusCode).toEqual(400);
    });
  });

  // Teste para o endpoint DELETE /chillies/:id
  describe('DELETE /chillies/:id', () => {
    it('deve excluir uma pimenta por ID', async () => {
      const res = await request(app).delete(`/chillies/${chilliId}`);
      expect(res.statusCode).toEqual(200);
    });

    it('deve retornar um status 400 se a pimenta não for encontrada', async () => {
      const res = await request(app).delete('/chillies/999');
      expect(res.statusCode).toEqual(400);
    });
  });
});
