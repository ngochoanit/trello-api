import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '*/config/mongodb'

/**
 *   Define Column collection
 */

const columnCollection = 'columns'

const columnCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().required().min(3).max(50).trim(),
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
        const validatedValue = await validateSchema(data)
        const insertValue = {
            ...validatedValue,
            boardId: ObjectId(validatedValue.boardId)
        }
        const result = await getDB().collection(columnCollection).insertOne(insertValue)
        return result
    }
    catch (error) {
        throw new Error(error)
    }
}
/**
 *Push column order
 */
const pushCardOrder = async (columnId, cardId) => {
    try {
        const result = await getDB().collection(columnCollection).findOneAndUpdate(
            { _id: columnId },
            { $push: { cardOrder: cardId } },
            {
                upsert: true,
                returnNewDocument: true
            })
        console.log(result)
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
export const ColumnModel = { columnCollection, createNew, pushCardOrder, update }