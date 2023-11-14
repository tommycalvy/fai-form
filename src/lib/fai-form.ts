import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { CellHookData, Styles, UserOptions } from 'jspdf-autotable';

export function createFAIForm1Pdf() {

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [8.5, 11],
    });
    doc.text("AS9102 First Article Inspection Form", 4.25, 0.5, { align: "center" });
    
    let columnStyles: {
        [key: string]: Partial<Styles>;
    } = {
        0: { cellWidth: 1.5 },
        1: { cellWidth: 1.8 },
        2: { cellWidth: 1.7 },
        3: { cellWidth: 2.39 },
    };
    autoTable(doc, {
        body: [
            ['1. Part Number', '2. Part Name', '3. Serial Number', '4. FAI Report Number'],
            ['5. Part Revision Level', '6. Drawing Number', '7. Drawing revision level', '8. Additional Changes'],
            ['9. Manufacturing Process Reference', '10. Organization Name', '11. Supplier Code', '12. P.O. Number'],
        ],
        theme: 'grid',
        startY: 1,
        styles: {
            fontStyle: 'bold',
            textColor: [0, 0, 0],
            fontSize: 8.5,
            lineColor: [0, 0, 0],
            lineWidth: 0.01,
            minCellHeight: 0.6,
            cellPadding: {
                top: 0.02,
                right: 0.05,
                bottom: 0.05,
                left: 0.1,
            },
        },
        columnStyles,
    });
    autoTable(doc, {
        body: [
            ['1723232', 'Ball', 'asdfsdfsd', '213123123'],
            ['2', '55', '2', 'None'],
            ['7', 'Demarcait', '98238', '828283939'],
        ],
        theme: 'plain',
        startY: 1,
        styles: {
            textColor: [0, 0, 0],
            fontSize: 15,
            minCellHeight: 0.6,
            cellPadding: {
                top: 0.3,
                right: 0.05,
                bottom: 0.05,
                left: 0.2,
            },
        },
        columnStyles,
    });
    autoTable(doc, {
        body: [
            ['13.', '14.', 'Baseline Part Number including revision level'],
            ['   Detail FAI', '   Full FAI', ''],
            ['   Assembly FAI', '   Partial FAI', ''],
            ['', 'Reason for Partial FAI:', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        theme: 'plain',
        tableLineWidth: 0.01,
        tableLineColor: [0, 0, 0],
        startY: 2.8,
        tableWidth: 7.39,
        styles: {
            fontStyle: 'bold',
            textColor: [0, 0, 0],
            fontSize: 8.5,
            minCellHeight: 0.2,
            cellPadding: {
                top: 0.02,
                right: 0.05,
                bottom: 0.02,
                left: 0.1,
            },
        },
        columnStyles: {
            0: { cellWidth: 1.5 },
            1: { cellWidth: 1.8 },
            2: { cellWidth: 4.09 },
        },
        didDrawCell: (data: CellHookData) => {
            // Checkboxes
            if (data.section === 'body' && (data.column.index === 0 || data.column.index === 1) && (data.row.index === 1 || data.row.index === 2)) {
                doc.setLineWidth(0.01);
                doc.setDrawColor(0, 0, 0);
                doc.rect(data.cell.x + 1.1, data.cell.y + 0.02, 0.1, 0.1, 'S');
            }

            // Vertical Line sectioning off first column
            if (data.section === 'body' && data.column.index === 1 && data.row.index === 0) {
                doc.setLineWidth(0.01);
                doc.setDrawColor(0, 0, 0);
                doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + 1.2);
            }
            
            // Horizontal Line sectioning off "Reasons for Partial FAI"
            if (data.section === 'body' && data.column.index === 1 && data.row.index === 3) {
                doc.setLineWidth(0.01);
                doc.setDrawColor(0, 0, 0);
                doc.setLineDashPattern([0.03, 0.03], 0.015);
                doc.line(data.cell.x, data.cell.y, data.cell.x + 5.89, data.cell.y);
                doc.setLineDashPattern([], 0);
            }

            // Vertical Line sectioning off "Baseline Part Number including revision level"
            if (data.section === 'body' && data.column.index === 2 && data.row.index === 0) {
                doc.setLineWidth(0.01);
                doc.setDrawColor(0, 0, 0);
                doc.setLineDashPattern([0.02, 0.02], 0);
                doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + 0.6);
                doc.setLineDashPattern([], 0);
            }
            
        },
    });
    autoTable(doc, {
        body: [
            ['a) if above part number is a detail part only, go to Field 19'],
            ['b) if above part number is an assembly, go to the “INDEX” section below'],
        ],
        theme: 'plain',
        tableLineWidth: 0.01,
        tableLineColor: [0, 0, 0],
        startY: 4,
        tableWidth: 7.39,
        styles: {
            textColor: [0, 0, 0],
            fontSize: 8.4,
            fontStyle: 'italic',
            minCellHeight: 0.2,
            cellPadding: {
                top: 0.03,
                right: 0.05,
                bottom: 0.01,
                left: 0.1,
            },
        },
    });
    
    autoTable(doc, {
        body: [
            ['INDEX of part numbers or sub-assembly numbers required to make the assembly noted above'],
        ],
        theme: 'plain',
        tableLineWidth: 0.01,
        tableLineColor: [0, 0, 0],
        startY: 4.4,
        tableWidth: 7.39,
        styles: {
            textColor: [0, 0, 0],
            fontSize: 9,
            fontStyle: 'bold',
            minCellHeight: 0.2,
            cellPadding: {
                top: 0.02,
                right: 0.05,
                bottom: 0.02,
                left: 0.5,
            },
        },
        
    });

    autoTable(doc, {
        body: [
            ['15. Part Number', '16. Part Name', '17. Part Serial Number', '18. FAI Report Number'],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
        ],
        theme: 'grid',
        startY: 4.6,
        tableWidth: 7.39,
        styles: {
            textColor: [0, 0, 0],
            fontSize: 8.5,
            fontStyle: 'bolditalic',
            minCellHeight: 0.2,
            lineColor: [0, 0, 0],
            lineWidth: 0.01,
            cellPadding: {
                top: 0.02,
                right: 0.05,
                bottom: 0.02,
                left: 0.1,
            },
        },
        columnStyles: {
            0: { cellWidth: 1.6 },
            1: { cellWidth: 2.2 },
            2: { cellWidth: 1.7 },
            3: { cellWidth: 1.89 },
        },
    });

    autoTable(doc, {
        body: [
            ['1) Signature indicates that all characteristics are accounted for; meet drawing requirements or are properly documented for disposition.'],
            ['2) Also indicate if the FAI is complete per Section 5.4:                        FAI Complete                        FAI not Complete'],
        ],
        theme: 'plain',
        tableLineWidth: 0.01,
        tableLineColor: [0, 0, 0],
        startY: 7.8,
        tableWidth: 7.39,
        styles: {
            textColor: [0, 0, 0],
            fontSize: 8.5,
            fontStyle: 'normal',
            minCellHeight: 0.25,
            cellPadding: {
                top: 0.03,
                right: 0.05,
                bottom: 0.01,
                left: 0.1,
            },
        },
        didDrawCell: (data: CellHookData) => {
            if (data.section === 'body' && data.row.index === 1 ) {
                doc.setLineWidth(0.01);
                doc.setDrawColor(0, 0, 0);
                doc.rect(data.cell.x + 3.5, data.cell.y + 0.04, 0.1, 0.1, 'S');
                doc.rect(data.cell.x + 5, data.cell.y + 0.04, 0.1, 0.1, 'S');
            }
        },
    });
    autoTable(doc, {
        body: [
            ['19. Signature', '20. Date'],
            ['21. Reviewed By', '22. Date'],
            ['23. Customer Approval', '24. Date'],
        ],
        theme: 'grid',
        startY: 8.3,
        tableWidth: 7.39,
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.01,
            textColor: [0, 0, 0],
            fontSize: 8.5,
            fontStyle: 'bold',
            minCellHeight: 0.6,
            cellPadding: {
                top: 0.02,
                right: 0.05,
                bottom: 0.02,
                left: 0.1,
            },
        },
    });    

    return doc.output('datauristring');
}