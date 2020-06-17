// eslint-disable-next-line
Array.prototype.remove = function (val) {
  const index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
    return this;
  }
  throw new Error('No such value in Array');
};

// eslint-disable-next-line
// Object.prototype.remove = function (index) {
//   if (index > -1) {
//     this.splice(index, 1);
//     return this;
//   }
//   throw new Error('No such value in Object');
// };
