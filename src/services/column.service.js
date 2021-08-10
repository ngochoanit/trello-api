import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'
import { CardModel } from '*/models/card.model'
import { ObjectId } from 'mongodb'

/**
 * service create new column
*/
const createNew = async (data) => {
    try {
        const newColumn = await ColumnModel.createNew(data)
        //update columnOrder and cards array in the Board
        newColumn.cardOrder = []
        newColumn.cards = []
        const boardId = ObjectId(newColumn.boardId)
        const columnId = newColumn._id
        await BoardModel.pushColumOrder(boardId, columnId.toString())
        return newColumn
    }
    catch (error) {
        throw new Error(error)
    }
}
/**
 * service update new column
*/
const update = async (id, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now(), boardId: ObjectId(data.boardId) }
        if (updateData._id) delete updateData._id
        if (updateData.cards) delete updateData.cards
        const updateColumn = await ColumnModel.update(id, updateData)
        if (updateColumn._destroy) {
            //delete many card in this column
            await CardModel.deleteMany(id)

        }
        updateColumn.cards = data.cards

        return updateColumn
    }
    catch (error) {
        throw new Error(error)
    }
}
export const ColumnService = { createNew, update }