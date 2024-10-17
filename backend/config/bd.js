const knex = require('knex')({
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'project_AII',
      password: '12345',
      database: 'tarea_seguridad',
    },
  });
  
module.exports = knex;