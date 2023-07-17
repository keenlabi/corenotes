import styles from "./createassessment.module.css";
import InputField from "src/components/FormComponents/InputField";
import { ReactComponent as IconPlusCircle } from "src/assets/icons/icon-plus-circle.svg"
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import { useEffect, useState } from "react";
import FormWrapper from "src/components/FormComponents/FormWrapper";
import TextField from "src/components/FormComponents/TextField";
import { FaMinus } from "react-icons/fa";
import { useIndividualState } from "src/features/Individual/state";
import { useFetchIndividualListSelector } from "src/features/Individual/selector";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { AssessmentInitState, useAssessmentState } from "src/features/assessment/state";
import { AssessmentListResponseType, ICreateAssessmentPayload, createAssessmentAction } from "src/features/assessment/action";
import SizedBox from "src/components/SizedBox";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import { useFetchAssessmentCategories } from "src/features/assessment/selector";
import AddQuestionCategoryModal from "./AddQuestionCategory/AddQuestionCategory";
import AddAssessmentCategoryModal from "./AddAssessmentCategory";
import GoBackButton from "src/components/Buttons/GoBackButton";

export default function CreateAssessment() {

    const [individualState, setIndividualState] = useIndividualState();

    const [assessmentState, setAssessmentState] = useAssessmentState();

    const individualListResponse = useFetchIndividualListSelector(individualState.individuals.currentListPage);

    const assessmentCategories = useFetchAssessmentCategories();   

    const categoryModel:DropDownFormData = {
        name:'question-category',
        placeholder: 'Select question category',
        options: assessmentCategories.questionCategories.map(category => ({
            id: category.id,
            label: category.name,
            value: category.id
        })),
        selected: false,
        selectedOptionIndex: 0,
        error:''
    }

    useEffect(()=> {
        setAssessmentState(state => ({
            ...state,
            assessmentCategories: assessmentCategories.assessmentCategories.map(category => ({
                id: category.id,
                name: category.name
            })),
            questionCategories: assessmentCategories.questionCategories.map(category => ({
                id: category.id,
                name: category.name
            }))
        }))

    }, [assessmentCategories, setAssessmentState])

    const [questionsModel, setQuestionsModel] = useState<{
        placeholder:string,  
        questions:Array<{
            model:DropDownFormData,
            category:string,
            question:string
        }>
    }>({
        placeholder: 'Assessment questionaire',
        questions: [{
            model: { 
                ...categoryModel,
                options: assessmentCategories.questionCategories.map(category => ({
                    id: category.id,
                    label: category.name,
                    value: category.id
                }))
            },
            category:'',
            question:''
        }]
    })

    useEffect(()=> {
        setCategory(state => ({
            ...state,
            options: assessmentState.assessmentCategories.map(category => ({
                id: category.id,
                label: category.name,
                value: category.id
            }))
        }))
    }, [assessmentState])

    useEffect(()=> {
        setIndividualState(state => ({
            ...state,
            list: individualListResponse.individuals
        }))
    }, [individualListResponse, setIndividualState])

    const [assessmentTitle, setAssessmentTitle] = useState<formFieldType>({
        placeholder:'Enter assessment title',
        value: assessmentState.newAssessment.title ?? '',
        error: '',
        validated: false,
    })

    const [category, setCategory] = useState<DropDownFormData>({
        placeholder: 'Select category',
        options:[],
        name:'',
        error: '',
        selected: false,
        selectedOptionIndex: 0,
    })

    const [assessmentAssignToModel, setAssessmentAssignToModel] = useState<DropDownFormData>({
        placeholder: 'Assign to',
        name:'assign-to',
        options:[
            {
                id:'1',
                label:'Individuals',
                value:'individuals'
            },
            {
                id:'2',
                label:'Service',
                value:'services'
            }
        ],
        error: '',
        selected: false,
        selectedOptionIndex: 0,
    })

    const [assignedIndividuals, setAssignedIndividuals] = useState<{
        assigneesType:string,
        assigneesList:Array<string>
    }>({
        assigneesType:assessmentState.newAssessment.assignees.assigneesType ?? 'ALL',
        assigneesList:assessmentState.newAssessment.assignees.assigneesList ?? []
    })

    const [assignedServices, setAssignedServices] = useState<{
        assigneesType:string,
        assigneesList:Array<string>
    }>({
        assigneesType:assessmentState.newAssessment.assignees.assigneesType ?? 'ALL',
        assigneesList:assessmentState.newAssessment.assignees.assigneesList ?? []
    })

    const [isFormValid, setIsFormValid] = useState(false)

    function setInput(inputValue:string, model:formFieldType, setModel:setFormFieldType) {
        model.value = inputValue;
        validateModel(model);
        setModel({...model})

        enableButton()
    }

    function validateModel(updatedModel:formFieldType) {

        if(!updatedModel.value) {
            updatedModel.validated = true
            updatedModel.error = ''
            return;
        }

        updatedModel.validated = true
        updatedModel.error = ''
        return;
    }

    function selectOption(optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.selectedOptionIndex = optionIndex;
        model.selected = true;
        model.value = model.options[optionIndex];

        if(model.name === 'assign-to') {
            if(model.value.value === 'individuals') {
                selectAllIndividuals()
            }
            if(model.value.value === 'services') {
                selectAllServices()
            }
        }

        setModel({...model})
        enableButton()
    }

    function selectQuestionOption(questionCategoryIndex:number, optionIndex:number) {
        questionsModel.questions[questionCategoryIndex].model.selectedOptionIndex = optionIndex;
        questionsModel.questions[questionCategoryIndex].model.selected = true;
        questionsModel.questions[questionCategoryIndex].model.value = questionsModel.questions[questionCategoryIndex].model.options[optionIndex];
        questionsModel.questions[questionCategoryIndex].category = questionsModel.questions[questionCategoryIndex].model.value?.value ?? '';

        setQuestionsModel({...questionsModel})
        enableButton()
    }

    function setQuestion(inputValue:string, questionIndex:number) {
        questionsModel.questions[questionIndex].question = inputValue;
        setQuestionsModel({...questionsModel})
        enableButton()
    }

    function addNewQuestion() {
        setQuestionsModel(state => ({
            ...state,
            questions: [
                ...state.questions, 
                { category:'', model: { ...categoryModel }, question: ''}
            ]
        }))

        setIsFormValid(false)
    }

    function deleteQuestion(questionIndex:number) {
        questionsModel.questions.splice(questionIndex, 1)
        setQuestionsModel({...questionsModel})
        enableButton()
    }

    function selectAllIndividuals() {
        setAssignedIndividuals({
            assigneesType:'ALL',
            assigneesList:[]
        })
        enableButton()
    }

    function selectAllServices() {
        setAssignedServices({
            assigneesType:'ALL',
            assigneesList:[]
        })
        enableButton()
    }

    function validateForm() {
        if(!assessmentTitle.validated) return false;
        if(!category.selected) return false;
        if(questionsModel.questions.filter(question => question.model.value === undefined).length) return false;
        if(!questionsModel.questions.filter(question => question.question !== '').length) return false;
        if(!assessmentAssignToModel.selected) return false;

        return true;
    }

    function enableButton() {
        if(validateForm()) setIsFormValid(true)
        else setIsFormValid(false)
    }

    function submitAssessment() {
        const payload:ICreateAssessmentPayload = {
            title:  assessmentTitle.value,
            category:   category.value?.value ?? '',
            questions:  questionsModel.questions
                        .filter(question => question.question !== '')
                        .map(question => ({ 
                            category: question.category,
                            question: question.question
                        })),
            assignedTo: assessmentAssignToModel.value!.value!,
            assignees:{
                assigneesType:'ALL',
                assigneesList:[]
            }
        }

        if(payload.assignedTo === 'services') {
            payload.assignees = assignedServices;
        }

        if(payload.assignedTo === 'individuals') {
            payload.assignees = assignedIndividuals;
        }

        console.log(payload)

        setAssessmentState(state => ({
            ...state,
            status:'LOADING',
            error: false,
            message: ''
        }))

        createAssessmentAction(payload)
        .then((response:AssessmentListResponseType)=> {
            setAssessmentState(state => ({
                ...state,
                status:'SUCCESS',
                error: false,
                message: 'Assessment created successfully',
                list: response.data,
                newAssessment: AssessmentInitState.newAssessment
            }))

            // setQuestionsModel(state => ({...state, questions:['']}))
        })
        .catch((error)=> {
            setAssessmentState(state => ({
                ...state,
                status:'FAILED',
                error: true,
                message: error.message ?? 'There was an error creating assessment'
            }))
        })
    }

    const [questionCategoryVisibility, setQuestionCategoryVisibility] = useState(false);
    function openQuestionCategoryModal() {
        setQuestionCategoryVisibility(!questionCategoryVisibility)
    }

    const [assessmentCategoryVisibility, setAssessmentCategoryVisibility] = useState(false);
    function openAssessmentCategoryModal() {
        setAssessmentCategoryVisibility(!assessmentCategoryVisibility)
    }

    return (
        <div className={styles.create_assessment}>

            <GoBackButton path={"/dashboard/individuals/assessments"} />
            
            <div className={styles.heading}>
                <div className={styles.section_title}>Create assessment</div>
            
                <PrimaryTextButton
                    disabled={!isFormValid}
                    isLoading={assessmentState.status === 'LOADING'}
                    width={"20%"}
                    label={"Save"}
                    clickAction={()=> submitAssessment()}
                />
            </div>

            <div className={styles.body}>
                <FormWrapper 
                    extraStyles={styles.form} 
                    state={assessmentState} 
                    resetState={()=> setAssessmentState(state => ({...state, status: 'IDLE', message:'', error:false}))}
                >
                    <div className={styles.section}>
                        <InputField 
                            placeholder={assessmentTitle.placeholder}
                            value={assessmentTitle.value} 
                            error={assessmentTitle.error}
                            onInput={(value:string)=> setInput(value, assessmentTitle, setAssessmentTitle)}
                        />

                        <div className={styles.row}>
                            <DropDownField
                                placeholder={category.placeholder}
                                error={category.error} 
                                options={category.options} 
                                selected={category.selected} 
                                selectedOptionIndex={category.selectedOptionIndex}
                                onSelect={(optionIndex:number)=> selectOption(optionIndex, category, setCategory)}
                            />

                            <div
                                className={styles.add_button} 
                                onClick={()=> openAssessmentCategoryModal()}
                            >
                                <IconPlusCircle className={styles.plus} />
                                Add
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className={styles.section_title}>Assessment questions</div>

                        <div className={styles.questions}>
                            {
                                questionsModel.questions.map((question, index:number)=> {
                                    return  <div key={index} className={styles.question_frame}>
                                                <div className={styles.question_box}>
                                                    <div className={styles.number}>{index+1}</div>
                                                    <div className={styles.question_content}>
                                                        <div className={styles.question_category}>
                                                            <DropDownField 
                                                                placeholder={question.model.placeholder}
                                                                error={question.model.error}
                                                                options={question.model.options} 
                                                                selected={question.model.selected} 
                                                                selectedOptionIndex={question.model.selectedOptionIndex}
                                                                onSelect={(optionIndex:number)=> selectQuestionOption(index, optionIndex)}
                                                            />

                                                            <div
                                                                className={styles.add_button} 
                                                                onClick={()=> openQuestionCategoryModal()}
                                                            >
                                                                <IconPlusCircle className={styles.plus} />
                                                                Add
                                                            </div>
                                                        </div>
                                                        <SizedBox height={"10px"} />
                                                        <TextField 
                                                            placeholder={questionsModel.placeholder}
                                                            value={question.question}
                                                            onInput={(textValue:string)=> setQuestion(textValue, index)}
                                                        />
                                                    </div>
                                                </div>

                                                {
                                                    index !== 0
                                                    ?   <div
                                                            className={styles.delete_button} 
                                                            onClick={()=> deleteQuestion(index)}
                                                        >
                                                            <FaMinus className={styles.minus_icon} />
                                                            remove question
                                                        </div>
                                                    :   null
                                                }
                                            </div>
                                })
                            }
                        </div>

                        <div
                            className={styles.add_button} 
                            onClick={()=> addNewQuestion()} 
                        >
                            <IconPlusCircle className={styles.plus} />
                            Add question
                        </div>
                    </div>
                    
                    <div>
                        <div className={styles.section_title}>Assign to</div>
                        <SizedBox height="20px" />
                        <DropDownField
                            label={assessmentAssignToModel.label}
                            options={assessmentAssignToModel.options}
                            selectedOptionIndex={assessmentAssignToModel.selectedOptionIndex}
                            selected={assessmentAssignToModel.selected} 
                            error={assessmentAssignToModel.error}
                            onSelect={(optionIndex:number)=> selectOption(optionIndex, assessmentAssignToModel, setAssessmentAssignToModel)}
                        />
                    </div>
                </FormWrapper>

                {/* <div className={styles.assignee}>
                    <div className={styles.title}>Individuals</div>
                    <div className={styles.selection_pane}>
                        <div className={styles.select_all}>
                            <RadioButton 
                                label={"Select all"} 
                                selected={assignedIndividuals.assigneesType === 'ALL'}
                                onSelect={()=> selectAllIndividuals()}
                            />
                        </div>

                        <div className={`${styles.select_all} ${styles.selection}`}>
                            {
                                individualState.individuals.list.map(individual => {
                                    return  <div key={individual.id} className={styles.container}>
                                                <RadioButton
                                                    label={`${individual.firstname} ${individual.lastname}`}
                                                    selected={assignedIndividuals.assigneesList.includes(individual.id)}
                                                    onSelect={()=> selectSpecificIndividual(individual.id)}       
                                                />
                                            </div>
                                })
                            }
                        </div>
                    </div>
                </div> */}


            </div>
            
            {
                assessmentCategoryVisibility
                ?   <AddAssessmentCategoryModal 
                        closeModal={openAssessmentCategoryModal} 
                    />
                :   null
            }

            {
                questionCategoryVisibility
                ?   <AddQuestionCategoryModal 
                        closeModal={openQuestionCategoryModal} 
                    />
                :   null
            }
        </div>
    )
}