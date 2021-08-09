import { BoardModel } from '*/models/board.model'

/**
 * service create new board
*/
const createNew = async (data) => {
    try {
        const result = await BoardModel.createNew(data)
        return result
    }
    catch (error) {
        throw new Error(error)
    }
}
/**
 * service get full board
*/
const getFullBoard = async (id) => {
    try {
        const board = await BoardModel.getFullBoard(id)
        // add cards to each column
        if (!board || !board.columns) {
            throw new Error('Board not found')
        }
        board.columns.forEach(column => {
            column.cards = board.cards.filter((card) => { return card.columnId.toString() === column._id.toString() })
        })
        // remove card form data
        //
        delete board.cards
        return board
    }
    catch (error) {
        throw new Error(error)
    }
}
export const BoardService = { createNew, getFullBoard }