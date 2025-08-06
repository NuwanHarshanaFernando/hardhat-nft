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
     3. NFT Storage https://nft.storage/ (It has Filecoin network in the backend)

 Create a function handleTokenUris() in 02-deploy-random-ipfs.js to handle upload images to pinata   

   // We have to do 2 things 
    // 1. Store the Image in IPFS
    // 2. Store the metadata in IPFS

 Create a file called "uploadToPinata.js" inside utils folder   

Go to Pinata NodeJs SDK https://docs.pinata.cloud/frameworks/node-js

Install pinata

```
$ yarn add --dev @pinata/sdk
```

Install path package

```
$ yarn add --dev path
```
Add this line to 02-deploy-random-ipfs.js
await storeImages(imagesLocation)

Create a test folder inside contracts folder
Add VRFCoordinatorV2_5Mock here

Then deploy 

```
$ hh deploy --tags randomipfs,mocks
```

We get the files as we console in uploadToPinata.js

[ 'pug.png', 'shiba-inu.png', 'st-bernard.png' ]

Create an API Key in Pinata with full access

Copy API Key informations to .env

Deploy again

```
$ hh deploy --tags randomipfs,mocks
```

Uploading to IPFS!

Successfully pinned pug.png: CID QmSsYRx3LpDAb1GZQm7zZ1AuHZjfbPkD6J7s9r41xu1mf8
Successfully pinned shiba-inu.png: CID QmYx6GsYAKnNzZ9A6NvEKV9nf1VaDzJrqDR23Y8YSkebLU
Successfully pinned st-bernard.png: CID QmUPjADFGEKmfohdTaNcWhp7VGk26h5jXDA7v3VtTnTLcW


Now go to Pinata, we can see the image files have been uploaded and each one has its own cid

Copy the CID and open IPFS Desktop

Go to import from and paste the CID and give the name

Now you can access and preview through it.

Add to .env
UPLOAD_TO_PINATA=true

Continue on function handleTokenUris() in 02-deploy-random-ipfs.js

Create function storeTokenUriMetadata() in UploadToPinata.js

Deploy again

```
$ hh deploy --tags randomipfs,mocks
```

Uploading pug...
Uploading shiba-inu...
Uploading st-bernard...
Token URIs Uploaded! They are:
[
  'ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo',
  'ipfs://QmYQC5aGZu2PTH8XzbJrbDnvhj3gVs7ya33H9mqUNvST3d',
  'ipfs://QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm'
]

We can see the list of CIDs in Pinata







