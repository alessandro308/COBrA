pragma solidity ^0.4.23;

import "./Catalog.sol";

contract BaseContentManagement{
    enum Genre {SONG, BOOK, VIDEO, MOVIE, OTHER}

    address public owner;
    string public author;
    bytes32 public name;

    address private catalog = 0x0;
    uint64 public views = 0;
    uint64 public viewsFromLastPayment = 0;
    mapping(address => bool) public hasConsumed;
    mapping(address => bool) public hasAccess;

    Genre public genre;
    
    constructor(bytes32 _name, string _author, uint _gen) public {
        owner = msg.sender;
        name = _name;
        author = _author;
        genre = Genre(_gen);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyCatalog(){
        require(msg.sender == catalog);
        _;
    }
    
    function withdraw() external onlyOwner{
        msg.sender.transfer(address(this).balance);
    }
    
    function seeBalance() external view onlyOwner returns (uint) {
        return address(this).balance;
    }

    function consumeContentPremium() external{
        Catalog cat = Catalog(catalog);
        require(cat.isPremium(msg.sender));
        hasConsumed[msg.sender] = true;
    }
    
    function consumeContent() external{
        require(hasAccess[msg.sender]); // "You must have the access right to consume content");
        Catalog cat = Catalog(catalog);
        hasConsumed[msg.sender] = true;
        hasAccess[msg.sender] = false;
        views++;
        viewsFromLastPayment++;
        cat.consumeContent(name/*, views*/);/* Trigger support function that updates catalog informations */
    }

    function setCatalogAddress(address _catalog) external returns (bool){
        if(catalog == address(0x0)){
            catalog = _catalog;
            return true;
        }
        return false;
    }

    function resetViewsAndGetMoney() external payable onlyCatalog(){
        viewsFromLastPayment = 0;
    }

    function grantAccess(address _user) external onlyCatalog(){
        hasAccess[_user] = true;
    }

    function() external payable{}
}
