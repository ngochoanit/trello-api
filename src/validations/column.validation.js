import Joi from 'joi'
import { HttpStatusCode } from '*/utilities/constants'

/**
 * validation for create new column
 */
const createNew = async (req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim(),
        boardId: Joi.string().required()
    })
    try {
        await condition.validateAsync(req.body, { allowUnknown: true, abortEarly: false })
        next()
    }
    catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            error: new Error(error).message
        })
    }
}
/**
 * validation for update column
 */
const update = async (req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().min(3).max(30).trim()
    })
    try {
        await condition.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
        next()
    }
    catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            error: new Error(error).message
        })
    }
}
export const ColumnValidation = { createNew, update }