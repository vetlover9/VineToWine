//Created check function to see if the MetaMask extension is installed
const isMetaMaskInstalled = () => {
    const { ethereum } = window
    return Boolean(ethereum && ethereum.isMetaMask)
};

let contractInitialized = false;
let v2w = undefined;
let token = undefined;

// create variables for buttons on page
const onboardButton = document.getElementById('connectButton');     
const regVineyard = document.getElementById('regVineyard');  
const showFarm = document.getElementById('showFarm');  
const pickVineyard = document.getElementById('pickVineyard');   
const receiveVine = document.getElementById('receiveVine');  
const destemVine = document.getElementById('destemVine');  
const crushVine = document.getElementById('crushVine'); 
const chillVine = document.getElementById('chillVine');  
const pressVine = document.getElementById('pressVine');  
const barrellWine = document.getElementById('barrellWine');  
const rcvBarrell = document.getElementById('rcvBarrell');  
const bottleWine = document.getElementById('bottleWine');   
const clickhist = document.getElementById('clickhist'); 
const clickOwn = document.getElementById('clickOwn');   

//create variable for all html elements on page
const networkDiv = document.getElementById('network');
const chainIdDiv = document.getElementById('chainId');
const accountsDiv = document.getElementById('accounts');
const addRole = document.getElementById('addressRole');
const LocationId = document.getElementById('LocationId');
const LocationIdPick = document.getElementById('LocationIdPick');
const GrapeVariety = document.getElementById('GrapeVariety');
const vineyardDetail = document.getElementById('vineyardDetail');
const batchNumber = document.getElementById('batchNumber');
const farmerAddress = document.getElementById('farmerAddress');
const destemBatchNumber = document.getElementById('destemBatchNumber');
const crushBatchNumber = document.getElementById('crushBatchNumber');
const chillBatchNumber = document.getElementById('chillBatchNumber');
const pressBatchNumber = document.getElementById('pressBatchNumber');
const barrellBatchNumber = document.getElementById('barrellBatchNumber');
const barrellBatchRcv = document.getElementById('barrellBatchRcv');
const prodAddress = document.getElementById('prodAddress');
const bottleId = document.getElementById('bottleId');
const barrellBatch = document.getElementById('barrellBatch');
const histBotId = document.getElementById('histBotId');
const chgBottleOwn = document.getElementById('chgBottleOwn');
const history = document.getElementById('history');


const initialize = () => {
    //Metamask Connection Section
    const MetaMaskClientCheck = () => {
        //Now we check to see if MetaMask is installed
        if (!isMetaMaskInstalled()) {
            //If it isn't installed we ask the user to install it
            onboardButton.innerText = 'Install MetaMask Plugin!';
        } else {
            //If it is installed we change our button text
            onboardButton.innerText = 'Connect';
            //The button is now enabled
            onboardButton.disabled = false;
            //When the button is clicked we call this function to connect the users MetaMask Wallet
            onboardButton.onclick = onClickConnect;

            //when register vineyard button is clicked
            regVineyard.onclick = registerVineyard;

            //when user clicks on show details button to fetch farme details
            showFarm.onclick = showFarmDetails;
            
            //when user clicks on pick vienyard buttin
            pickVineyard.onclick = updatePickVineyard;

            //when user clicks on receive vine button
            receiveVine.onclick = receiveVineBatch;

            //Update timestamp when the vine batch is destemmed
            destemVine.onclick = updateDestemming;

            //Update timestamp when the vine batch is crushed
            crushVine.onclick = updateCrushing;

            //Update timestamp when the vine chilling is completed
            chillVine.onclick = updateChilling;

            //Update timestamp when the vine chilling is completed
            pressVine.onclick = updatePressing;

            //Update timestamp when the wine is barrelled
            barrellWine.onclick = updateBarrell;

            //Update timestamp when the barrell is recevied by packer
            rcvBarrell.onclick = receiveBarrell;

            //Update bottle id when a barrell of wine is bottled
            bottleWine.onclick = updateBottleId;

            //Update bottle id when a barrell of wine is bottled
            clickOwn.onclick = changeOwner;

            //Get history of a wine bottle
            clickhist.onclick = getBottleHistory;

            ethereum.on('chainChanged', handleNewChain)
            ethereum.on('networkChanged', handleNewNetwork)
            ethereum.on('accountsChanged', handleNewAccounts)

        }
    };

    MetaMaskClientCheck();

};

