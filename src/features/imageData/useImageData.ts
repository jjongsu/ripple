import { useCallback, useEffect, useState } from 'react';

export default function useImageData({ canvas }: { canvas: HTMLCanvasElement | null }) {
    const s = 1; /* size - the bigger the faster (lower quality) */
    const damping = 0.99;
    const [buffer1, setBuffer1] = useState<number[][]>();
    const [buffer2, setBuffer2] = useState<number[][]>();
    const [temp, setTemp] = useState<number[][]>();

    const animation = useCallback(() => {
        console.log('animate');
        if (!canvas || !buffer1 || !buffer2) return;
        for (let i = 1; i < canvas.width - 1; i++) {
            for (let j = 1; j < canvas.height - 1; j++) {
                buffer2[i][j] = ((buffer1[i - 1][j] + buffer1[i + 1][j] + buffer1[i][j - 1] + buffer1[i][j + 1]) / 2 - buffer2[i][j]) * damping;
            }
        }

        const img = new ImageData(canvas.width, canvas.height);

        for (let i = 0; i < buffer1.length; i++) {
            for (let j = 0; j < buffer1[0].length; j++) {
                const index = (j * buffer1.length + i) * 4;
                img.data[index] = buffer2[i][j];
                img.data[index + 1] = buffer2[i][j];
                img.data[index + 2] = buffer2[i][j];
                img.data[index + 3] = 255;
            }
        }

        canvas.getContext('2d')?.putImageData(img, 0, 0);

        setTemp(buffer2);
        setBuffer2(buffer1);
        setBuffer1(temp);

        requestAnimationFrame(animation);
    }, [buffer1, buffer2, canvas, temp]);

    const ripple = (e: MouseEvent) => {
        const x = Math.floor(e.offsetX / s);
        const y = Math.floor(e.offsetY / s);
        setBuffer1(prev => {
            if (!prev || !prev[x] || !!prev[x][y]) return;
            prev[x][y] = 255;

            return prev;
        });
    };

    useEffect(() => {
        if (!canvas) return;
        console.log('set Buffer');
        setBuffer1(new Array(canvas.width).map(() => Array(canvas.height).fill(0)));
        setBuffer2(new Array(canvas.width).map(() => Array(canvas.height).fill(0)));
    }, [canvas]);

    return { func: ripple, animation };
}
