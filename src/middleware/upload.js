const multer = require('multer');
const path= require('path')

const absolute_path = path.join(__dirname,'../../public/image')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
         cb(null,absolute_path)
    },
    filename:function(req,file,cb){
        const filename =file.fieldname + Date.now() + path.extname(file.originalname);
        cb(null,filename);
    }
})

const limits = {
    fileSize:1024 * 1024 * 5,
}

const upload = multer({
    storage:storage,
    limits:limits
})

module.exports = upload;