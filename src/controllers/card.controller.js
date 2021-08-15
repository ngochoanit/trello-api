import { CardService } from '*/services/Card.service'
import { HttpStatusCode } from '*/utilities/constants'

/**
 * controller create new card
 */
const createNew = async (req, res) => {
    try {
        const result = await CardService.createNew(req.body)
        res.status(HttpStatusCode.OK).json({
            result
        })
    }
    catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}
/**
 * controller update card
 */
const update = async (req, res) => {
    try {
        const { id } = req.params
        const result = await CardService.update(id, req.body)
        res.status(HttpStatusCode.OK).json({
            result
        })
    }
    catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}
export const CardController = { createNew, update }