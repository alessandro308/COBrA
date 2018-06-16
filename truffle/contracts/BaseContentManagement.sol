pragma solidity ^0.4.23;

import "./Catalog.sol";

contract BaseContentManagement{
    enum Genre {SONG, BOOK, VIDEO, MOVIE, OTHER}
    struct Rating{
        uint8 fairness;
        uint8 coolness;
        uint8 appreciation;
    }

    address public owner;
    string public author;
    bytes32 public name;

    address private catalog = 0x0;
    uint64 public views = 0;
    uint64 public viewsFromLastPayment = 0;
    mapping(address => bool) public hasConsumed;
    mapping(address => bool) public hasAccess;
    uint public contentCost;

    Genre public genre;
    mapping(address => Rating) public cust2rate;
    Rating public ratingMean = Rating(0, 0, 0);
    uint64 totalRates = 0;

    event newFeedback(address _from, uint _fairness, uint _coolness, uint _appreciation);
    
    constructor(bytes32 _name, string _author, uint _gen, uint _cost) public {
        owner = msg.sender;
        name = _name;
        author = _author;
        genre = Genre(_gen);
        contentCost = _cost;
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
        cat.consumeContent(name, viewsFromLastPayment);/* Trigger support function that updates catalog informations */
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

    function leaveFeedback(uint8 fairness, uint8 coolness, uint8 appreciation) external{
        require(hasConsumed[msg.sender], "You have to consume the content before to rating it.");
        cust2rate[msg.sender] = Rating(fairness, coolness, appreciation);
        ratingMean = Rating(
            uint8((ratingMean.fairness*totalRates+fairness)/(totalRates+1)), 
            uint8((ratingMean.coolness*totalRates+coolness)/(totalRates+1)), 
            uint8((ratingMean.appreciation*totalRates+appreciation)/(totalRates+1))
            );
        totalRates++;
        emit newFeedback(msg.sender, fairness, coolness, appreciation);
    }

    function() external payable{}
}