// this function is to register the vineyard for the farmer
const registerVineyard = async () => {
    try {
        let loc = LocationId.value;
        let grapevar = GrapeVariety.value;
        await v2w.methods.registerVineryard(loc, grapevar).send({from: accounts[0]}, function(error, result){
            alert('Vineyard registered succesfully');
            console.log(result);
        });

    } catch (error) {
        alert( `Failed to register vineyard`);
        console.error(error)
    }
}

// this function is to updte the timestamp when a farm was picked by a farmer
const updatePickVineyard = async () => {
    try {
        let loc = LocationIdPick.value;
        await v2w.methods.updateVineyardPicking(loc).send({from: accounts[0]}, function(error, result){
            alert('Vine picking timestamp updated');
            console.log(result);
        });

    } catch (error) {
        alert( `Failed to update timestamp for vineyard picking`);
        console.error(error)
    }
}

// this function is to receive the vine batch from a farmer
const receiveVineBatch = async () => {
    try {
        let bat = batchNumber.value;
        let farmadd = farmerAddress.value;
        await v2w.methods.receiveVineBatch(bat, farmadd).send({from: accounts[0]}, function(error, result){
            alert('Received vine batch from farmer');
            console.log(result);
        });

    } catch (error) {
        alert( `Failed to update receiving the vine batch form farmer`);
        console.error(error)
    }
}

// this function is to update the timestamp of the destemming of vine batch from a farmer
const updateDestemming = async () => {
    try {
        let bat = destemBatchNumber.value;
        await v2w.methods.updateDestemming(bat).send({from: accounts[0]}, function(error, result){
            alert('Succesfully updated the timestamp for destemming');
            console.log(result);
        });

    } catch (error) {
        alert( `Failed to update timestamp of destemming the vine`);
        console.error(error)
    }
}

// this function is to update the timestamp of the crushing of vine batch from a farmer
const updateCrushing = async () => {
    try {
        let bat = crushBatchNumber.value;
        await v2w.methods.updateCrushing(bat).send({from: accounts[0]}, function(error, result){
            alert('Succesfully updated the timestamp for crushing the grapes');
            console.log(result);
        });

    } catch (error) {
        alert( `Failed to updated timestamp of crushing the vine`);
        console.error(error)
    }
}

// this function is to update the timestamp when the chilling process is completed for vine batch
const updateChilling = async () => {
    try {
        let bat = chillBatchNumber.value;
        await v2w.methods.updateChilling(bat).send({from: accounts[0]}, function(error, result){
            alert('Successfully updated the timestamp for chilling the grapes');
            console.log(result);
        });

    } catch (error) {
        alert( `Failed to update timestamp of chilling the vine`);
        console.error(error)
    }
}

// this function is to update the timestamp when the pressing process of chilled vine is completed
const updatePressing = async () => {
    try {
        let bat = pressBatchNumber.value;
        await v2w.methods.updatePressing(bat).send({from: accounts[0]}, function(error, result){
            alert('Succesfully updated the timestamp for pressing the grapes');
            console.log(result);
        });

    } catch (error) {
        alert( `Failed to updated timestamp of pressing chilled vine`);
        console.error(error)
    }
}

// this function is to update the timestamp when the wine is barrelled
const updateBarrell = async () => {
    try {
        let bat = vineBatchNumber.value;

        await v2w.methods.updateBarrell(bat).send({from: accounts[0]}, function(error, result){
            

            v2w.events.allEvents( {fromBlock: "latest", toBlock: "latest" }, function(error, event){ 
                // console.log("generic_callback :", event); 
            }).on('data', function(event){
                alert('Succesfully barrelled the wine' + "\n" + "Barrell Id: " + event.returnValues[1]);
                console.log("on Data :",event);

            }).on('error', function(error, receipt) { 
                // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                console.log("on error in updateBarrell:",error); 
            });

            //console.log(result);
        });

    } catch (error) {
        alert( `Failed to updated timestamp of barrelling the wine`);
        console.error(error)
    }
}

