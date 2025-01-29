import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

export default function DynamicDataTable({ columns, rows, actions }) {
  const tableRef = useRef();
  let dataTableInstance = null;

  useEffect(() => {
    // Destroy existing instance if already initialized
    if (dataTableInstance) {
      dataTableInstance.destroy();
    }

    // Initialize DataTables
    dataTableInstance = $(tableRef.current).DataTable();

    return () => {
      if (dataTableInstance) {
        dataTableInstance.destroy();
      }
    };
  }, [columns, rows]);

  const renderActionButtons = (rowData) => (
    <>
      {actions.view && (
        <button className="btn btn-info btn-sm me-2" onClick={() => actions.view(rowData)}>
          View
        </button>
      )}
      {actions.update && (
        <button className="btn btn-warning btn-sm me-2" onClick={() => actions.update(rowData)}>
          Update
        </button>
      )}
      {actions.delete && (
        <button className="btn btn-danger btn-sm me-2" onClick={() => actions.delete(rowData)}>
          Delete
        </button>
      )}
      {actions.confirm && (
        <button className="btn btn-success btn-sm me-2" onClick={() => actions.confirm(rowData)}>
          Confirm
        </button>
      )}
      {actions.reject && (
        <button className="btn btn-secondary btn-sm" onClick={() => actions.reject(rowData)}>
          Reject
        </button>
      )}
    </>
  );

  return (
    <div className="container h-50">
      <table ref={tableRef} className="table table-striped">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={{ width: col.width }}>{col.name}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col.id]}</td>
              ))}
              <td>{renderActionButtons(row)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
