export default async function sortByDate(list:any[]) {
    if(!list.length) return []
    
    // list = [...list];
    // for (let i=0; i<list.length; i++) {
    //     for(let j=0; j<list.length-1; j++) {
    //         const currentListItem = list[i];
    //         const nextListItem = list[j];

    //         const currentListItemDate = new Date(currentListItem.date).getTime();
    //         const nextListItemDate = new Date(nextListItem.date).getTime();

    //         if(nextListItemDate > currentListItemDate) {
    //             const holdCurrentListItem = currentListItem;
    //             list[i] = nextListItem
    //             list[j] = holdCurrentListItem
    //         }
    //     }

    //     if(list.length-1 === i) return list.reverse();
    // }

    const jList = list.slice(0, list.length-1)
    let iCount = 0, jCount = 0;

    for await (const iKey of list) {
        for await (const jKey of jList) {

            const currentListItem = iKey;
            const nextListItem = jKey;

            const currentListItemDate = new Date(currentListItem.date).getTime();
            const nextListItemDate = new Date(nextListItem.date).getTime();

            if(nextListItemDate > currentListItemDate) {
                const holdCurrentListItem = currentListItem;
                list[iCount] = nextListItem
                list[jCount] = holdCurrentListItem
            }

            jCount++
        }
        iCount++;
    }

    return list.reverse();
}