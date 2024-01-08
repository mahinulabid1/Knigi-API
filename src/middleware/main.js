/*
- middleware must maintain this sequence
*/


// shop middleware
// create new shop item middleware
require('./shop/create/uploadHandler')
require('./shop/create/formFileHandler');
require('./shop/create/formDataParser');

// update shop item
require('./shop/update/uploadHandler')
require('./shop/update/formDataParser')

// delete middleware
require('./shop/delete/idValidation')


//user middleware
//create new user middleware
require('./user/create/initialProcessing');
require('./user/create/uploadHandler');