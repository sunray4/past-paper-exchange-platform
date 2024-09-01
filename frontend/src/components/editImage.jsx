import React, { useRef, useEffect, useState } from "react";

export default function EditImage({imageSources, getNewImgUrl, trackIndex}) { // all images
    const canvasRefs = useRef([]);
    const canvasInvsRefs = useRef([]);
    const imgRef = useRef([]);

    //initialise all imgs and canvases
    useEffect(() => {
        imageSources.forEach((imgSrc, index) => {
            const canvas = canvasRefs.current[index];
            const ctx = canvas.getContext("2d");

            const image = new Image();
            image.src = imgSrc; // ex: '../../public/logo192.png'
            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
            };

            imgRef.current[index] = image;

            const canvasInvs = canvasInvsRefs.current[index];
            const ctx2 = canvasInvs.getContext("2d");
            canvasInvs.width = image.width;
            canvasInvs.height = image.height;
            ctx2.fillStyle = "white"; 
            ctx2.fillRect(0, 0, canvasInvs.width, canvasInvs.height);
            canvasInvs.style.visibility = "hidden"; // later set to "none" or "visible"

        })
    }, [imageSources])

    const onmousedown = (e, index) => { // when user presses, is triggered
        const canvas = canvasRefs.current[index];

        const startX = e.nativeEvent.offsetX;
        const startY = e.nativeEvent.offsetY;
        const element = document.createElement('div');
        element.className = 'rectangle';
        element.style.position = 'absolute';
        element.style.background = "green";
        element.style.left = `${startX}px`;
        element.style.top = `${startY}px`;
        canvas.parentNode.appendChild(element);

        canvasRefs.current[index].element = { element, startX, startY };
    };

     
    const onmouseup = (e, index) => { // user releases cursor
        const { element, startX, startY } = canvasRefs.current[index].element;
        const ctx = canvasRefs.current[index].canvas.getContext("2d");
        const ctx2 = canvasInvsRefs.current[index].canvas.getContext("2d");

        const curX = e.nativeEvent.offsetX;
        const curY = e.nativeEvent.offsetY;

        ctx.beginPath(); // form a rectangle on the canvas the usre sees
        ctx.rect(startX, startY, curX - startX, curY - startY);
        ctx.stroke();

        // crops current imgae and adds it onto the second canvas (invisible)
        ctx2.drawImage(imgRef.current[index], startX, startY, curX - startX, curX - startY, startX, startY, curX - startX, curX - startY);

        element.remove();
        canvasRefs.current[index].element = null;

    }

    // as the user is moving their mouse, see the rectangle
    const onmousemove = (e, index) => {
        const { element, startX, startY } = canvasRefs.current[index].element;
        if (element) {
            const curX = e.nativeEvent.offsetX;
            const curY = e.nativeEvent.offsetY;
            element.style.width = `${curX - startX}px`;
            element.style.height = `${curY - startY}px`;
            // element.style.left = startX + 'px';
            // element.style.top = startY + 'px';
        }
    };

    // user moves their cursor over the image, cursor will look like a crosshair
    const onmouseover = (e, index) => { // nice stuff
        const canvas = canvasRefs.current[index];
        canvas.style.cursor = "crosshair";
    }

    //as user moves off of image, cursor turns back to default
    const onmouseout = (e, index) => {
        const canvas = canvasRefs.current[index];
        canvas.style.cursor = "default";
    }

    const applyChanges = (index) => {
        const canvas = canvasRefs.current[index];
        const canvasInvs = canvasInvsRefs.current[index];
        const dataUrl = canvasInvs.toDataURL('image/jpeg', 0.9);

        getNewImgUrl(dataUrl);

        canvas.style.visibility = "hidden"; // lol
        canvasInvs.style.visibility = "visible"; // setted!
        trackIndex(index+1);
    }
    return (
        <div>
            {imageSources.map((imgSrc, index) => (
                <div key={index}>
                    <canvas
                        ref={element => canvasRefs.current[index] = element}
                        onMouseDown={(e) => onmousedown(e, index)}
                        onMouseUp={(e) => onmouseup(e, index)}
                        onMouseMove={(e) => onmousemove(e, index)}
                        onMouseOver={(e) => onmouseover(e, index)}
                        onMouseOut={(e) => onmouseout(e, index)}
                    ></canvas>
                    <canvas
                        ref={element => canvasInvsRefs.current[index] = element}
                    ></canvas>
                    <button onClick={() => applyChanges(index)}>Apply Changes</button>
                </div>
            ))}
        </div>
    );
};