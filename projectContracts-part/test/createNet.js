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
        this.publishContent = (contentAddress) => {
            return new Promise(async(succ, rej) => {
                Catalog.at("0x08676346f7098aa91c033a9ab4536a3d73ee7fbc").publishContent(contentAddress, (err, res) => { 
                if(!err){
                  alert("Content Published! Wait to be mined to see it into content grid");
                  succ(res);
                }else{
                  rej(err)
                }
              });
            })
          }
        this.waitForAddress = (hash) => {
            this.web3.eth.getTransactionReceipt(hash, (err, res)=>{
              if(res == null || res.contractAddress == null){
                setTimeout(() => {
                  this.waitForAddress(hash);
                }, 1000);
              }else{
                console.log(res);
                this.publishContent(res.contractAddress).then(
                  res =>
                    console.log(res)
                );
              }
            });
          }

        this.deployContent = (name, author, genre, cost) => {
            return new Promise((succ, rej) => {
                BaseContent.new(
                name, author, genre, cost, 
                {data: Content.data, gas: '4700000'}, 
                (err, res) => {if(!err)succ(res); else rej(err);});
            });
        }
        this.deployAndPublish = async (name, author, genre, cost) => {
            let contRes = await this.deployContent(name, author, genre, cost);
            waitForAddress(contRes.transactionHash); //Then deploy it internally
        }
        return Catalog.at("0x08676346f7098aa91c033a9ab4536a3d73ee7fbc").then(async instance => {
            for(let i = 0; i<(fasttest ? 25 : 100); i++){
                this.deployAndPublish(web3.toHex(`Name${i}`), `Author${i}`, i%5, web3.toWei((i%10)/100, "ether"),
                                    {from: web3.eth.accounts[0]}).then(e => {
                                        console.log("Published")
                                    });
                
                
            }
        })
    });

    it("will grantAccess and consume 5 content, 5 times", function(){
        return Catalog.at("0x08676346f7098aa91c033a9ab4536a3d73ee7fbc").then( async instance => {
            for(let r = 0; r < 5; r++){
                for(let i = 0; i<5; i++){
                    console.log(`Run ${r} | Granting access and accessing content Name${i} with address ${web3.eth.accounts[0]}`)
                    let cost = await instance.name2cost(web3.toHex(`Name${i}`));
                    let res1 = await instance.grantAccess(web3.toHex(`Name${i}`), {from: web3.eth.accounts[0], value: cost});
                    let contentAddress = await instance.name2address(`Name${i}`);
                    let contentInstance = await BaseContent.at(contentAddress);
                    let result = await contentInstance.consumeContent({from: web3.eth.accounts[0]});
                    console.log(`   used ${result.receipt.gasUsed+res1.receipt.gasUsed} gas units for both functions`)
                }
            }
            let contentAddress = await instance.name2address(`Name0`);
            return BaseContent.at(contentAddress);
        })
    });
    
  
});