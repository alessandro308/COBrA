# COBrA

Cobra is a Content Management System. It is composed by two different main modules:
    - The catalog, that is responsible for search and manage the access right
    - The contents, that are different contract, that extends `BaseContentManagement` and are responsible for distribute the content to the users that require the accesses.

## Catalog
In order to illustrate the `Catalog` contract, I provide some use cases that explicit the logic of the contract. 

#### Publish a content
Given a "content address", the address at which a contract that inherit from `BaseContentManagement` is deployed, you can invoke the function `publishContent(address _addr)`.
This function checks that the content has no already catalog address set and the `views` variable is set to 0. This prevent some malicious attacks that can be exploited by changing that controls variables (`views` and `catalog`). If this checks are passed, the function push the content into the `contentsName` array that stores all the names of the contents, and saves the content address into the `mapping(bytes32 => address) name2address`.

#### Get premium subscription
A user, that would have to buy a premium subscription, have to invoke the `buyPremium()` function with `premiumCost` wei as value of the transaction. This function checks that the value paid is correct, then set the `premiumEndBlockNumber` mapping for this specific user to the `block.number + premiumTime`. 
I'd like to prefer to store the `endBlockTime` instead of `startBlockTime` in order to manage the case when a user extends the premium subscription before the expiration of the previous one.

###### Consume a content as premium user
After received a premium subscription, in order to access to a content, a user have to retrieve the content address, invoking the `name2address` getter that is generated due the `public` visibility of the mapping. Given that address, a user have to invoke, to the content contract, the function 
`getContentPremium()` that checks if the user is a premium user and then returns the content.

To avoid a malicious user to get the access right on all contents in order to consume the content after the subscription expiration, for the premium user the granting access function and the consuming function is fused into the `getContentPremium()`.

#### Buy content access without premium subscripion
In order to consume a content, a user have to buy the access right invoking the function of the catalog `grandAccess(bytes32 _content)`. This function set a catalog mapping variable to `true` for the user that send the transaction associated by the `_content`.
Given the access right, a user have to retrive the content address and then, invoking the content function `getContent` that check for the access right and returns the content.
The function `getContent`, moreover, invoke the function `Catalog.consumeContent(bytes32 _name, uint _views)`. This function is an handler function that set, if necessary, some internal parameter into the Catalog contract in order to return in constant time the most popular content by Genre or Author and increase the catalog `totalViews` variable used into the `Catalog.goodbye()` function (the selfdestruct wrapper) in order to avoid a cycle into this function.

### Searching a content
In order to search a content you have several function:
 - `getContentList()`, that returns all the content's name
 - `getNewContentList(uint _n)`, that returns all the _n most recent content added
 - `getLatestByGenre`, that iterates over the `contentsName`, accesses to the content and checks its genre. It may require a big execution gas cost but, in general, is executed on the local node so doesn't cost ETHER.
 - `getMostPopularByGenre(uint _g)`, returns the most popular content of the genre _g. Genre _g is expressed as `enum` type into the `BaseContentManagement` and is passed as basic type `uint` as parameter and is casted later.


### Gift something
In order to gift a premium subscription, a user can simply call the `giftPremium(address _user)` function. This function performs the same control of the `buyPremium` but sets the user `_user` as beneficiary of the premium features.

In order to gift a content access, the function to be invoked `function giftContent(bytes32 _contentName, address _userAddr)` that is similar to the `giftPremium(address _user)`.

## The BaseContentManagement
The contract base for the content is the `BaseContentManagement`. This contract implements all the function that are required to support the communication between the user and the content. I have assuming that the private member `content`, a variable that store the 	intellectual property of the contract, is not visible from the external, i.e. it is not possible to parse the block and retrieve the information reading the code of the contract in order to hack the Catalog (and avoid the payment).

The `Genre` is expressed as enumeration, the `author` and the `content` as string, since they can be very long (more than 32 bytes). The Content stores also its views, used by Catalog to distribute the final balance. In order to block malicious users, I've tried to implement some controls on the content when it is published (already explained in the previous section), this controls invoke the `setCatalogAddress` that is a function that save the catalog address into the `catalog` variable. If the catalog is already set, the function returns without modifing the state. This prevent some malicious user to change the inner state of the content. 

### Get the money earned
Since the `Catalog` pays the `Content` and not the address that deployed the Content, the functions `seeBalance()` and `withdraw()` are added to the content. This function can be used to retrieve the money from the `Content`.

## Consideration on implementation
##### Gas consumed between getContent and search for a content
I've tested several implementation before to choose the actual one. I prefer to store some variable into the catalog in order to decrease the access time to the most popular content (and avoid loops). This choice increase the gas used when a content is consumed without the premium subscription. This choice is done because, even if a more gas is used by a user to consume a content, I suppose that the same user has saved gas when was searching for a content, so the balance is the same. This thing is not applied to the premium user since his content consuming not change the view counter, so no instance variable can be changed.

##### Bytes32 instead of String
When a content is searched, it is returned as bytes32 instead of address. This choice is done because the bytes32 is more significative of string and, moreover, this statically allocated space cost less gas then the string.

The user identifies the contract from its name, and can be retrieve the content address using the function `Catalog.name2address(bytes32 _name)`, an automatic getter that is generated by Solidity since the `name2address` variable is public. The content address is returned without any controls on the access right because the content consuming itself implements the controls, so having the address of the content doesn't give any security issuee that permits to retrieve the content without cheching the Catalog access rights.

s