import Joi from 'joi'
import { HttpStatusCode } from '*/utilities/contans'

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().required().min(3).max(20)
    })
    try {
        await condition.validateAsync(req.body, { abortEarly: false })
        next()
    }
    catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            error: new Error(error).message
        })
    }
}
export const BoardValidation = { createNew }