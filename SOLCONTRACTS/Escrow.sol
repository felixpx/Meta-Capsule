// contracts/GameItems.sol
// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

pragma solidity ^0.8.0;



contract Escrow is KeeperCompatibleInterface {
    struct Agreement {
        string agreementId;
        address buyer;
        address seller;
        uint256 deadline;
        string file;
        uint256 amount;
        AgreementState currState;
        bool exist;
                 
    }


    string[] allAgreements; 
    mapping (string => Agreement) agreements;

    enum AgreementState { NOT_INITIATED, Created, Accepted , Cancelled ,SellerMissedDeadLine, BuyerMissedDeadLine,SellerUploadedFiles,BuyerRejected, Completed}
    event AgreementCreated(string agreementId,address buyer,address seller,uint256 amount,uint256 dateCreated);
    event AgreementAccepted(string agreementId,address seller,uint256 dateAccepted);
    event AgreementCancelled(string agreementId,uint256 dateCancelled);
    event SellerMissedDeadLine(string agreementId,uint256 dateMissed);
    event BuyerMissedDeadLine(string agreementId,uint256 dateMissed);
    event SellerUploadedFiles(string agreementId,string file,uint256 dateUploaded);
    event BuyerRejected(string agreementId,uint256 dateReject);
    event AgreementCompleted(string agreementId,uint256 dateCompleted);
    
    address USDC_ADDRESS = address(0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e); //Polygon USDC
    IERC20 internal usdcToken;
    

     /**
   * @dev Modifier isAgreement. Make sure details exist for agreement
   * @param   agreementId  
   **/	  
	  
    modifier isAgreement (string memory agreementId){
	
	  require(agreements[agreementId].exist == true, "Agreement does not exist.");
    
   _; 
 }

/**
   * @dev Modifier isNotAgreement. Make sure details doesn't exist for agreement
   * @param   agreementId  
   **/	  
	  
    modifier isNotAgreement (string memory agreementId){
	
	  require(agreements[agreementId].exist == false, "Agreement exist.");
    
   _; 
 }
     /**
   * @dev Modifier isBuyer. Make sure only buyer can run function
   * @param   agreementId  
   **/	  
	  
    modifier isBuyer (string memory agreementId){
	
	  require(agreements[agreementId].exist == true, "Agreement does not exist.");
      require(agreements[agreementId].buyer == msg.sender, "Only Buyer can run this.");
      
   _; 
 }


 /**
   * @dev Modifier isSeller. Make sure only seller can run function
   * @param   agreementId  
   **/	  
	  
    modifier isSeller (string memory agreementId){
	
	  require(agreements[agreementId].exist == true, "Agreement does not exist.");
      require(agreements[agreementId].seller == msg.sender, "Only Seller can run this.");
      
   _; 
 }



     constructor() {
      usdcToken =   IERC20(USDC_ADDRESS);

    }


    //Create Agreement
 function createAgreement(string calldata agreementId,address seller, uint256 deadline,uint256 amount) isNotAgreement(agreementId) public
 {
     require(deadline > block.timestamp,"Date must be in the future");
     require(usdcToken.balanceOf(msg.sender) >= amount*10**6,"Not enough balance");

     agreements[agreementId].exist = true;
     agreements[agreementId].agreementId  = agreementId;
     agreements[agreementId].deadline = deadline;
     agreements[agreementId].amount = amount*10**6; 
     agreements[agreementId].buyer = msg.sender;
     agreements[agreementId].seller = seller;

     agreements[agreementId].currState = AgreementState.Created;
     allAgreements.push(agreementId);
     usdcToken.transferFrom(msg.sender,address(this),amount*10**6);
     emit AgreementCreated(agreementId,msg.sender,seller, amount,block.timestamp);


 }
    //Accept Agreement

  function acceptAgreement(string calldata agreementId) isAgreement(agreementId) isSeller(agreementId)  public
 {
     require(agreements[agreementId].currState == AgreementState.Created,"You cannot accept this agreement.");
     agreements[agreementId].currState = AgreementState.Accepted;
     emit AgreementAccepted(agreementId,msg.sender,block.timestamp);
 }   
 
  //Cancel Agreement
 function cancelAgreement(string calldata agreementId) isAgreement(agreementId) isBuyer(agreementId)  public
 {
     require(agreements[agreementId].currState == AgreementState.Created,"You cannot cancel this agreement.");
     agreements[agreementId].currState = AgreementState.Cancelled;
     usdcToken.transfer(msg.sender,agreements[agreementId].amount);
     emit AgreementCancelled(agreementId,block.timestamp);
 } 

//Seller Upload Files
function uploadFiles(string calldata agreementId,string calldata file) isAgreement(agreementId) isSeller(agreementId)  public
 {
     require(agreements[agreementId].currState == AgreementState.Accepted,"You cannot upload files.");
     require(agreements[agreementId].deadline > block.timestamp,"Deadline has past");
     agreements[agreementId].currState = AgreementState.SellerUploadedFiles;
     agreements[agreementId].file = file;

     //Send 25 % to Seller 
     uint256 amount  = (agreements[agreementId].amount/1000)*250;
     usdcToken.transfer(msg.sender,amount);
     emit SellerUploadedFiles(agreementId,file,block.timestamp);
 }

    //Buyer Reject 

  function rejectAgreement(string calldata agreementId) isAgreement(agreementId) isBuyer(agreementId)  public
 {
     require(agreements[agreementId].currState == AgreementState.SellerUploadedFiles,"You cannot reject this agreement.");
     require(agreements[agreementId].deadline > block.timestamp,"Deadline has past");

     agreements[agreementId].currState = AgreementState.BuyerRejected;
    
    //Send 75 % to Buyer 
     uint256 amount  = (agreements[agreementId].amount/1000)*750;
     usdcToken.transfer(msg.sender,amount);   
     emit BuyerRejected(agreementId,block.timestamp);
 } 

  //Complete Agreement

  function completeAgreement(string calldata agreementId) isAgreement(agreementId) isBuyer(agreementId)  public
 {
     require(agreements[agreementId].currState == AgreementState.SellerUploadedFiles,"You cannot reject this agreement.");
     require(agreements[agreementId].deadline >  block.timestamp,"Deadline has past");

     agreements[agreementId].currState = AgreementState.Completed;
    
    //Send 75 % to Seller 
     uint256 amount  = (agreements[agreementId].amount/1000)*750;
     usdcToken.transfer(agreements[agreementId].seller,amount);   
     emit AgreementCompleted(agreementId,block.timestamp);
 } 
    
    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory /* performData */) {
       for(uint256 loop=0;loop < allAgreements.length;loop++)
       {
           //check if agreement deadline reached and Files not uploaded
           if( agreements[allAgreements[loop]].currState == AgreementState.Accepted && block.timestamp >  agreements[allAgreements[loop]].deadline )     
           {
               return(true,abi.encode(loop));
           }      


             //check if agreement deadline reached and Files not approved by Buyer
           if( agreements[allAgreements[loop]].currState == AgreementState.SellerUploadedFiles && block.timestamp >  agreements[allAgreements[loop]].deadline )     
           {
               return(true,abi.encode(loop));
           }  
       }

       return(false,bytes(""));

    }

    function performUpkeep(bytes calldata performData) external {
      uint256 _agreementId = abi.decode(performData, (uint256));

           //check if agreement deadline reached and Files not uploaded
           if( agreements[allAgreements[_agreementId]].currState == AgreementState.Accepted && block.timestamp >  agreements[allAgreements[_agreementId]].deadline )     
           {
               //Send 75 % to Buyer 
              uint256 amount  = (agreements[allAgreements[_agreementId]].amount/1000)*750;
              usdcToken.transfer(agreements[allAgreements[_agreementId]].buyer,amount); 
              agreements[allAgreements[_agreementId]].currState  = AgreementState.SellerMissedDeadLine;  
              emit SellerMissedDeadLine(agreements[allAgreements[_agreementId]].agreementId,block.timestamp);
    
           }

          //check if agreement deadline reached and Files not approved by Buyer
           if( agreements[allAgreements[_agreementId]].currState == AgreementState.SellerUploadedFiles && block.timestamp >  agreements[allAgreements[_agreementId]].deadline )     
           {

              //Send 75 % to Seller 
              uint256 amount  = (agreements[allAgreements[_agreementId]].amount/1000)*750;
              usdcToken.transfer(agreements[allAgreements[_agreementId]].seller,amount); 
              agreements[allAgreements[_agreementId]].currState  = AgreementState.BuyerMissedDeadLine;  
              emit BuyerMissedDeadLine(agreements[allAgreements[_agreementId]].agreementId,block.timestamp);
    
           } 

    }


}