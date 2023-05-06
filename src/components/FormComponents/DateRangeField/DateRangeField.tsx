import { useState } from "react";
import { formFieldType, setFormFieldType } from "../FormWrapper/types";
import InputField from "../InputField";
import styles from "./daterangefield.module.css";

export default function DateRangeField({
    onSelect
}:{
    defaultStart?:string,
    defaultEnd?:string,
    onSelect:({start, end}:{start:string, end:string})=> void
}) {

    const [startDateModel, setStartDateModel] = useState<formFieldType>({
        type:'date',
        label:'Start date',
        placeholder:'Start date',
        value:'',
        error: '',
        validated: false
    })

    const [endDateModel, setEndDateModel] = useState<formFieldType>({
        type:'date',
        label:'End date',
        placeholder:'End date',
        value:'',
        error: '',
        validated: false
    })

    function setInput(value:string, inputModel:formFieldType, setInputModel:setFormFieldType) {
        inputModel.value = value
        validateModel(inputModel)
        setInputModel({...inputModel});

        setRange()
    }

    function validateModel(updatedInputModel:formFieldType) {
        if(!updatedInputModel.value) {
            updatedInputModel.validated = false;
            return
        }

        updatedInputModel.validated = true;
        return
    }

    function setRange() {
        if(startDateModel.validated && endDateModel.validated) {
            onSelect({
                start: startDateModel.value,
                end: endDateModel.value
            })
        }
    }

    return (
        <div className={styles.date_range_field}>
            <InputField 
                inputWidth={'100%'}
                inputContainer={'150px'}
                type={startDateModel.type}
                placeholder={startDateModel.placeholder}
                value={startDateModel.value}
                error={startDateModel.error}
                onInput={(value: string) => setInput(value, startDateModel, setStartDateModel)} 
            />

            <InputField 
                inputWidth={'100%'}
                inputContainer={'150px'}
                type={endDateModel.type}
                placeholder={endDateModel.placeholder}
                value={endDateModel.value}
                error={endDateModel.error}
                onInput={(value: string) => setInput(value, endDateModel, setEndDateModel)} 
            />
        </div>
    )
}