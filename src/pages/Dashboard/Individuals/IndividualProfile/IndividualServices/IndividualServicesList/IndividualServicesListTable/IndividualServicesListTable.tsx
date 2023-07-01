import Table from "src/components/Table"
import styles from "./individualserviceslisttable.module.css"
import { useEffect, useState } from "react";
import ComponentLoader from "src/components/Loaders/ComponentLoader";
import sortByDate from "src/utils/sortByDate";
import { IndividualServiceListItemType } from "src/features/Individual/types";
import formatDate from "src/utils/formatDate";
import capitalize from "src/utils/capitalize";
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";

export default function IndividualServicesListTable({
    services,
    currentPage, 
    totalPages,
    goToPage,
    errorMessage

}:{services:IndividualServiceListItemType[], currentPage:number, totalPages:number, errorMessage:string, goToPage:(pageNumber:number)=> void}) {
    
    const [isLoading, setIsLoading] = useState(false);

    const [tableBody, setTableBody] = useState<JSX.Element[][]|object[][]>([]);
    const tableHead = [
        'Title',
        'Category',
        'Start date'
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

    function formatTransactionsTable (services:IndividualServiceListItemType[]) {
        return services.map((service)=> {
            return  [
                {
                    rowKey: service.id,
                    actionEvent: 'row_click',
                    target:'blank_page'
                },
                <div className={styles.title}>{capitalize(service.title)}</div>,
                <div className={styles.compartment}>{service.category}</div>,
                <div className={styles.start_date}>{formatDate(service.startDate)}</div>,
            ]
        });
    }

    const paginateAction = (pageNumber:string|number)=> {
        setIsLoading(true);
        goToPage(parseInt(pageNumber.toString()))
    }



    return (
        <div className={styles.individual_services_list_table}>
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