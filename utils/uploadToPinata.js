const path = require("path")
const pinataSDK = require("@pinata/sdk");
// const { PinataSDK } = require("pinata")
const fs =require("fs")
require("dotenv").config()

const pinataApiKey = process.env.PINATA_API_KEY
const pinataApiSecret = process.env.PINATA_API_SECRET
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret)
// const pinata = PinataSDK(pinataApiKey, pinataApiSecret)


async function storeImages(imagesFilePath){
   const fullImagesPath = path.resolve(imagesFilePath)
   const files = fs.readdirSync(fullImagesPath)
  // console.log(files)
  let responses = []
  console.log("Uploading to Pinata!")
//   for (fileIndex in files){
//      const readableStreamForFile = fs.createReadStream(`${fullImagesPath}/${files[fileIndex]}`)
//      try {
//         const response = await pinata.pinFileToIPFS(readableStreamForFile)
//         responses.push(response)
//      } catch (error){
//         console.log(error)
//      }
//   }
//   return {responses, files}

  for (const file of files) {
        const filePath = path.join(fullImagesPath, file); // Safer path joining
        const readableStreamForFile = fs.createReadStream(filePath);
        
        try {
            // Added proper options object
            const options = {
                pinataMetadata: {
                    name: file, // Preserve original filename
                },
            };
            
            const response = await pinata.pinFileToIPFS(readableStreamForFile, options);
            responses.push(response);
            console.log(`Successfully pinned ${file}: CID ${response.IpfsHash}`);
        } catch (error) {
            console.error(`Failed to pin ${file}:`, error.message);
            // Close stream if error occurs
            readableStreamForFile.close(); 
        }
    }
    return { responses, files };

}

module.exports = { storeImages }