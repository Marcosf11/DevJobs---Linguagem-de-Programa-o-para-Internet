const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../../devjobs.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS empresas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS vagas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    empresa_id INTEGER NOT NULL,
    tipo TEXT CHECK(tipo IN ('remoto','presencial','hibrido')) NOT NULL,
    tecnologias TEXT NOT NULL,
    salario TEXT,
    cep TEXT,
    cidade TEXT,
    estado TEXT,
    descricao TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (empresa_id) REFERENCES empresas(id)
  );
`);

module.exports = db;