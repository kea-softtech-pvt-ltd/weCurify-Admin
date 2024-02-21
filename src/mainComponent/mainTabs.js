import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';

const MainTabs = (props) =>{
    return(
        <Paper square>
            <Tabs 
                value={props.value} 
                onChange={props.onChange}
                indicatorColor="primary"
                textColor="primary"
                TabIndicatorProps={{ style: { background: " #1a3c8b" }}}
            >
                <Tab label={props.label}  />
                <Tab label={props.label1} />
                <Tab label={props.label2}  />
                <Tab label={props.label3}  />
                <Tab label={props.label4}  />
            </Tabs>
        </Paper>
    )
}
export {MainTabs}