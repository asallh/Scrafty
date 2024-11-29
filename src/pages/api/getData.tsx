import {JSDOM} from 'jsdom'
import { NextApiRequest, NextApiResponse } from 'next'

const getData = async (req: NextApiRequest, res: NextApiResponse) => {

    // receive the imnput from the body 
    const body = JSON.parse(req.body)
    const {url} = body
    console.log("URL", url)
    const response = await fetch(`https://www.npmjs.com/package/${url.toLowerCase()}`)
    const html = await response.text()

    const dom = new JSDOM(html)
    const document = dom.window.document

    const download = document.querySelector('._9ba9a726')?.textContent

    console.log("Downloads", download)

    // send downloads back to client
    res.status(200).json({download})
}

export default getData;