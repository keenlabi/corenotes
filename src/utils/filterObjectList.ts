export default function filterObjectList (filterValue:string, list:any[]) {
    return list.filter((option:any)=> {
        return  Object.values(option)
                .join(' ')
                .toString()
                .toLowerCase()
                .search(filterValue.toLowerCase()) !== -1
    })
}