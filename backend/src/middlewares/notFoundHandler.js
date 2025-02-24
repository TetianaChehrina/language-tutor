export function notFoundHandler(req, res) {
  res.status(404).json({
    message: 'Page not found',
  });
}
