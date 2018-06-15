pragma solidity ^0.4.23;

contract Catalog{
    function isPremium(address _user) view external returns (bool);
    function isGranted(address _user, address _content) view external returns (bool);
    function consumeContent(bytes32 _contentName, uint64 _newViewsCounter) external;
}

contract BaseContentManagement{
    enum Genre {SONG, BOOK, VIDEO}
    struct Rating{
        uint8 fairness;
        uint8 coolness;
        uint8 appreciation;
    }
    address public owner;
    string public author;
    bytes32 public name;
    string internal content;
    address private catalog = 0x0;
    uint64 public views = 0;
    uint64 public viewsFromLastPayment = 0;
    mapping(address => bool) public customers;
    uint public contentCost;
    
    mapping(address => Rating) public cust2rate;
    Rating public ratingMean = Rating(0, 0, 0);
    uint64 totalRates = 0;

    Genre public genre;
    
    constructor() public {
        owner = msg.sender;
    }
    
    /* Function used to test the contract programmatically. To remove in production stage */
    function setVar(bytes32 _name, string _auth, string _content, uint _gen, uint _cost) onlyOwner external{
        name = _name;
        author = _auth;
        content = _content;
        genre = Genre(_gen);
        contentCost = _cost;
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
        customers[msg.sender] = true;
        return content;
    }
    
    function getContent() external returns (string){
        Catalog cat = Catalog(catalog);
        require(cat.isGranted(msg.sender, address(this)), "You must have the access right to consume content");
        customers[msg.sender] = true;
        views++;
        viewsFromLastPayment++;
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

    function resetViewsAndGetMoney() external payable{
        require(msg.sender == catalog);
        viewsFromLastPayment = 0;
    }

    function leaveFeedback(uint8 fairness, uint8 coolness, uint8 appreciation) external{
        require(customers[msg.sender], "You have to consume the content before to rating it.");
        cust2rate[msg.sender] = Rating(fairness, coolness, appreciation);
        ratingMean = Rating(
            uint8((ratingMean.fairness*totalRates+fairness)/(totalRates+1)), 
            uint8((ratingMean.coolness*totalRates+coolness)/(totalRates+1)), 
            uint8((ratingMean.appreciation*totalRates+appreciation)/(totalRates+1))
            );
        totalRates++;
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

    function() external payable{}
}
