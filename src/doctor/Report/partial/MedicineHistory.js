import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';

export default function MedicineHistory(props) {
    const {onChange} = props
     //for table
     const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        },
        table: {
            minWidth: 650,
        },
    }));
    const classes = useStyles();
    //for history button
    let history = useHistory();
    function handleClick() {
        history.push("/MedicineHistory");
    }
    
    return (
        <div onChange={onChange}>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="medium" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right"><b>Sr NO.</b></TableCell>
                            <TableCell align="right"><b>Prisciption Date & Time</b></TableCell>
                            <TableCell align="right"><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {rows.map((item) => ( */}
                        <TableRow>
                            <TableCell align="right">item.SrNO</TableCell>
                            <TableCell align="right">item.PrisciptionDate</TableCell>
                            <TableCell align="right">
                                <div className="iconbutton" onClick={handleClick} ><VisibilityIcon style={{ fontSize: 20 }} /></div>
                            </TableCell>
                        </TableRow>
                        {/* ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="text-center add_top_30"><input type="submit" className="btn_1" value="Next" /></div>
        </div>
    )
}