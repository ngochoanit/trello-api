import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectId } from 'mongodb'

//define Board collection

const cardCollection = 'cards'

const cardCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(3).max(50).trim(),
    cover: Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updateddAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await cardCollectionSchema.validateAsync(data, { allowUnknown: true, abortEarly: false })
}
/**
 *Create new Card
 */
const createNew = async (data) => {
    try {
        const validatedValue = await validateSchema(data)
        const insertValue = {
            ...validatedValue,
            boardId: ObjectId(validatedValue.boardId),
            columnId: ObjectId(validatedValue.columnId)
        }
        const result = await getDB().collection(cardCollection).insertOne(insertValue)
        return result.ops[0] || {}
    }
    catch (error) {
        throw new Error(error)
    }
}
/**
 *delete many card in the card
 */
const deleteMany = async (columnId) => {
    try {
        const result = await getDB().collection(cardCollection).updateMany(
            { columnId: ObjectId(columnId) },
            { $set: { _destroy: true } }
        )
    }
    catch (error) {
        throw new Error(error)
    }
}
/**
 *Update card
 */
const update = async (id, data) => {
    try {
        const updatedCard = await getDB().collection(cardCollection).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: data },
            {
                upsert: false,
                returnDocument: 'after'
            }
        )
        return updatedCard.value
    }
    catch (error) {
        throw new Error(error)
    }
}
export const CardModel = { cardCollection, createNew, deleteMany, update }