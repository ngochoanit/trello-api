import express from 'express'
import { BoardController } from '*/controllers/board.controller'
import { BoardValidation } from '*/validations/board.validation'

const router = express.Router()
/**\
 * Create new Board
 */
router.route('/')
    // .get((req, res) => { console.log('Get Boards') })
    .post(BoardValidation.createNew, BoardController.createNew)
/**\
 * Get and PUT Board
 */
router.route('/:id')
    .get(BoardController.getFullBoard)
    .put(BoardValidation.update, BoardController.update)
export const BoardRoutes = router