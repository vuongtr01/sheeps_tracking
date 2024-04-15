import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Statistic = (props) => {
    const { data } = props;
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 250 }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Sheep ID</TableCell>
                        <TableCell align="right">Distance moved(meters)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(data).map((row) => (
                        <TableRow
                            key={`object-${Math.random() * 1000000000}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {parseInt(row)}
                        </TableCell>
                        <TableCell align="right">{data[row]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default Statistic;
