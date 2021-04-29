// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract V2WICO {
    
    IERC20 token;
    
    address owner;
    uint256 oneEthToTokenRatio;

    event TOKENEXCAHNGED(address seller, address buyer, uint256 amount);
    
    constructor() public {
        owner = msg.sender;
        oneEthToTokenRatio = 100;
    }
    
    //here we set the token address to the token creatd in the token.sol contract
    //then the token owner needs to approve the ICO contract to do the transaciton on behalf of token contract
    function setToken(address _token) public {
        token = IERC20(_token);
    }
    
    function buyTokens() public payable {
        require(msg.value >= 1 ether,"not enough ether sent");
        uint256 count = (oneEthToTokenRatio * msg.value);
        
        require(token.balanceOf(owner) > count, "contract does not have enough tokens");
        token.transferFrom(owner,msg.sender,count);    
        emit TOKENEXCAHNGED(owner, msg.sender, count); 

    }
}