export default function SizedBox({
    width, 
    height
}:{width?:string, height?:string}) {
    
    return (
        <div style={{width, height}}></div>
    )
}