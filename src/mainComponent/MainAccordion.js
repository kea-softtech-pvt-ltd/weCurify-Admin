
import Typography from "@mui/material/Typography";

const MainAccordion = (props) => {
    return (
        <div>
            <div style={{ height: '40px', color:'#1a3c8b', backgroundColor: '#d7eaf5' }} >
                <Typography
                    className="m-2"
                    align='left'
                    style={{ color: 'black' }}>
                    <b><h5>{props.icon}    {props.title}
                        {props.fees} {props.color}
                    </h5></b>
                </Typography>
            </div>
            <div>
                <Typography>
                    {props.children}
                </Typography>
            </div>
        </div>
    )
}
export { MainAccordion }