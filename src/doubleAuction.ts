import {
  Field,
  SmartContract,
  method,
  Bool,
  State,
  state,
  Experimental,
  isReady,
  Poseidon,
  PrivateKey,
  PublicKey,
} from 'snarkyjs';


export { isReady };

await isReady;

export const bidders = {
  bidder1: PrivateKey.random(),
  bidder2: PrivateKey.random(),
  bidder3: PrivateKey.random(),
};

export const askers = {
  asker1: PrivateKey.random(),
  asker2: PrivateKey.random(),
  asker3: PrivateKey.random(),
};

// set a start price


// initialise bid
let theBid1 = 0;
let theBid2 = 0;
let theBid3 = 0;




// in future, create structure for bid framework


export class doubleAuction extends SmartContract {

  // make bidders, askers, public keys available on-chain

@state(PublicKey) registeredBidder1 = State<PublicKey>();
@state(PublicKey) registeredBidder2 = State<PublicKey>();
@state(PublicKey) registeredBidder3 = State<PublicKey>();

@state(PublicKey) registeredAsker1 = State<PublicKey>();
@state(PublicKey) registeredAsker2 = State<PublicKey>();
@state(PublicKey) registeredAsker3 = State<PublicKey>();


@state(Field) registeredAsker1Price = State<Field>();
@state(Field) registeredAsker2Price = State<Field>();
@state(Field) registeredAsker3Price = State<Field>();
//@state(Field) flashPrice = State<Field>();
@state(Field) theBid1 = State<Field>();
@state(Field) theBid2 = State<Field>();
@state(Field) theBid3 = State<Field>();





@method init() {
    // define initial state
    // define flash price
    this.registeredBidder1.set(bidders['bidder1'].toPublicKey());
    this.registeredBidder2.set(bidders['bidder2'].toPublicKey());
    this.registeredBidder3.set(bidders['bidder3'].toPublicKey());

    this.registeredBidder1.set(bidders['bidder1'].toPublicKey());
    this.registeredBidder2.set(bidders['bidder2'].toPublicKey());
    this.registeredBidder3.set(bidders['bidder3'].toPublicKey());

    this.theBid1.set(Field(0));
    this.theBid2.set(Field(0));
    this.theBid3.set(Field(0));

    this.registeredAsker1Price.set(Field(0));
    this.registeredAsker2Price.set(Field(0));
    this.registeredAsker3Price.set(Field(0));



    // generate flash price


}



// the method should publish proves - last 8 bytes of hashes of bid, public key, and ID to prove meter is pro or consumer
// bidder checks flash price, and hashes the percentage they are prepared to pay
@method publishBid (bid: Field, registeredBidder: PrivateKey)  {

// check if bidder is allowed to bid

const potentialBidderPublicKey = registeredBidder.toPublicKey();

// Get approved public keys
const registeredBidder1 = this.registeredBidder1.get();
const registeredBidder2 = this.registeredBidder2.get();
const registeredBidder3 = this.registeredBidder3.get();



// Assert that signerPublicKey is one of the approved public keys
potentialBidderPublicKey
  .equals(registeredBidder1)
  .or(potentialBidderPublicKey.equals(registeredBidder2))
  .or(potentialBidderPublicKey.equals(registeredBidder3))
  .assertEquals(true);

const newbid = Poseidon.hash([bid]);
this.theBid1.set(newbid);
}



// measure time in block height
//ideas for restricting bidding time https://docs.minaprotocol.com/zkapps/advanced-snarkyjs

}
