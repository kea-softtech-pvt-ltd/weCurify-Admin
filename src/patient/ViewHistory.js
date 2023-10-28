import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
export default function ViewHistory(){
    return(
        <div>
            <main>
                <div className="container margin_120_95">			
                    <div className="row">
                        <div className="col-lg-12 ml-auto">
                            <nav id="secondary_nav">
                                <div className="container">
                                    <span>Priscription</span>
                                </div>
                            </nav>
                            <div className="box_form">
                                <div className="row">
                            <TableContainer component={Paper}>
                                    <Table  size="medium" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="right"><b>Medicine Name</b></TableCell>
                                                <TableCell align="right"><b>mg/gm</b></TableCell>
                                                <TableCell align="right"><b>days</b></TableCell>
                                                <TableCell align="right" className="tablecell">
                                                    <b>Morning</b>
                                                    <b>Afternoon</b>
                                                    <b>Evening</b>
                                                    <b>Night</b>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow >
                                                <TableCell align="right">
                                                    
                                                </TableCell>
                                            
                                                <TableCell align="right">
                                                
                                                </TableCell>
                                            
                                                <TableCell align="right">
                                                    <div className="input">
                                                        <input className="form-control" type="text"/>
                                                    </div>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <div className="checkbox">
                                                        <input type="checkbox" className="form-control" value="Morning" name="intake[]"/>
                                                        <input type="checkbox" className="form-control" value="Afternoon" name="intake[]"/>
                                                        <input type="checkbox" className="form-control" value="Evening" name="intake[]"/>
                                                        <input type="checkbox" className="form-control" value="Night" name="intake[]"/>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
        </div>
    )
}