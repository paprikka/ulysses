import { RequestHandler } from 'express'
import { v4 as uuid } from 'uuid'

import { getDB } from './db'

const handler: RequestHandler = async (req, res) => {
    if (/^localhost/gi.test(req.headers.host)) {
        res.status(418).send()
        return
    }

    if (typeof req?.body !== 'string') {
        res.status(400).json({ error: 'missing or invalid email' })
        return
    }

    const db = await getDB()

    const coll = db.collection('waiting-list')

    const alreadyExists = await coll
        .findOne({ email: req.body })
        .then((val) => !!val)
        .catch((error) => {
            console.error(error)
            return false
        })

    if (!alreadyExists) {
        coll.insertOne({
            at: new Date(),
            host: req.headers.host ?? 'unknown',
            ua: req.headers['user-agent'] ?? 'unknown',
            email: req.body,
        }).catch((error) => console.error(error))
    }

    res.status(200).send('oh thanks mark')
}

module.exports = handler
