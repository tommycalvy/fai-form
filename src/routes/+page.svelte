<script lang="ts">
    import { createFAIForm1Pdf, createFAIReport, generateRandomFAIForm1Data } from '$lib/fai-form';

    let pdfDataUrl: string;

    function createFAIPdf() {
        let randomData = generateRandomFAIForm1Data();
        pdfDataUrl = createFAIReport(false, randomData);
    }

    function createBlankFAIPdf() {
        pdfDataUrl = createFAIReport(true);
    }

</script>

<div class="flex flex-col justify-center text-3xl font-semibold py-10 items-center">
    <h1>First Article Inspection Generator</h1>
    <div class="flex justify-center gap-20" >
        <button on:click={createBlankFAIPdf}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-10"
        >
            Blank Form
        </button>
        <button on:click={createFAIPdf}
            class=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mt-10"
        >
            Form with Data
        </button>
    </div>
</div>


{#if pdfDataUrl}
    <iframe title="FAI PDF" src={pdfDataUrl} style="width:100%; height:500px;"></iframe>
{/if}


