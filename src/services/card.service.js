import { CardModel } from '*/models/card.model'

/**
 * service create new column
*/
const createNew = async (data) => {
    try {
        const result = await CardModel.createNew(data)
        return result
    }
    catch (error) {
        throw new Error(error)

    }
}

export const CardService = { createNew }