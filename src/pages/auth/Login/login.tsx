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
import { Link } from "react-router-dom"

export default function Login() {

    function setInput(value:string) {
        console.log(value)
    }

    function loginUserIn() {
        console.log()
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
                    
                    <FormWrapper extraStyles={styles.form_wrapper}>
                        <FormHeading 
                            heading="Login"
                            subheading="If you already have an account registered in the system."
                            align="center"
                        />

                        <div className={styles.input_fields_wrapper}>
                            <InputField 
                                label=""
                                placeholder="Username"
                                error={""}
                                prefixIcon={<IconUser />}
                                onInput={(value:string)=> setInput(value)}
                            />

                            <PasswordInputField 
                                placeholder={"Password"}
                                error={""}
                                onInput={(value:string)=> setInput(value)}
                            />
                        </div>

                        <div className={styles.forgot_prompt}>
                            <Link to={"/forgot-username"} >Forgot username</Link>
                            <Link to={"/forgot-password"} >Forgot password</Link>
                        </div>

                        <SizedBox height="50px" />

                        <PrimaryTextButton 
                            label={"Login"} 
                            clickAction={()=> loginUserIn()}
                        />

                    </FormWrapper>
                </div>
            </div>
        </div>
    )
}