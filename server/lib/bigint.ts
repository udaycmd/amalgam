const bigIntJson = () => {
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
};

export default bigIntJson;
