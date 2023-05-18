import DateRangeField from "src/components/FormComponents/DateRangeField"
import StaffProfileHeader from "../StaffProfileHeader"
import styles from "./staffactivities.module.css"
import { useState } from "react"
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield"
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton"
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types"
import capitalize from "src/utils/capitalize"
import StaffActivitiesTable from "./StaffActivitiesTable"
import SizedBox from "src/components/SizedBox"

export default function StaffActivities() {
    
    const staffActivitiesResponse = [
        {
            id:'1',
            title: 'Annual meeting',
            host: 'Williams Augusta',
            dateTime: '04/04/2023 01:00pm'
        }
    ]

    const [activityDateRangeModel, setActivityDateRangeModel] = useState({
        start: '',
        end: ''
    })

    const [activityTypeModel, setActivityTypeModel] = useState<DropDownFormData>({
        label:'',
        name:'activity-type',
        options: [
            {
                id:'1',
                label:'Meeting activity',
                value:'meeting'
            },
            {
                id:'2',
                label:'Training activity',
                value:'training'
            }
        ],
        value: {
            id:'1',
            label:'Meeting activity',
            value:'meeting'
        },
        selected: true,
        selectedOptionIndex: 0,
        error:'',
    })

    function selectOption(optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selectedOptionIndex = optionIndex;
        model.selected = true;

        setModel({...model})
    }

    function createActivity() {
        console.log('')
    }

    return (
        <div className={styles.staff_activities}>
            <StaffProfileHeader />

            <div className={styles.body}>
                <div className={styles.heading}>
                    {capitalize(activityTypeModel.value?.value ?? '')} activity
                </div>

                <div className={styles.activity_header}>
                    <DateRangeField 
                        onSelect={(dateRange)=>  setActivityDateRangeModel(dateRange)}  
                    />

                    <DropDownField 
                        extraStyle={styles.dropdown_field}
                        width="200px"
                        height="45px"
                        options={activityTypeModel.options} 
                        error={activityTypeModel.error} 
                        selected={activityTypeModel.selected} 
                        selectedOptionIndex={activityTypeModel.selectedOptionIndex}       
                        onSelect={(optionIndex:number)=> selectOption(optionIndex, activityTypeModel, setActivityTypeModel)}
                    />

                    <AddNewNoBackgroundIconButton
                        label={`New ${activityTypeModel.value?.label}`}
                        action={createActivity}
                    />
                </div>

                <SizedBox height="50px" />
                
                <StaffActivitiesTable
                    activitiesList={staffActivitiesResponse} 
                    currentPage={0}
                    totalPages={0}
                    errorMessage={"There are no activities to show"}
                    goToPage={(pageNumber: number)=> console.log(pageNumber)}
                />
            </div>
        </div>
    )
}