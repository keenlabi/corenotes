
const MAX_FILE_SIZE:number = parseFloat(process.env.REACT_APP_IMAGE_FILE_SIZE!);
const MAX_FILE_SIZE_CAT:string = process.env.REACT_APP_IMAGE_FILE_SIZE_CAT!;

export default function validateImageFile(file:File) {
    return new Promise<{message:string}>((resolve, reject)=> {
        if(!isFileSizeValid(file)) reject({ message: `File cannot be larger than ${MAX_FILE_SIZE}${MAX_FILE_SIZE_CAT}` });
        if(!isFileImage(file)) reject({ message: `The selected file is not an image` })
        resolve({message: ''});
    })
}

function isFileSizeValid(file:File) {
    
    // convert size into mb
    let fileSize = 0;
    
    if(MAX_FILE_SIZE_CAT === 'MB') {
        fileSize = parseFloat((file.size / 1000 / 1024).toString());
    }

    if(fileSize > MAX_FILE_SIZE) return false
    return true;
}

async function isFileImage(file:File) {
    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

    if(!imageTypes.includes(file.type)) return false
    return true;
}