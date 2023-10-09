import * as React from "react";
import Moveable from "react-moveable";
import MoveableHelper from "moveable-helper";



export default function EditableApp() {
    const [helper] = React.useState(() => {
        return new MoveableHelper();
    })
    const targetRef = React.useRef<HTMLDivElement>(null);
    return <>
        <img src="https://mmc.tirto.id/image/otf/700x0/2022/10/24/cincin-emas-putih-istock_ratio-16x9.jpg" className="target" ref={targetRef}/>
        <Moveable
            target={targetRef}
            draggable={true}
            resizable={true}
            rotatable={true}
            onDragStart={helper.onDragStart}
            onDrag={helper.onDrag}
            onResizeStart={helper.onResizeStart}
            onResize={helper.onResize}
            onRotateStart={helper.onRotateStart}
            onRotate={helper.onRotate}

        />
    </>;
}