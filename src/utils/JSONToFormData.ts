export default function JSONToFormData(jsonObject:{ [key: string]: any }) {
    return new Promise<FormData>((resolve)=> {

        const formData = new FormData();
        const allKeys:string[] = Object.keys(jsonObject);

        try {
            for(let index=0; index < allKeys.length; index++) {
                const   key = allKeys[index], 
                        value = jsonObject[allKeys[index]];

                if(Array.isArray(value)) {
                    value.forEach((val, index) => {
                        if(typeof val === 'object' && isNotFile(val.type)) {
                            for (const nestedKey in val) {
                                formData.append(`${key}[${index}][${nestedKey}]`, val[nestedKey]);
                            }
                        } 
                        else formData.append(key, val)
                    })
                } 
                else if(typeof value === 'object' && isNotFile(value.type)) {
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

function isNotFile (fileType:string) {
    return !fileType
}