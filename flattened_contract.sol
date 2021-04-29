// File: @openzeppelin/contracts/token/ERC20/IERC20.sol

// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

// File: contracts/VinetoWine.sol


pragma solidity 0.6.12;

pragma experimental ABIEncoderV2;


// address details for testing, each will have 100 tokens transfered (100000000000000000000)
// farmer - 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
// producer - 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
// packer - 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB
// distributor - 0x617F2E2fD72FD9D5503197092aC168c91465E7f2
// retailer - 0x17F6AD8Ef982297579C203069C1DbfFE4348c372
// consumer - 0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678
// contract deployer - 0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7

contract VineToWine {
    
    //  ************   entity registration block starts ***************************************
    enum role{farmer, producer, packer, distributor, retailer, consumer}
    
    struct entity {
        string entityname;
        uint entityrole;
    }
    
    // below is mapping to hold details for all registered entity in the ecosystem
    mapping(address => entity) addressRoleMapping;
    
    // below holds address for all the entities in an array to manupulate mappings
    address [] public farmer_array;
    address [] public producer_array;
    address [] public packer_array;
    address [] public distributor_array;
    address [] public retailer_array;
    address [] public consumer_array;
    // ************* entity registration block ends  *******************************************
    
    // ************* farmer entity block start *************************************************
    struct vineyard {
        address farmer_ddress;
        string location_id;
        string vine_variety;
        uint picking_timestamp;
        string batch_num;
        bool vine_picked;
    }
    
    mapping(address => vineyard[]) vineyardmap;
    
    // ************* farmer entity block ends  *************************************************
    
    // ************* producer entity block starts **********************************************
    struct producer{
        string batch_num;
        address farm_address;
        uint batch_rcvd_timestamp;
        uint destemmer_timestamp;
        uint crusher_timestamp;
        uint chiller_timestamp;
        uint presser_timestamp;
        uint barrell_timestamp;
        string barrel_batch_number;
    }
    
    mapping(address => producer[]) producermap;
    
    // ************* producer entity block ends  ***********************************************
    
    // ************ packer entity block starts   ***********************************************
    struct packer{
        string barrel_batch_number;
        address producer_address;
        uint received_timestamp;
        uint bottled_timestamp;
    }
    
    mapping(address => packer[]) packermap;
    mapping(string => packer) bottlemap;
    mapping(string => address[]) bottleownermap;
    // ************ packer entity block ends     ***********************************************

    // ************ history structure for a bottle id starts ***********************************
    struct bottleHistory{
        string bottle_id;
        vineyard vineyard_details;
        producer barrell_details;
        packer packer_details;
        address [] owners;
    }
    // ************ history structure for a bottle id ends **************************************
    
    
    //*********** this holds all the events ***************************
    event entityRegistered(address entity, string name, uint roleentity);
    event vineyardRegistered(address farmer, string location, string vinevariety);
    event vineyardPicked(address farmer, string location, string batch_num);
    event vineVarietyChanged(address farmer, string location, string vinevariety);
    event vineBatchReceived(address producer_address, producer p);
    event produreDetails(producer []);
    event barrellDetails(address producer_address, string barrell_batch_number);
    event barrellReceived(address packeraddress, string barrell_batch_number);
    event bottledEvent(address packeraddress, string bottleId, packer packedbottle);
    event bottle_history(address user, bottleHistory bottle_history_details);

    //*******************************************************************
    
    // delcare IRC20 token object to store address of token created for this whole eco system.
    
    IERC20 token;
    address contract_owner;
    address ICO_owner;
    uint256 staking_amount;
    
    constructor(address _token_address, uint256 _staking_amount, address _ICO_owner) public {
        token = IERC20(_token_address);
        contract_owner = msg.sender;
        staking_amount = _staking_amount;
        ICO_owner = _ICO_owner;
    }
    
    // end of block to store token address while creating contract
    
    //******* modifier block starts ****************************************************
    modifier checkFarmer() {
       require(addressRoleMapping[msg.sender].entityrole == uint(role.farmer), "the entity is not a farmer");
       _;
    }
    
    modifier checkProducer() {
        require(addressRoleMapping[msg.sender].entityrole == uint(role.producer), "the entity is not a producer");
        _;
    }
    
    modifier checkPacker() {
        require(addressRoleMapping[msg.sender].entityrole == uint(role.packer), "the entity is not a packer");
        _;
    }
    
    //******* modifier block ends *******************************************************
    
    // below function registers an entity in the ecosystem as one of the roles
    function registerEntity(string memory _name, uint _role) public payable {
        
        
        require(uint(role.farmer) == _role || uint(role.producer) == _role || uint(role.packer) == _role || 
                uint(role.consumer) == _role || uint(role.distributor) == _role || uint(role.retailer) == _role, 
                "the role provided is invalid");
        
        // transfer 50 tokens to contract address while registering any entity
        // pass the staked amount to contract address
        if (uint(role.farmer) == _role || uint(role.producer) == _role || uint(role.packer) == _role || 
                uint(role.distributor) == _role || uint(role.retailer) == _role) {
                    token.transferFrom(msg.sender, ICO_owner, staking_amount * 10 ** 18);
                }
        
        entity memory e = entity(_name, _role);
        
        addressRoleMapping[msg.sender] = e;
        
        if(uint(role.farmer) == _role){
           farmer_array.push(msg.sender);
        }
        if(uint(role.producer) == _role){
           producer_array.push(msg.sender);
        }
        if(uint(role.packer) == _role){
           packer_array.push(msg.sender);
        }
        if(uint(role.distributor) == _role){
           distributor_array.push(msg.sender);
        }
        if(uint(role.retailer) == _role){
           retailer_array.push(msg.sender);
        }
        if(uint(role.consumer) == _role){
           consumer_array.push(msg.sender);
        }
        
        emit entityRegistered(msg.sender, _name, _role);
    }
    
    //below function is to register the vineyard to a farmer
    function registerVineryard(string memory _locationid, string memory _vinevariety) public checkFarmer(){
        
        vineyard memory v = vineyard(msg.sender, _locationid, _vinevariety, 0, " ", false);
        vineyardmap[msg.sender].push(v);
        emit vineyardRegistered(msg.sender, _locationid, _vinevariety);
        
    }
    
    //below function is to update the status of vine variety is changed
    function updateVineVariety(string memory _locationid, string memory _vinevariety) public checkFarmer() {
        
        uint curr_timestamp = now;
        
        for (uint i = 0; i < vineyardmap[msg.sender].length; i++){
            
            if(keccak256(abi.encodePacked(vineyardmap[msg.sender][i].location_id)) 
              == keccak256(abi.encodePacked(_locationid))){
                  
                  vineyardmap[msg.sender][i].vine_variety =  _vinevariety;
                  vineyardmap[msg.sender][i].picking_timestamp = curr_timestamp;
                  vineyardmap[msg.sender][i].vine_picked = false;
                  vineyardmap[msg.sender][i].batch_num = "";
                  break;
              }
            
        }
        
         emit vineVarietyChanged(msg.sender, _locationid, _vinevariety);   
        
    }

    //below function is to update the status of vineyard when the crop is picked
    function updateVineyardPicking(string memory _locationid) public checkFarmer(){
        
        uint curr_timestamp = now;
        
        for (uint i = 0; i < vineyardmap[msg.sender].length; i++){
            
            if(keccak256(abi.encodePacked(vineyardmap[msg.sender][i].location_id)) 
              == keccak256(abi.encodePacked(_locationid))){
                  
                  vineyardmap[msg.sender][i].picking_timestamp = curr_timestamp;
                  vineyardmap[msg.sender][i].vine_picked = true;
                  vineyardmap[msg.sender][i].batch_num = string(abi.encodePacked(_locationid, uintToStr(curr_timestamp)));
            
              }
            
        }
        
         emit vineyardPicked(msg.sender, _locationid, string(abi.encodePacked(_locationid, uintToStr(curr_timestamp))));   
        
    }
          
    //below function is triggeres by manufacturer to receive the vine batch
    function receiveVineBatch(string memory _batch_num, address _farm_address) public checkProducer() {
        
        producer memory p = producer(_batch_num,_farm_address,now,0,0,0,0,0,"");
        producermap[msg.sender].push(p);
        emit vineBatchReceived(msg.sender, p);
        
    }
    
    // below function updates the destemming timestamp
    function updateDestemming(string memory _batch_num) public checkProducer() {
        
        for(uint i = 0; i < producermap[msg.sender].length; i++){
            
            if ( keccak256(abi.encodePacked(producermap[msg.sender][i].batch_num)) ==
                keccak256(abi.encodePacked(_batch_num))){
                  producermap[msg.sender][i].destemmer_timestamp = now;  
                  emit vineBatchReceived(msg.sender, producermap[msg.sender][i]);
                }
        }
    }
    
    // below function updates the crushing timestamp
    function updateCrushing(string memory _batch_num) public checkProducer() {
        
        for(uint i = 0; i < producermap[msg.sender].length; i++){
            
            if ( keccak256(abi.encodePacked(producermap[msg.sender][i].batch_num)) ==
                keccak256(abi.encodePacked(_batch_num))){
                  producermap[msg.sender][i].crusher_timestamp = now;  
                  emit vineBatchReceived(msg.sender, producermap[msg.sender][i]);
                }
        }
    }
    
    // below function updates the crushing timestamp
    function updateChilling(string memory _batch_num) public checkProducer() {
        
        for(uint i = 0; i < producermap[msg.sender].length; i++){
            
            if ( keccak256(abi.encodePacked(producermap[msg.sender][i].batch_num)) ==
                keccak256(abi.encodePacked(_batch_num))){
                  producermap[msg.sender][i].chiller_timestamp = now;  
                  emit vineBatchReceived(msg.sender, producermap[msg.sender][i]);
                }
        }
    }
    
    // below function updates the pressing timestamp
    function updatePressing(string memory _batch_num) public checkProducer() {
        
        for(uint i = 0; i < producermap[msg.sender].length; i++){
            
            if ( keccak256(abi.encodePacked(producermap[msg.sender][i].batch_num)) ==
                keccak256(abi.encodePacked(_batch_num))){
                  producermap[msg.sender][i].presser_timestamp = now;  
                  emit vineBatchReceived(msg.sender, producermap[msg.sender][i]);
                }
        }
    }
    
    // below function updates the barell timestamp
    function updateBarrell(string memory _batch_num) public checkProducer() {
        
        string memory temp_barell_batch_number = "";
        for(uint i = 0; i < producermap[msg.sender].length; i++){
            
            if ( keccak256(abi.encodePacked(producermap[msg.sender][i].batch_num)) ==
                keccak256(abi.encodePacked(_batch_num))){
                  uint temptimestamp = now;
                  producermap[msg.sender][i].barrell_timestamp = temptimestamp;  
                  producermap[msg.sender][i].barrel_batch_number = 
                  string(abi.encodePacked(_batch_num, uintToStr(temptimestamp)));
                  temp_barell_batch_number = producermap[msg.sender][i].barrel_batch_number;
                }
        }
        
        emit barrellDetails(msg.sender, temp_barell_batch_number);
    }
    
    // below function updates the timestamp when packer receives the barrel 
    function receiveBarrell(string memory _barrel_batch_number, address _producer_address) public checkPacker() {
        
        packer memory p = packer(_barrel_batch_number, _producer_address, now, 0);
        packermap[msg.sender].push(p);
        
        emit barrellReceived(msg.sender, _barrel_batch_number);
    }
    
    // this function updates the bottle id when the bottle is filled from the barrell. This will update the 
    // bottle id along with the barell id used for bottling.
    function updateBottleId(string memory _bottle_id, string memory _barrel_batch_number) public checkPacker() {
        
        packer memory p = packer(_barrel_batch_number, msg.sender ,0,0);
        for(uint i = 0; i < packermap[msg.sender].length; i++) {
           
           if (keccak256(abi.encodePacked(packermap[msg.sender][i].barrel_batch_number)) ==
              keccak256(abi.encodePacked(_barrel_batch_number))) {
                  
                  uint temptimestamp = now;
                  p.producer_address = packermap[msg.sender][i].producer_address;
                  p.received_timestamp = packermap[msg.sender][i].received_timestamp;
                  p.bottled_timestamp = temptimestamp;
                  bottlemap[_bottle_id] = p;
                  packermap[msg.sender][i].bottled_timestamp = temptimestamp;
              }
        }
        
        emit bottledEvent(msg.sender, _bottle_id, p);
    }
    
    // this function stores any change in the ownership of the bottle once the packer handles it to distributor
    function changeOwner(string memory _bottle_id) public {
        require(addressRoleMapping[msg.sender].entityrole == uint(role.farmer) ||
                addressRoleMapping[msg.sender].entityrole == uint(role.producer) ||
                addressRoleMapping[msg.sender].entityrole == uint(role.packer) ||
                addressRoleMapping[msg.sender].entityrole == uint(role.distributor) ||
                addressRoleMapping[msg.sender].entityrole == uint(role.retailer) ||
                addressRoleMapping[msg.sender].entityrole == uint(role.consumer), "the adress is not registered");
        bottleownermap[_bottle_id].push(msg.sender);
    }
    
    // this function gives history of the bottle_id
    function getBottleHistory(string memory _bottle_id) public{
        
        //create a temporary struct for packer data
        packer memory p = bottlemap[_bottle_id];
        string memory barrel_number = p.barrel_batch_number;
        address temp_addr = p.producer_address;
        
        // create a temporary struct for producer data
        producer memory prod = producer("",temp_addr, 0,0,0,0,0,0,"");
        
        for (uint i = 0; i < producermap[temp_addr].length; i++) {
            if (keccak256(abi.encodePacked(producermap[temp_addr][i].barrel_batch_number)) == 
                keccak256(abi.encodePacked(barrel_number))){
                    prod = producermap[temp_addr][i];
                }
        }
        
        
        address farm_temp = prod.farm_address;
        string memory batch_num_temp = prod.batch_num;
        
        // create a temporary struct for vineyard data
        vineyard memory v = vineyard(farm_temp, "", "", 0, "", false);
        for (uint i = 0; i < vineyardmap[farm_temp].length; i++) {
            if (keccak256(abi.encodePacked(vineyardmap[farm_temp][i].batch_num)) == 
                keccak256(abi.encodePacked(batch_num_temp))){
                    v = vineyardmap[farm_temp][i];
                }
            
        }
        
        
        bottleHistory memory b = bottleHistory(_bottle_id, v, prod, p, bottleownermap[_bottle_id]);
        
        
        emit bottle_history(msg.sender, b);
    }
    
    
    //*******************************************************************************************
    // create an ERC721 token to associate with bottle_id
    // ******************************************************************************************
    
    // *****************  Non blockchain related processing starts ************************************
    // below is a function to convert uint to string to genrate the batch number
    function uintToStr(uint _i) internal pure returns (string memory _uintAsString) {
        uint number = _i;
        if (number == 0) {
            return "0";
        }
        uint j = number;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (number != 0) {
            bstr[k--] = byte(uint8(48 + number % 10));
            number /= 10;
        }
        return string(bstr);
    }
    
    // **************** non blockchain related function ends. *****************************************
    
    
    
    // ************************************************************************************************
    // ** all functions below this are for information and testing only.
    // ************************************************************************************************
    
    // this returns all the vineyard details for a farmer address
    function getVineyardDetails(address _farmer) view public returns(vineyard [] memory){
         vineyard [] memory vines = new vineyard[] (vineyardmap[_farmer].length);
         for (uint i = 0; i < vineyardmap[_farmer].length; i++) {
             vines[i] = vineyardmap[_farmer][i];
         }

        return vines; 
        //emit vineyardDetails(vines);
    }
    
    // this function returns history of all produce for a given producer
    function getProducerDetails(address _producer) public returns(producer [] memory) {
     
     require(addressRoleMapping[_producer].entityrole == uint(role.producer), "the address provided is not a producer");
     require(producermap[_producer].length > 0, "the producer does not have any record");
     
     producer [] memory p = new producer[] (producermap[_producer].length);
     for(uint i = 0; i < producermap[_producer].length; i++) { 
         p[i] = producermap[_producer][i]; 
     }
       
     emit produreDetails(p);
    }
    
    
}
