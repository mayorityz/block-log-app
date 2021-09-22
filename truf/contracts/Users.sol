// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Users {
    struct _Users {
        string username;
        string password;
        string uid;
    }

    struct AccountDetails {
        string bankname;
        string accountnum;
        string accountname;
    }

    mapping(string => _Users) public userrecord;
    mapping(string => AccountDetails) public Accounts;

    event bankDetCreated(string message);
    event bankDetails(
        string accountname,
        string accountnumber,
        string bankname
    );

    constructor() public {}

    function createAccount(
        string memory username,
        string memory password,
        string memory unqid
    ) public returns (string memory) {
        userrecord[username] = _Users(username, password, unqid);
        return userrecord[username].username;
    }

    function Fetch(string memory username, string memory password)
        public
        view
        returns (string memory)
    {
        if (
            keccak256(abi.encodePacked(password)) ==
            keccak256(abi.encodePacked(userrecord[username].password))
        ) {
            return userrecord[username].uid;
        } else {
            return "invalid credentials";
        }
    }

    function createBankAccount(
        string memory bankname,
        string memory accountnum,
        string memory accountname,
        string memory userid
    ) public {
        Accounts[userid] = AccountDetails(bankname, accountnum, accountname);
        emit bankDetCreated("Bank Details Added Successfully.");
    }

    function fetchBankDetail(string memory userid)
        public
        view
        returns (
            string memory,
            string memory,
            string memory
        )
    {
        return (
            Accounts[userid].bankname,
            Accounts[userid].accountnum,
            Accounts[userid].accountname
        );
    }
}
