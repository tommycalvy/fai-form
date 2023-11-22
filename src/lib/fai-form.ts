import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { CellHookData, CellInput, RowInput, Styles } from 'jspdf-autotable';

interface subAssembly {
    partNumber: number;
    partName: string;
    partSerialNumber: number;
    faiReportNumber: number;
}

interface Part {
    partNumber: string;
    partName: string;
    serialNumber: string;
    faiReportNumber: string;
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
    subAssemblies: subAssembly[];
    faiComplete: boolean;
    signature: string;
    signatureDate: string;
    reviewedBy: string;
    reviewedByDate: string;
    customerApproval: string;
    customerApprovalDate: string;
}

interface MaterialOrProcess {
    materialOrProcessName: string;
    specificationNumber: string;
    code: string;
    specialProcessSupplierCode: string;
    customerApprovalVerification: string;
    certificateOfConformanceNumber: string;
}

interface FunctionalTest {
    functionalTestProcedureNumber: string;
    acceptanceReportNumber: string;
}

interface FAIForm2Data {
    partNumber: string;
    partName: string;
    serialNumber: string;
    faiReportNumber: string;
    materialOrProcesses: MaterialOrProcess[];
    functionalTests: FunctionalTest[];
    comments: string;
    preparedBy: string;
    preparedByDate: string;
}

