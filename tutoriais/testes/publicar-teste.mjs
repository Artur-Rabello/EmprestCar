import amqp from 'amqplib';
const [,, tipo] = process.argv;
const conn = await amqp.connect('amqp://localhost:5672');
const ch = await conn.createChannel();
await ch.assertExchange('frota.eventos', 'topic', { durable: true });
const opts = { persistent: true, headers: { 'X-Request-Id': `teste-${tipo}` } };
if (tipo === 'duplicada') {
  const evento = { evento: 'locacao.criada', locacaoId: 99, veiculoId: 'v1', locatarioId: 'u1' };
  for (let i = 0; i < 2; i++) ch.publish('frota.eventos', 'locacao.criada', Buffer.from(JSON.stringify(evento)), opts);
} else if (tipo === 'invalida') {
  ch.publish('frota.eventos', 'locacao.criada', Buffer.from('isto nao e json {{{'), opts);
}
await ch.close(); await conn.close();
