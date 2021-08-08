import { ColumnModel } from '*/models/column.model'

/**
 * service create new column
*/
const createNew = async (data) => {
    try {
        const result = await ColumnModel.createNew(data)
        return result
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