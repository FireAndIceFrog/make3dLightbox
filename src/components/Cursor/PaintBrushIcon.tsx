import { useAppSelector } from "../../app/hooks"

export default function PaintBrushIcon() {
    const color = useAppSelector(s=>s.brushSlice.selectedColor)
    const isBrushing = useAppSelector(s=>s.brushSlice.isBrushing)
    if(!color || !isBrushing) return null
    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="32pt" height="32pt" viewBox="0 0 32.000000 32.000000"
        preserveAspectRatio="xMidYMid meet">
            <g 
            transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
            fill="#ffffff" 
            stroke="none">

                <path d="M270 308 c-35 -13 -60 -37 -75 -75 -15 -34 -41 -43 -63 -21 -10 10
                -25 0 -69 -45 l-58 -57 50 -50 c27 -27 54 -50 60 -50 6 0 33 22 60 50 45 46
                48 51 36 74 -16 30 -9 42 33 60 33 14 76 70 76 99 0 20 -20 26 -50 15z m25
                -27 c7 -12 -12 -24 -25 -16 -11 7 -4 25 10 25 5 0 11 -4 15 -9z m-98 -178
                c-10 -9 -98 78 -90 90 3 5 26 -11 51 -37 25 -25 43 -49 39 -53z "/>

            </g>
            <g 
            transform="translate(-7.5,52.500000) scale(0.100000,-0.100000)"
            fill={color} 
            stroke="none">

                <path d="M270 308 m-97 61 c0 -3
                -5 -15 -11 -26 -10 -19 -9 -20 16 -14 26 7 27 5 21 -20 -6 -24 -5 -26 19 -20
                33 8 32 -4 -3 -37 l-28 -27 -44 45 -44 45 29 30 c27 28 45 38 45 24z"/>

            </g>
        </svg>
    )
}
