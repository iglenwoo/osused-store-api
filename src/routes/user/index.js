const getUser = (req, res, next) => {
  res.status(200).json({
    name: 'Webster',
  })
}

const getUsers = (req, res, next) => {
  res.status(200).json([
    {
      name: 'Webster',
    },
    {
      name: 'Yana',
    },
    {
      name: 'ChangJu',
    },
    {
      name: 'Ingyu',
    },
  ])
}

module.exports = {
  getUser,
  getUsers,
}
