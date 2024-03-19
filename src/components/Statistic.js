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
    const formatedData = {};
    data.forEach(detection => {
        const className = detection.class;

        if (formatedData[className]) {
          formatedData[className]++;
        } else {
          formatedData[className] = 1;
        }
    });
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Object Type</TableCell>
                        <TableCell align="right">Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(formatedData).map((row) => (
                        <TableRow
                            key={`object-${Math.random() * 1000000000}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row}
                        </TableCell>
                        <TableCell align="right">{formatedData[row]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default Statistic;
