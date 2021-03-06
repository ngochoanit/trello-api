import { ColumnService } from '*/services/column.service'
import { HttpStatusCode } from '*/utilities/constants'

/**
 * controller create new column
 */
const createNew = async (req, res) => {
    try {
        const result = await ColumnService.createNew(req.body)
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
 * controller update column
 */
const update = async (req, res) => {
    try {
        const { id } = req.params
        const result = await ColumnService.update(id, req.body)
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
export const ColumnController = { createNew, update }