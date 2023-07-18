import styles from "./taskdetails.module.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteTextButton from "src/components/Buttons/DeleteTextButton";
import GoBackButton from "src/components/Buttons/GoBackButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import InputField from "src/components/FormComponents/InputField";
import TextField from "src/components/FormComponents/TextField";
import SizedBox from "src/components/SizedBox";
import { administerMedTaskAction, delineMedAdministrationTaskAction } from "src/features/task/action";
import { useFetchTaskDetailsSelector } from "src/features/task/selector";
import { resetTaskState, useTaskState } from "src/features/task/state";

export default function TaskDetails() {
    
    const params = useParams();

    const [taskState, setTaskState] = useTaskState();

    const taskDetailsResponse = useFetchTaskDetailsSelector(parseInt(params.taskId!))
    
    useEffect(()=> {
        setTaskState(state => ({
            ...state,
            error: taskDetailsResponse.error,
            message: taskDetailsResponse.error ?taskDetailsResponse.message :"",
            taskDetails: taskDetailsResponse.task
        }))

    }, [taskDetailsResponse, setTaskState])

    const [medAmountTakenAdminModel, setMedAmountTakenAdminModel] = useState<formFieldType>({
        type: "number",
        label: "Amount administered",
        value: "1",
        readonly: true,
        error: "",
        validated: true
    })

    const [medAmountLeftAdminModel, setMedAmountLeftAdminModel] = useState<formFieldType>({
        type: "number",
        name: "amount-left",
        label: "Amount left after count",
        value: "",
        error: "",
        validated: false
    })

    const [medAdminNoteModel, setMedAdminNoteModel] = useState<formFieldType>({
        type: "text",
        placeholder: "Leave a note",
        value: "",
        error: "",
        validated: false
    })

    function setInput(value:string, model:formFieldType, setModel:setFormFieldType) {
        model.value = value;
        validateModel(model);
        setModel({...model})

        enableButton();
    }

    function validateModel(model:formFieldType) {
        if(!model.value) {
            model.error = `Field cannot be empty`
            model.validated = false
            return
        }

        if(model.name === 'amount-left') {
            if(parseInt(model.value) !== (taskState.taskDetails.medication!.amountLeft - 1)) {
                model.error = "Amount left doesn't match the records, you can proceed still"
                model.validated = false
                return;
            }
        }
        
        model.error = ''
        model.validated = true
        return
    }

    const [isFormValid, setIsFormValid] = useState(false);

    function enableButton() {
        if(!medAmountTakenAdminModel.validated) {
            setIsFormValid(false)
            return;
        }
        if(!medAmountLeftAdminModel.validated) {
            setIsFormValid(false)
            return;
        }

        setIsFormValid(true)
        return;
    }

    function administerMed() {
        if(isFormValid) {
            const payload = {
                amountAdministered: parseInt(medAmountTakenAdminModel.value!),
                amountLeft: parseInt(medAmountLeftAdminModel.value!)
            }

            administerMedTaskAction(params.taskId!, payload)
            .then((response)=> {
                setTaskState(state => ({
                    ...state,
                    status:'SUCCESS',
                    error: false,
                    message: response.message,
                    taskDetails: response.data.task
                }))
            })
            .catch((error)=> {
                setTaskState(state => ({
                    ...state,
                    status:'FAILED',
                    error: true,
                    message: error.message
                }))
            })
        }
    }

    function declineMedAdministration() {
        if(medAdminNoteModel.validated) {
            delineMedAdministrationTaskAction(params.taskId!)
            .then((response)=> {
                setTaskState(state => ({
                    ...state,
                    status:'SUCCESS',
                    error: false,
                    message: response.message,
                    taskDetails: response.data.task
                }))
            })
            .catch((error)=> {
                setTaskState(state => ({
                    ...state,
                    status:'FAILED',
                    error: true,
                    message: error.message
                }))
            })

        } else {
            setMedAdminNoteModel(state => ({
                ...state,
                error: "Please state reason for decline",
                validated: false
            }))
        }
    }
    
    return (
        <div className={styles.task_details}>

            <FormStateModal 
                status={taskState.status} 
                error={taskState.error} 
                message={taskState.message}
                reset={()=>resetTaskState(setTaskState)}
            />

            <SizedBox height="30px" />

            <GoBackButton path={"/dashboard/tasks"} />

            <SizedBox height="30px" />

            <div className={styles.title}>{ taskState.taskDetails?.service.title }</div>

            <div className={styles.content}>
                <div className={styles.details}> 
                    <div className={styles.meta}>
                        <div className={styles.todo}>Todo</div>
                    </div>

                    <div className={styles.desc}>
                        <div className={styles.medication}>{ taskState.taskDetails.medication?.name }</div>
                        
                        <div className={styles.info}>
                            <div className={styles.label}>Strength</div>
                            <div className={styles.digit}>{ taskState.taskDetails.medication?.strength }</div>
                        </div>

                        <div className={styles.info}>
                            <div className={styles.label}>Route</div>
                            <div className={styles.digit}>{ taskState.taskDetails.medication?.route }</div>
                        </div>

                        <div className={styles.info}>
                            <div className={styles.label}>indications</div>
                            <div className={styles.indications}>
                                {
                                    taskState.taskDetails.medication?.indications.map( indication => (
                                        <div key={indication} className={styles.item}>{ indication }</div>
                                    ))
                                }
                            </div>
                        </div>

                        <SizedBox height={"100px"} />
                    </div>
                </div>

                <div className={styles.med_actions}>
                    <InputField
                        type={medAmountTakenAdminModel.type}
                        label={medAmountTakenAdminModel.label}
                        value={medAmountTakenAdminModel.value}
                        readonly={medAmountTakenAdminModel.readonly}
                        error={medAmountTakenAdminModel.error}
                        onInput={(value:string)=> setInput(value, medAmountTakenAdminModel, setMedAmountTakenAdminModel)}
                    />

                    <InputField
                        type={medAmountLeftAdminModel.type}
                        label={medAmountLeftAdminModel.label}
                        value={medAmountLeftAdminModel.value}
                        readonly={medAmountLeftAdminModel.readonly}
                        error={medAmountLeftAdminModel.error}
                        onInput={(value:string)=> setInput(value, medAmountLeftAdminModel, setMedAmountLeftAdminModel)}
                    />

                    <TextField
                        placeholder={medAdminNoteModel.placeholder}
                        error={medAdminNoteModel.error}
                        onInput={(value:string)=> setInput(value, medAdminNoteModel, setMedAdminNoteModel)}
                    />

                    <div className={styles.actions}>
                        <DeleteTextButton
                            label={"Declined"}
                            clickAction={declineMedAdministration}
                        />

                        <PrimaryTextButton
                            label={"Administered"}
                            clickAction={administerMed}
                            isLoading={taskState.status === 'LOADING'}
                            disabled={!isFormValid}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

