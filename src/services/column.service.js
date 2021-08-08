import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'
import { ObjectId } from 'mongodb'

/**
 * service create new column
*/
const createNew = async (data) => {
    try {
        const newColumn = await ColumnModel.createNew(data)
        //update columnOrder array in the Board
        const boardId = ObjectId(data.boardId)
        const columnId = newColumn.insertedId
        const updatedBoard = await BoardModel.pushColumOrder(boardId, columnId.toString())
        return newColumn
    }
    catch (error) {
        throw new Error(error)
    }
}
/**
 * service create new column
*/
const update = async (id, data) => {
    try {
        const updateDate = { ...data, updatedAt: Date.now() }
        const result = await ColumnModel.update(id, updateDate)
        return result
    }
    catch (error) {
        throw new Error(error)
    }
}
export const ColumnService = { createNew, update }