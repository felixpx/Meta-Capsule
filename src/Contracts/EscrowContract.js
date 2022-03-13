export const EscrowABI = [
  'function createAgreement(string calldata agreementId,address seller, uint256 deadline,uint256 amount) public',
  'function acceptAgreement(string calldata agreementId) public',
  'function uploadFiles(string calldata agreementId,string calldata file) public',
  'function completeAgreement(string calldata agreementId) public',
  'function rejectAgreement(string calldata agreementId) public',
]

export const EscrowAddress = '0x39a9072569f40C14aa656ca8891b19c918beB734'
