import React from "react";

export default function editImage(props) { // 1 img
    const image = new Image(); // idk whetehr to get rid of const or not
    image.src = {props}; // ex: '../../public/logo192.png'
    const canvas = document.getElementById("canvas"); // img then rectangles
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)'; // setting the colour of rectangle  
    
    make_base(); // putting the image on the canvas

    const canvasInvis = document.getElementById("canvasInvis"); // invisible/hidden canvas
    const ctx2 = canvasInvis.getContext("2d");
    ctx2.fillStyle = "white"; 
    ctx2.beginPath();
    ctx2.rect(0, 0, canvasInvis.width, canvasInvis.height);
    ctx2.fill();
    canvasInvis.style.visibility = "hidden"; // later set to "none" or "visible"
    
    var startX = 0;
    var startY = 0;
    var isDrawing = false;
    var element = null;

    canvas.onmousedown = function (e) { // when user presses, is triggered
        isDrawing = true;
        // alert (mouseX + " " + mouseY);

        startX = e.offsetX;
        startY = e.offsetY;
        element = document.createElement('div');
        element.className = 'rectangle';
        element.style.background = "green";
        element.style.left = startX + 'px';
        element.style.top = startY + 'px';
        canvas.appendChild(element);
    };

    canvas.onmouseup = ( // user releases cursor
        function x(e) {
            if (isDrawing) { // if currently drawing,
            isDrawing = false;
            ctx.beginPath(); // form a rectangle on the canvas the usre sees
            ctx.rect(startX, startY, e.offsetX - startX, e.offsetY - startY);
            ctx.stroke();


            // crops current imgae and adds it onto the second canvas (invisible)
            ctx2.drawImage(image,startX,startY,e.offsetX - startX,e.offsetY - startY,startX,startY,e.offsetX - startX,e.offsetY - startY);
            }
        }
    );
        // as the user is moving their mouse, see the rectangle
    // canvas.onmousemove = function (e) {
    //     if (isDrawing) {
    //         const curX = e.offsetX;
    //         const curY = e.offsetY;
    //         element.style.width = (curX - startX) + 'px';
    //         element.style.height = (curY - startY) + 'px';
    //         element.style.left = startX + 'px';
    //         element.style.top = startY + 'px';
    //     }
    // };

    // apply button, set the first canvas to hidden and set the second to visible
    function apply() {
      canvas.style.visibility = "hidden"; // lol
      canvasInvis.style.visibility = "visible"; // setted!
    }

    // user moves their cursor over the image, cursor will look like a crosshair
    canvas.onmouseover = function (e) { // nice stuff
        canvas.style.cursor = "crosshair";
    }

    //as user moves off of image, cursor turns back to default
    canvas.onmouseout = function(e) {
        canvas.style.cursor = "default";
    }

    // method to add picture to canvas
    function make_base() {
        base_image = new Image();
        base_image.src = './logo192.png';
        base_image.onload = function(){
            ctx.drawImage(base_image, 0, 0); // pixel it!
        }
    }
    var wid = 0; // width of img
    var hei = 0; // height

    const img = new Image();
    img.onload = function() {
        wid = this.width; 
        hei = this.height;
    }
    return (
        <div>
            <canvas id="canvas" width={wid} height={hei}></canvas>
            <canvas id="canvasInvis" width={wid} height={hei}></canvas>
            <button onClick={apply}></button>Apply
        </div>
    );
};