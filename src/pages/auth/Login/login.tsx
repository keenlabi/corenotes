import styles from "./login.module.css"
import logo from "src/assets/images/logo-with-name.png"
import ImageComponent from "src/components/ImageComponent"
import FormWrapper from "src/components/FormComponents/FormWrapper"
import FormHeading from "src/components/FormComponents/FormHeading"
import SizedBox from "src/components/SizedBox"
import InputField from "src/components/FormComponents/InputField"
import {ReactComponent as IconUser} from "src/assets/icons/icon-user.svg"
import PasswordInputField from "src/components/FormComponents/InputField/PasswordInputField/PasswordInputField"
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types"
import LoginAction from "src/features/auth/actions"
import { successResponseType } from "src/lib/types"

export default function Login() {

    const navigate = useNavigate();

    const [usernameModel, setUsernameModel] = useState<formFieldType>({
        type: 'text',
        label: 'Username',
        placeholder:'Username',
        error: '',
        prefixIcon: <IconUser />,
        validated: false
    })

    const [passwordModel, setPasswordModel] = useState<formFieldType>({
        type: 'password',
        label: "Password",
        error: '',
        validated: false
    })

    const [formStateModel, setFormStateModel] = useState({
        isError: false,
        message: 'The email or password entered does not match',
        validated: false
    })

    function setInput(value:string, inputModel:formFieldType, setInputModel:setFormFieldType) {
        inputModel.value = value
        validateModel(inputModel)
        setInputModel({...inputModel});

        isFormStateValid()
    }

    function validateModel(updatedInputModel:formFieldType) {
        if(!updatedInputModel.value) {
            updatedInputModel.validated = false;
            updatedInputModel.error = `${updatedInputModel.label} field cannot be empty`;
            return
        }

        updatedInputModel.validated = true;
        updatedInputModel.error = "";
        return
    }

    function isFormStateValid() {
        if(!usernameModel.validated || !passwordModel.validated) {
            setFormStateModel((state)=> {
                return {
                    ...state,
                    validated: false
                }
            })
        } else {
            setFormStateModel((state)=> {
                return {
                    ...state,
                    validated: true
                }
            })
        }
    } 

    function resetFormState() {
        setFormStateModel((state)=> {
            return {
                ...state,
                isError: false,
                message: '',
                validated: false
            }
        })
    }

    function loginInTrigger() {
        if(formStateModel.validated) {

            const payload = {
                username: usernameModel.value ?? "",
                password: passwordModel.value ?? ""
            }

            LoginAction(payload)
            .then((response:successResponseType)=> {
                navigate({pathname: "/dashboard"})
            })
            .catch((error)=> {
                setFormStateModel(()=> {
                    return {
                        isError: true,
                        message: error.message,
                        validated: false
                    }
                })
            })
        }

    }

    return (
        <div className={styles.login_page}>
            <div className={styles.left_container}>
                <div className={styles.container_text}>
                    Community of caregivers <br /> dedicated to providing specialized <br /> care for those who need it most
                </div>
            </div>
            <div className={styles.right_container}>
                <div className={styles.content_section}>
                    <ImageComponent
                        src={logo}
                        width={"100px"}
                        extraStyles={styles.logo_image}
                    />
                    
                    <SizedBox height="50px" />
                    
                    <FormWrapper 
                        extraStyles={styles.form_wrapper}
                        state={formStateModel}
                        resetState={()=> resetFormState()}
                    >
                        <FormHeading 
                            heading="Login"
                            subheading="If you already have an account registered in the system."
                            align="center"
                        />

                        <div className={styles.input_fields_wrapper}>
                            <InputField 
                                placeholder={usernameModel.placeholder}
                                error={usernameModel.error}
                                prefixIcon={usernameModel.prefixIcon}
                                onInput={(value:string)=> setInput(value, usernameModel, setUsernameModel)}
                            />

                            <PasswordInputField 
                                placeholder={passwordModel.placeholder}
                                error={passwordModel.error}
                                onInput={(value:string)=> setInput(value, passwordModel, setPasswordModel)}
                            />
                        </div>

                        <div className={styles.forgot_prompt}>
                            <Link to={"/forgot-username"} >Forgot username</Link>
                            <Link to={"/forgot-password"} >Forgot password</Link>
                        </div>

                        <SizedBox height="50px" />

                        <PrimaryTextButton 
                            label={"Login"}
                            disabled={!formStateModel.validated}
                            clickAction={()=> loginInTrigger()}
                        />

                    </FormWrapper>
                </div>
            </div>
        </div>
    )
}