interface FAIFormData {
    form1: FAIForm1Data;
    form2: FAIForm2Data;
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


function randomName() {
    let result = '';
    result += randomCapitalLetter();
    for (let i = 0; i < randomNumber(4, 7); i++) {
        result += randomLowercaseLetter();
    }
    return result;
}

function randomFullName() {
    return `${randomName()} ${randomName()}`;
}

function randomSentence(max: number) {
    let result = '';
    result += randomCapitalLetter();
    while (true) {
        result += randomLowercaseLetterString(randomNumber(2, 7));
        if (result.length >= max) {
            break;
        } else {
            result += ' ';
        }
    }
    result += '.';
    return result;
}

function randomApproval() {
    let p = randomNumber(1, 3);
    if (p === 1) {
        return 'Yes';
    } else if (p === 2) {
        return 'No';
    } else {
        return 'n/a';
    }
}

export function generateRandomPart(): Part {
    return {
        partNumber: randomNumber(100000, 999999).toString(),
        partName: randomCapitalLetterString(8),
        serialNumber: randomNumber(100000, 999999).toString(),
        faiReportNumber: randomNumber(100000, 999999).toString(),
    };
}

export function generateRandomFAIForm1Data(p: Part): FAIForm1Data {
    let detailFAI = randomBoolean();
    let fullFAI = randomBoolean();
    let subAssemblies: subAssembly[] = [];
    for (let i = 0; i < randomNumber(7, 15); i++) {
        subAssemblies.push({
            partNumber: randomNumber(1000000, 9999999),
            partName: randomCapitalLetterString(randomNumber(10, 20)),
            partSerialNumber: randomNumber(1000000, 9999999),
            faiReportNumber: randomNumber(1000000, 9999999),
        });
    }
    return {
        partNumber: p.partNumber,
        partName: p.partName,
        serialNumber: p.serialNumber,
        faiReportNumber: p.faiReportNumber,
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
        reasonForPartialFAI: randomSentence(50),
        subAssemblies,
        faiComplete: randomBoolean(),
        signature: randomFullName(),
        signatureDate: randomDate(),
        reviewedBy: randomFullName(),
        reviewedByDate: randomDate(),
        customerApproval: randomFullName(),
        customerApprovalDate: randomDate(),
    };
}

export function generateRandomFAIForm2Data(p: Part): FAIForm2Data {

    let materialOrProcesses: MaterialOrProcess[] = [];
    for (let i = 0; i < randomNumber(12, 24); i++) {
        materialOrProcesses.push({
            materialOrProcessName: randomCapitalLetterString(randomNumber(7, 13)),
            specificationNumber: randomNumber(100000, 999999).toString(),
            code: randomCapitalLetterString(4),
            specialProcessSupplierCode: randomCapitalLetterString(2),
            customerApprovalVerification: randomApproval(),
            certificateOfConformanceNumber: randomNumber(100000, 999999).toString(),
        });
    }
    let functionalTests: FunctionalTest[] = [];
    for (let i = 0; i < randomNumber(3, 7); i++) {
        functionalTests.push({
            functionalTestProcedureNumber: randomNumber(100000, 999999).toString(),
            acceptanceReportNumber: randomNumber(100000, 999999).toString(),
        });
    }

    return {
        partNumber: p.partNumber,
        partName: p.partName,
        serialNumber: p.serialNumber,
        faiReportNumber: p.faiReportNumber,
        materialOrProcesses,
        functionalTests,
        comments: randomSentence(70),
        preparedBy: randomFullName(),
        preparedByDate: randomDate(),
    }
}

export function generateRandomFAIFormData(): FAIFormData {
    let p = generateRandomPart();
    return {
        form1: generateRandomFAIForm1Data(p),
        form2: generateRandomFAIForm2Data(p),
    };
}

function faiForm1PDF(doc: jsPDF, blank: boolean, d?: FAIForm1Data) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text("AS9102 First Article Inspection Form", 4.25, 0.5, { align: "center" });
    doc.setFont('helvetica', 'bolditalic');
    doc.setFontSize(12);
    doc.text("Form 1: Part Number Accountability", 0.7, 0.8, { align: "left" });
    
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
                ['', '', { content: d.baselinePartNumber, rowSpan: 3, styles: { halign: 'left' } }],
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
            if (i < d.subAssemblies.length) {
                subAssemblyBody.push([
                    d.subAssemblies[i].partNumber.toString(),
                    d.subAssemblies[i].partName,
                    d.subAssemblies[i].partSerialNumber.toString(),
                    d.subAssemblies[i].faiReportNumber.toString(),
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
        autoTable(doc, {
            body: [
                ['', d.signatureDate],
                ['', d.reviewedByDate],
                ['', d.customerApprovalDate],
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
            didDrawCell: (data: CellHookData) => {
                if (data.section === 'body' && data.column.index === 0 ) {
                    if (data.row.index === 0) {
                        doc.setFont('Signature');
                        doc.setFontSize(20);
                        doc.text(d.signature, data.cell.x + 0.4, data.cell.y + 0.4);
                    } else if (data.row.index === 1) {
                        doc.setFont('Signature');
                        doc.setFontSize(20);
                        doc.text(d.reviewedBy, data.cell.x + 0.4, data.cell.y + 0.4);
                    } else if (data.row.index === 2) {
                        doc.setFont('Signature');
                        doc.setFontSize(20);
                        doc.text(d.customerApproval, data.cell.x + 0.4, data.cell.y + 0.4);
                    }
                }
            }
        });
    }
}

export function createFAIForm1Pdf(blank: boolean, d?: FAIForm1Data) {

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [8.5, 11],
    });
    faiForm1PDF(doc, blank, d);

    return doc.output('datauristring');
}

function faiForm2PDF(doc: jsPDF, blank: boolean, d?: FAIForm2Data) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text("AS9102 First Article Inspection Form", 4.25, 0.5, { align: "center" });
    doc.setFont('helvetica', 'bolditalic');
    doc.setFontSize(11);
    doc.text("Form 2: Product Accountability - Raw Material, Specifications and", 0.7, 0.72, { align: "left" });
    doc.text("Special Process(es), Functional Testing", 0.7, 0.88, { align: "left" });

