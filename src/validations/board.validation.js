import Joi from 'joi'
import { HttpStatusCode } from '*/utilities/constants'

/**
 * validation for create new Board
 */
const createNew = async (req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim()
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
export const BoardValidation = { createNew }