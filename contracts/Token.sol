// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract NewToken is ERC20 {
    
    address public owner;
    
    constructor(string memory name, string memory symbol, uint256 count) ERC20(name, symbol) public {
        
        owner = msg.sender;
        // _setupDecimals(1);
        _mint(msg.sender, count * 10 ** 18);
        
    }
}