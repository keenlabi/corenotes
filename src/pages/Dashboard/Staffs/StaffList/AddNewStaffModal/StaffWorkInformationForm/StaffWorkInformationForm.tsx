import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "./staffworkinformationform.module.css"
import InputField from "src/components/FormComponents/InputField";
import { useEffect, useState } from "react";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import { useStaffState } from "src/features/staff/state";
import PasswordInputField from "src/components/FormComponents/InputField/PasswordInputField";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import { useFetchStaffRoleSelector } from "src/features/staff/selector";

export default function StaffWorkInformationForm({
	userState,
}: {
	userState: any;
}) {
	const [staffState, setStaffState] = useStaffState();

	const staffRolesResponse = useFetchStaffRoleSelector(
		staffState.roles.currentPage
	);

	useEffect(() => {
		setStaffState((state) => ({
			...state,
			status: "IDLE",
			error: staffRolesResponse.error,
			roles: {
				list: staffRolesResponse.data.staffRoles,
				currentPage: staffRolesResponse.data.currentPage,
				totalPages: staffRolesResponse.data.totalPages,
			},
		}));

		setProviderRoleModel((state) => ({
			...state,
			options: [
				...staffRolesResponse.data.staffRoles.map((role) => ({
					id: role.id,
					label: role.title,
					value: role.id,
				})),
			],
		}));
	}, [setStaffState, staffRolesResponse]);

	// const [compartmentModel, setCompartmentModel] = useState<formFieldType>({
	// 	type: "text",
	// 	label: "Compartment",
	// 	placeholder: "Compartment",
	// 	value: userState.compartment,
	// 	error: "",
	// 	validated: false,
	// });

	const [staffTitleModel, setStaffTitleModel] = useState<formFieldType>({
		type: "text",
		label: "Staff title",
		placeholder: "Staff title",
		value: userState.title,
		error: "",
		validated: false,
	});

	const [providerRoleModel, setProviderRoleModel] = useState<DropDownFormData>({
		name: "provider-role",
		placeholder: "Provider role",
		options: [],
		selected: false,
		selectedOptionIndex: 0,
		error: "",
	});

	// const [providerRoleModel, setProviderRoleModel] = useState<formFieldType>({
	//     type:'text',
	//     label: 'Provider role',
	//     placeholder:'Provider role',
	//     value:userState.providerRole,
	//     error:'',
	//     validated:false
	// })

	const [usernameModel, setUsernameModel] = useState<formFieldType>({
		type: "text",
		label: "Username",
		placeholder: "Username",
		value: userState.username,
		error: "",
		validated: false,
	});

	const [employeeIdModel, setEmployeeIdModel] = useState<formFieldType>({
		type: "text",
		label: "Employee ID",
		placeholder: "Employee ID",
		value: userState.employeeId,
		error: "",
		validated: false,
	});

	const [scheduleTypeModel, setScheduleTypeModel] = useState<formFieldType>({
		type: "text",
		label: "Schedule Type",
		placeholder: "Schedule Type",
		value: userState.jobSchedule,
		error: "",
		validated: false,
	});

	const [hireDateModel, setHireDateModel] = useState<formFieldType>({
		type: "date",
		label: "Hire date",
		placeholder: "Hire date",
		value: userState.hiredAt,
		error: "",
		validated: false,
	});

	const [passwordModel, setPasswordModel] = useState<formFieldType>({
		type: "password",
		label: "Password",
		placeholder: "Password",
		value: userState.password,
		error: "",
		validated: false,
	});

	function setInput(
		value: string,
		inputModel: formFieldType,
		setInputModel: setFormFieldType
	) {
		inputModel.value = value;
		validateModel(inputModel);
		setInputModel({ ...inputModel });

		submit();
	}

	function validateModel(updatedInputModel: formFieldType) {
		if (!updatedInputModel.value) {
			updatedInputModel.validated = false;
			updatedInputModel.error = `${updatedInputModel.label} field cannot be empty`;
			return;
		}

		updatedInputModel.validated = true;
		updatedInputModel.error = "";
		return;
	}

	function selectOption(
		optionIndex: number,
		model: DropDownFormData,
		setModel: setDropDownFormData
	) {
		model.value = model.options[optionIndex];
		model.selected = true;
		model.selectedOptionIndex = optionIndex;

		setModel({ ...model });
	}

	function submit() {
		setStaffState((state) => {
			return {
				...state,
				userState: {
					...userState,
					// compartment: compartmentModel.value,
					title: staffTitleModel.value,
					providerRole: providerRoleModel.value?.value ?? "",
					hiredAt: hireDateModel.value,
					username: usernameModel.value,
					employeeId: employeeIdModel.value,
					jobSchedule: scheduleTypeModel.value,
					password: passwordModel.value,
				},
			};
		});
	}

	return (
		<FormWrapper extraStyles={styles.staff_personal_information_form}>
			<div className={styles.heading}>
				<div className={styles.number_circle}>2</div>
				<div className={styles.text}>Work information</div>
			</div>

			<div className={styles.form_content}>
				<div className={styles.row}>
					{/* <InputField 
                        type={compartmentModel.type}
                        placeholder={compartmentModel.placeholder}
                        value={compartmentModel.value}
                        error={compartmentModel.error}  
                        onInput={(inputValue:string) => setInput(inputValue, compartmentModel, setCompartmentModel)}
                    /> */}

					<InputField
						type={staffTitleModel.type}
						placeholder={staffTitleModel.placeholder}
						value={staffTitleModel.value}
						error={staffTitleModel.error}
						onInput={(inputValue: string) =>
							setInput(inputValue, staffTitleModel, setStaffTitleModel)
						}
					/>

					<DropDownField
						placeholder={providerRoleModel.placeholder}
						options={providerRoleModel.options}
						selected={providerRoleModel.selected}
						selectedOptionIndex={providerRoleModel.selectedOptionIndex}
						error={providerRoleModel.error}
						onSelect={(optionIndex: number) =>
							selectOption(optionIndex, providerRoleModel, setProviderRoleModel)
						}
					/>

					<InputField
						type={employeeIdModel.type}
						placeholder={employeeIdModel.placeholder}
						value={employeeIdModel.value}
						error={employeeIdModel.error}
						onInput={(inputValue: string) =>
							setInput(inputValue, employeeIdModel, setEmployeeIdModel)
						}
					/>
				</div>

				<div className={styles.row}>
					<InputField
						type={scheduleTypeModel.type}
						placeholder={scheduleTypeModel.placeholder}
						value={scheduleTypeModel.value}
						error={scheduleTypeModel.error}
						onInput={(inputValue: string) =>
							setInput(inputValue, scheduleTypeModel, setScheduleTypeModel)
						}
					/>

					<InputField
						type={hireDateModel.type}
						placeholder={hireDateModel.placeholder}
						value={hireDateModel.value}
						error={hireDateModel.error}
						onInput={(inputValue: string) =>
							setInput(inputValue, hireDateModel, setHireDateModel)
						}
					/>

					<InputField
						type={usernameModel.type}
						placeholder={usernameModel.placeholder}
						value={usernameModel.value}
						error={usernameModel.error}
						onInput={(inputValue: string) =>
							setInput(inputValue, usernameModel, setUsernameModel)
						}
					/>
				</div>

				<div className={styles.row}>
					<PasswordInputField
						placeholder={passwordModel.placeholder}
						value={passwordModel.value!}
						error={passwordModel.error}
						showPrefixIcon={false}
						onInput={(inputValue: string) =>
							setInput(inputValue, passwordModel, setPasswordModel)
						}
					/>
				</div>
			</div>
		</FormWrapper>
	);
}