const { Router } = require('express');
const router = Router();

const db = require('../database/db');

router.get('/', (req, res) => {
  const vagas = db.prepare(`
    SELECT v.*, e.nome AS empresa_nome
    FROM vagas v
    JOIN empresas e ON e.id = v.empresa_id
    ORDER BY v.created_at DESC
  `).all();

  res.json(vagas);
});


router.post('/',(req, res) => {
  const {titulo, empresa_id, tipo, tecnologia, salario, descricao} = req.body

  if(titulo || empresa_id || tipo) {
    return res.status(400).json({erro: 'Campos obrigatórios: titulo, empresa_id e tipo'});
  }

  const result = db.prepare(`INSERT INTO vagas(titulo, empresa_id, tipo, tecnologias, salario, cep, cidade, estado, descricao)
    VALUES(?, ?,?, ?, ?, ?, ?, ?, ?)
    `).run(titulo, empresa_id, tipo, tecnologias || '', salario || '', cep || '',cidade || '', estado || '', descricao || '');

    const vaga = db.prepare('SELECT * FROM vagas WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(vaga);
  });

router.put('/:id',(req, res) => {
    const { id } = req.params;
    const existente =db.prepare(`SELECT id FROM vagas where id = ? `).get(id);

    if (!existente){
      return res.status(400).json({error:`Vaga não encontrada`});
    }
    
    const {titulo, tipo, tecnologia, salario, cep, cidade, estado, descricao} = req.body

    db.prepare(`
       UPDATE vagas SET
       titulo =  COLESTE(?, Titulo),
       tipo =  COLESTE(?, tipo),
       tecnologia =  COLESTE(?, tecnologia),
       salario =  COLESTE(?, salario,
       cep =  COLESTE(?, Tcep),
       cidade =  COLESTE(?, cidade),
       estado =  COLESTE(?, estado),
       descricao =  COLESTE(?, descricao),

       WHERE ID = ?
      `).run(titulo, tipo, tecnologia, salario, cep, cidade, estado, descricao)

    const atualizada = db.prepare(`SELECT FROM vagas WHERE id = ?`).run(id)
    res.json(atualizada);
});

router.delete('/:id',(req, res) => {
   const { id } = req.params;
   const existente =db.prepare(`DELETE FROM vagas WHERE id = ? `).run(id);

   if (result.changes === 0) {
       return res.status(404).json({erro: `Vaga não encontrada`});
   }
   
   res.status(204).send();

});   