    autoTable(doc, {
        body: [
            [
                { content: '1. Part Number', styles: { fontSize: 9, cellPadding: { top: 0.02, bottom: 0.4, left: 0.1 }}}, 
                { content: '2. Part Name', colSpan: 2, styles: { fontSize: 9, cellPadding: { top: 0.02, bottom: 0.4, left: 0.1 }}}, 
                { content: '3. Serial Number', colSpan: 2, styles: { fontSize: 9, cellPadding: { top: 0.02, bottom: 0.4, left: 0.1 }}}, 
                { content: '4. FAI Report Number', styles: { fontSize: 9, cellPadding: { top: 0.02, bottom: 0.4, left: 0.1 }}}
            ],
            [
                { content: '5. Material or Process Name', styles: { cellPadding: { top: 0.02, bottom: 0.17, left: 0.1 }}}, 
                { content: '6. Specification Number', styles: { cellPadding: { top: 0.02, bottom: 0.17, left: 0.1 }}}, 
                { content: '7. Code', styles: { cellPadding: { top: 0.02, bottom: 0.17, left: 0.1 }}}, 
                { content: '8. Special Process Supplier Code', styles: { cellPadding: { top: 0.02, bottom: 0.17, left: 0.1 }}}, 
                { content: '9. Customer Approval Verification', styles: { cellPadding: { top: 0.02, bottom: 0.17, left: 0.1 }}}, 
                { content: '10. Certificatate of Conformance Number', styles: { cellPadding: { top: 0.02, bottom: 0.17, left: 0.1 }}},
            ],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            [
                {  
                    content: '11. Functional Test Procedure Number', 
                    styles: { 
                        fontStyle: 'bolditalic', 
                        cellPadding: { top: 0.02, bottom: 0.09, left: 0.1 }
                    }
                },
                {  
                    content: '12. Acceptance report number, if applicable', 
                    colSpan: 5, 
                    styles: { 
                        fontStyle: 'bolditalic', 
                        cellPadding: { top: 0.02, bottom: 0.09, left: 0.1 }
                    }
                },
            ],
            ['', { content: '', colSpan: 5 }],
            ['', { content: '', colSpan: 5 }],
            ['', { content: '', colSpan: 5 }],
            ['', { content: '', colSpan: 5 }],
            ['', { content: '', colSpan: 5 }],
            ['', { content: '', colSpan: 5 }],
            ['', { content: '', colSpan: 5 }],
            [{ 
                content: '13. Comments', 
                colSpan: 6, 
                styles: { 
                    fontSize: 10, 
                    fontStyle: 'bolditalic', 
                    cellPadding: { top: 0.02, bottom: 0.2, left: 0.1 }
                }
            }],
            [
                {
                    content: '14. Prepared By',
                    colSpan: 4,
                    styles: {
                        fontSize: 10,
                        fontStyle: 'bold',
                        cellPadding: { top: 0.02, bottom: 0.45, left: 0.1 }
                    }
                },
                {
                    content: '15. Date',
                    colSpan: 2,
                    styles: {
                        fontSize: 10,
                        fontStyle: 'bold',
                        cellPadding: { top: 0.02, bottom: 0.45, left: 0.1 }
                    }
                },
            ],
        ],
        theme: 'grid',
        startY: 1,
        tableWidth: 7.39,
        styles: {
            fontStyle: 'bold',
            textColor: [0, 0, 0],
            fontSize: 8.4,
            lineColor: [0, 0, 0],
            lineWidth: 0.01,
            minCellHeight: 0.21,
            cellPadding: {
                top: 0.02,
                right: 0.05,
                bottom: 0.02,
                left: 0.1,
            },
        },
        columnStyles: {
            0: { cellWidth: 1.4 },
            1: { cellWidth: 1.1 },
            2: { cellWidth: 1.24 },
            3: { cellWidth: 1.25 },
            4: { cellWidth: 0.9 },
            5: { cellWidth: 1.5 },
        },
    });

