import styles from "../ForgotPassword/forgotpassword.module.css";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
// import FormContainer from "../../../components/Form/FormContainer";
// import PasswordInputField from "../../../components/FormComponents/InputField/PasswordInputField/PasswordInputField";
import { useAuthState } from "../../../features/auth/authAtom";
import SetNewPasswordSuccess from "./components/SuccessSetNewPassword";
import {
  containsDigit,
  containsLowerCaseLetter,
  containsUpperCaseLetter,
  is8CharLong,
} from "../../../utils/passwordValidation";
import { SetNewPasswordAction } from "../../../features/auth/actions";
import PrimaryTextButton from "../../../components/Buttons/PrimaryTextButton";

export default function SetNewPassword() {
  const [authState, setAuthState] = useAuthState();

  const [NewPasswordModel, setNewPasswordModel] = useState({
    type: "password",
    label: "Enter new password",
    name: "new-password",
    error: "",
    value: "",
    validated: false,
  });

  const [ConfirmPasswordModel, setConfirmPasswordModel] = useState({
    type: "password",
    label: "Confirm password",
    name: "confirm-password",
    error: "",
    value: "",
    validated: false,
  });

  const setInput = (inputVal: string, model: any, setModel: any) => {
    model.value = inputVal;
    validateModel(model);
    setModel({ ...model });

    enableButton();
  };

  const validateModel = (updatedModel: any) => {
    if (updatedModel.value === "") {
      updatedModel.error = "Field cannot be empty";
      updatedModel.validated = false;
      return false;
    }

    if (updatedModel.name === "new-password") {
      if (!is8CharLong(updatedModel.value)) {
        updatedModel.error = "Must be 8 characters long";
        updatedModel.validated = false;
        return false;
      }
      if (!containsDigit(updatedModel.value)) {
        updatedModel.error = "Must contain a number";
        updatedModel.validated = false;
        return false;
      }
      if (!containsLowerCaseLetter(updatedModel.value)) {
        updatedModel.error = "Must contain a lower case letter";
        updatedModel.validated = false;
        return false;
      }
      if (!containsUpperCaseLetter(updatedModel.value)) {
        updatedModel.error = "Must contain an upper case letter";
        updatedModel.validated = false;
        return false;
      }
    }

    if (updatedModel.name === "confirm-password") {
      if (updatedModel.value !== NewPasswordModel.value) {
        updatedModel.error = "Password doesn't match";
        updatedModel.validated = false;
        return false;
      }
    }

    updatedModel.error = "";
    updatedModel.validated = true;
    return true;
  };

  const validateForm = () => {
    if (!NewPasswordModel.validated) return false;
    if (!ConfirmPasswordModel.validated) return false;

    return true;
  };

  const enableButton = () => {
    if (validateForm()) setIsFormValidated(true);
    else setIsFormValidated(false);
  };

  const [isFormValidated, setIsFormValidated] = useState(false);

  const [newPasswordSet, setNewPasswordSet] = useState(false);

  const params = useParams();

  const setNewPassword = () => {
    const payload = {
      recoveryEmail: params["email"]!,
      code: params["code"]!,
      newPassword: ConfirmPasswordModel.value,
    };

    setAuthState((state) => {
      return {
        ...state,
        status: "loading",
        error: false,
        message: "",
      };
    });

    SetNewPasswordAction(payload)
      .then((data) => {
        setAuthState((state) => {
          return {
            ...state,
            status: "succeeded",
            error: false,
            message: "",
          };
        });

        setNewPasswordSet(true);
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
        setNewPasswordSet(false);
      });
  };

  return (
		<div className={styles.container}>
			<FormErrorModal errorState={authState} setErrorState={setAuthState} />

			{newPasswordSet ? (
				<SetNewPasswordSuccess />
			) : (
				<div className={styles.recover_email_form_container}>
					<FormContainer formHeading="Set New Password">
						<PasswordField
							label={NewPasswordModel.label}
							error={NewPasswordModel.error}
							onInput={(inputVal: string) =>
								setInput(inputVal, NewPasswordModel, setNewPasswordModel)
							}
						/>

						<PasswordField
							label={ConfirmPasswordModel.label}
							error={ConfirmPasswordModel.error}
							onInput={(inputVal: string) =>
								setInput(
									inputVal,
									ConfirmPasswordModel,
									setConfirmPasswordModel
								)
							}
						/>

						<PrimaryTextButton
							label="Reset Password"
							disabled={!isFormValidated}
							isLoading={authState.status === "LOADING"}
							action={() => setNewPassword()}
						/>
					</FormContainer>

					<Link to="/login">
						<div className={styles.back_btn_wrapper}>
							<FaArrowLeft />
							<div>Back to Login</div>
						</div>
					</Link>
				</div>
			)}
		</div>
	);
}
