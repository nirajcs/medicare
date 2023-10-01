import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

const DataTableComponent = ({ data }) => {
  const tableRef = useRef(null);
  let dataTable = null;

  useEffect(() => {
    // Initialize DataTable when the component is mounted
    if (!dataTable) {
      dataTable = $(tableRef.current).DataTable({
        data: data,
        columns: [
            { title: 'Patient', data: 'userName' },
            { title: 'Patient Email', data: 'userEmail' },
            { title: 'Doctor', data: 'doctorName' },
            { title: 'Doctor Email', data: 'doctorEmail' },
            { title: 'Specialization', data: 'doctorSpecialization' },
            { title: 'Date', data: 'date' },
            { title: 'Slot', data: 'slot' },
          ],
      });
    }

    return () => {
      // Destroy the DataTable when the component is unmounted
      if (dataTable) {
        dataTable.destroy();
        dataTable = null;
      }
    };
  }, [data]);

  return <table id="myDataTable" ref={tableRef}></table>;
};

export default DataTableComponent;
