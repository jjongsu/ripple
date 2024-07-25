export default function useImageData({ canvas }: { canvas: HTMLCanvasElement }) {
    const s = 1; /* size - the bigger the faster (lower quality) */
    const c = canvas?.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    let buffer1 = new Array(w).fill(0).map(_ => Array(h).fill(0));
    let buffer2 = new Array(w).fill(0).map(_ => Array(h).fill(0));

    const damping = 0.99;
    let temp;

    function animation() {
        for (let i = 1; i < w - 1; i++) {
            for (let j = 1; j < h - 1; j++) {
                buffer2[i][j] = ((buffer1[i - 1][j] + buffer1[i + 1][j] + buffer1[i][j - 1] + buffer1[i][j + 1]) / 2 - buffer2[i][j]) * damping;
            }
        }

        const img = new ImageData(w, h);

        for (let i = 0; i < buffer1.length; i++) {
            for (let j = 0; j < buffer1[0].length; j++) {
                const index = (j * buffer1.length + i) * 4;
                img.data[index] = buffer2[i][j];
                img.data[index + 1] = buffer2[i][j];
                img.data[index + 2] = buffer2[i][j];
                img.data[index + 3] = 255;
            }
        }

        c?.putImageData(img, 0, 0);

        temp = buffer2;
        buffer2 = buffer1;
        buffer1 = temp;
        requestAnimationFrame(animation);
    }

    function ripple(e: MouseEvent) {
        const x = Math.floor(e.offsetX / s);
        const y = Math.floor(e.offsetY / s);
        buffer1[x][y] = 255;
    }

    return { func: ripple, animation };
}
