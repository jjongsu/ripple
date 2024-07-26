import { Application, Sprite } from 'pixi.js';
import { useEffect, useRef } from 'react';

export default function Ripple2() {
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!divRef || !divRef.current) return;
        const wrapperDiv = divRef.current;
        const app = new Application<HTMLCanvasElement>({
            background: '#1099bb',
            resizeTo: divRef.current
        });
        console.log('add app');
        wrapperDiv.appendChild(app.view);

        // create a new Sprite from an image path
        const bunny = Sprite.from('https://pixijs.com/assets/bunny.png');

        // center the sprite's anchor point
        bunny.anchor.set(0.5);

        // move the sprite to the center of the screen
        bunny.x = app.screen.width / 2;
        bunny.y = app.screen.height / 2;

        app.stage.addChild(bunny);

        // Listen for animate update
        app.ticker.add(delta => {
            // just for fun, let's rotate mr rabbit a little
            // delta is 1 if running at 100% performance
            // creates frame-independent transformation
            bunny.rotation += 0.1 * delta;
        });

        return () => {
            wrapperDiv?.childNodes.forEach(node => node.remove());
        };
    }, []);

    return (
        <div className='fixed inset-0 flex items-center justify-center'>
            <div className='flex h-[1080px] w-[1920px] shrink-0 scale-[calc(var(--vhnum)/1080)] justify-center'>
                <div ref={divRef} className='relative flex h-full w-full justify-center'></div>
            </div>
        </div>
    );
}
