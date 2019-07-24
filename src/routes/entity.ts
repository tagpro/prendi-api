import * as express from 'express';
const router = express.Router();

import { transaction, Transaction } from 'objection';
import Entity from '../models/Entity';

/**
 * @typedef Entity
 * @property {string} id - URI of the container entity
 * @property {string} canavs - data URL from canvas
 * @property {string} createdAt - Creation datetime in iso 8601 format
 * @property {string} updatedAt - Last updated datetime in iso 8601 format
 */

router.get('/entity', async (req, res, next) => {
  try {
    const entities = await Entity
      .query().orderBy('id');
    if (entities.length) {
      res.json(entities[0]);
    } else {
      res.json({});
    }
  } catch (error) {
    res.status(400).json({ error: error.message ? error.message : error });
  }
});

/**
 * This API updates the entity present in the database.
 * There is no filter options available as of now.
 *
 * @route Post /entity/
 * @group entity -Operations on Entity. Entity is a container
 * or packets or anything that can be considered as an inventory item.
 * @param {Entity.model} entity.body.required - New Entity details. Refer to models for more details
 * @param {string} entityId.path.required - Entity Id
 * @returns {Entity} 200 - Details of an entity
 * @returns {Error}  default - Unexpected error
 */
router.post('/entity', async (req: express.Request, res: express.Response, next) => {
  const entityDetails = {
    ...req.body,
  };

  try {
    // I have the liberty to make multiple database calls because this appliation only allows one canvas.
    // This can be optimized if we have multiple users.
    const entity = await Entity.query().orderBy('id');
    if (entity.length > 0) {
      await Entity.query().findById(entity[0].id)
        .patch(req.body)
        ;

    } else {
      await Entity
        .query()
        .insert(req.body);
    }

    res.status(201).send();
  } catch (error) {
    res.status(400).send({ error, message: 'Could not insert a new entity' });
  }
  next();
});

export default router;
