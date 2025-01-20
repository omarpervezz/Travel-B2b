import { JSX, useEffect, useRef } from "react";

interface ColumnConfig {
  key: string; // Key used in data
  label: string; // Label for the column header
}

interface PrintProps<T> {
  columns: ColumnConfig[]; // Array of column configurations
  data: T[]; // Array of objects representing table rows
  onClose: () => void;
  title: string;
}

const Print = <T extends Record<string, unknown>>({
  columns,
  data,
  onClose,
  title,
}: PrintProps<T>): JSX.Element | null => {
  const hasPrinted = useRef(false); // Track if the effect has run

  useEffect(() => {
    if (hasPrinted.current) return; // Prevent duplicate execution
    hasPrinted.current = true;

    const printWindow = window.open("", "PRINT", "height=600,width=1000");
    if (!printWindow) {
      alert(
        "Unable to open print window. Please disable pop-up blockers and try again."
      );
      onClose(); // Ensure cleanup if the window can't open
      return;
    }
    // Generate table headers and rows
    const headerLabels = columns.map((col) => col.label);
    const headerKeys = columns.map((col) => col.key);

    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write(`
      <style>
        @media print {
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
          }
          .print-container {
            width: 100%;
            overflow-x: auto; /* Add horizontal scrolling for large tables */
          }
          table {
            width: 100%;
            border-collapse: collapse;
            table-layout: auto; /* Allow table columns to adjust */
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
            vertical-align: middle;
            word-wrap: break-word; /* Break long text to fit within cells */
          }
          th {
            background-color: #4CAF50;
            color: white;
            font-weight: bold;
            text-transform: uppercase;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          tr:hover {
            background-color: #ddd;
          }
        }
        body {
          margin: 0;
          padding: 20px;
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          color: #333;
        }
        .print-container {
          width: 100%;
          overflow-x: auto; /* Add horizontal scrolling */
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background-color: #fff;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
          vertical-align: middle;
        }
        th {
          background-color: #4CAF50;
          color: white;
          font-weight: bold;
          text-transform: uppercase;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        tr:hover {
          background-color: #ddd;
        }
      </style>
    `);
    printWindow.document.write("</head><body>");
    printWindow.document.write(`
      <div class="print-container">
        <h1 style="text-align: center; font-size: 24px; margin-bottom: 20px;">
          ${title}
        </h1>
        <table>
          <thead>
            <tr>
              ${headerLabels.map((label) => `<th>${label}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (row) => `
              <tr>
                ${headerKeys
                  .map((key) => `<td>${row[key] || ""}</td>`)
                  .join("")}
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();

    // Ensure cleanup
    onClose();
  }, [columns, data, onClose, title]);

  return null;
};

export default Print;
