import React, { useState } from 'react';
import { format } from 'date-fns';
import SimpelDato from './simpelDato';

export default function DatoValger({ dato, setDato }) {
  const [year, setYear] = useState(format(new Date(dato), 'yyyy'));
  const [date, setDate] = useState(format(new Date(dato), 'dd'));
  const [month, setMonth] = useState(format(new Date(dato), 'MM'));
  console.log(dato)
  //const birth = format(new Date(year, month, date), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  console.log()

  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  return (
    <SimpelDato months={months} year={year} setYear={setYear} month={month} setMonth={setMonth} date={date} setDate={setDate} setDato={setDato} />
  )

}