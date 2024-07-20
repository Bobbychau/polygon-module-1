// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";

contract CuteDog is ERC721A {
    address public owner;

    uint256 public maxQuantity = 5;

    
    string baseUrl =
        "https://amaranth-glamorous-muskox-623.mypinata.cloud/ipfs/QmUv8VRBzstcnpDr1mW2NpzkGwYrcLB2gPtXATWdVxF51o/";


    string public prompt = "Cute dog";
    constructor() ERC721A("Cute dog", "DOG") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action!");
        _;
    }

    function mint(uint256 quantity) external payable onlyOwner {
        require(
            totalSupply() + quantity <= maxQuantity,
            "You can not mint more than 5"
        );
        _mint(msg.sender, quantity);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUrl;
    }

    function promptDescription() external view returns (string memory) {
        return prompt;
    }
}