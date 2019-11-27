const postImage = async function(req, res) {
  console.log('LOLOLO')
  console.log(req.file)
  try {
    console.log('req.files')
    console.log(req.body)
    console.log('Image uploaded')
    res.status(200).json()
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  postImage,
}
