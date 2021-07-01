module.exports = func => {
  return (req, res, next) => {
    // call the func function, pass req, res, next arguments
    func(req, res, next).catch(next);
  }
}