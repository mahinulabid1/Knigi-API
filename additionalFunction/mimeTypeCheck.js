/*
  - checks is the uplaoded files are image or not
  - returns, if it is image = true
  - if not = false
*/
const mimeTypeCheck = (mimeTypeArr) => {
  for(let i = 0 ; i < mimeTypeArr.length; i++ ) {
    let valid = mimeTypeArr[i].startsWith('image')
    if(valid === false) {
      return false;
    }
    else if(i === mimeTypeArr.length-1){
      return true;
    }
  }
}

module.exports = { mimeTypeCheck };