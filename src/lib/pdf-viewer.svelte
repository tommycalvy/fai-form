<script lang="ts">
    import { onMount } from "svelte";
    import * as pdfjs from "pdfjs-dist";

    export let pdfData;

    let canvas;

    onMount(async () => {
        pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.js', import.meta.url).toString();

        // Asynchronously downloads PDF.
        const loadingTask = pdfjs.getDocument(pdfData);
        const pdf = await loadingTask.promise;

        // Fetch the first page
        const page = await pdf.getPage(1);
        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale });

        // Prepare canvas using PDF page dimensions
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        const renderContext = {
        canvasContext: context,
        viewport: viewport,
        };
        const renderTask = page.render(renderContext);
        await renderTask.promise;


    });




</script>