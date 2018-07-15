var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "treat drastic pause nominee matter uncle rack direct clog lounge reopen party";
var url = "https://ropsten.infura.io/xTVYVvV1az15TeWIlEzg";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    ropsten:  {
      provider: function() {
        return new HDWalletProvider(mnemonic, url)
      },
      gas: 4000000,   // <--- Twice as much
      gasPrice: 10000000000,
      network_id: 3
    }
  },
  rpc: {
   host: 'localhost',
   post: 8080,
   gas: 4000000
  }
};

