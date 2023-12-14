"use client"
import React from 'react';
import { Box, MenuItem } from '@mui/material';
import { format } from 'date-fns';
import Text from './InputTextField';

export default function SimpelDato({ months, year, setYear, month, setMonth, date, setDate, setDato }) {
    const maxOffset = 10;

    const yearList = Array.from(Array(maxOffset)).map((val, index) => year - index)
    const monthList = Array.from(Array(12)).map((val, index) => index)
    const dateList = Array.from(Array(31)).map((val, index) => index + 1)
    console.log(year, month, date)

    const birth = format(new Date(year, month, date), "yyyy-MM-dd")

    const handleYear = (event) => {
        setYear(event.target.value)
        //onChange(event.target.value);
        setDato(birth)
        console.log(birth)
    };

    const handleMonth = (event) => {
        setMonth(event.target.value);
        //onChange(event);
        console.log(birth)
        setDato(birth)
    };

    const handleDate = (event) => {
        setDate(event.target.value);
        //onChange(event);
        setDato(birth)
        console.log(birth)
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row-reverse'
        }}>
            <Text select={true} helper={year} value={year} onChange={handleYear} width={100} type='select' id='year'>{
                yearList.map(y => {
                    return (
                        <MenuItem key={y} value={y}>{y}</MenuItem>
                    )
                })
            }</Text>
            <Text select={true} helper={months[month]} value={month} onChange={handleMonth} width={125} type='select' id='month'>{
                monthList.map(m => {
                    return (
                        <MenuItem key={m} value={m}>{months[m]}</MenuItem>
                    )
                })
            }</Text>
            <Text select={true} helper={date} value={date} onChange={handleDate} width={75} type='select' id='day'>{
                dateList.map(y => {
                    return (
                        <MenuItem key={y} value={y}>{y}</MenuItem>
                    )
                })
            }</Text>
        </Box>
    );
}