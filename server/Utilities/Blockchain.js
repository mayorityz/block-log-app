const Web3 = require('web3')
const Contract = require('web3-eth-contract')
Contract.setProvider('http://localhost:7545')
const web3 = new Web3('http://localhost:7545')

let ABI = require('./../../truf/build/contracts/Users.json')
let ContAddress = ABI.networks['5777'].address
var contract = new Contract(ABI.abi, ContAddress)

module.exports = contract
