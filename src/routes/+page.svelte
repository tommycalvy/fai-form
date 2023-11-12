<script lang="ts">
    import { jsPDF } from "jspdf";
    import type { CellConfig, TableConfig } from "jspdf";
    import autoTable from 'jspdf-autotable';

    let pdfDataUrl: string;

    function createFAIPdf() {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: [8.5, 11],
        });
        doc.text("AS9102 First Article Inspection Form", 4.25, 0.5, { align: "center" });
        //doc.table(1, 1, tableData, cellConfig, tableConfig);
        autoTable(doc, {
            body: [
                ['1. Part Number', '2. Part Name', '3. Serial Number', '4. FAI Report Number'],
                ['5. Part Revision Level', '6. Drawing Number', '7. Drawing revision level', '8. Additional Changes'],
            ],
            theme: 'grid',
            startY: 1,
            tableWidth: 7,
            styles: {
                fontStyle: 'bold',
                textColor: [0, 0, 0],
                fontSize: 8.5,
                lineColor: [0, 0, 0],
                lineWidth: 0.01,
                minCellHeight: 0.8,
                cellPadding: {
                    top: 0.01,
                    right: 0.05,
                    bottom: 0.05,
                    left: 0.1,
                },
            }
        });
        autoTable(doc, {
            body: [
                ['1723232', 'Ball', 'asdfsdfsd', '213123123'],
                ['2', '55', '2', 'None'],
            ],
            theme: 'plain',
            startY: 1,
            tableWidth: 7,
            styles: {
                textColor: [0, 0, 0],
                fontSize: 15,
                minCellHeight: 0.8,
                cellPadding: {
                    top: 0.01,
                    right: 0.05,
                    bottom: 0.05,
                    left: 0.1,
                },
            }
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


