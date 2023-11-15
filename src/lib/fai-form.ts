import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { CellHookData, CellInput, Styles } from 'jspdf-autotable';

interface subAssemblyNumber {
    partNumber: number;
    partName: string;
    partSerialNumber: number;
    faiReportNumber: number;
}

interface FAIForm1Data {
    partNumber: string;
    partName: string;
    serialNumber: string;
    faiReportNumber: string;
    partRevisionLevel: string;
    drawingNumber: string;
    drawingRevisionLevel: string;
    additionalChanges: string;
    manufacturingProcessReference: string;
    organizationName: string;
    supplierCode: string;
    poNumber: string;
    baselinePartNumber: string;
    detailFAI: boolean;
    fullFAI: boolean;
    assemblyFAI: boolean;
    partialFAI: boolean;
    reasonForPartialFAI: string;
    subAssemblyNumbers: subAssemblyNumber[];
    faiComplete: boolean;
    signature: string;
    signatureDate: string;
    reviewedBy: string;
    reviewedByDate: string;
    customerApproval: string;
    customerApprovalDate: string;
}

function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomBoolean() {
    return Math.random() >= 0.5;
}

function randomCapitalLetter() {
    return String.fromCharCode(randomNumber(65, 90));
}

function randomLowercaseLetter() {
    return String.fromCharCode(randomNumber(97, 122));
}

function randomLowercaseLetterString(length: number) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += randomLowercaseLetter();
    }
    return result;
}

function randomCapitalLetterString(length: number) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += randomCapitalLetter();
    }
    return result;
}

function randomDate() {
    let year = randomNumber(2000, 2021);
    let month = randomNumber(1, 12);
    let day = randomNumber(1, 28);
    return `${year}-${month}-${day}`;
}

export function generateRandomFAIForm1Data(): FAIForm1Data {
    let detailFAI = randomBoolean();
    let fullFAI = randomBoolean();
    let subAssemblyNumbers: subAssemblyNumber[] = [];
    for (let i = 0; i < randomNumber(7, 15); i++) {
        subAssemblyNumbers.push({
            partNumber: randomNumber(1000000, 9999999),
            partName: randomCapitalLetterString(randomNumber(10, 20)),
            partSerialNumber: randomNumber(1000000, 9999999),
            faiReportNumber: randomNumber(1000000, 9999999),
        });
    }
    return {
        partNumber: randomNumber(100000, 999999).toString(),
        partName: randomCapitalLetterString(8),
        serialNumber: randomNumber(100000, 999999).toString(),
        faiReportNumber: randomNumber(100000, 999999).toString(),
        partRevisionLevel: randomCapitalLetter(),
        drawingNumber: randomNumber(100000, 999999).toString(),
        drawingRevisionLevel: randomCapitalLetter(),
        additionalChanges: randomLowercaseLetterString(17),
        manufacturingProcessReference: randomCapitalLetterString(7),
        organizationName: randomCapitalLetterString(8),
        supplierCode: randomCapitalLetterString(7),
        poNumber: randomNumber(100000, 999999).toString(),
        baselinePartNumber: randomNumber(100000, 999999).toString(),
        detailFAI: detailFAI,
        assemblyFAI: !detailFAI,
        fullFAI: fullFAI,
        partialFAI: !fullFAI,
        reasonForPartialFAI: randomLowercaseLetterString(50),
        subAssemblyNumbers,
        faiComplete: randomBoolean(),
        signature: 'Signature',
        signatureDate: randomDate(),
        reviewedBy: 'Reviewed By',
        reviewedByDate: randomDate(),
        customerApproval: 'Customer Approval',
        customerApprovalDate: randomDate(),
    };
}

