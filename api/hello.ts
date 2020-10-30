import admin from 'firebase-admin'
import { RequestHandler } from 'express'
import { v4 as uuid } from 'uuid'

admin.initializeApp({
    credential: admin.credential.cert(require('../firebase-credentials.json')),
})

const db = admin.firestore()
const handler: RequestHandler = async (req, res) => {
    if (/^localhost/gi.test(req.headers.host)) {
        console.log('pig')
    }
    await db
        .collection('visits')
        .doc(uuid())
        .set({
            at: Date.now(),
            host: req.headers.host ?? 'unknown',
            ua: req.headers['user-agent'] ?? 'unknown',
        })

    res.status(200).send()
}

module.exports = handler
