const db = require('./db');
const bcrypt = require('bcryptjs'); // npm install bcryptjs

const senha = bcrypt.hashSync('123456', 10);

db.prepare(`
  INSERT OR IGNORE INTO empresas (id, nome, email, senha_hash)
  VALUES (1, 'TechNova Ltda', 'contato@technova.com', ?)
`).run(senha);

db.prepare(`
  INSERT INTO vagas (titulo, empresa_id, tipo, tecnologias, salario, descricao)
  VALUES (?, 1, ?, ?, ?, ?)
`).run(
  'Dev Frontend React',
  'remoto',
  'React,TypeScript,CSS',
  'R$ 6.000 – R$ 9.000',
  'Vaga para desenvolvimento de interfaces modernas.'
);

console.log('Seed concluído!');