export function createFAIForm1Pdf(blank: boolean, d?: FAIForm1Data) {

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
    if (!blank && d) {
        autoTable(doc, {
            body: [
                [d.partNumber, d.partName, d.serialNumber, d.faiReportNumber],
                [d.partRevisionLevel, d.drawingNumber, d.drawingRevisionLevel, d.additionalChanges],
                [{content: d.manufacturingProcessReference, styles: { cellPadding: { top: 0.3, left: 0.2 }}}, d.organizationName, d.supplierCode, d.poNumber],
            ],
            theme: 'plain',
            startY: 1,
            styles: {
                textColor: [0, 0, 0],
                fontSize: 15,
                minCellHeight: 0.6,
                cellPadding: {
                    top: 0.25,
                    right: 0.05,
                    bottom: 0.05,
                    left: 0.2,
                },
            },
            columnStyles,
        });
    }
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
                doc.setLineWidth(0.012);
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

    
    if (!blank && d) {
        autoTable(doc, {
            body: [
                ['', '', ''],
                ['', '', { content: d.baselinePartNumber, colSpan: 1, rowSpan: 3, styles: { halign: 'left' } }],
                ['', '', ''],
                ['', { content: d.reasonForPartialFAI, colSpan: 2, rowSpan: 3, styles: { halign: 'left' } }],
                ['', '', ''],
                ['', '', ''],
            ],
            theme: 'plain',
            startY: 2.8,
            tableWidth: 7.39,
            styles: {
                fontStyle: 'normal',
                textColor: [0, 0, 0],
                fontSize: 15,
                minCellHeight: 0.2,
                cellPadding: {
                    top: 0.01,
                    right: 0.05,
                    bottom: 0.02,
                    left: 0.15,
                },
            },
            columnStyles: {
                0: { cellWidth: 1.5 },
                1: { cellWidth: 1.8 },
                2: { cellWidth: 4.09 },
            },
            didDrawCell: (data: CellHookData) => {
                // Check mark for "Detail FAI"
                if (data.section === 'body' && (data.column.index === 0 && data.row.index === 1 && d.detailFAI)) {
                    doc.setFont('ZapfDingbats');
                    doc.text('4', data.cell.x + 1.115, data.cell.y + 0.07);
                }
                // Check mark for "Assembly FAI"
                if (data.section === 'body' && (data.column.index === 0 && data.row.index === 2 && d.assemblyFAI)) {
                    doc.setFont('ZapfDingbats');
                    doc.text('4', data.cell.x + 1.115, data.cell.y);
                }
                // Check mark for "Full FAI"
                if (data.section === 'body' && (data.column.index === 1 && data.row.index === 1 && d.fullFAI)) {
                    doc.setFont('ZapfDingbats');
                    doc.text('4', data.cell.x + 1.115, data.cell.y + 0.07);
                }
                // Check mark for "Partial FAI"
                if (data.section === 'body' && (data.column.index === 1 && data.row.index === 2 && d.partialFAI)) {
                    doc.setFont('ZapfDingbats');
                    doc.text('4', data.cell.x + 1.115, data.cell.y);
                }
            },
        });
    }
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

    if (!blank && d) {
        let subAssemblyBody: CellInput[][] = [];
        subAssemblyBody.push(['', '', '', '']);
        for (let i = 0; i < 15; i++) {
            if (i < d.subAssemblyNumbers.length) {
                subAssemblyBody.push([
                    d.subAssemblyNumbers[i].partNumber.toString(),
                    d.subAssemblyNumbers[i].partName,
                    d.subAssemblyNumbers[i].partSerialNumber.toString(),
                    d.subAssemblyNumbers[i].faiReportNumber.toString(),
                ]);
            } else {
                subAssemblyBody.push(['', '', '', '']);
            }
        }

        autoTable(doc, {
            body: subAssemblyBody,
            theme: 'plain',
            startY: 4.6,
            tableWidth: 7.39,
            styles: {
                textColor: [0, 0, 0],
                fontSize: 9,
                fontStyle: 'normal',
                minCellHeight: 0.2,
                cellPadding: {
                    top: 0.03,
                    right: 0.05,
                    bottom: 0.01,
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
    }

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
                doc.setLineWidth(0.012);
                doc.setDrawColor(0, 0, 0);
                doc.rect(data.cell.x + 3.5, data.cell.y + 0.04, 0.1, 0.1, 'S');
                doc.rect(data.cell.x + 5, data.cell.y + 0.04, 0.1, 0.1, 'S');
                if (!blank && d) {
                    if (d.faiComplete) {
                        doc.setFont('ZapfDingbats');
                        doc.setFontSize(15);
                        doc.text('4', data.cell.x + 3.515, data.cell.y + 0.16);
                    } else {
                        doc.setFont('ZapfDingbats');
                        doc.setFontSize(15);
                        doc.text('4', data.cell.x + 5.015, data.cell.y + 0.16);
                    }
                }
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
        columnStyles: {
            0: { cellWidth: 5.3 },
            1: { cellWidth: 2.09 },
        },
    });
    if (!blank && d) {
        doc.addFont('SignatureCollection-VGyDV.ttf', 'Signature', 'normal');
        doc.setFont('Signature');

        autoTable(doc, {
            body: [
                [d.signature, d.signatureDate],
                [d.reviewedBy, d.reviewedByDate],
                [d.customerApproval, d.customerApprovalDate],
            ],
            theme: 'plain',
            startY: 8.3,
            tableWidth: 7.39,
            styles: {
                textColor: [0, 0, 0],
                fontSize: 15,
                fontStyle: 'normal',
                minCellHeight: 0.6,
                cellPadding: {
                    top: 0.25,
                    right: 0.05,
                    bottom: 0.02,
                    left: 0.2,
                },
            },
            columnStyles: {
                0: { cellWidth: 5.3 },
                1: { cellWidth: 2.09 },
            },
        });
        console.log(doc.getFontList()); 
    }

    return doc.output('datauristring');
}