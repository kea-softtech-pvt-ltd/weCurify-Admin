import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from "@mui/material/FormControl";
import { StyledRadio } from "../common/radiobutton";

const MainRadioGroup = (props) =>{
    return(
        <FormControl component="fieldset">
            <RadioGroup defaultValue={props.defaultValue} aria-label="gender"  name="customized-radios">
                <FormControlLabel name={props.name} value={props.value} onChange={props.onChange} control={<StyledRadio />} label={props.label} />
                <FormControlLabel name={props.name} value={props.value1} onChange={props.onChange}  control={<StyledRadio />} label={props.label1} />
                <FormControlLabel name={props.name} value={props.value2} onChange={props.onChange}  control={<StyledRadio />} label={props.label2} />
                {/* <FormControlLabel name={props.name} value={props.value3} onChange={props.onChange}  control={<StyledRadio />} label={props.label3} /> */}
            </RadioGroup>
            {props.children}
        </FormControl>
    )
}
export {MainRadioGroup}