export default function displayFormData(formData:FormData) {
    for( const pair of formData.entries() ) {
        console.log(pair[0] + ':' + pair[1])
    }
}