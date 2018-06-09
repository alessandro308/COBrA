pragma solidity ^0.4.23;
import "./BaseContentManagement.sol";

contract DivinaCommedia is BaseContentManagement{
    constructor() BaseContentManagement() public {
        author = "dante";
        name = stringToBytes32("Divina Commedia");
        content = "Nel mezzo del cammin di nostra vita...";
        genre = Genre.BOOK;
    }
}

contract PoesiaDanta is BaseContentManagement{
    constructor() BaseContentManagement() public {
        author = "dante";
        name = stringToBytes32("A la mia amata");
        content = "Tanto Gentile e tanto onesta pare...";
        genre = Genre.BOOK;
    }
}

contract PromessiSposi is BaseContentManagement{
    constructor() BaseContentManagement() public {
        author = "manzoni";
        name = stringToBytes32("Promessi Sposi");
        content = "Quel ramo del lago di Como, che volge a mezzogiorno, tra due catene non interrotte di monti..";
        genre = Genre.BOOK;
    }
}

contract IlGladiatore is BaseContentManagement{
    constructor() BaseContentManagement() public {
        author = "scott";
        name = stringToBytes32("Il Gladiatore");
        content = "http://gladiatorissimo.it/token=goMassimo";
        genre = Genre.VIDEO;
    }
}