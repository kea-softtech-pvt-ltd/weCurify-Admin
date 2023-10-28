const MainWrapper=(props)=>{
    return(
        <main>
            <div className="container margin_120_95">			
                <div className="row">
                    <div className="col-lg-12 ml-auto">
                        {props.children}
                    </div>
                </div>
            </div>
        </main>            
    )
}
export {MainWrapper}