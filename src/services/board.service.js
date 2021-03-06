import { BoardModel } from '*/models/board.model'
import { cloneDeep } from 'lodash'
import { ObjectId } from 'mongodb'
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
        const transformBoard = cloneDeep(board)
        //Finter deleted column
        transformBoard.columns = transformBoard.columns.filter(column => !column._destroy)
        //Finter deleted card
        transformBoard.cards = transformBoard.cards.filter(card => !card._destroy)
        transformBoard.columns.forEach(column => {
            column.cards = board.cards.filter((card) => { return card.columnId.toString() === column._id.toString() })
        })
        // remove card form data
        //
        delete transformBoard.cards
        return transformBoard
    }
    catch (error) {
        throw new Error(error)
    }
}
/**
 * service update board
*/
const update = async (id, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now(), boardId: ObjectId(data.boardId) }
        if (updateData._id) delete updateData._id
        if (updateData.columns) delete updateData.columns
        const updatedBoard = await BoardModel.update(id, updateData)

        return updatedBoard
    }
    catch (error) {
        throw new Error(error)
    }
}
export const BoardService = { createNew, getFullBoard, update }