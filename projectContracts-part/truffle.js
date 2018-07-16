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
    ropsten_remote:  {
      provider: function() {
        return new HDWalletProvider(mnemonic, url)
      },
      gas: 4700000,   // <--- Twice as much
      gasPrice: 20,
      network_id: 3
    },
    ropsten:  {
      network_id: 3,
      host: "localhost",
      port:  8545,
      gas:   5400000
    }
  },
  rpc: {
   host: 'localhost',
   post: 8080,
   gas: 4000000
  }
};

