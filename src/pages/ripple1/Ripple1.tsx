import { backgroundImage } from '@/assets/images';
import useImageData from '@features/imageData/useImageData';
import { useEffect, useRef } from 'react';

export default function Ripple1() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { animation, func } = useImageData({ canvas: canvasRef.current });
    console.log('Ripple1');

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        console.log('useEffect');
        if (!ctx || !canvasRef.current) return;
        const background = new Image();
        background.src = backgroundImage;

        background.onload = () => {
            ctx.drawImage(background, 0, 0);
            console.log('onload');
            animation();

            canvasRef.current?.addEventListener('click', func);
            canvasRef.current?.addEventListener('mousemove', func);
        };

        return () => {
            console.log('return');
            canvasRef.current?.removeEventListener('click', animation);
            canvasRef.current?.removeEventListener('mousemove', animation);
        };
    }, [animation, func]);
    return (
        <div className='fixed inset-0 flex items-center justify-center'>
            <div className='flex h-[1080px] w-[1920px] shrink-0 scale-[calc(var(--vhnum)/1080)] justify-center'>
                <div id='test-background' className='relative flex h-full w-full justify-center'>
                    <canvas ref={canvasRef} id='canvas' width={1920} height={1080} className='block mix-blend-screen' />
                </div>
            </div>
        </div>
    );
}
