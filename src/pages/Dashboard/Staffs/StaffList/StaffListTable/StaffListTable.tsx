import Table from "src/components/Table"
import styles from "./stafflisttable.module.css"
import { useEffect, useState } from "react";
import ComponentLoader from "src/components/Loaders/ComponentLoader";
import sortByDate from "src/utils/sortByDate";
import UserImage from "src/components/ImageComponent/UserImage";
import NoBackgroundButton from "src/components/Buttons/NoBackgroundButton/NoBackgroundButton";

export default function StaffListTable({
    currentPage, 
    totalPages,
    goToPage,
    staffs
}:{staffs:object[] ,currentPage:number, totalPages:number, goToPage:(pageNumber:number)=> void}) {

    const [isLoading, setIsLoading] = useState(false);

    const [tableBody, setTableBody] = useState<any[]>([]);
    const tableHead = [
        '',
        'Name',
        'Role',
        'Cell phone',
        'Compartment',
        '',
    ]

    useEffect(()=> {
        setIsLoading(true)

        sortByDate([...staffs])
        .then((result)=> {
            const newTransactions = formatTransactionsTable(result);
            setTableBody(newTransactions)
            setIsLoading(false)
        })
        .catch((error)=> {
            console.log(error)
        })
    }, [])

    function formatTransactionsTable (staffs:any[]) {
        return staffs.map((staff:any)=> {
            return  [
                {
                    rowKey: staff.id,
                    actionEvent: 'action_button_click',
                    actionButtonPosition: 6
                },
                <div className={styles.user_image}>{UserImage(staff.profilePicture, staff.fullname, '40px')}</div>,
                <div className={styles.fullname}>{staff.fullname}</div>,
                <div>{staff.role}</div>,
                <div>{staff.cellPhone}</div>,
                <div className={styles.compartment}>{staff.compartment}</div>,
                <div className={styles.button}>
                    <NoBackgroundButton 
                        width="100px"
                        height="30px"
                        fontSize="16px"
                        label="View profile" 
                        clickAction={()=> console.log('g')}                       
                    />
                </div>
            ]
        });
    }

    const paginateAction = (pageNumber:string|number)=> {
        setIsLoading(true);
        goToPage(parseInt(pageNumber.toString()))
    }

    return(
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
                        emptyListMessage={"Transactions made by customers will show here"}
                    />
            }
        </div>
    )
}