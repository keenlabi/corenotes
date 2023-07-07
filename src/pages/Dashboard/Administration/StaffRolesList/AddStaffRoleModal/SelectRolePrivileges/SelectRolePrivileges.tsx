import { useState } from "react"
import styles from "./selectroleprivileges.module.css"
import RadioButton from "src/components/FormComponents/RadioButtonField/RadioButton";

interface PrivilegeFormData {
    staffs:Array<{
        id:number;
        label:string;
        value:string;
        selected:boolean,
    }>
}

type IPrivilegeCategories = 'staffs'|'individual'

export default function SelectRolePrivileges({submit}:{submit:(object:any)=> void}) {

    const [submitObj, setSubmitObj] = useState<any>({})

    const [privileges, setPrivileges] = useState<PrivilegeFormData>({
        staffs:[
            {
                id: 1,
                label: "Staff Registration",
                value: "staff_registration",
                selected: false,
            },
            {
                id: 2,
                label: "Staff Profile: View",
                value: "staff_profile_view",
                selected: false,
            },
            {
                id: 3,
                label: "Staff Documents: Upload",
                value: "staff_document_upload",
                selected: false,
            }
        ]
    })

    function selectOption(privilegeId:number, category:IPrivilegeCategories) {
        if(category === 'staffs') {
            const selectedOptionIndex = privileges.staffs.findIndex((staff)=> staff.id === privilegeId);
            const model = privileges.staffs[selectedOptionIndex];
            privileges.staffs[selectedOptionIndex].selected = !model.selected;
            
            setPrivileges({...privileges})
            
            submitObj[model.value] = model.selected;
            setSubmitObj({...submitObj})
        }

        submitPrivileges();
    }

    function submitPrivileges() {
        submit(submitObj)
    }

    return (
        <div className={styles.select_role_privileges}>
            <div className={styles.heading}>Select Privileges</div>

            <div className={styles.privilege_group}>
                <div className={styles.title}>Staff management</div>
                <div className={styles.radio_options}>
                    {
                        privileges.staffs.map((staffPrivilege)=> {
                            return  <RadioButton
                                        key={staffPrivilege.id}
                                        label={staffPrivilege.label} 
                                        selected={staffPrivilege.selected} 
                                        onSelect={()=> selectOption(staffPrivilege.id, 'staffs')}
                                    />
                            
                        })
                    }
                </div>
            </div>
        </div>
    )
}