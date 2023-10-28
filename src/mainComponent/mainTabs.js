import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';

const MainTabs = (props) =>{
    return(
        <Paper square>
            <Tabs 
                value={props.value} 
                onChange={props.onChange}
                indicatorColor="primary"
                textColor="primary"
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