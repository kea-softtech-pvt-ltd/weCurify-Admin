const Wrapper=(props)=>{
    return(
        <main>
            <div className="wrapperCss ">			
                <div className="row">
                    <div className="col-lg-12 ml-auto">
                        {props.children}
                    </div>
                </div>
            </div>
        </main>            
    )
}
export {Wrapper}