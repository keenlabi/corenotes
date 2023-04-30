import Table from "src/components/Table"
import styles from "./stafflisttable.module.css"
import { useEffect, useState } from "react";
import ComponentLoader from "src/components/Loaders/ComponentLoader";
import sortByDate from "src/utils/sortByDate";
import UserImage from "src/components/ImageComponent/UserImage";
import { staffsListType } from "src/features/staff/utils/formatStaffsList";
import StaffViewProfileButton from "./StaffViewProfileButton/StaffViewProfileButton";

export default function StaffListTable({
    currentPage, 
    totalPages,
    goToPage,
    staffs,
    errorMessage
}:{staffs:staffsListType[] ,currentPage:number, totalPages:number, errorMessage:string, goToPage:(pageNumber:number)=> void}) {
    
    const [isLoading, setIsLoading] = useState(false);

    const [tableBody, setTableBody] = useState<any[][]>([]);
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

        sortByDate(staffs)
        .then((result)=> {
            const newTransactions = formatTransactionsTable(result);
            setTableBody(newTransactions)
            setIsLoading(false)
        })
        .catch((error)=> {
            console.log(error)
        })
    }, [staffs])

    function formatTransactionsTable (staffs:staffsListType[]) {
        return staffs.map((staff)=> {
            return  [
                {
                    rowKey: staff.id,
                    actionEvent: 'action_button_click',
                    actionButtonPosition: 6
                },
                <div className={styles.user_image}>{UserImage(staff.profileImage, staff.fullname, '40px')}</div>,
                <div className={styles.fullname}>{staff.fullname}</div>,
                <div>{staff.role}</div>,
                <div>{staff.phoneNumber}</div>,
                <div className={styles.compartment}>{staff.compartment}</div>,
                <div className={styles.button}>
                    <StaffViewProfileButton id={staff.id} />
                </div>
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