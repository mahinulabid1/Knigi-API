// unique key generator
const generateUniqueKey = () => {
  const timestamp = Date.now().toString(36); // Convert current timestamp to base 36 string
  const randomStr = Math.random().toString(36).substr(2, 10); // Random string
  const hash = Math.random().toString(36).substr(2, 10); // Hash of random number
  
  return `${timestamp}-${randomStr}-${hash}`;
}

module.exports = generateUniqueKey;

