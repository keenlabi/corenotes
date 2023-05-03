export default function JSONToFormData(jsonObject:{ [key: string]: any }) {
    return new Promise<FormData>((resolve)=> {

        const formData = new FormData();
        const allKeys:string[] = Object.keys(jsonObject);

        try {
            for(let index=0; index < allKeys.length; index++) {
                const   key = allKeys[index], 
                        value = jsonObject[allKeys[index]];

                if(Array.isArray(value)) {
                    value.forEach(val => formData.append(key, val))
                } 
                else if(
                    typeof value === 'object' && 
                    !['image/webp', 'image/png', 'image/jpg', 'image/jpeg', 'svg'].includes(value.type)
                ) {
                    // const objKeys = Object.keys(value);
                    // for(let i=0; i<objKeys.length; i++) {
                    //     formData.append(key+[objKeys[i]], value[objKeys[i]]);
                    // }
                    for (const nestedKey in value) {
                        formData.append(`${key}[${nestedKey}]`, value[nestedKey]);
                    }
                } 
                else formData.append(key, value);

            }
        } 
        finally {
            resolve(formData);
        }
    });    
}