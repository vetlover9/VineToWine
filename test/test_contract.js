const NewToken = artifacts.require("NewToken");
const ICO = artifacts.require("V2WICO");
const V2W = artifacts.require("VineToWine");
const truffleAssert = require("truffle-assertions");


contract('Test VinetoWine contract', async (accounts) => {

    let owner = accounts[0];
    let farmer = accounts[1];
    let producer = accounts[2];
    let packer = accounts[3];
    let distributor = accounts[4];
    let retailer = accounts[5];
    let consumer = accounts[6];


    it('Test if a farmer is registered', async () => {
 
      const token = await NewToken.deployed();
      const ico = await ICO.deployed();
      const vtow = await V2W.deployed();

      await ico.setToken(token.address);
      await token.approve(ico.address, web3.utils.toWei('10000','ether'));
      
      
      await ico.buyTokens({from: farmer, value: 1000000000000000000});
      await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: farmer})

      let response = await vtow.registerEntity("Lyman Orchard", 0 ,{from: farmer});

      //console.log(response);

      truffleAssert.eventEmitted(response, 'entityRegistered', (ev) => {
        return ev.entity == farmer && ev.name == "Lyman Orchard" && ev.roleentity == 0 ;
      });
      
    });


    it('Test if a producer is registered', async () => {
    
        const token = await NewToken.deployed();
        const ico = await ICO.deployed();
        const vtow = await V2W.deployed();

        await ico.setToken(token.address);
        await token.approve(ico.address, web3.utils.toWei('10000','ether'));
        await ico.buyTokens({from: producer, value: 1000000000000000000});
        await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: producer})
  
        let response = await vtow.registerEntity("Lyman Winery", 1 ,{from: producer});
  
        //console.log(response);
  
        truffleAssert.eventEmitted(response, 'entityRegistered', (ev) => {
          return ev.entity == producer && ev.name == "Lyman Winery" && ev.roleentity == 1 ;
        });
        
    });

    it('Test if a packer is registered', async () => {

    const token = await NewToken.deployed();
    const ico = await ICO.deployed();
    const vtow = await V2W.deployed();

    await ico.setToken(token.address);
    await token.approve(ico.address, web3.utils.toWei('10000','ether'));
    await ico.buyTokens({from: packer, value: 1000000000000000000});
    await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: packer})

    let response = await vtow.registerEntity("Lyman Packers", 2 ,{from: packer});

    //console.log(response);

    truffleAssert.eventEmitted(response, 'entityRegistered', (ev) => {
        return ev.entity == packer && ev.name == "Lyman Packers" && ev.roleentity == 2 ;
    });
    
    });

    it('Test if a distributor is registered', async () => {

    const token = await NewToken.deployed();
    const ico = await ICO.deployed();
    const vtow = await V2W.deployed();

    await ico.setToken(token.address);
    await token.approve(ico.address, web3.utils.toWei('10000','ether'));
    await ico.buyTokens({from: distributor, value: 1000000000000000000});
    await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: distributor})

    let response = await vtow.registerEntity("Lyman Distr", 3 ,{from: distributor});

    //console.log(response);

    truffleAssert.eventEmitted(response, 'entityRegistered', (ev) => {
        return ev.entity == distributor && ev.name == "Lyman Distr" && ev.roleentity == 3 ;
    });
    
    });

    it('Test if a retailer is registered', async () => {

    const token = await NewToken.deployed();
    const ico = await ICO.deployed();
    const vtow = await V2W.deployed();

    await ico.setToken(token.address);
    await token.approve(ico.address, web3.utils.toWei('10000','ether'));
    await ico.buyTokens({from: retailer, value: 1000000000000000000});
    await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: retailer})

    let response = await vtow.registerEntity("LCBO", 4 ,{from: retailer});

    //console.log(response);

    truffleAssert.eventEmitted(response, 'entityRegistered', (ev) => {
        return ev.entity == retailer && ev.name == "LCBO" && ev.roleentity == 4 ;
    });
    
    });

    it('Test if a consumer is registered', async () => {

    const token = await NewToken.deployed();
    const ico = await ICO.deployed();
    const vtow = await V2W.deployed();

    await ico.setToken(token.address);
    await token.approve(ico.address, web3.utils.toWei('10000','ether'));
    await ico.buyTokens({from: consumer, value: 1000000000000000000});
    await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: consumer})

    let response = await vtow.registerEntity("Amit Pandey", 5 ,{from: consumer});

    //console.log(response);

    truffleAssert.eventEmitted(response, 'entityRegistered', (ev) => {
        return ev.entity == consumer && ev.name == "Amit Pandey" && ev.roleentity == 5 ;
    });
    
    });
  
    it('Test if a farm is registered', async () => {

        const token = await NewToken.deployed();
        const ico = await ICO.deployed();
        const vtow = await V2W.deployed();
    
        await ico.setToken(token.address);
        await token.approve(ico.address, web3.utils.toWei('10000','ether'));
        
        
        await ico.buyTokens({from: farmer, value: 1000000000000000000});
        await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: farmer})
 
        await vtow.registerEntity("Lyman Orchard", 0 ,{from: farmer});

        let response = await vtow.registerVineryard("Loc_001", "Red", {from: farmer});

      //console.log(response);

      truffleAssert.eventEmitted(response, 'vineyardRegistered', (ev) => {
        return ev.farmer == farmer && ev.location == "Loc_001" && ev.vinevariety == "Red" ;
      });
      
    });

    it('Test if a vineyard picking date is updated is registered', async () => {

        const token = await NewToken.deployed();
        const ico = await ICO.deployed();
        const vtow = await V2W.deployed();
    
        await ico.setToken(token.address);
        await token.approve(ico.address, web3.utils.toWei('10000','ether'));
        
        
        await ico.buyTokens({from: farmer, value: 1000000000000000000});
        await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: farmer})
 
        await vtow.registerEntity("Lyman Orchard", 0 ,{from: farmer});

        await vtow.registerVineryard("Loc_001", "Red", {from: farmer});

        let response = await vtow.updateVineyardPicking("Loc_001", {from: farmer});

        truffleAssert.eventEmitted(response, 'vineyardPicked', (ev) => {
          return ev.farmer == farmer && ev.location == "Loc_001" ;
        });
      
    });

    it('Test if a vine batch is received by the producer', async () => {

      const token = await NewToken.deployed();
      const ico = await ICO.deployed();
      const vtow = await V2W.deployed();
      let vine_batch = "";
  
      await ico.setToken(token.address);
      await token.approve(ico.address, web3.utils.toWei('10000','ether'));
      
      
      await ico.buyTokens({from: farmer, value: 1000000000000000000});
      await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: farmer})

      await vtow.registerEntity("Lyman Orchard", 0 ,{from: farmer});

      await vtow.registerVineryard("Loc_001", "Red", {from: farmer});

      let response = await vtow.updateVineyardPicking("Loc_001", {from: farmer});
      vine_batch = response.logs[0].args[2]

      response = await vtow.receiveVineBatch(vine_batch, farmer, {from: producer});

      truffleAssert.eventEmitted(response, 'vineBatchReceived', (ev) => {
        return ev.producer_address == producer && ev.p.batch_num == vine_batch;
      });
      
    });  

    it('Test if the producer de-stemmed the vine batch and update timestamp', async () => {

      const token = await NewToken.deployed();
      const ico = await ICO.deployed();
      const vtow = await V2W.deployed();
      let vine_batch = "";
  
      await ico.setToken(token.address);
      await token.approve(ico.address, web3.utils.toWei('10000','ether'));
      
      
      await ico.buyTokens({from: farmer, value: 1000000000000000000});
      await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: farmer})

      await vtow.registerEntity("Lyman Orchard", 0 ,{from: farmer});

      await vtow.registerVineryard("Loc_001", "Red", {from: farmer});

      let response = await vtow.updateVineyardPicking("Loc_001", {from: farmer});
      vine_batch = response.logs[0].args[2]

      await vtow.receiveVineBatch(vine_batch, farmer, {from: producer});
      
      response = await vtow.updateDestemming(vine_batch, {from: producer})
      let destem_timestamp = response.logs[0].args[1][3];

      truffleAssert.eventEmitted(response, 'vineBatchReceived', (ev) => {
        return ev.producer_address == producer && ev.p.batch_num == vine_batch && ev.p.destemmer_timestamp == destem_timestamp;
      });
      
    });

    it('Test if the producer crushed the vine batch and update timestamp', async () => {

      const token = await NewToken.deployed();
      const ico = await ICO.deployed();
      const vtow = await V2W.deployed();
      let vine_batch = "";
  
      await ico.setToken(token.address);
      await token.approve(ico.address, web3.utils.toWei('10000','ether'));
      
      
      await ico.buyTokens({from: farmer, value: 1000000000000000000});
      await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: farmer})

      await vtow.registerEntity("Lyman Orchard", 0 ,{from: farmer});

      await vtow.registerVineryard("Loc_001", "Red", {from: farmer});

      let response = await vtow.updateVineyardPicking("Loc_001", {from: farmer});
      vine_batch = response.logs[0].args[2]

      await vtow.receiveVineBatch(vine_batch, farmer, {from: producer});
      
      await vtow.updateDestemming(vine_batch, {from: producer})

      response = await vtow.updateCrushing(vine_batch, {from: producer})
      let crush_timestamp = response.logs[0].args[1][4];

      truffleAssert.eventEmitted(response, 'vineBatchReceived', (ev) => {
        return ev.producer_address == producer && ev.p.batch_num == vine_batch && ev.p.crusher_timestamp == crush_timestamp;
      });
      
    });

    it('Test if the producer chilled the vine batch and update timestamp', async () => {

      const token = await NewToken.deployed();
      const ico = await ICO.deployed();
      const vtow = await V2W.deployed();
      let vine_batch = "";
  
      await ico.setToken(token.address);
      await token.approve(ico.address, web3.utils.toWei('10000','ether'));
      
      
      await ico.buyTokens({from: farmer, value: 1000000000000000000});
      await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: farmer})

      await vtow.registerEntity("Lyman Orchard", 0 ,{from: farmer});

      await vtow.registerVineryard("Loc_001", "Red", {from: farmer});

      let response = await vtow.updateVineyardPicking("Loc_001", {from: farmer});
      vine_batch = response.logs[0].args[2]

      await vtow.receiveVineBatch(vine_batch, farmer, {from: producer});
      
      await vtow.updateDestemming(vine_batch, {from: producer})
      await vtow.updateCrushing(vine_batch, {from: producer})

      response = await vtow.updateChilling(vine_batch, {from: producer})
      let chill_timestamp = response.logs[0].args[1][5];

      truffleAssert.eventEmitted(response, 'vineBatchReceived', (ev) => {
        return ev.producer_address == producer && ev.p.batch_num == vine_batch && ev.p.chiller_timestamp == chill_timestamp;
      });
      
    });

    it('Test if the producer pressed the vine batch and update timestamp', async () => {

      const token = await NewToken.deployed();
      const ico = await ICO.deployed();
      const vtow = await V2W.deployed();
      let vine_batch = "";
  
      await ico.setToken(token.address);
      await token.approve(ico.address, web3.utils.toWei('10000','ether'));
      
      
      await ico.buyTokens({from: farmer, value: 1000000000000000000});
      await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: farmer})

      await vtow.registerEntity("Lyman Orchard", 0 ,{from: farmer});

      await vtow.registerVineryard("Loc_001", "Red", {from: farmer});

      let response = await vtow.updateVineyardPicking("Loc_001", {from: farmer});
      vine_batch = response.logs[0].args[2];

      await vtow.receiveVineBatch(vine_batch, farmer, {from: producer});
      
      await vtow.updateDestemming(vine_batch, {from: producer});
      await vtow.updateCrushing(vine_batch, {from: producer});
      await vtow.updateChilling(vine_batch, {from: producer});

      response = await vtow.updatePressing(vine_batch, {from: producer})
      let press_timestamp = response.logs[0].args[1][6];

      truffleAssert.eventEmitted(response, 'vineBatchReceived', (ev) => {
        return ev.producer_address == producer && ev.p.batch_num == vine_batch && ev.p.presser_timestamp == press_timestamp;
      });
      
    });

    it('Test if the producer barrelled the vine batch and create barrell batch number', async () => {

      const token = await NewToken.deployed();
      const ico = await ICO.deployed();
      const vtow = await V2W.deployed();
      let vine_batch = "";
  
      await ico.setToken(token.address);
      await token.approve(ico.address, web3.utils.toWei('10000','ether'));
      
      
      await ico.buyTokens({from: farmer, value: 1000000000000000000});
      await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: farmer})

      await vtow.registerEntity("Lyman Orchard", 0 ,{from: farmer});

      await vtow.registerVineryard("Loc_001", "Red", {from: farmer});

      let response = await vtow.updateVineyardPicking("Loc_001", {from: farmer});
      vine_batch = response.logs[0].args[2];

      await vtow.receiveVineBatch(vine_batch, farmer, {from: producer});
      
      await vtow.updateDestemming(vine_batch, {from: producer});
      await vtow.updateCrushing(vine_batch, {from: producer});
      await vtow.updateChilling(vine_batch, {from: producer});
      await vtow.updatePressing(vine_batch, {from: producer})

      response = await vtow.updateBarrell(vine_batch, {from: producer})
      let barrell_batch_num = response.logs[0].args[1];

      truffleAssert.eventEmitted(response, 'barrellDetails', (ev) => {
        return ev.producer_address == producer && ev.barrell_batch_number == barrell_batch_num;
      });
      
    });

    it('Test if the packer received the barrell from producer with correct barrell batch number', async () => {

      const token = await NewToken.deployed();
      const ico = await ICO.deployed();
      const vtow = await V2W.deployed();
      let vine_batch = "";
  
      await ico.setToken(token.address);
      await token.approve(ico.address, web3.utils.toWei('10000','ether'));
      
      
      await ico.buyTokens({from: farmer, value: 1000000000000000000});
      await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: farmer})

      await vtow.registerEntity("Lyman Orchard", 0 ,{from: farmer});

      await vtow.registerVineryard("Loc_001", "Red", {from: farmer});

      let response = await vtow.updateVineyardPicking("Loc_001", {from: farmer});
      vine_batch = response.logs[0].args[2];

      await vtow.receiveVineBatch(vine_batch, farmer, {from: producer});
      
      await vtow.updateDestemming(vine_batch, {from: producer});
      await vtow.updateCrushing(vine_batch, {from: producer});
      await vtow.updateChilling(vine_batch, {from: producer});
      await vtow.updatePressing(vine_batch, {from: producer})

      response = await vtow.updateBarrell(vine_batch, {from: producer})
      let barrell_batch_num = response.logs[0].args[1];

      response = await vtow.receiveBarrell(barrell_batch_num, producer, {from: packer});

      truffleAssert.eventEmitted(response, 'barrellReceived', (ev) => {
        return ev.packeraddress == packer && ev.barrell_batch_number == barrell_batch_num;
      });
      
    });


    it('Test if the packer bottled the wine barrell', async () => {

      const token = await NewToken.deployed();
      const ico = await ICO.deployed();
      const vtow = await V2W.deployed();
      let vine_batch = "";
  
      await ico.setToken(token.address);
      await token.approve(ico.address, web3.utils.toWei('10000','ether'));
      
      
      await ico.buyTokens({from: farmer, value: 1000000000000000000});
      await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: farmer})

      await vtow.registerEntity("Lyman Orchard", 0 ,{from: farmer});

      await vtow.registerVineryard("Loc_001", "Red", {from: farmer});

      let response = await vtow.updateVineyardPicking("Loc_001", {from: farmer});
      vine_batch = response.logs[0].args[2];

      await vtow.receiveVineBatch(vine_batch, farmer, {from: producer});
      
      await vtow.updateDestemming(vine_batch, {from: producer});
      await vtow.updateCrushing(vine_batch, {from: producer});
      await vtow.updateChilling(vine_batch, {from: producer});
      await vtow.updatePressing(vine_batch, {from: producer})

      response = await vtow.updateBarrell(vine_batch, {from: producer})
      let barrell_batch_num = response.logs[0].args[1];

      await vtow.receiveBarrell(barrell_batch_num, producer, {from: packer});

      response = await vtow.updateBottleId("bottle_001", barrell_batch_num, {from: packer});
      let bottle_Id = response.logs[0].args[1];
      let bottled_timestamp = response.logs[0].args[2][3];

      truffleAssert.eventEmitted(response, 'bottledEvent', (ev) => {
        return ev.packeraddress == packer && ev.bottleId == bottle_Id && ev.packedbottle.bottled_timestamp == bottled_timestamp;
      });
      
    });

    it('Test if correct bottle history is displayed', async () => {

      const token = await NewToken.deployed();
      const ico = await ICO.deployed();
      const vtow = await V2W.deployed();
      let vine_batch = "";
  
      await ico.setToken(token.address);
      await token.approve(ico.address, web3.utils.toWei('10000','ether'));
      
      
      await ico.buyTokens({from: farmer, value: 1000000000000000000});
      await token.approve(vtow.address, web3.utils.toWei('100','ether'), {from: farmer})

      await vtow.registerEntity("Lyman Orchard", 0 ,{from: farmer});

      await vtow.registerVineryard("Loc_001", "Red", {from: farmer});

      let response = await vtow.updateVineyardPicking("Loc_001", {from: farmer});
      vine_batch = response.logs[0].args[2];


      await vtow.receiveVineBatch(vine_batch, farmer, {from: producer});
      
      await vtow.updateDestemming(vine_batch, {from: producer});
      await vtow.updateCrushing(vine_batch, {from: producer});
      await vtow.updateChilling(vine_batch, {from: producer});
      await vtow.updatePressing(vine_batch, {from: producer})

      response = await vtow.updateBarrell(vine_batch, {from: producer})
      let barrell_batch_num = response.logs[0].args[1];

      await vtow.receiveBarrell(barrell_batch_num, producer, {from: packer});

      response = await vtow.updateBottleId("bottle_001", barrell_batch_num, {from: packer});
      let bottleId = response.logs[0].args[1];
      let bottled_timestamp = response.logs[0].args[2][3];
      
      await vtow.changeOwner("bottle_001", {from: distributor})
      await vtow.changeOwner("bottle_001", {from: retailer})
      await vtow.changeOwner("bottle_001", {from: consumer})

      response = await vtow.getBottleHistory("bottle_001");

      truffleAssert.eventEmitted(response, 'bottle_history', (ev) => {
        return ev.bottle_history_details.bottle_id = bottleId && 
        ev.bottle_history_details.vineyard_details.farmer_ddress == farmer &&
        ev.bottle_history_details.vineyard_details.location_id == "Loc_001" &&
        ev.bottle_history_details.vineyard_details.vine_variety == "Red" &&
        ev.bottle_history_details.barrell_details.farm_address == farmer &&
        ev.bottle_history_details.barrell_details.batch_num == vine_batch &&
        ev.bottle_history_details.barrell_details.barrel_batch_number == barrell_batch_num &&
        ev.bottle_history_details.packer_details.barrel_batch_number == barrell_batch_num &&
        ev.bottle_history_details.packer_details.producer_address == producer &&
        ev.bottle_history_details.packer_details.bottled_timestamp == bottled_timestamp &&
        ev.bottle_history_details.owners[0] == distributor &&
        ev.bottle_history_details.owners[1] == retailer &&
        ev.bottle_history_details.owners[2] == consumer

      });
      
    });

})  