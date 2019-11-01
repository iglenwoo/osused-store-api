function setQueryCondition(query, columnName, value) {
  if (value) query[columnName] = value
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
