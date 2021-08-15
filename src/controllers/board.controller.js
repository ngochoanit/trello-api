import { BoardService } from '*/services/board.service'
import { HttpStatusCode } from '*/utilities/constants'

/**
 * controller create new board
 */
const createNew = async (req, res) => {
    try {
        const result = await BoardService.createNew(req.body)
        res.status(HttpStatusCode.OK).json({
            result
        })
    }
    catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}
/**
 * controller get full board
 */
const getFullBoard = async (req, res) => {
    try {
        const { id } = req.params
        const result = await BoardService.getFullBoard(id)
        res.status(HttpStatusCode.OK).json({
            result
        })
    }
    catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}
/**
 * controller update board
 */
const update = async (req, res) => {
    try {
        const { id } = req.params
        const result = await BoardService.update(id, req.body)
        res.status(HttpStatusCode.OK).json({
            result
        })
    }
    catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const BoardController = { createNew, getFullBoard, update }