// this function is to update the timestamp when the wine is barrelled
const receiveBarrell = async () => {
    try {
        let barrellBat = barrellBatchRcv.value;
        let prodadd = prodAddress.value;
        await v2w.methods.receiveBarrell(barrellBat, prodadd).send({from: accounts[0]}, function(error, result){
            alert('Packer received the Barrell from Producer');
            console.log(result);
        });

    } catch (error) {
        alert( `Failed to updated timestamp of preceiving the barrel from producer`);
        console.error(error)
    }
}

// this function is to bottle the wine form a barrell
const updateBottleId = async () => {
    try {
        let botid = bottleId.value;
        let batch = barrellBatch.value;
        await v2w.methods.updateBottleId(botid, batch).send({from: accounts[0]}, function(error, result){
            alert('Succesfully botteled the wine');
            console.log(result);
        });

    } catch (error) {
        alert( `Failed to updated bottle is`);
        console.error(error)
    }
}

// this function is to change the ownership of bottle
const changeOwner = async () => {
    try {
        let botid = chgBottleOwn.value;
        await v2w.methods.changeOwner(botid).send({from: accounts[0]}, function(error, result){
            alert('Succesfully changed the ownership');
            console.log(result);
        });

    } catch (error) {
        alert( `Failed to updated bottle is`);
        console.error(error)
    }
}

// this function is to get history of a bottle
const getBottleHistory = async () => {
    try {
        let histBbotidotId = histBotId.value;
        
        await v2w.methods.getBottleHistory(histBbotidotId).send({from: accounts[0]}, function(error, result){

            console.log(result);

            v2w.events.allEvents( {fromBlock: "latest", toBlock: "latest" }, function(error, event){ 
                // console.log("generic_callback :", event); 
            }).on("connected", function(subscriptionId){
                console.log("on Connected :",subscriptionId);
            }).on('data', function(event){
                console.log("on Data :",event.returnValues);
                var borderline = "=======================================================================" + "\n";
                var Vinedetails = "Vineyard Details: " + "\n";
                Vinedetails += "Farmer Address - " + event.returnValues[1][1][0] + "\n";
                Vinedetails += "Location Id - " + event.returnValues[1][1][1] + "\n";
                Vinedetails += "Vine Variety - " + event.returnValues[1][1][2] + "\n";
                Vinedetails += "Grapes Picked Timestamp - " + convertdatetime(event.returnValues[1][1][3]) + "\n";
                Vinedetails += "Vine Batch - " + event.returnValues[1][1][4] + "\n";
                var Barrelldetails = "Production Details: "  + "\n";
                Barrelldetails += "Batch received from Farmer Timestamp - " + convertdatetime(event.returnValues[1][2][2]) + "\n";
                Barrelldetails += "Destemming timestamp - " + convertdatetime(event.returnValues[1][2][3]) + "\n";
                Barrelldetails += "Crushing timestamp - " + convertdatetime(event.returnValues[1][2][4]) + "\n";
                Barrelldetails += "Chilling timestamp - " + convertdatetime(event.returnValues[1][2][5]) + "\n";
                Barrelldetails += "Pressing timestamp - " + convertdatetime(event.returnValues[1][2][6]) + "\n";
                Barrelldetails += "Barrelling timestamp - " + convertdatetime(event.returnValues[1][2][7]) + "\n";
                Barrelldetails += "Barrell Batch Number - " + event.returnValues[1][2][8] + "\n";
                var Packerdetails = "Packer Details: " + "\n";
                Packerdetails += "Producer Address - " + event.returnValues[1][3][1] + "\n";
                Packerdetails += "Barrell Received timestamp - " + convertdatetime(event.returnValues[1][3][2]) + "\n";
                Packerdetails += "Wine Bottled timestamp - " + convertdatetime(event.returnValues[1][3][3]) + "\n";
                var owners = "Owner Details: ";
                for (var i = 0; i <  event.returnValues[1][4].length; i++){
                    owners += "\n"+ event.returnValues[1][4][i]
                }
                history.innerHTML = Vinedetails + borderline + Barrelldetails + borderline + Packerdetails + borderline + owners;
            }).on('error', function(error, receipt) { 
                // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                console.log("on error :",error); 
            });

        });



    } catch (error) {
        alert( `Failed to updated timestamp of pressing chilled vine`);
        console.error(error)
    }
}

