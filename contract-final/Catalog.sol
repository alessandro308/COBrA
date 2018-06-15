pragma solidity ^0.4.23;

contract BaseContentManagement{
    enum Genre {SONG, BOOK, VIDEO}
    struct Rating{
        uint8 fairness;
        uint8 coolness;
        uint8 appreciation;
    }
    string public author;
    bytes32 public name;
    uint64 public views;
    uint64 public viewsFromLastPayment;
    Genre public genre;
    uint public contentCost;
    Rating public ratingMean;
    function resetViewsAndGetMoney() external payable;
    function setCatalogAddress(address _catalog) external returns (bool);
}

contract Catalog{
    struct Content {
        bytes32 name;
        uint64 views;
    }
    uint public premiumCost = 0.02 ether;
    uint public premiumTime = 10000 /*Block height*/;
    address private owner;
    
    bytes32 mostViewedBOOK = 0x0;
    uint64 mostViewedBOOKviewCounter = 0;
    bytes32 mostViewedSONG = 0x0;
    uint64 mostViewedSONGviewCounter = 0;
    bytes32 mostViewedVIDEO = 0x0;
    uint64 mostViewedVIDEOviewCounter = 0;
 
    uint64 totalViews = 0;

    bytes32[] internal contentsName;
    mapping(bytes32 => address) public name2address;
    /* using address instead of bytes32 due the bytes occupied */
    mapping (address /*USER*/ => mapping(address /*CONTENT*/ => bool)) internal grantedAccess; /* inner map in order to decrease gas */
    mapping (address => uint) internal premiumEndBlockNumber;
    mapping (string => Content) internal author2mostPopular;
    mapping (bytes32 => uint) public contentCost;
    
    event ContentConsumed(bytes32 _content, address _user);
    event GiftContentBought(address _from, address _to, bytes32 _content);
    event GiftPremiumSubscription(address _from, address _to);
    event ContentBought(bytes32 _content, address _user);

    constructor () public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    /* Check if the user has a valid premium subscription */
    function isPremium(address _user) view external returns (bool) {
        return premiumEndBlockNumber[_user] > block.number;
    }

    function isGranted(address _user, address _content) view external returns (bool) {
        return (grantedAccess[_user][_content]);
    }


    function getStatistics() external view returns (bytes32[], uint[]){ 
        uint[] memory views = new uint[](contentsName.length);
        for(uint i = 0; i<contentsName.length; i++){
            BaseContentManagement cont = BaseContentManagement(name2address[contentsName[i]]);
            views[i] = cont.views();
        }
        return (contentsName, views);
    }

    function getContentList() view external returns (bytes32[]){
        return contentsName;
    }

    function getNewContentList(uint _n) external view returns (bytes32[]){
        int startIndex = int(contentsName.length) - int(_n); 
        if(startIndex > 0){
            bytes32[] memory result = new bytes32[](_n);
            uint j = 0;
            for(uint i = uint(startIndex); i<contentsName.length; i++){
                result[j] = contentsName[i];
                j++;
            }
            return result;
        }
        return contentsName;
    }

    function getLatestByGenre(uint _g) external view returns (bytes32){
        uint i = contentsName.length - 1;
        while(i >= 0){
            BaseContentManagement c = BaseContentManagement(name2address[contentsName[i]]);
            BaseContentManagement.Genre _gc = c.genre();
            if(BaseContentManagement.Genre(_g) == _gc){
                return contentsName[i];
            }
            i--;
        }
        return 0x0;
    }

    function getMostPopularByGenre(uint _g) external view returns (bytes32){
        if(BaseContentManagement.Genre(_g) == BaseContentManagement.Genre.BOOK){
            return mostViewedBOOK;
        }
        if(BaseContentManagement.Genre(_g) == BaseContentManagement.Genre.SONG){
            return mostViewedSONG;
        }
        if(BaseContentManagement.Genre(_g) == BaseContentManagement.Genre.VIDEO){
            return mostViewedVIDEO;
        }
    }

    function getLatestByAuthor(string author) external view returns (bytes32){
        uint i = contentsName.length - 1;
        while(i >= 0){
            BaseContentManagement c = BaseContentManagement(name2address[contentsName[i]]);
            if(keccak256(abi.encodePacked(author)) == keccak256(abi.encodePacked(c.author())) ){
                return contentsName[i];
            }
            i--;
        }
    }

    function getMostPopularByAuthor(string author) external view returns (bytes32){
        return author2mostPopular[author].name;
    }

    function consumeContent(bytes32 _contentName, uint64 _newViewsCounter) external {
        require(msg.sender == name2address[_contentName], "This function is callable only from the content");
        BaseContentManagement c = BaseContentManagement(name2address[_contentName]);
        grantedAccess[tx.origin][name2address[_contentName]] = false;
        BaseContentManagement.Genre g = c.genre();
        if( g == BaseContentManagement.Genre.BOOK && 
            _newViewsCounter > mostViewedBOOKviewCounter ){
            mostViewedBOOK = _contentName;
            mostViewedBOOKviewCounter = _newViewsCounter;
        } else 
        if( g == BaseContentManagement.Genre.VIDEO && 
            _newViewsCounter > mostViewedVIDEOviewCounter ){
            mostViewedVIDEO = _contentName;
            mostViewedVIDEOviewCounter = _newViewsCounter;
        } else
        if( g == BaseContentManagement.Genre.SONG && 
            _newViewsCounter > mostViewedSONGviewCounter ){
            mostViewedSONG = _contentName;
            mostViewedSONGviewCounter = _newViewsCounter;
        }
        string memory a = c.author();
        if(_newViewsCounter > author2mostPopular[a].views){
            author2mostPopular[a] = Content(_contentName, _newViewsCounter);
        }
        totalViews++;
        if(totalViews%1000 == 0){
            for(uint i = 0; i<contentsName.length; i++){
                BaseContentManagement content = BaseContentManagement(name2address[contentsName[i]]);
                content.resetViewsAndGetMoney.value(address(this).balance/totalViews * uint(content.views()))();
            }
        }
        emit ContentConsumed(_contentName, tx.origin);
    }

    function publishContent(address _addr) external{
        BaseContentManagement c = BaseContentManagement(_addr);
        assert(c.setCatalogAddress(address(this)));
        assert(c.views() == 0);
        assert(c.viewsFromLastPayment() == 0);
        contentsName.push(c.name());
        name2address[c.name()] = _addr;   
        contentCost[c.name()] = c.contentCost();
    }

    /* Set, for the sender, the right to access to the content */
    function grantAccess(bytes32 _content) external payable {
        require(msg.value == contentCost[_content], "You have to pay some ether for this content");
        grantedAccess[msg.sender][name2address[_content]] = true;
        emit ContentBought(_content, msg.sender);
    }

    function giftContent(bytes32 _contentName, address _userAddr) external payable {
        require(msg.value == contentCost[_contentName]);
        grantedAccess[_userAddr][name2address[_contentName]] = true;
        emit GiftContentBought(msg.sender, _userAddr, _contentName);
    }
    
    function giftPremium(address _user) external payable{
        require(msg.value == premiumCost);
        /* The following condition check if there is some active subscription, if it is
            the subscription is an extention of the existing one */
        if(premiumEndBlockNumber[_user] > block.number){
            premiumEndBlockNumber[_user] = premiumEndBlockNumber[_user] + premiumTime;
        } else {
            premiumEndBlockNumber[_user] = block.number + premiumTime;
        }
        emit GiftPremiumSubscription(msg.sender, _user);
    }

    function buyPremium() external payable{
        require(msg.value == premiumCost);
        /* The following condition check if there is some active subscription, if it is
            the subscription is an extention of the existing one */
        if(premiumEndBlockNumber[msg.sender] > block.number){
            premiumEndBlockNumber[msg.sender] = premiumEndBlockNumber[msg.sender] + premiumTime;
        } else {
            premiumEndBlockNumber[msg.sender] = block.number + premiumTime;
        }
    }

    function goodbye() external onlyOwner(){
        for(uint i = 0; i<contentsName.length; i++){
            BaseContentManagement content = BaseContentManagement(name2address[contentsName[i]]);
            address(name2address[contentsName[i]]).transfer(address(this).balance/totalViews * uint(content.views()));
        }
        selfdestruct(owner); /* The remaining money, are sent to owner */
    }

    function bytes32ToString(bytes32 x) pure public returns (string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }

    function GetMostRated(uint _category) external view returns (bytes32){
        BaseContentManagement cont0 = BaseContentManagement(name2address[contentsName[0]]);
        bytes32 top = contentsName[0];
        BaseContentManagement.Rating memory toprate;
        uint8 _fair; 
        uint8 _cool; 
        uint8 _appr;
        (_fair, _cool, _appr) = cont0.ratingMean();
        toprate = BaseContentManagement.Rating(_fair,  _cool, _appr);
        
        for(uint i = 1; i<contentsName.length; i++){
            BaseContentManagement cont = BaseContentManagement(name2address[contentsName[i]]);
            (_fair, _cool, _appr) = cont.ratingMean();
            if(_category == 0){
                if(_fair > toprate.fairness){
                    toprate = BaseContentManagement.Rating(_fair,  _cool, _appr);
                    top = contentsName[i];
                }
            } else if(_category == 1){
                if(_cool > toprate.coolness){
                    toprate = BaseContentManagement.Rating(_fair,  _cool, _appr);
                    top = contentsName[i];
                }
            } else if(_category == 2){
                if(_appr > toprate.appreciation){
                    toprate = BaseContentManagement.Rating(_fair,  _cool, _appr);
                    top = contentsName[i];
                }
            }
        }
        return top;
    }

    function GetMostRatedByGenre(uint _genre, uint _category) view external returns (bytes32){
        BaseContentManagement cont0 = BaseContentManagement(name2address[contentsName[0]]);
        bytes32 top = contentsName[0];
        BaseContentManagement.Rating memory toprate;
        uint8 _fair; 
        uint8 _cool; 
        uint8 _appr;
        (_fair, _cool, _appr) = cont0.ratingMean();
        toprate = BaseContentManagement.Rating(_fair,  _cool, _appr);
        
        for(uint i = 1; i<contentsName.length; i++){
            BaseContentManagement cont = BaseContentManagement(name2address[contentsName[i]]);
            if(cont.genre() == BaseContentManagement.Genre(_genre)){
                (_fair, _cool, _appr) = cont.ratingMean();
                if(_category == 0){
                    if(_fair > toprate.fairness){
                        toprate = BaseContentManagement.Rating(_fair,  _cool, _appr);
                        top = contentsName[i];
                    }
                } else if(_category == 1){
                    if(_cool > toprate.coolness){
                        toprate = BaseContentManagement.Rating(_fair,  _cool, _appr);
                        top = contentsName[i];
                    }
                } else if(_category == 2){
                    if(_appr > toprate.appreciation){
                        toprate = BaseContentManagement.Rating(_fair,  _cool, _appr);
                        top = contentsName[i];
                    }
                }
            }
        }
    }

    function GetMostRatedByGenre(string _author, uint _category) view external returns (bytes32){
        BaseContentManagement cont0 = BaseContentManagement(name2address[contentsName[0]]);
        bytes32 top = contentsName[0];
        BaseContentManagement.Rating memory toprate;
        uint8 _fair; 
        uint8 _cool; 
        uint8 _appr;
        (_fair, _cool, _appr) = cont0.ratingMean();
        toprate = BaseContentManagement.Rating(_fair,  _cool, _appr);
        
        for(uint i = 1; i<contentsName.length; i++){
            BaseContentManagement cont = BaseContentManagement(name2address[contentsName[i]]);
            if( keccak256(cont.author()) == keccak256(_author)){
                (_fair, _cool, _appr) = cont.ratingMean();
                if(_category == 0){
                    if(_fair > toprate.fairness){
                        toprate = BaseContentManagement.Rating(_fair,  _cool, _appr);
                        top = contentsName[i];
                    }
                } else if(_category == 1){
                    if(_cool > toprate.coolness){
                        toprate = BaseContentManagement.Rating(_fair,  _cool, _appr);
                        top = contentsName[i];
                    }
                } else if(_category == 2){
                    if(_appr > toprate.appreciation){
                        toprate = BaseContentManagement.Rating(_fair,  _cool, _appr);
                        top = contentsName[i];
                    }
                }
            }
        }
    }

}