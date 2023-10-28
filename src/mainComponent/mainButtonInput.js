const MainButtonInput =(props)=>{
    return(
        <div className="form-group">     
            <input 
                type="submit" 
                className="btn_1" 
                onClick={props.onClick} 
                value={props.children}/>
        </div>
    )
}

export {MainButtonInput} 