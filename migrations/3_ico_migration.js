const V2WICO = artifacts.require("V2WICO");

module.exports = async function (deployer) {
  await deployer.deploy(V2WICO);
};
