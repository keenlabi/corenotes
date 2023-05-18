import Table from "src/components/Table"
import styles from "./staffactivitiestable.module.css"
import { useEffect, useState } from "react";
import ComponentLoader from "src/components/Loaders/ComponentLoader";
import sortByDate from "src/utils/sortByDate";

export default function StaffActivitiesTable({
    currentPage,
    totalPages,
    goToPage,
    activitiesList,
    errorMessage

}:{activitiesList:{id:string, title:string, host:string, dateTime:string}[] , currentPage:number, totalPages:number, errorMessage:string, goToPage:(pageNumber:number)=> void}) {
    const [isLoading, setIsLoading] = useState(false);

    const [tableBody, setTableBody] = useState<JSX.Element[][]|object[][]>([]);
    const tableHead = [
        'Activity date',
        'Title',
        'Host'
    ]

    useEffect(()=> {
        setIsLoading(true)

        sortByDate(activitiesList)
        .then((result)=> {
            const newTransactions = formatTransactionsTable(result);
            setTableBody(newTransactions)
            setIsLoading(false)
        })
        .catch((error)=> {
            console.log(error)
        })
    }, [activitiesList])

    function formatTransactionsTable (activities:{id:string, title:string, host:string, dateTime:string}[]) {
        return activities.map((activity)=> {
            return  [
                {
                    rowKey: activity.id,
                    actionEvent: 'action_button_click',
                    actionButtonPosition: 5
                },
                <div className={styles.doc_date}>{activity.dateTime}</div>,
                <div>{activity.title}</div>,
                <div>{activity.host}</div>
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