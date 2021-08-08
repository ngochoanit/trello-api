import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'

/**
 *   Define Column collection
 */

const columnCollection = 'columns'

const columnCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().required().min(3).max(20).trim(),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}
/**
 *Create new column
 */
const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB().collection(columnCollection).insertOne(value)
        return result
    }
    catch (error) {
        throw new Error(error)
    }
}
/**
 *Update new column
 */
const update = async (id, data) => {
    try {
        const result = getDB().collection(columnCollection).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: data },
            {
                upsert: true,
                returnNewDocument: true
            }
        )
        return result
    }
    catch (error) {
        throw new Error(error)
    }
}
export const ColumnModel = { createNew, update }