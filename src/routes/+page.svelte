<script lang="ts">
    import { jsPDF } from "jspdf";
    import autoTable from "jspdf-autotable";
    import type { CellHookData, Styles } from 'jspdf-autotable';

    let pdfDataUrl: string;

    function createFAIPdf() {
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
                minCellHeight: 0.7,
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
                minCellHeight: 0.7,
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
            ],
            theme: 'plain',
            tableLineWidth: 0.01,
            tableLineColor: [0, 0, 0],
            startY: 3.1,
            tableWidth: 7.39,
            styles: {
                fontStyle: 'bold',
                textColor: [0, 0, 0],
                fontSize: 8.5,
                minCellHeight: 0.2,
                cellPadding: {
                    top: 0.02,
                    right: 0.05,
                    bottom: 0.05,
                    left: 0.1,
                },
            },
            columnStyles: {
                0: { cellWidth: 1.5 },
                1: { cellWidth: 1.8 },
                2: { cellWidth: 4.09 },
            },
            didDrawCell: (data: CellHookData) => {
                if (data.section === 'body' && (data.column.index === 0 || data.column.index === 1) && (data.row.index === 1 || data.row.index === 2)) {
                    doc.setLineWidth(0.01);
                    doc.setDrawColor(0, 0, 0);
                    doc.rect(data.cell.x + 1.1, data.cell.y, 0.1, 0.1, 'S');
                }
                if (data.section === 'body' && data.column.index === 1 && data.row.index === 0) {
                    doc.setLineWidth(0.01);
                    doc.setDrawColor(0, 0, 0);
                    doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + 1);
                }
                if (data.section === 'body' && data.column.index === 1 && data.row.index === 0) {
                    doc.setLineWidth(0.01);
                    doc.setDrawColor(0, 0, 0);
                    doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + 1);
                }
                if (data.section === 'body' && data.column.index === 1 && data.row.index === 3) {
                    doc.setLineWidth(0.01);
                    doc.setDrawColor(0, 0, 0);
                    doc.setLineDashPattern([0.03, 0.03], 0.015);
                    doc.line(data.cell.x, data.cell.y - 0.03, data.cell.x + 5.89, data.cell.y - 0.03);
                    
                    doc.setLineDashPattern([], 0);
                }
                if (data.section === 'body' && data.column.index === 2 && data.row.index === 0) {
                    doc.setLineWidth(0.01);
                    doc.setDrawColor(0, 0, 0);
                    doc.setLineDashPattern([0.03, 0.03], 0);
                    doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + 0.6);
                    doc.setLineDashPattern([], 0);
                }
                
            },
        });
        pdfDataUrl = doc.output('datauristring');
    }

</script>

<div class="flex flex-col justify-center text-3xl font-semibold py-10 items-center">
    <h1>First Article Inspection Generator</h1>
    <button on:click={createFAIPdf}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-10"
    >
        Display PDF
    </button>
</div>


{#if pdfDataUrl}
    <iframe title="FAI PDF" src={pdfDataUrl} style="width:100%; height:500px;"></iframe>
{/if}


