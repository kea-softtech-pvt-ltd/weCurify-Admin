import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

const MainMuiPickers = (props) =>{
    return(
        <div className="form-group">
            <label><b>{props.children}</b></label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                className="form-control"
                openTo="year"
                views={["year", "month"]}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
            </MuiPickersUtilsProvider>
        </div>
    )
}
export {MainMuiPickers}