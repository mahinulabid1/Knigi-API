/*
- middleware must maintain this sequence
*/


// shop middleware
// create new shop item
require('./shop/create/uploadHandler')
require('./shop/create/formFileHandler');
require('./shop/create/formDataParser');

// update shop item
require('./shop/update/uploadHandler')
require('./shop/update/formDataParser')

