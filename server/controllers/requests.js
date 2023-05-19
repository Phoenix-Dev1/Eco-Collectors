const addRequest = (req, res) => {
  res.json('From request controller');
};

module.exports = {
  addRequest: addRequest,
};
