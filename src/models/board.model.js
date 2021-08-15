import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectId } from 'mongodb'
import { ColumnModel } from './column.model'
import { CardModel } from './card.model'

//define Board collection

const boardCollection = 'boards'

const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(50).trim(),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updateddAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await boardCollectionSchema.validateAsync(data, { allowUnknown: true, abortEarly: false })
}
/**
 *Create new board
 */
const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB().collection(boardCollection).insertOne(value)
        return result.ops[0] || {}
    }
    catch (error) {
        throw new Error(error)
    }
}
/**
 *Push column order
 */
const pushColumOrder = async (boardId, columnId) => {
    try {
        const result = await getDB().collection(boardCollection).findOneAndUpdate(
            { _id: boardId },
            { $push: { columnOrder: columnId } },
            {
                upsert: false,
                returnDocument: 'after'
            })
        return result
    }
    catch (error) {
        throw new Error(error)
    }
}
/**
 *get full board
 */
const getFullBoard = async (id) => {
    try {
        const result = await getDB().collection(boardCollection).aggregate([
            { $match: { _id: ObjectId(id), _destroy: false } },
            {
                $lookup: {
                    from: ColumnModel.columnCollection,
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'columns'
                }
            },
            {
                $lookup: {

                    from: CardModel.cardCollection,
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'cards'
                }
            }

        ]).toArray()
        return result[0] || {}
    }
    catch (error) {
        throw new Error(error)
    }
}
/**
 *Update Board
 */
const update = async (id, data) => {
    try {
        const updatedBoard = await getDB().collection(boardCollection).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: data },
            {
                upsert: false,
                returnDocument: 'after'
            }
        )
        return updatedBoard.value
    }
    catch (error) {
        throw new Error(error)
    }
}
export const BoardModel = { createNew, pushColumOrder, getFullBoard, update }