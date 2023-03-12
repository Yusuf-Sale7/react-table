import React, { Fragment, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useExpanded, useGlobalFilter, useSortBy, useTable } from "react-table";
import SubRowAsync from "./SubRowAsync";
import Search from "./Search";

function Table() {

  const categories_url = 'https://api.escuelajs.co/api/v1/categories';

  const [ categories, setCategories ] = useState([]);

  const fetchCtegories = async () => {
    const response = await axios.get(categories_url).catch(err => console.log(err))
    setCategories(response.data)
  };

  const categoriesColumns = useMemo(() => categories[0] ? Object.keys(categories[0]).map(key => {
    if (key === 'image') {
      return {
        Header: key,
        accessor: key,
        disableFilters: true,
        disableSortBy: true,
        Cell: ({ row }) => (
          key === 'image' ?
          <img width="60px" src={row.original.image} alt="product"/>
          :
          row.key
        )
      }
    }
    else {
      return {
        Header: key,
        accessor: key
      }
    }
  }) : [], [categories])

    // Table Hooks
    const tableHooks = (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          Header: '...',
          id: 'expander',
          Cell: ({ row }) => (
            <span {...row.getToggleRowExpandedProps()} className="expand">
              {row.isExpanded ? '➖' : '➕'}
            </span>
          )
        },
        ...columns
      ])
    }

  const categoriesList = useMemo(() => [...categories], [categories]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state } = useTable({ columns: categoriesColumns, data: categoriesList }, useGlobalFilter, tableHooks, useSortBy, useExpanded);

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
      <Search preGlobalFilteredRows={preGlobalFilteredRows} setGlobalFilter={setGlobalFilter} globalFilter={state.globalFilter}/>

      <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      { column.render('Header') }
                      {
                        column.isSorted ? column.isSortedDesc ? ' ↓' : ' ↑' : ''
                      }
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
                        <td {...cell.getCellProps()}>
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