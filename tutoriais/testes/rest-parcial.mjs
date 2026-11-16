// Substituto da API REST para a Cena 7: responde a locação, mas o serviço de veículos "está fora do ar".
import express from 'express';
const app = express();
app.get('/locacoes/:id', (req, res) => {
  console.log(`[REST PARCIAL] [${req.headers['x-request-id']}] GET /locacoes/${req.params.id}`);
  res.json({ id: 1, veiculoId: 'v1111111-1111-1111-1111-111111111111', locatarioId: 'u1000000-0000-0000-0000-000000000100',
    dataInicio: '2026-11-15T10:00:00Z', dataFim: '2026-11-20T10:00:00Z', valorTotal: 750, status: 'CONFIRMADA' });
});
app.get('/veiculos/:id', (req, res) => {
  console.log(`[REST PARCIAL] [${req.headers['x-request-id']}] GET /veiculos/... -> 503 (veículos fora do ar)`);
  res.status(503).json({ title: 'Serviço de veículos indisponível' });
});
app.listen(3001, '127.0.0.1', () => console.log('[REST PARCIAL] Ativo em 127.0.0.1:3001 (veículos fora do ar)'));
