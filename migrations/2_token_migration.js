const NewToken = artifacts.require("NewToken");

module.exports = async function (deployer) {
  await deployer.deploy(NewToken, "Vine2Wine", "V2W", 10000);
};
