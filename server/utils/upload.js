const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')
const UtilType = require('./type')
const UtilDatetime = require('./datetime')


function mkdirsSync(dirname) {
    // console.log(dirname)
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

function getSuffixName(fileName) {
    let nameList = fileName.split('.')
    return nameList[nameList.length - 1]
}

async function uploadPicture(ctx, options) {
    let req = ctx.req
    let res = ctx.res
    let busboy = new Busboy({ headers: req.headers })

    let pictureType = 'common';
    // if (UtilType.isJSON(options) && UtilType.isString(options.pictureType)) {
    //     pictureType = options.pictureType
    // }

    var relativePath = path.join(
        pictureType,
        UtilDatetime.parseStampToFormat(null, 'YYYY/MM/DD')
    )

    let picturePath = path.join(
        __dirname,
        '/../../static/uploadPicture/',
        relativePath)

    console.log(picturePath)
    let mkdirResult = mkdirsSync(picturePath)


    return new Promise((resolve, reject) => {
        let result = {
            success: false,
            code: '',
            message: '',
            data: {}
        }

        // result.data.pictureUrl = picturePath;

        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            console.log('File-file [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype)


            let pictureName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
            let _uploadFilePath = path.join(picturePath, pictureName)
            console.log(_uploadFilePath)
            result.data.pictureUrl = path.join(relativePath, pictureName);
            console.log("result.data.pictureUrl:" + result.data.pictureUrl);

            let saveTo = path.join(_uploadFilePath)
            file.pipe(fs.createWriteStream(saveTo))

            // file.on('data', function(data) {
            //   console.log('File-data [' + fieldname + '] got ' + data.length + ' bytes')
            // })

            file.on('end', function() {
                console.log('File-end [' + fieldname + '] Finished')
                result.success = true;
                // resolve(result)
            })
        })

        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            console.log('Field-field [' + fieldname + ']: value: ' + inspect(val))
            result.data[fieldname] = val;
        })
        busboy.on('finish', function() {
            console.log('Done parsing form!');
            // console.log("result.data.pictureUrl = " + result.data.pictureUrl);
            resolve(result)
        })

        busboy.on('error', function(err) {
            console.log('File-error');
            reject(result)
        })

        req.pipe(busboy);
        return result;
    })

}


module.exports = {
    uploadPicture,
}