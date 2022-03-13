export const EscrowABI = [
  'function createAgreement(string calldata agreementId,address seller, uint256 deadline,uint256 amount) public',
  'function acceptAgreement(string calldata agreementId) public',
  'function uploadFiles(string calldata agreementId,string calldata file) public',
]

export const EscrowAddress = '0x181aeb345a2645B294b3fd5d7e0429fd5eDA0eca'
