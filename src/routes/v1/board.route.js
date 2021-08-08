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

export const BoardRoutes = router