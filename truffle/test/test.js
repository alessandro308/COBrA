var Catalog = artifacts.require("./catalog.sol");
var BaseContent = artifacts.require("./BaseContentManagement.sol");

const fasttest = true;

let a = function(i){
    return new Promise((succ, rej) => {
        let b = artifacts.require("./BaseContentManagement.sol");
        b.new(web3.toHex(`Name${i}`), `Author${i}`, i%5, web3.toWei((i%10)/100, "ether"),
                                {from: web3.eth.accounts[0]}, (err, res) => {if(!err) succ(res); else rej(err);});   
    });
}

contract('Catalog', function(accounts) {
    it("will be published 100 contents", function(){
        return Catalog.deployed().then(async instance => {
            for(let i = 0; i<(fasttest ? 5 : 100); i++){
                let content = await a(i)   
                instance.publishContent(content.address, (err, res) => {console.log(res)});
            }
        });
    });
});

 
contract('Catalog', function(accounts) {
    it("should be empty catalog", function() {
      return Catalog.deployed().then(function(instance) {
        console.log("Catalog Address: "+instance.address);
        return instance.getContentList.call();
      }).then(function(contentList) {
        assert.equal(contentList.length, 0, `This is not empty, the catalog has ${contentList.length} contents`);
      });
    });

    it("will be published 100 contents", function(){
        return Catalog.deployed().then(async instance => {
            for(let i = 0; i<(fasttest ? 5 : 100); i++){
                let content = await BaseContent.new(web3.toHex(`Name${i}`), `Author${i}`, i%5, web3.toWei((i%10)/100, "ether"),
                                {from: web3.eth.accounts[i%5]} );    
                let result = await instance.publishContent(content.address);
                console.log("Published "+`Name${i}, used ${result.receipt.gasUsed} gas units`);
            }
            return instance.getContentList.call()
        }).then(contentList => {
            assert.equal(contentList.length, (fasttest ? 5 : 100), `This catalog has not expected number of content ${(fasttest ? 5 : 100)}, the catalog has ${contentList.length} contents`);
        })
    });

    it("will show the contentList", function(){
        return Catalog.deployed().then( instance => {
            return instance.getContentList.call();
        }).then(contentList => {
            console.log(contentList);
        })
    })

    it("will grantAccess and consume 5 content, 5 times, with 5 different address", function(){
        return Catalog.deployed().then( async instance => {
            for(let r = 0; r < (fasttest ? 1 : 5); r++){
                for(let i = 0; i<5; i++){
                    for(let a = 0; a<5; a++){
                        console.log(`Run ${r} | Granting access and accessing content Name${i} with address ${web3.eth.accounts[a]}`)
                        let cost = await instance.name2cost(web3.toHex(`Name${i}`));
                        let res1 = await instance.grantAccess(web3.toHex(`Name${i}`), {from: web3.eth.accounts[a], value: cost});
                        let contentAddress = await instance.name2address(`Name${i}`);
                        let contentInstance = await BaseContent.at(contentAddress);
                        let result = await contentInstance.consumeContent({from: web3.eth.accounts[a]});
                        console.log(`   used ${result.receipt.gasUsed+res1.receipt.gasUsed} gas units for both functions`)
                    }
                }
            }
            let contentAddress = await instance.name2address(`Name0`);
            return BaseContent.at(contentAddress);
        }).then(async content => {
            assert.equal( (await content.views()).toNumber(), (fasttest ? 5 : 25), "The views are not equal to 5");
        })
    });
    
    it("will access 100 random content, using all the account", function(){
        return Catalog.deployed().then( async instance => {
            let maxGas = 0;
            let meanGas = 0;
            for(let i = 0; i<(fasttest ? 10 : 100); i++){
                let random = Math.floor(Math.random()*(fasttest ? 5 :100)); 
                let cost = await instance.name2cost(web3.toHex(`Name${random}`));
                console.log(`Random access #${i} | Granting access and accessing content Name${random} with address ${web3.eth.accounts[i%10]}`)
                let res1 = await instance.grantAccess(web3.toHex(`Name${random}`), {from: web3.eth.accounts[i%10], value: cost});
                let contentAddress = await instance.name2address(`Name${random}`);
                let contentInstance = await BaseContent.at(contentAddress);
                let result = await contentInstance.consumeContent({from: web3.eth.accounts[i%10]});
                maxGas = maxGas < result.receipt.gasUsed ? result.receipt.gasUsed : maxGas;
                meanGas += result.receipt.gasUsed;
                console.log(`   used ${result.receipt.gasUsed+res1.receipt.gasUsed} gas units for both functions`)
            }
            console.log(`Gas summary (pay per view):
                Mean Value: ${meanGas/100}, Max Value: ${maxGas}
            `);
        });
    })

    it("will gift a content", function(){
        return Catalog.deployed().then( async instance => {
            let cost = await instance.name2cost(web3.toHex(`Name0`));
            await instance.giftContent(web3.toHex(`Name0`), web3.eth.accounts[9], {from: web3.eth.accounts[8], value: cost});
            let contentAddress = await instance.name2address(`Name0`);
            let contentInstance = await BaseContent.at(contentAddress);
            await contentInstance.consumeContent({from: web3.eth.accounts[9]});
            return contentInstance.hasConsumed(web3.eth.accounts[9]);
        }).then(b =>{
            assert.equal(b, true, "The user is not in the hasConsumed list of user");
        })
    });
    it("will gift a premium and the receiver will consume a content", function(){
        return Catalog.deployed().then( async instance => {
            let cost = await instance.premiumCost();
            await instance.giftPremium(web3.eth.accounts[9], {from: web3.eth.accounts[8], value: cost});
            let contentAddress = await instance.name2address(`Name0`);
            let contentInstance = await BaseContent.at(contentAddress);
            await contentInstance.consumeContentPremium({from: web3.eth.accounts[9]});
            return contentInstance.hasConsumed(web3.eth.accounts[9]);
        }).then(b =>{
            assert.equal(b, true, "The user is not in the hasConsumed list of user");
        })
    });

    it("will buy a premium", function(){
        return Catalog.deployed().then( async instance => {
            let premiumCost = await instance.premiumCost();
            await instance.buyPremium({from: web3.eth.accounts[1], value: premiumCost});
            return instance.isPremium(web3.eth.accounts[1]);
        }).then(b =>{
            assert.equal(b, true, "the user is not a premium user");
        })
    });

    it("will access 10 random content, using a premium subscription of "+web3.eth.accounts[1], function(){
        return Catalog.deployed().then( async instance => {
            let maxGas = 0;
            let meanGas = 0;
            for(let i = 0; i<10; i++){
                let random = Math.floor(Math.random()*(fasttest ? 5 : 100)); 
                console.log(`Random access #${i} | Granting access and accessing content Name${random} with address ${web3.eth.accounts[1]}`)
                let contentAddress = await instance.name2address(`Name${random}`);
                let contentInstance = await BaseContent.at(contentAddress);
                let result = await contentInstance.consumeContentPremium({from: web3.eth.accounts[1]});
                maxGas = maxGas < result.receipt.gasUsed ? result.receipt.gasUsed : maxGas;
                meanGas += result.receipt.gasUsed;
                console.log(`   used ${result.receipt.gasUsed} gas units for both functions`)
            }
            console.log(`Gas summary (premium subscription):
                Mean Value: ${meanGas/100}, Max Value: ${maxGas}
            `);
        });
    })

    it("a not user premium cannot use premium feature", function(){
        return Catalog.deployed().then( async instance => {
            let contentAddress = await instance.name2address(`Name0`);
            let contentInstance = await BaseContent.at(contentAddress);
            return contentInstance.consumeContentPremium({from: web3.eth.accounts[0]});
        }).catch(e =>{
            assert.equal(e.name, "Error", "the exception is not valid");
        })
    });

    it("get statistics", function(){
        return Catalog.deployed().then(
            async function(instance){
                let stats = await instance.getStatistics();
                console.log(stats[0], stats[1].map(e => e.toNumber()));
            }
        )
    });

    it("PublishContent gas cost", function(){
        return Catalog.deployed().then(
            async function(instance){
                let content = await BaseContent.new(web3.toHex(`Name101`), web3.toHex(`Author101`), 0, web3.toWei(0.1, "ether"));    
                let result = await instance.publishContent(content.address);
                console.log(result.receipt.gasUsed);
            }
        )
    });

    it("should be rated content Name0", function(){
        return Catalog.deployed().then(
            async function(instance){
                let contentAddress = await instance.name2address(`Name0`);
                let contentInstance = await BaseContent.at(contentAddress);
                await contentInstance.leaveFeedback(200, 200, 200, {from: web3.eth.accounts[0]});
                return contentInstance.cust2rate(web3.eth.accounts[0]);
            }
        ).then(rating => {
            let rate = rating.map(e => e.toNumber());
            assert.equal(rate[0], 200, "the rating is not as expected");
            assert.equal(rate[1], 200, "the rating is not as expected");
            assert.equal(rate[2], 200, "the rating is not as expected");
        })
    });

    it("will be rated and the correct mean is computed", function(){
        return Catalog.deployed().then(
            async function(instance){
                let contentAddress = await instance.name2address(`Name0`);
                let contentInstance = await BaseContent.at(contentAddress);
                let cost = await instance.name2cost(web3.toHex(`Name0`));
                await instance.grantAccess(web3.toHex(`Name0`), {from: web3.eth.accounts[1], value: cost});     
                await contentInstance.consumeContent({from: web3.eth.accounts[1]});
                await contentInstance.leaveFeedback(100, 100, 200, {from: web3.eth.accounts[1]});
                return contentInstance.ratingMean();
            }
        ).then(rating => {
            let rate = rating.map(e => e.toNumber());
            assert.equal(rate[0], 150, "the rating is not as expected");
            assert.equal(rate[1], 150, "the rating is not as expected");
            assert.equal(rate[2], 200, "the rating is not as expected");
        });
    });
});