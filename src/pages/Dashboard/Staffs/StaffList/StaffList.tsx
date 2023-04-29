import StaffListTable from "./StaffListTable";
import styles from "./stafflist.module.css";
import profilePicture from "src/assets/images/user-dp.png"

export default function StaffList() {

    const staffList = [
        {
            id:'1',
            profilePicture: profilePicture,
            fullname: 'Williams, Augusta',
            role: 'Super admin',
            cellPhone: '(678)123-1234',
            compartment: 'test compartment'
        },
        {
            id:'2',
            profilePicture: profilePicture,
            fullname: 'Williams, Augusta',
            role: 'Super admin',
            cellPhone: '(678)123-1234',
            compartment: 'test compartment'
        }
    ]

    return (
        <div className={styles.staff_list}>
            <StaffListTable 
                staffs={staffList}
                currentPage={0} 
                totalPages={0} 
                goToPage={(pageNumber:number)=> console.log(pageNumber)} 
            />
        </div>
    )
}