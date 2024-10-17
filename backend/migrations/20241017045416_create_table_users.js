/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('users').then(function(exists) {
    if(!exists){

    
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('user_name').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.string('role').notNullable();
    
    })
}
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.hasTable('users').then(function(exists) {
        if(exists){
            return knex.schema.dropTable('users');
        }
    })
};
