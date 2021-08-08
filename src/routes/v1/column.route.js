import express from 'express'
import { ColumnController } from '*/controllers/column.controller'
import { ColumnValidation } from '*/validations/column.validation'

const router = express.Router()
/**\
 * Create new Column
 */
router.route('/')
    // .get((req, res) => { console.log('Get Columns') })
    .post(ColumnValidation.createNew, ColumnController.createNew)
/**\
 * Update Column
 */
router.route('/:id')
    // .get((req, res) => { console.log('Get Columns') })
    .put(ColumnValidation.update, ColumnController.update)

export const ColumnRoutes = router