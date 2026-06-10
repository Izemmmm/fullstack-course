export default function badRouteHandler(req, res) {
  res.status(404).json({error: 'unknown endpoint'})
}