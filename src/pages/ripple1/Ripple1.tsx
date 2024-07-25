import { backgroundImage } from '@/assets/images';
import useImageData from '@features/imageData/useImageData';
import { useEffect } from 'react';

export default function Ripple1() {
    useEffect(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const background = new Image();
        background.src = backgroundImage;
        let animate: (e: MouseEvent) => void;

        background.onload = () => {
            ctx.drawImage(background, 0, 0);
            const { animation, func } = useImageData({ canvas });
            animation();
            animate = animation;

            canvas.addEventListener('click', func);
            canvas.addEventListener('mousemove', func);
        };

        return () => {
            if (animate) {
                canvas.removeEventListener('click', animate);
                canvas.removeEventListener('mousemove', animate);
            }
        };
    }, []);
    return (
        <div className='fixed inset-0 flex items-center justify-center'>
            <div className='flex h-[1080px] w-[1920px] shrink-0 scale-[calc(var(--vhnum)/1080)] justify-center'>
                <div id='test-background' className='relative flex h-full w-full justify-center'>
                    <canvas id='canvas' width={1920} height={1080} className='block mix-blend-screen' />
                </div>
            </div>
        </div>
    );
}
