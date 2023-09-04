import styles from "./forgotpassword.module.css";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import TextButton from "../../../components/Buttons/TextButton/textbutton";
import InputField from "../../../components/FormComponents/InputField/InputField";
import FormErrorModal from "../../../components/FormError/FormErrorModal";
import { useAuthState } from "../../../features/auth/authAtom";
import { emailValid } from "../../../utils/emailValidation";
import { ResetPasswordAction } from "../../../features/auth/actions";
import PasswordResetSuccess from "./components/PasswordResetSuccess";

export default function ForgotPassword() {
  const [authState, setAuthState] = useAuthState();

  const [RecoverEmailModel, setRecoverEmailModel] = useState({
    type: "email",
    label: "Email address",
    value: "",
    error: "",
    validated: false,
  });

  const setInput = (inputVal: string, model: any, setModel: any) => {
    model.value = inputVal;
    validateModel(model);
    setModel({ ...model });
  };

  const validateModel = (updatedModel: any) => {
    if (updatedModel.value === "") {
      updatedModel.error = "Field cannot be empty";
      updatedModel.validated = false;
      return false;
    }
    if (!emailValid(updatedModel.value)) {
      updatedModel.error = "Please enter a valid email";
      updatedModel.validated = false;
      return false;
    }

    updatedModel.error = "";
    updatedModel.validated = true;
    return true;
  };

  const [isResetSent, setIsResetSent] = useState(false);

  const RecoverPassword = () => {
    if (!validateModel(RecoverEmailModel)) return false;

    const payload = {
      email: RecoverEmailModel.value,
    };

    setAuthState((state) => {
      return {
        ...state,
        status: "loading",
        error: false,
        message: "",
      };
    });

    ResetPasswordAction(payload)
      .then((data) => {
        setAuthState((state) => {
          return {
            ...state,
            status: "succeeded",
            error: false,
            message: "",
          };
        });
        setIsResetSent(true);
      })
      .catch((error) => {
        setAuthState((state) => {
          return {
            ...state,
            status: "failed",
            error: true,
            message: error.message,
          };
        });

        setIsResetSent(false);
      });
  };
  return (
    <div className={styles.container}>
      <FormErrorModal errorState={authState} setErrorState={setAuthState} />

      {!isResetSent ? (
        <div className={styles.recover_email_form_container}>
          <div className={styles.form_title}>
            <div className={styles.title}>Forgot Password?</div>
            <div className={styles.sub_title}>
              No worries, we'll send reset instructions
            </div>
          </div>

          <form
            className={styles.recover_email_form}
            onSubmit={(e) => e.preventDefault()}
          >
            <InputField
              type={RecoverEmailModel.type}
              label={RecoverEmailModel.label}
              error={RecoverEmailModel.error}
              onInput={(inputVal: string) =>
                setInput(inputVal, RecoverEmailModel, setRecoverEmailModel)
              }
            />

            <div className={styles.submit_btn_wrapper}>
              <TextButton
                label="Reset Password"
                disabled={!RecoverEmailModel.validated}
                isLoading={authState.status === "loading"}
                onClick={() => RecoverPassword()}
              />
            </div>
          </form>
        </div>
      ) : (
        <PasswordResetSuccess
          email={RecoverEmailModel.value}
          editEmail={() => setIsResetSent(false)}
          resendLink={() => RecoverPassword()}
        />
      )}

      <Link to="/login">
        <div className={styles.back_btn_wrapper}>
          <FaArrowLeft />
          <div>Back to Login</div>
        </div>
      </Link>
    </div>
  );
}
