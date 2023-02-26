const multer = require('multer');
const randomId = require('../controllers/randomIdGenerator')


const MINE_TYPE_MAP ={  //HELPER FUNCTION TO TELL US IN THE NEXT FUNCTION WHAT TYPE OF FILE USER IS USING
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const fileUpload = multer({
    limits: 500000,         //LIMIT STORAGE TO 500KB
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/images")
        },
        filename: (req, file, cb) => {
            const ext = MINE_TYPE_MAP[file.mimetype];
            cb(null, randomId + '.' + ext);
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MINE_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid mime type!');
        cb(error, isValid);
    }
});

module.exports = fileUpload;