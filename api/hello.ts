import { RequestHandler } from 'express'
import { v4 as uuid } from 'uuid'

import { getDB  } from './db'

const handler: RequestHandler = async (req, res) => {
    if (/^localhost/gi.test(req.headers.host)) {
        res.status(418).send()
        return
    }

    const db = await getDB()
    db.collection('visits').insertOne({
        at: new Date(),
        host: req.headers.host ?? 'unknown',
        ua: req.headers['user-agent'] ?? 'unknown',
    }).catch(error => console.error(error))

    res.status(200).send('oh hi mark')
}

module.exports = handler
