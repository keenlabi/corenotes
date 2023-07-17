import { useEffect, useState } from "react";
import styles from "./medicationslisttable.module.css"
import Table from "src/components/Table"
import ComponentLoader from "src/components/Loaders/ComponentLoader";
import sortByDate from "src/utils/sortByDate";
import { IMedication } from "src/features/medication/types";
import NoBackgroundButton from "src/components/Buttons/NoBackgroundButton/NoBackgroundButton";
import { Link, useNavigate } from "react-router-dom";

export default function MedicationsListTable({
    currentPage, 
    totalPages,
    goToPage,
    medications,
    errorMessage
}:{medications:IMedication[] ,currentPage:number, totalPages:number, errorMessage:string, goToPage:(pageNumber:number)=> void}) {
    
    const [isLoading, setIsLoading] = useState(false);

    const [tableBody, setTableBody] = useState<JSX.Element[][]|object[][]>([]);
    const tableHead = [
        'Name',
        'Strength',
        'Med Type',
        'Category',
        'Barcode',
    ]

    useEffect(()=> {
        setIsLoading(true)

        sortByDate(medications)
        .then((result)=> {
            const newTransactions = formatTransactionsTable(result);
            setTableBody(newTransactions)
            setIsLoading(false)
        })
        .catch((error)=> {
            console.log(error)
        })
    }, [medications])

    function formatTransactionsTable (medications:IMedication[]) {
        return medications.map((medication)=> {
            return  [
                {
                    rowKey: medication.medicationId ?? medication.id,
                    actionEvent: 'action_button_click',
                    actionButtonPosition: 6
                },
                <div className={styles.name}>{ medication.name }</div>,
                <div className={styles.strength}>{ medication.strength }</div>,
                <div className={styles.med_type}>{ medication.medType }</div>,
                <div className={styles.category}>{ medication.category }</div>,
                <div className={styles.bar_code}>{ medication.barCode }</div>,
                <div className={styles.bar_code}>
                    <Link to={`${medication.medicationId}`}>
                        <NoBackgroundButton 
                            label={"Open"}
                            clickAction={()=> ({})}
                        />
                    </Link>
                </div>,
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