import {
    Field,
    SmartContract,
    method,
    Bool,
    state,
    State,
    isReady,
    Poseidon,
    PrivateKey,
    PublicKey,
} from 'snarkyjs';

// check what this should be export { deploy, submitSolution, getZkAppState, createLocalBlockchain };
// or export { isReady, Field, Encoding };

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
let theBid = 0;

// create structure for bid framework - for now use struct


class createBid extends Struct({
    publicKey: PublicKey,
    bid: theBid
}) {}




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
    @state(Field) flashPrice = State<Field>();

    @method init() {
        // define initial state
        // define flash price
        this.registeredBidder1.set(bidders['bidder1'].toPublicKey());
        this.registeredBidder2.set(bidders['bidder2'].toPublicKey());
        this.registeredBidder3.set(bidders['bidder3'].toPublicKey());

        this.registeredBidder1.set(bidders['bidder1'].toPublicKey());
        this.registeredBidder2.set(bidders['bidder2'].toPublicKey());
        this.registeredBidder3.set(bidders['bidder3'].toPublicKey());

        // generate flash price
        // this would have to be input via the ui - start here, then console then ui
        // default bid ask for example
        // hash offchain
        //   this.registeredBidder1Price.set(Poseidon.hash(Bid1));


        //  this.user2.set(users['SuperBob'].toPublicKey());
        //  this.user3.set(users['MegaBob'].toPublicKey());
        // this.message.set(Field(0));
        //  this.messageHistoryHash.set(Field(0));

        // generate ask and bids?
    }



// the method should publish proves - last 8 bytes of hashes of bid, public key, and ID to prove meter is pro or consumer
// bidder checks flash price, and hashes the percentage they are prepared to pay
    @method publishBid (bid: Field, potentialBidderPrivateKey: PrivateKey)  {

// check if bidder is allowed to bid
        potentialBidderPublicKey = potentialBidderPrivateKey.toPublicKey();

// Get approved public keys
        const bidder1 = this.bidder1.get();
        const bidder2 = this.bidder2.get();
        const bidder3 = this.bidder3.get();

// Assert that signerPublicKey is one of the approved public keys
        potentialBidderPublicKey
            .equals(user1)
            .or(potentialBidderPublicKey.equals(bidder2))
            .or(potentialBidderPublicKey.equals(bidder3))
            .assertEquals(true);
// hash bid and create bid
        const userBid = Poseidon.hash(bid);
        createBid


    }

@method askerCheckBid {

        // get bids from on-chain




}

// measure time in block height
//ideas for restricting bidding time https://docs.minaprotocol.com/zkapps/advanced-snarkyjs

}
