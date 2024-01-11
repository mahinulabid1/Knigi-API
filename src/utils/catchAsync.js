module.exports = (fn) => {
   return (req, res, next) => {
      fn(req, res, next).catch((err) => { next(err) });
      // fn returns a promise. Its either a pure promise or an async function
   }
}