const MainNav = (props) =>{
    return(
        <nav id="secondary_nav">
            <div className="containar-nav">
                <span>{props.children}</span>
            </div>
        </nav>
    )
}
export {MainNav}