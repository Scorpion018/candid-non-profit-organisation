isEmpty = obj => {
  console.log('here')
  return Object.keys(obj).length === 0;
}

module.exports = {
  isEmpty:isEmpty,
}