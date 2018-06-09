pragma solidity ^0.4.23;

contract Catalog{
    function isPremium(address _user) view external returns (bool);
    function isGranted(address _user, address _content) view external returns (bool);
    function consumeContent(bytes32 _contentName, uint64 _newViewsCounter) external;
}

contract BaseContentManagement{
    enum Genre {SONG, BOOK, VIDEO}
    address private owner;
    string public author;
    bytes32 public name;
    string internal content;
    address private catalog = 0x0;
    uint64 public views = 0;
    address[] public customers;
    
    Genre public genre;
    
    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    function withdraw() external onlyOwner{
        msg.sender.transfer(address(this).balance);
    }
    
    function seeBalance() external view onlyOwner returns (uint) {
        return address(this).balance;
    }

    function getContentPremium() external returns (string){
        Catalog cat = Catalog(catalog);
        require(cat.isPremium(msg.sender));
        customers.push(msg.sender);
        return content;
    }
    
    function getContent() external returns (string){
        Catalog cat = Catalog(catalog);
        require(cat.isGranted(msg.sender, address(this)));
        customers.push(msg.sender);
        views++;
        cat.consumeContent(name, views);/* Trigger support function that updates catalog informations */
        return content;
    }

    function setCatalogAddress(address _catalog) external returns (bool){
        if(catalog == address(0x0)){
            catalog = _catalog;
            return true;
        }
        return false;
    }

    function stringToBytes32(string source) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }

    function() external payable{
    }
}