function convertdatetime(unixtimestamp) {
    const milliseconds = unixtimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString();
    return humanDateFormat;
}


//fetch farm details from blockchain for the logged in address
const showFarmDetails = async () => {
    try {
        await v2w.methods.getVineyardDetails(accounts[0]).call(function(error, result){
            var str = '';
            for (var i = 0; i < result.length; i++){
                str += result[i][1] + ", " + result[i][2];
                if (result[i][5]){
                    str += ", " + result[i][3] + ", " + result[i][4] + ", " + result[i][5] + "\n";
                }
                else{
                    str += "\n";
                }
            }

            vineyardDetail.innerHTML = str;
            console.log(result);
        });

    } 
    
    catch (error) {
        alert( `Failed to retrieve value`);
        console.error(error)
    }
}



//this funciton handles the connection to metamask
const onClickConnect = async () => {
    try {
        const newAccounts = await ethereum.request({ method: 'eth_requestAccounts', })
        handleNewAccounts(newAccounts)
        networkId = await getNetworkAndChainId();
        
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            
            await initContracts(networkId);
            // chage the test of connect button to connected
            onboardButton.innerHTML = "Connected";
            if (accounts == "0xffcf8fdee72ac11b5c542428b35eef5769c409f0") {
                addRole.innerHTML = "Role: Farmer";
            }

        }

    } catch (error) {
      console.error(error)
    }
}


function handleNewAccounts (newAccounts) {
    accounts = newAccounts
    accountsDiv.innerHTML = accounts
    
}

const isMetaMaskConnected = () => accounts && accounts.length > 0


function handleNewChain (chainId) {
    chainIdDiv.innerHTML = chainId
}

function handleNewNetwork (networkId) {
    networkDiv.innerHTML = networkId
}

async function getNetworkAndChainId () {
    let networkId = undefined
    try {
      const chainId = await ethereum.request({
        method: 'eth_chainId',
      })
      handleNewChain(chainId)

      networkId = await ethereum.request({
        method: 'net_version',
      })
      handleNewNetwork(networkId)
    } catch (err) {
      console.error(err)
    }
    return networkId;
}


// this function creates contract object when teh page is loaded
async function initContracts(networkId) {
    if(contractInitialized == false){

        $.getJSON('VineToWine.json', function(data) {

            try {
                // Get the contract instance.
                const deployedNetwork = data.networks[networkId];
                
                v2w = new web3.eth.Contract( data.abi, deployedNetwork.address );
                contractInitialized = true;
                subscribe();

            } catch (error) {
                // Catch any errors for any of the above operations.
                alert( `Failed to load web3, accounts contracts. Check console for details.`);
                console.log(error);
            }
        });

        $.getJSON('NewToken.json', function(data) {

            try {
                // Get the contract instance.
                const deployedNetwork = data.networks[networkId];
                
                token = new web3.eth.Contract( data.abi, deployedNetwork.address );
                console.log(token);
                contractInitialized = true;

            } catch (error) {
                // Catch any errors for any of the above operations.
                alert( `Failed to load web3, accounts contracts. Check console for details.`);
                console.log(error);
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', initialize);


function subscribe(){
    v2w.events.allEvents( {fromBlock: "latest", toBlock: "latest" }, function(error, event){ 
        // console.log("generic_callback :", event); 
    }).on("connected", function(subscriptionId){
        console.log("on Connected :",subscriptionId);
    }).on('data', function(event){
        console.log("on Data :",event);
    }).on('error', function(error, receipt) { 
        // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log("on error :",error); 
    });
}
