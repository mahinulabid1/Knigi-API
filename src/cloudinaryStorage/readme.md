# how cloudinary will perform its operation?

<br>

## how cloudinary API works?
Answer: 
* I can't select specific name of the uploaded file. The file will be named according to base-filename. <br>
When multer uploads a file, it give it a unique name. That name will be given to file uploaded to cloudinary.
* Cloudinary can uplaod and delete file, and fetching image can be done through CDN which is fast.
* I can delete image using public_id which can be used to perform other operation in cloudinary.