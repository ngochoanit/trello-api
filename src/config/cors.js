import { WHILE_LIST } from '*/utilities/contans'
export const corsOptions = {
    origin: function (origin, callback) {
        if (WHILE_LIST.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error(`${origin}Not allowed by CORS`))
        }
    },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}