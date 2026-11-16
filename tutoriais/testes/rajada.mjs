// Dispara 11 chamadas seguidas ao Gateway (limite do plano básico = 10/min)
for (let i = 1; i <= 11; i++) {
  const res = await fetch('http://localhost:3000/api/veiculos', {
    headers: { 'X-API-Key': 'chave-app-locatario-123' }
  });
  const retry = res.headers.get('retry-after');
  console.log(`Chamada ${String(i).padStart(2)} -> ${res.status} ${res.statusText}` + (retry ? `  (Retry-After: ${retry})` : ''));
}
