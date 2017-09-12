module.exports = {
  
  getToken: function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  },

  getToday: function () {
    const d = new Date();
    const month = d.getMonth();
    const year = d.getFullYear();
    const day = d.getDate();

    return new Date(`${year}, ${month}, ${day}`);
  }
}