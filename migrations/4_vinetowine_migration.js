const NewToken = artifacts.require("NewToken");
const V2WICO = artifacts.require("V2WICO");
const VineToWine = artifacts.require("VineToWine");


module.exports = async function (deployer) {
  
  //var token = await NewToken.deployed();
  //deployer.deploy(VineToWine, token.address,  10, "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1");
  await deployer.deploy(VineToWine, "0xCfEB869F69431e42cdB54A4F4f105C19C080A601",  10, "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1");
  

  // declare contratc instance
  let token = await NewToken.deployed();
  let ico = await V2WICO.deployed();
  let vtow = await VineToWine.deployed();

  //set the token address in ICO contract to token created in token contract
  await ico.setToken(token.address);
  // approve ICO contract to spend on behalf of users
  await token.approve(ico.address, web3.utils.toWei('10000','ether'));

  // enable all entities to buy 100 tokens worth 1 eth
  await ico.buyTokens({from: "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0", value: 1000000000000000000});
  await ico.buyTokens({from: "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b", value: 1000000000000000000});
  await ico.buyTokens({from: "0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d", value: 1000000000000000000});
  await ico.buyTokens({from: "0xd03ea8624C8C5987235048901fB614fDcA89b117", value: 1000000000000000000});
  await ico.buyTokens({from: "0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC", value: 1000000000000000000});
  await ico.buyTokens({from: "0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9", value: 1000000000000000000});
  

  // approve the vineToWine contract to spend token on behalf of each entities to register themselves
  await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0"});
  await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b"});
  await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: "0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d"});
  await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: "0xd03ea8624C8C5987235048901fB614fDcA89b117"});
  await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: "0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC"});
  await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: "0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9"});

  // register entities to be used from the UI
  await vtow.registerEntity("Lyman orchard", 0, {from: "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0"})
  await vtow.registerEntity("Lyman Winery", 1, {from: "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b"})
  await vtow.registerEntity("Lyman Packers", 2, {from: "0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d"})
  await vtow.registerEntity("Lyman Distr", 3, {from: "0xd03ea8624C8C5987235048901fB614fDcA89b117"})
  await vtow.registerEntity("LCBO", 4, {from: "0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC"})
  await vtow.registerEntity("Amit", 5, {from: "0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9"})

};
