/*
- middleware must maintain this sequence
*/
// require('./bodyParser');

// shop middleware
require('./shop/uploadHandler')
require('./shop/formFileHandler');
require('./shop/formDataParser');
