3 contracts

1. Basic NFT
2. Random IPFS NFT
3. Dynamic SVG NFT

## 1. Basic NFT

Create BasicNFT.sol inside contracts folder

Install openzeppelin/contracts

```
npm install --dev  @openzeppelin/contracts
```
or 

```
yarn add --dev  @openzeppelin/contracts
```

## Deploy Basic NFT
Create 01-deploy-basic-nft.js inside deploy folder

```
hh deploy
```

## Test Basic NFT

Create BasicNft.test.js inside test/unit folder

```
hh test
```

## 2. Random IPFS NFT

Create RandomIpfsNft.sol inside contracts folder

Install chainlink/contracts

```
    yarn add --dev @chainlink/contracts
```

VRF Related Functions for Random Number Generation
    -requestNft()
    -fulfillRandomWords()

NFT Related Functions 
    -getChanceArray() -to get the different chances of the different dog breed
    -getBreedFromModdedRng() 
    -withdraw()

Create an enum for dog breeds    

  enum Breed {
        PUG,
        SHIBA_INU,
        BERNARD
    }

## Set IPFS 

OpenZeppelin _setTokenURI is not the most gas efficient way
_setTokenURIStorage is the most gas efficient way

import the ERC721URIStorage.sol 

_setTokenURI(newTokenId, /* that breed's tokenURI*/); after _safeMint(dogOwner, newTokenId);


Add NFT Variable
string[] internal s_dogTokenUris;

Add constructor parameter
string[3] memory dogTokenUris

In fulfillRandomWords function
_setTokenURI(newTokenId, s_dogTokenUris[uint256(dogBreed)]); //uint256 version of the dog breed

Add NFT variable
uint256 internal immutable i_mintFee

Add constructor parameter
uint256 mintFee 

Add condition inside requestNFT() function

if (msg.value < i_mintFee){
            revert NeedMoreETHSent();
}

## Withdraw
Only the owner has access to widraw
We can create a modifier or use Openzeppelin Ownable

import "@openzeppelin/contracts/access/Ownable.sol";

We don't want this function
function tokenURI(uint256) public view override returns (string memory) {}

Because we have this
_setTokenURI(newTokenId, s_dogTokenUris[uint256(dogBreed)]);

## Deploy RandomIpfsNft

Create 02-deploy-random-ipfs.js inside deploy folder

Create 00-deploy-mocks.js to deploy mock VRF

## Image Uploading

Create a folder called "images"
Create a folder called "randomNft" inside it
Save pug.png, shiba-inu.png, bernard.png inside it

  get the IPFS hashes of our images

     1. With ourown IPFS node, https://docs.ipfs.io/
     2. Pinata https://www.pinata.cloud/

