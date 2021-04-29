# VineToWine
Ethereum project for wine traceability. It will need multiple entities to be registered on the smart contract in order to enable tracing a bottle of vine right from a farmer's farm to reaching the retailer. End consumer can scan the bottle id on the bar code and get the entire history of the bottle like which farm the grape was picked from, when was the grape picked, the quality of the grape. One can also see when the vine was processed at different stages of wine creation and when the barrell was bottled. This can enable them to trace the age of the wine and understand the gap between a vine being picked to when it was bottled. This smart contract will also help trace the change in the ownership of bottle from distributor onwards.


# Pre-requisite
1) Install metamask on the browser
2) Download the code base from github into a folder
3) Install ganache, truffle on the MacOS

# How to execute the project
1) Download the entire code base in a folder
2) Run npm install to install all the npm dependencies
3) In a Terminal run the ganache-cli in daemon mode - ganache-cli -d
4) In another terminal, login to truffle development console using - truffle console --network development
5) Once on the truffle console, migrate the code base by using command - migrate
6) Then in a terminal run the UI using - npm run dev
7) This will kickoff the UI and it will be ready to interact with the smart contract.

# Tokenomics:
This smart contract creates a ERC20 token V2W with a inital conversion rate of 1 ETH equivalent to 100 VTW token. Any entity in order to register on the platform will have to buy V2W token which will be staked on the platform in order to ensure trust in trustless environment. For simplicity we have kept 10 token as staking amount for each participating entity. Since each of the participants will have stake in the system, this will ensure trust and honesty on behalf of each entity in a trustless environment. Rest all transactions on the blockchain will have tis gas fee paid in the ETH as any smart contract execution. Purpose of token is to create a system where every entity has a stake in the system to ensure trust.
