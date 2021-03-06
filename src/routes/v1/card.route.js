import express from 'express'
import { CardController } from '*/controllers/card.controller'
import { CardValidation } from '*/validations/card.validation'

const router = express.Router()
/**\
 * Create new card
 */
router.route('/')
    // .get((req, res) => { console.log('Get Cards') })
    .post(CardValidation.createNew, CardController.createNew)
/**\
 * PUT Card
 */
router.route('/:id')
    .put(CardValidation.update, CardController.update)
export const CardRoutes = router