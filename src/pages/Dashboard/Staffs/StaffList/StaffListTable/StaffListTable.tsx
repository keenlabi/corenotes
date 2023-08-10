import Table from "src/components/Table"
import styles from "./stafflisttable.module.css"
import { useEffect, useState } from "react";
import ComponentLoader from "src/components/Loaders/ComponentLoader";
import sortByDate from "src/utils/sortByDate";
import UserImage from "src/components/ImageComponent/UserImage";
import { staffsListType } from "src/features/staff/utils/formatStaffsList";
import StaffViewProfileButton from "./StaffViewProfileButton/StaffViewProfileButton";
import formatDate from "src/utils/formatDate";
import formatTime from "src/utils/formatTime";

export default function StaffListTable({
    currentPage, 
    totalPages,
    goToPage,
    staffs,
    errorMessage
}:{staffs:staffsListType[] ,currentPage:number, totalPages:number, errorMessage:string, goToPage:(pageNumber:number)=> void}) {
    
    const [isLoading, setIsLoading] = useState(false);

    const [tableBody, setTableBody] = useState<JSX.Element[][]|object[][]>([]);
    const tableHead = [
        '',
        'Name',
        'Role',
        'Cell phone',
        'Last seen',
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
                    rowKey: staff.staffId,
                    actionEvent: 'action_button_click',
                    actionButtonPosition: 6
                },
                <div className={styles.user_image}>
                    <UserImage 
                        imageUrl={staff.profileImage} 
                        fullname={staff?.fullname} 
                        size="50px"
                    />
                </div>,
                <div className={styles.fullname}>{staff.fullname}</div>,
                <div>{staff.role}</div>,
                <div>{staff.phoneNumber}</div>,
                <div className={styles.compartment}>{formatDate(staff.lastSeen)} - {formatTime(staff.lastSeen)}</div>,
                <div className={styles.button}>
                    <StaffViewProfileButton id={ staff.staffId.toString() } />
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