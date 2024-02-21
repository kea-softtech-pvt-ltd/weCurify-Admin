import Box from '@mui/material/Box';
function TabPanel(props) {
    //for tab
    const { children, value, index } = props;
    return (
      <div>
        {value === index && (
          <Box p={4}>
            {children}
          </Box>
        )}
      </div>
    );
}

export {TabPanel}