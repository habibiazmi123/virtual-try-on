import fetch from 'node-fetch'

export default async function img_to_base64(req, res) {
  try {
    const { src } = req.query
    const imageUrlData = await fetch(src)
    const buffer = await imageUrlData.arrayBuffer()
    const stringifiedBuffer = Buffer.from(buffer).toString('base64')
    const contentType = imageUrlData.headers.get('content-type')
    const imageBase64 = `data:${contentType};base64,${stringifiedBuffer}`
    res.status(200).send(imageBase64)
  } catch (error) {
    res.status(500).json({ error })
  }
}
