let gfs = require('../../server')

const postImage = async function(req, res) {
  try {
    res.status(200).json()
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

const getImage = async function(req, res) {
  gfs.gfs
    .collection('images')
    .findOne({ filename: 'Design_paper.jpg/11/1/2019/13' }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists',
        })
      }
      if (
        file.contentType === 'image/jpeg' ||
        file.contentType === 'image/png'
      ) {
        /*
      Lines down below should open read stream and send it to client but =>
      1. Cannot read property 'readPreference' of null
      2. DeprecationWarning: GridStore is deprecated, and will be removed in a future version. Please use GridFSBucket instead
       */
        //const readstream = gfs.gfs.createReadStream( {_id: '5de571cdda71167248c09c59'});
        // readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image',
        })
      }
    })
}

module.exports = {
  postImage,
  getImage,
}
