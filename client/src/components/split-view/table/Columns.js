import React, { useState, useEffect } from 'react';

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input className="edit" value={value} onChange={onChange} onBlur={onBlur} />
}

export const COLUMNS = [
   {
      Header: "Time",
      accessor: "time",
    },
    {
      Header: "Interface",
      accessor: "can",
      disableSortBy: true,
    },
    {
      Header: "ID",
      accessor: "id",
      enableSorting: true,
    },
    {
      Header: "ECU",
      accessor: "ecu",
    },
    {
      Header: "00",
      accessor: "dt1",
      disableSortBy: true,
      Cell: EditableCell,
    },
    {
      Header: "01",
      accessor: "dt2",
      disableSortBy: true,
      Cell: EditableCell, 
    },
    {
      Header: "02",
      accessor: "dt3",
      disableSortBy: true,
      Cell: EditableCell,
    },
    {
      Header: "03",
      accessor: "dt4",
      disableSortBy: true,
      Cell: EditableCell,
    },
    {
      Header: "04",
      accessor: "dt5",
      disableSortBy: true,
      Cell: EditableCell,
    },
    {
      Header: "05",
      accessor: "dt6",
      disableSortBy: true,
      Cell: EditableCell,
    },
    {
      Header: "06",
      accessor: "dt7",
      disableSortBy: true,
      Cell: EditableCell,
    },
    {
      Header: "07",
      accessor: "dt8",
      disableSortBy: true,
      Cell: EditableCell,
    },
    {
      Header: "Values",
      accessor: "values",
      disableSortBy: true,
    },
  ];