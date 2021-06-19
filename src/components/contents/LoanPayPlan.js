import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import { LetterFormdata, Apidata } from '../data/data'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { getToken, getId } from '../utils/Common';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function LoanPayPlan(props) {
    const [loandetails, setLoandetails] = useState();
    const classes = useStyles();

    function loadApiData() {
        //console.log(props);
        alert(props.loanId);
        const apipath = Apidata.api;
        const token = getToken();
        // display form data on success
        axios.get(apipath + 'v1/loan_details',
            { headers: { "Authorization": `Bearer ${token}` }, params: { loanId: props.loanId } })
            .then(response => {
                const result = response.data;
                alert(result);
                console.log(result);
                setLoandetails(result);
                props.handleClose();
                //console.log(postals)
            }).catch(error => {
                // if (error.response.status === 401) setError(error.response.data.message);
                // else setError("Something went wrong. Please try again later.");
            });
    }

    useEffect(() => {
        loadApiData();
        return () => {

        }
    }, [])


    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Month</StyledTableCell>
                            <StyledTableCell align="right">Principle</StyledTableCell>
                            <StyledTableCell align="right">Intrest</StyledTableCell>
                            <StyledTableCell align="right">Month Principle</StyledTableCell>
                            <StyledTableCell align="right">Month Intrest</StyledTableCell>
                            <StyledTableCell align="right">Month Installment</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {loandetails && 
                        
                        loandetails.map((ld) => (
                            <StyledTableRow key={ld.id}>
                                <StyledTableCell component="th" scope="row">
                                    {ld.month}
                                </StyledTableCell>
                                <StyledTableCell align="right">{ld.loanAmount}</StyledTableCell>
                                <StyledTableCell align="right">{ld.interestAmount}</StyledTableCell>
                                <StyledTableCell align="right">{ld.loanMonthAmount}</StyledTableCell>
                                <StyledTableCell align="right">{ld.interestMonthAmount}</StyledTableCell>
                                <StyledTableCell align="right">{ld.monthAmt}</StyledTableCell>
                            </StyledTableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

export default LoanPayPlan
