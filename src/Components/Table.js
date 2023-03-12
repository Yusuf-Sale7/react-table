import React, { Fragment, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useExpanded, useTable } from "react-table";
import SubRowAsync from "./SubRowAsync";

function Table() {

  const categories_url = 'https://dummyjson.com/products/categories';

  const [ categories, setCategories ] = useState([]);

  const fetchCtegories = async () => {
    const response = await axios.get(categories_url).catch(err => console.log(err))
    setCategories(response.data)
  };

  const categoriesColumns = useMemo(() => [
    {
      Header: '...',
      id: 'expander',
      Cell: ({ row }) => (
        <span {...row.getToggleRowExpandedProps()} className="expand">
          {row.isExpanded ? '➖' : '➕'}
        </span>
      )
    },
    {
      Header: '#',
      Cell: ({row}) => (
        parseInt(row.id) + 1
      )
    },
    {
      Header: 'Category',
      Cell: ({row}) => (
        row.original
      )
    }
  ], [])

  const categoriesList = useMemo(() => [...categories], [categories]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns: categoriesColumns, data: categoriesList }, useExpanded);

  // Create a function that will render our row sub components
  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <SubRowAsync
        row={row}
      />
    ),
    []
  );

  useEffect(() => {
    fetchCtegories()
  }, []);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} colSpan="2">
                      { column.render('Header') }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>

        <tbody {...getTableBodyProps()}>
          {
            rows.map(row => {
              prepareRow(row);
              const rowProps = row.getRowProps();
              return (
                <Fragment key={rowProps.key}>
                  <tr {...rowProps}>
                    {
                      row.cells.map(cell => (
                        <td {...cell.getCellProps()} colSpan="2">
                          {cell.render('Cell')}
                        </td>
                      ))
                    }
                  </tr>
                  {
                    row.isExpanded &&
                    renderRowSubComponent({ row })
                  }
                </Fragment>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default Table;