import * as Knex from 'knex';
import { TableBuilder } from 'knex';

exports.up = async (knex: Knex): Promise<any> => {
    await knex.schema
        .table('entity', (table: TableBuilder) => {
            table.integer('clickcount').defaultTo(0);
        });
};

exports.down = async (knex: Knex): Promise<any> => {
    knex.raw('drop extension if exists "uuid-ossp"');
    await knex.schema
        .table('entity', (table: TableBuilder) => {
            table.dropColumn('clickcount');
        });
};
