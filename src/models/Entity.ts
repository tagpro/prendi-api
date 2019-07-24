import { Model } from 'objection';
import { join } from 'path';

export default class Entity extends Model {

    public static tableName = 'entity';

    public id!: string;
    public createdAt?: string;
    public updatedAt?: string;
    public canvas: string;

    public $beforeInsert() {
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    public $beforeUpdate() {
        this.updatedAt = new Date().toISOString();
    }
}
