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

Create an enum for dog breeds    

  enum Breed {
        PUG,
        SHIBA_INU,
        BERNARD
    }