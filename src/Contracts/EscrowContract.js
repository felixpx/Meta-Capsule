export const EscrowABI = [
  'function createAgreement(string calldata agreementId,address seller, uint256 deadline,uint256 amount) public',
  'function acceptAgreement(string calldata agreementId) public',
  'function uploadFiles(string calldata agreementId,string calldata file) public',
]

export const EscrowAddress = '0xfB6cce4bAca5E8d1d8ccDe65051050Ef617C92Ba'
