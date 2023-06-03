import SizedBox from "src/components/SizedBox";
import FormLabel from "../FormLabel";
import RadioButton from "./RadioButton";
import styles from "./radiobuttonfield.module.css";

export interface RadioButtonType {
    label:string,
    options:{
        label: string,
        value: string
    }[],
    selected:boolean,
    selectedIndex:number,
    selectOption: (optionIndex:number)=> void,
    optionDirection?:'horizontal'|'vertical'
}

export default function RadioButtonField ({
    label,
    options, 
    selected,
    selectedIndex,
    selectOption,
    optionDirection
}:RadioButtonType) {
    return (
        <div className={styles.radio_options} >
            <FormLabel text={label} />

            <SizedBox height="10px" />
            
            <div className={`${styles.options} ${optionDirection === 'vertical' ?styles.vertical :styles.horizontal }`}>
                {
                    options.map((option, index) => {
                        return  <div 
                                    key={option.label}
                                    className={styles.date_filter_option}
                                >
                                    <RadioButton 
                                        label={option.label}
                                        selected={selected ?selectedIndex === index :false}
                                        onSelect={()=> selectOption(index)}
                                    />
                                </div>
                    })
                }
            </div>
        </div>
    )
}