    if (!blank && d) {
        let form2body: RowInput[] = [[
            { content: d.partNumber, styles: { fontSize: 15, cellPadding: { top: 0.25, bottom: 0.05, left: 0.2 }}}, 
            { content: d.partName, colSpan: 2, styles: { fontSize: 15, cellPadding: { top: 0.25, bottom: 0.05, left: 0.2 }}}, 
            { content: d.serialNumber, colSpan: 2, styles: { fontSize: 15, cellPadding: { top: 0.25, bottom: 0.05, left: 0.2 }}}, 
            { content: d.faiReportNumber, styles: { fontSize: 15, cellPadding: { top: 0.25, bottom: 0.05, left: 0.2 }}},
        ]];
        form2body.push([{ content: '', colSpan: 6, styles: { cellPadding: { top: 0.5, bottom: 0, left: 0.1 } } }]);
        for (let i = 0; i < 24; i++) {
            if (i < d.materialOrProcesses.length) {
                form2body.push([
                    d.materialOrProcesses[i].materialOrProcessName, 
                    d.materialOrProcesses[i].specificationNumber, 
                    d.materialOrProcesses[i].code, 
                    d.materialOrProcesses[i].specialProcessSupplierCode, 
                    d.materialOrProcesses[i].customerApprovalVerification, 
                    d.materialOrProcesses[i].certificateOfConformanceNumber,
                ]);
            } else {
                form2body.push(['', '', '', '', '', '']);
            }
        }
        form2body.push([{ content: '', colSpan: 6, styles: { cellPadding: { top: 0.235, bottom: 0, left: 0.1 } } }]);
        for (let i = 0; i < 7; i++) {
            if (i < d.functionalTests.length) {
                form2body.push([
                    { content: d.functionalTests[i].functionalTestProcedureNumber  }, 
                    { content: d.functionalTests[i].acceptanceReportNumber, colSpan: 5 }, 
                ]);
            } else {
                form2body.push(['', { content: '', colSpan: 5 }]);
            }
        }
        form2body.push([{ 
            content: d.comments, 
            colSpan: 6, 
            styles: { fontSize: 12, cellPadding: { top: 0.14, bottom: 0, left: 0.1}} 
        }]);
        form2body.push([
            { 
                content: '', 
                colSpan: 4, 
                styles: { cellPadding: { top: 0.285, bottom: 0, left: 0.2 } } 
            }, 
            { 
                content: d.preparedByDate, 
                colSpan: 2, 
                styles: { fontSize: 15, cellPadding: { top: 0.285, bottom: 0, left: 0.2 } } 
            }
        ]);
        autoTable(doc, {
            body: form2body,
            theme: 'plain',
            startY: 1,
            tableWidth: 7.39,
            styles: {
                fontStyle: 'normal',
                textColor: [0, 0, 0],
                fontSize: 9,
                minCellHeight: 0.21,
                cellPadding: {
                    top: 0.02,
                    right: 0.05,
                    bottom: 0.02,
                    left: 0.1,
                },
            },
            columnStyles: {
                0: { cellWidth: 1.4 },
                1: { cellWidth: 1.1 },
                2: { cellWidth: 1.24 },
                3: { cellWidth: 1.25 },
                4: { cellWidth: 0.9 },
                5: { cellWidth: 1.5 },
            },
            didDrawCell: (data: CellHookData) => {
                if (data.section === 'body' && data.row.index === 35 && data.column.index === 0) {
                    doc.setFont('Signature');
                    doc.setFontSize(20);
                    doc.text(d.preparedBy, data.cell.x + 0.4, data.cell.y + 0.47);
                }
            },
        });
    }
}

export function createFAIForm2Pdf(blank: boolean, d?: FAIForm2Data) {

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [8.5, 11],
    });
    faiForm2PDF(doc, blank, d);

    return doc.output('datauristring');
}

export function createFAIReport(blank: boolean, d?: FAIFormData) {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [8.5, 11],
    });
    faiForm1PDF(doc, blank, d?.form1);
    doc.addPage([8.5, 11], 'portrait');
    faiForm2PDF(doc, blank, d?.form2);

    return doc.output('datauristring');
}