import Table from "src/components/Table"
import styles from "./serviceslisttable.module.css"
import { useEffect, useState } from "react";
import ComponentLoader from "src/components/Loaders/ComponentLoader";
import sortByDate from "src/utils/sortByDate";
import { ServicesListItemType } from "src/features/service/types";
import formatDate from "src/utils/formatDate";
import formatTime from "src/utils/formatTime";
import capitalize from "src/utils/capitalize";

export default function ServicesListTable({
    currentPage, 
    totalPages,
    goToPage,
    services,
    errorMessage
}:{services:ServicesListItemType[] ,currentPage:number, totalPages:number, errorMessage:string, goToPage:(pageNumber:number)=> void}) {

    const [isLoading, setIsLoading] = useState(false);

    const [tableBody, setTableBody] = useState<JSX.Element[][]|object[][]>([]);
    const tableHead = [
        'Title',
        'Individuals',
        'Date created'
    ]

    useEffect(()=> {
        setIsLoading(true)

        sortByDate(services)
        .then((result)=> {
            const newTransactions = formatTransactionsTable(result);
            setTableBody(newTransactions)
            setIsLoading(false)
        })
        .catch((error)=> {
            console.log(error)
        })
    }, [services])

    function formatTransactionsTable (services:ServicesListItemType[]) {
        return services.map((service)=> {
            return  [
                {
                    rowKey: service.id
                },
                <div className={styles.title}>{capitalize(service.title)}</div>,
                <div className={styles.individuals}>{service.assignedIndividualsCount}</div>,
                <div className={styles.date}>{formatDate(service.createdAt)} {formatTime(service.createdAt)} </div>
            ]
        });
    }

    const paginateAction = (pageNumber:string|number)=> {
        setIsLoading(true);
        goToPage(parseInt(pageNumber.toString()))
    }

    return (
        <div className={styles.staff_list_table}>
            {   
                isLoading
                ?   <ComponentLoader />
                :   <Table 
                        head={tableHead}
                        body={tableBody}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        goToPage={(pageNumber:string|number)=> paginateAction(pageNumber)}
                        extraStyle={styles}
                        emptyListMessage={errorMessage}
                    />
            }
        </div>
    )
}