import { doubleAuction } from './doubleAuction';
import {
  isReady,
  shutdown,
  Field,
  Mina,
  PrivateKey,
  PublicKey,
  AccountUpdate,
} from 'snarkyjs';


//let proofsEnabled = true;

 // let feePayer: PrivateKey,
 //   zkAppAddress: PublicKey,
 //   zkAppPrivateKey: PrivateKey,
 //   zkAppInstance: doubleAuction,
 //   currentState: Field,
 //   txn;

let Local = Mina.LocalBlockchain();
Mina.setActiveInstance(Local);

describe('doubleAuction', () => {
  let
    deployerAccount: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey,
    zkAppInstance: doubleAuction,
    zkApp: doubleAuction,
    txn;

      beforeAll(async () => {
        await isReady;
        // setup local blockchain
        let Local = Mina.LocalBlockchain();
        Mina.setActiveInstance(Local);

        // Local.testAccounts is an array of 10 test accounts that have been pre-filled with Mina
        deployerAccount = Local.testAccounts[0].privateKey;

        // zkapp account
        zkAppPrivateKey = PrivateKey.random();
        zkAppAddress = zkAppPrivateKey.toPublicKey();
        zkAppInstance = new doubleAuction(zkAppAddress);

        // deploy zkapp
        txn = await Mina.transaction(deployerAccount, () => {
          //zkApp.fundNewAccount(deployerAccount);
          zkAppInstance.deploy({ zkappKey: zkAppPrivateKey });
        });
        await txn.send();
      });


  beforeEach(() => {
    //const Local = Mina.LocalBlockchain({ proofsEnabled });
    Mina.setActiveInstance(Local);
    deployerAccount = Local.testAccounts[0].privateKey;
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
    zkApp = new doubleAuction(zkAppAddress);




  });

  afterAll(() => {
    // `shutdown()` internally calls `process.exit()` which will exit the running Jest process early.
    // Specifying a timeout of 0 is a workaround to defer `shutdown()` until Jest is done running all tests.
    // This should be fixed with https://github.com/MinaProtocol/mina/issues/10943
    setTimeout(shutdown, 0);
  });

  async function localDeploy() {
    const txn = await Mina.transaction(deployerAccount, () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      zkApp.deploy();
    });
    await txn.prove();
    // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
    await txn.sign([zkAppPrivateKey]).send();
  }

  it('generates and deploys the `doubleAuction` smart contract, reads initial bids', async () => {
    await localDeploy();
    const bid1 = zkApp.theBid1.get();
    const bid2 = zkApp.theBid2.get();
    const bid3 = zkApp.theBid3.get();

    expect(bid1).toEqual(Field(0));
    expect(bid2).toEqual(Field(0));
    expect(bid3).toEqual(Field(0));

  });


});
