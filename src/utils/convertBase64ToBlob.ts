export default function convertBase64toBlob(b64Data:string, contentType='') {
    return new Promise<Blob>((resolve, reject)=> {
        fetch(b64Data)
        .then((res)=> resolve(res.blob()))
        .catch((error)=> reject(error))
    })

    // const sliceSize = 512;
    // const byteCharacters = Buffer.from(b64Data, 'base64');
    // const byteArrays = [];
  
    // for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    //   const slice = byteCharacters.slice(offset, offset + sliceSize);
  
    //   const byteNumbers = new Array(slice.length);

    //   for (let i = 0; i < slice.length; i++) {
    //     byteNumbers[i] = slice.charCodeAt(i);
    //   }
  
    //   const byteArray = new Uint8Array(byteNumbers);
    //   byteArrays.push(byteArray);
    // }
  
    // const blob = new Blob(byteArrays, {type: contentType});
    // return blob;
  }