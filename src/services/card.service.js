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

export const CardService = { createNew }