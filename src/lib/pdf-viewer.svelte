<script lang="ts">
    import { onMount } from "svelte";
    import * as pdfjs from "pdfjs-dist";
    import type { DocumentInitParameters, TypedArray } from "pdfjs-dist/types/src/display/api";

    export let pdfData: string | URL | TypedArray | ArrayBuffer | DocumentInitParameters;

    let canvas: HTMLCanvasElement;

    onMount(async () => {
        if (!canvas) {
            console.log('Canvas not found');
            return;
        }

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
        if (!context) {
            // Handle the case where the context is null
            console.error('Unable to get 2D context');
            return;
        }
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        const renderTask = page.render({
            canvasContext: context,
            viewport: viewport,
        });
        await renderTask.promise;
    });
    
</script>

<canvas bind:this={canvas} class="pdf-canvas" />