// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Metacapsule is ERC1155 {
   struct NFT 
	{
	   address owner;
       string title;
       uint256 numberOfItems;
	    uint256 price;
       string itemId;
       string _uri;

    }
     string public name = "Meta Capsule NFT";
     string public symbol ="METAC"; 
    constructor() public ERC1155("https://game.example/api/item/{id}.json") {
    

    }

     
     

     mapping (uint256 => NFT) items;
     uint256 currentTokenID=1;
     
     event ItemCreated(address indexed owner,string title,string itemId,uint256 numberOfItems,uint256 price,uint256 tokenID);
     
     function createItem(string calldata _title, string calldata itemId ,uint256 _numberOfItems, uint256 price,string calldata _uri)  payable public
     {

         
         _mint(msg.sender, currentTokenID, _numberOfItems, "");  //Mint master NFT
        
       
       items[currentTokenID].owner   =  msg.sender;
       items[currentTokenID].title  = _title;
       items[currentTokenID].numberOfItems   =  _numberOfItems;
       items[currentTokenID].price   =  price;
       items[currentTokenID].itemId   =  itemId;
       items[currentTokenID]._uri   = _uri;

       
       
     emit ItemCreated(msg.sender,_title,itemId, _numberOfItems, price,currentTokenID);
         currentTokenID += 1;
 

     }

 function uri(uint256 tokenId) override
        public
       view
        returns (string memory)
    {
        return string(abi.encodePacked( items[tokenId]._uri));

    }        
}