import * as Knex from 'knex';
import { TableBuilder } from 'knex';

exports.up = async (knex: Knex): Promise<any> => {
    await knex.schema
        .table('entity', (table: TableBuilder) => {
            table.text('canvas').defaultTo('');
            // Adds createdAt and updatedAt in the database and defaults to now
            table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
            table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
        });
};

exports.down = async (knex: Knex): Promise<any> => {
    knex.raw('drop extension if exists "uuid-ossp"');
    await knex.schema
        .table('entity', (table: TableBuilder) => {
            table.dropColumn('canvas');
            table.dropColumn('updatedAt');
            table.dropColumn('createdAt');
        });
};
