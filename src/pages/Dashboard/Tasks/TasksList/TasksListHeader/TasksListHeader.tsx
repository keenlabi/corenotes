import styles from "./taskslistheader.module.css"
import { useTaskStateValue } from "src/features/task/state";
import { ReactComponent as IconBarcodeScanner } from "src/assets/icons/icon-barcode-scanner.svg";
import { useState } from "react";
import SizedBox from "src/components/SizedBox";
import { FaList, FaPills, FaPlus } from "react-icons/fa";

export default function TasksListHeader({ 
    openBarcodeScanner, addPRNmed
}: { openBarcodeScanner: () => void, addPRNmed:()=>void }) {

    const taskStateValue = useTaskStateValue();

    const [taskCategories, setTaskCategories] = useState([
        {
            id: 'all',
            label: "All",
            icon: <FaList />,
            active: true
        },
        {
            id: 'medication',
            label: "medication",
            icon: <FaPills />,
            active: false
        }
    ])

    function changeActiveCategory(taskCategoryId:string) {
        
        taskCategories.forEach(category => category.active = false);
        const selectedCategoryIndex = taskCategories.findIndex(category => category.id === taskCategoryId);
        taskCategories[selectedCategoryIndex].active = true;

        setTaskCategories([...taskCategories])
    }


    return (
        <div className={styles.tasks_list_header}>

            <div className={styles.task_categories}>
                {
                    taskCategories.map(category => {
                        return  <div
                                    key={category.id}
                                    className={`${styles.task_category} ${category.active ? styles.active_category :null}`}
                                    onClick={()=> changeActiveCategory(category.id)}
                                >
                                    { category.icon }
                                    <div className={styles.cat_label}>{ category.label }</div>
                                </div>
                    })
                }
            </div>

            <SizedBox height="30px" />

            <div className={styles.task_list_sub_header}>
                <div className={styles.heading}>
                    <div className={styles.number_of_tasks}>{taskStateValue.tasks.list?.length}</div>
                    <div className={styles.title}>tasks</div>
                </div>

                <div className={styles.actions}>
                    <div
                        className={styles.open_barcode_scanner_btn}
                        onClick={() => openBarcodeScanner()}
                    >
                        <IconBarcodeScanner />
                        <div className={styles.label}>Scan Med QR</div>
                    </div>

                    <div className={styles.administer_prn} onClick={addPRNmed}>
                        <FaPlus className={styles.btn_icon} />
                        <div className={styles.label}>  Administer PRN Med  </div>
                    </div>
                </div>
            </div>
        </div>
    )
}