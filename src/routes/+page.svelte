<script lang="ts">
    import { jsPDF } from "jspdf";
    import type { TableConfig } from "jspdf";

    let pdfDataUrl: string;

    let tableData = [{ "1. Part Number": " ", "2. Part Name": "Hello"}];

    let tableConfig: TableConfig = {
        fontSize: 10,
        padding: 1,
        headerBackgroundColor: "#FFFFFF",
    }

    function createFAIPdf() {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: [8.5, 11],
        });
        doc.text("AS9102 First Article Inspection Form", 4.25, 0.5, { align: "center" });
        doc.table(1, 1, tableData, ["1. Part Number", "2. Part Name"], tableConfig);
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


