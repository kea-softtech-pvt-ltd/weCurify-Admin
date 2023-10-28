const MainInput = (props) => {
    return (
        <div className="form-group">
            <input
                type={props.type}
                name={props.name}
                maxLength={props.maxLength}
                pattern={props.pattern}
                className="form-control"
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                accept={props.accept}
                required={props.required}
                multiple={props.multiple}

            />
            {props.children}
        </div>
    )
}
export { MainInput }

//for checkbox
const MainInputBox = (props) => {
    return (
        <div className="form-group">
            <input
                type={props.type}
                name={props.name}
                maxLength={props.maxLength}
                pattern={props.pattern}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                accept={props.accept}
                label={props.label}
                checked={props.checked}
            />
            {props.children}
        </div>
    )
}
export { MainInputBox }