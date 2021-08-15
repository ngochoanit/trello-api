import { CardModel } from '*/models/card.model'
import { ColumnModel } from '*/models/column.model'
import { ObjectId } from 'mongodb'

/**
 * service create new column
*/
const createNew = async (data) => {
    try {
        const newCard = await CardModel.createNew(data)
        //update columnOrder array in the Column
        const columnId = ObjectId(newCard.columnId)
        const cardId = newCard._id
        await ColumnModel.pushCardOrder(columnId, cardId.toString())
        return newCard
    }
    catch (error) {
        throw new Error(error)

    }
}
/**
 * service update card
*/
const update = async (id, data) => {
    try {
        const updateData = { ...data, updatedAt: Date.now(), boardId: ObjectId(data.boardId), columnId: ObjectId(data.columnId) }
        if (updateData._id) delete updateData._id
        const updatedCard = await CardModel.update(id, updateData)

        return updatedCard
    }
    catch (error) {
        throw new Error(error)
    }
}
export const CardService = { createNew, update }