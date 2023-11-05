// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Upload {
    struct Access {
        address user;
        bool access;
    }
    mapping(address => string[]) value;
    mapping(address => mapping(address => bool)) ownership;
    mapping(address => Access[]) accessList;
    mapping(address => mapping(address => bool)) previousData;

    function uploadFile(address _user, string memory url) external {
        value[_user].push(url);
    }

    function allowAccess(address _user) external {
        ownership[msg.sender][_user] = true;
        if (previousData[msg.sender][_user]) {
            for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == _user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(_user, true));
            previousData[msg.sender][_user] = true;
        }
    }

    function revokeAccess(address _user) public {
        ownership[msg.sender][_user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == _user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function displayFiles(
        address _user
    ) external view returns (string[] memory) {
        require(
            _user == msg.sender || ownership[msg.sender][_user] == true,
            "You don't have access"
        );
        return value[msg.sender];
    }

    function getAccessList() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
