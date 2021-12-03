import { useEffect, useRef } from 'react'

export default function Cursor(props: any) {
    const cursorRef = useRef<HTMLDivElement>(null);

    const MouseMoveListener = (e: MouseEvent) => {
        if(cursorRef.current){
            cursorRef.current.style.left = `${e.clientX}px`;
            cursorRef.current.style.top = `${e.clientY-14}px`;
        }
    }

    useEffect(()=>{
        document.addEventListener('mousemove', MouseMoveListener);
        return () => {
            document.removeEventListener('mousemove', MouseMoveListener);
        }

    })

    return (
        <div ref={cursorRef} style={{position:'absolute', pointerEvents: "none", zIndex: 800}} >
            {props.children}
        </div>
    )
}