function setQueryCondition(query, columnName, value, flag) {
  if (value && flag === 'i')
    query[columnName] = { $regex: new RegExp('^' + value, 'i') }
  else if (value) query[columnName] = value
}

function setRespondMsg(res, code, msg) {
  res.statusMessage = msg
  res.status(code)
  return res
}

module.exports = {
  setQueryCondition,
  setRespondMsg,
}
