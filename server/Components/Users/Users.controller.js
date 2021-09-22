const CONTRACT = require('./../../Utilities/Blockchain.js')
const uqid = require('uniqid')

exports.register = async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  try {
    let register = await CONTRACT.methods
      .createAccount(username, password, uqid(username + '-'))
      .send({
        from: '0x2EEE8f1Ee261Cc3D4CF6408A59d160e4dC5d4E88',
        gas: 3000000,
      })
    res.status(200).json({
      status: true,
      response: register,
      message: 'Account Created Successfully',
    })
  } catch (error) {
    res.status(400).json({ status: false, message: error.message })
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    let log = await CONTRACT.methods.Fetch(username, password).call()
    res.status(200).json({
      status: true,
      response: log,
      message: '',
    })
  } catch (error) {
    res.status(400).json({ status: false, message: error.message })
  }
}

// create account
exports.createAccount = async (req, res) => {
  const { accountname, accountnumber, bankname, uid } = req.body
  console.log(req.body)
  try {
    let log = await CONTRACT.methods
      .createBankAccount(bankname, accountnumber, accountname, uid)
      .send({
        from: '0x2EEE8f1Ee261Cc3D4CF6408A59d160e4dC5d4E88',
        gas: 3000000,
      })
    res
      .status(200)
      .json({ status: true, message: 'account created', response: log })
  } catch (error) {
    res.status(400).json({ status: false, message: error.message })
  }
}

exports.bankDetails = async (req, res) => {
  const { uid } = req.body
  try {
    let log = await CONTRACT.methods.fetchBankDetail(uid).call()
    res.send(log)
  } catch (error) {
    res.status(400).json({ status: false, message: error.message })
  }
}
