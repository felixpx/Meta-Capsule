Moralis.Cloud.define("api", async(request) => {
    const id= request.params.id;
    const Album =  Moralis.Object.extend("Album");
    const query = new Moralis.Query(Album)
    query.equalTo("token_id",id);
    const results = await query.first({useMasterKey:true});
    if(results)
    {
       return ({
      
    "name": "Metacapsule NFT",
    "symbol":"METAC",     
    "image":"https://dweb.link/ipfs/QmQ9WYJUXdsao4ZeGygLjf26yLonhNfA67gvCcnEUAzswR",
    "description":"NFT donations for Ukraine"
      
  })
    }
    else
      return {
      
    "name": "Metacapsule NFT",
    "symbol":"METAC",     
    "image":"https://dweb.link/ipfs/QmQ9WYJUXdsao4ZeGygLjf26yLonhNfA67gvCcnEUAzswR",
    "description":"NFT donations for Ukraine"
      
  };
    
  });
  
  
  Moralis.Cloud.afterSave("ItemCreated", async function(request) {
    const tokenID = request.object.get("tokenID");
    const itemId = request.object.get("itemId"); 
    const item =  Moralis.Object.extend("Item");
    const query = new Moralis.Query(item)
    query.equalTo("objectId",itemId);
    const logger = Moralis.Cloud.getLogger();
    logger.info(`The Parameters from contract ${JSON.stringify(request)}`); 
    
    if(request.object.get("confirmed") !=true)
     {  
       logger.info(`The object is confirmed ${JSON.stringify(request)}`); 
    
        const result =  await query.first({useMasterKey:true});
       logger.info(`result ${JSON.stringify(result)}`);
       result.set("tokenId",request.object.get("tokenID"));
        result.set("active",true);
        result.set("owner",request.object.get("owner"));
        result.save(null,{useMasterKey:true});
     }
   });
  
  Moralis.Cloud.afterSave("AgreementCreated", async function(request) {
    
    const agreementId = request.object.get("agreementId"); 
    const escrow =  Moralis.Object.extend("Escrow");
    const query = new Moralis.Query(escrow)
    query.equalTo("objectId",agreementId);
    const logger = Moralis.Cloud.getLogger();
    logger.info(`The Parameters from contract ${JSON.stringify(request)}`); 
    
    if(request.object.get("confirmed") !=true)
     {  
       logger.info(`The object is confirmed ${JSON.stringify(request)}`); 
    
        const result =  await query.first({useMasterKey:true});
         logger.info(`result ${JSON.stringify(result)}`);
        result.set("active",true);
        result.save(null,{useMasterKey:true});
     }
   });
  
  
  Moralis.Cloud.afterSave("AgreementAccepted", async function(request) {
    
    const agreementId = request.object.get("agreementId"); 
    const escrow =  Moralis.Object.extend("Escrow");
    const query = new Moralis.Query(escrow)
    query.equalTo("objectId",agreementId);
    const logger = Moralis.Cloud.getLogger();
    logger.info(`The Parameters from contract ${JSON.stringify(request)}`); 
    
    if(request.object.get("confirmed") !=true)
     {  
       logger.info(`The object is confirmed ${JSON.stringify(request)}`); 
    
        const result =  await query.first({useMasterKey:true});
         logger.info(`result ${JSON.stringify(result)}`);
        result.set("approved",true);
        result.save(null,{useMasterKey:true});
     }
   });
  
  
  Moralis.Cloud.afterSave("SellerUploadedFiles", async function(request) {
    
    const agreementId = request.object.get("agreementId"); 
    const _file  = request.object.get("file");
    const escrow =  Moralis.Object.extend("Escrow");
    const query = new Moralis.Query(escrow)
    query.equalTo("objectId",agreementId);
    const logger = Moralis.Cloud.getLogger();
    logger.info(`The Parameters from contract ${JSON.stringify(request)}`); 
    
    if(request.object.get("confirmed") !=true)
     {  
       logger.info(`The object is confirmed ${JSON.stringify(request)}`); 
    
        const result =  await query.first({useMasterKey:true});
         logger.info(`result ${JSON.stringify(result)}`);
        result.set("fileUploaded",true);
        result.set("file",_file);
       
        result.save(null,{useMasterKey:true});
     }
   });
  
  
  Moralis.Cloud.afterSave("BuyerRejected", async function(request) {
    
    const agreementId = request.object.get("agreementId"); 
    const escrow =  Moralis.Object.extend("Escrow");
    const query = new Moralis.Query(escrow)
    query.equalTo("objectId",agreementId);
    const logger = Moralis.Cloud.getLogger();
    logger.info(`The Parameters from contract ${JSON.stringify(request)}`); 
    
    if(request.object.get("confirmed") !=true)
     {  
       logger.info(`The object is confirmed ${JSON.stringify(request)}`); 
    
        const result =  await query.first({useMasterKey:true});
         logger.info(`result ${JSON.stringify(result)}`);
        result.set("finalApproval",false);
        result.save(null,{useMasterKey:true});
     }
   });
  
  
  Moralis.Cloud.afterSave("AgreementCompleted", async function(request) {
    
    const agreementId = request.object.get("agreementId"); 
    const escrow =  Moralis.Object.extend("Escrow");
    const query = new Moralis.Query(escrow)
    query.equalTo("objectId",agreementId);
    const logger = Moralis.Cloud.getLogger();
    logger.info(`The Parameters from contract ${JSON.stringify(request)}`); 
    
    if(request.object.get("confirmed") !=true)
     {  
       logger.info(`The object is confirmed ${JSON.stringify(request)}`); 
    
        const result =  await query.first({useMasterKey:true});
         logger.info(`result ${JSON.stringify(result)}`);
        result.set("finalApproval",true);
        result.save(null,{useMasterKey:true});
     }
   });
  
  Moralis.Cloud.afterSave("SellerMissedDeadLine", async function(request) {
    
    const agreementId = request.object.get("agreementId"); 
    const escrow =  Moralis.Object.extend("Escrow");
    const query = new Moralis.Query(escrow)
    query.equalTo("objectId",agreementId);
    const logger = Moralis.Cloud.getLogger();
    logger.info(`The Parameters from contract ${JSON.stringify(request)}`); 
    
    if(request.object.get("confirmed") !=true)
     {  
       logger.info(`The object is confirmed ${JSON.stringify(request)}`); 
    
        const result =  await query.first({useMasterKey:true});
         logger.info(`result ${JSON.stringify(result)}`);
        result.set("sellerMissedDeadLine",true);
        result.save(null,{useMasterKey:true});
     }
   });
  
  Moralis.Cloud.afterSave("BuyerMissedDeadLine", async function(request) {
    
    const agreementId = request.object.get("agreementId"); 
    const escrow =  Moralis.Object.extend("Escrow");
    const query = new Moralis.Query(escrow)
    query.equalTo("objectId",agreementId);
    const logger = Moralis.Cloud.getLogger();
    logger.info(`The Parameters from contract ${JSON.stringify(request)}`); 
    
    if(request.object.get("confirmed") !=true)
     {  
       logger.info(`The object is confirmed ${JSON.stringify(request)}`); 
    
        const result =  await query.first({useMasterKey:true});
         logger.info(`result ${JSON.stringify(result)}`);
        result.set("buyerMissedDeadLine",true);
        result.save(null,{useMasterKey:true});
     }
   });
  
  
  
  Moralis.Cloud.afterSave("TokenListed", async function(request) {
    if(request.object.get("confirmed") !=true)
    {
       const tokenId = request.object.get("tokenId"); 
    
       const item =  Moralis.Object.extend("item");
       const query = new Moralis.Query(item)
       query.equalTo("tokenId",tokenId);
       const result =  await query.first({useMasterKey:true});
       result.set("listing_id",request.object.get("listingId"));
       result.save(null,{useMasterKey:true});
     
    }
  
  });
  
  
  Moralis.Cloud.define("getItems", async(request) => {
     const {owner,token_address}  = request.params;
     const query = new Moralis.Query("ItemCreated");
     const pipeline = [
  
      {lookup: {
        from: "PolygonNFTOwners",
        let: { owner: "$owner", token_id:"$tokenId"},
  
         pipeline: [
          {$match: {$expr: {$and: [
            { $eq: ["$owner_of", "$$owner"] },
            { $eq: ["$token_id", "$$token_id"] },
        ]}}}],
        as: "dt"
      }},{unwind:{path:"$dt"}},
        {project: {objectId:1,itemId:1,tokenId:1,owner_of:"$dt.owner_of",amount:"$dt.amount",uri:"$dt.token_uri",token_id:"$dt.token_id"}},
       {lookup: {
        from: "item",
        let :{objectId:"$itemId"}, 
        pipeline: [
          {$match: {$expr: {$and: [
            { $eq: ["$_id", "$$objectId"] },
            { $eq: ["$listed", true] },
        ]}}}],
          
        as: "item"}},{unwind:{path:"$item"}},
       {project: {objectId:1,tokenId:1,owner_of:1,amount:1,uri:1,token_id:1,
                  itemFile:"$item.itemFile",itemTitle:"$item.itemTitle",
                   itemPrice:"$item.itemPrice",itemDescription:"$item.itemDescription"
                    ,numberOfItems:"$item.numberOfItems",listing_id:"$item.listing_id"}},
  {lookup: {
        from: "_User",
      let: { owner: "$owner_of"},
  
         pipeline: [
          {$match: {$expr: {$in:["$$owner", "$accounts"] }}}
        ],  
      as:"user" }},{unwind:{path:"$user"}},
       
        {project: {objectId:1,tokenId:1,itemId,owner:1,amount:1,uri:1,token_id:1,itemFile:1,numberOfItems:1,itemDescription:1,itemPrice:1,itemTitle:1,username:"$user.username",listing_id:1}}
      
          
    ];
    
    return query.aggregate(pipeline);
  }); 
  
  
  Moralis.Cloud.define("getItemssPurchased", async(request) => {
     const {owner,token_address}  = request.params;
     const query = new Moralis.Query("TokenSold");
      query.equalTo("buyer",owner);
     query.equalTo("contractAddress",token_address);
     const pipeline = [
  {lookup: {
        from: "ItemCreated",
        let: { owner: "$buyer", token_id:"$tokenId"},
  
         pipeline: [
          {$match: {$expr: {$and: [
  
            { $eq: ["$tokenId", "$$token_id"] }
        ]}}}],
        as: "ac"
      }},{unwind:{path:"$ac"}},
        
       {project: {objectId:1,tokenId:"$ac.tokenId",owner:"$ac.owner",buyer:owner,itemId:1}}
       ,
      {lookup: {
        from: "PolygonNFTOwners",
        let: { buyer: "$buyer", token_id:"$tokenId"},
  
         pipeline: [
          {$match: {$expr: {$and: [
                     { $eq: ["$owner_of", "$$buyer"] },
                     { $eq: ["$token_id", "$$token_id"] }
        ]}}}],
        as: "dt"
      }},{unwind:{path:"$dt"}},
       {project: {objectId:1,itemId:"$ac.itemId",owner_of:"$dt.owner_of",amount:"$dt.amount",
                 uri:"$dt.token_uri",token_id:"$dt.token_id"}}
       ,
        {lookup: {
        from: "Item",
        let :{objectId:"$itemId",token_id:"$token_id"}, 
        pipeline: [
          {$match: {$expr: {$and: [
            { $eq: ["$token_id", "$$token_id"] },
            { $eq: ["$listed", true] },
        ]}}}],
          
        as: "item"}},{unwind:{path:"$item"}},
       {project: {objectId:1,tokenId:1,owner_of:1,amount:1,uri:1,token_id:1,
                  itemFile:"$item.itemFile",itemTitle:"$item.itemTitle",
                   itemPrice:"$item.itemPrice",itemDescription:"$item.itemDescription"
                    ,numberOfItems:"$item.numberOfItems",listing_id:"$item.listing_id"}},
    {lookup: {
        from: "_User",
      let: { owner: "$owner_of"},
  
         pipeline: [
          {$match: {$expr: {$in:["$$owner", "$accounts"] }}}
        ],  
      as:"user" }},{unwind:{path:"$user"}},
       
        {project: {objectId:1,tokenId:1,itemId,owner:1,amount:1,uri:1,token_id:1,itemFile:1,numberOfItems:1,itemDescription:1,itemPrice:1,itemTitle:1,username:"$user.username",listing_id:1}}
  
      ];
    
    return query.aggregate(pipeline);
  }); 