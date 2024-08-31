import React from "react";

export default function editImage(props) { // 1 img
    const image = new Image(); // idk whetehr to get rid of const or not
    image.src = {props}; // ex: '../../public/logo192.png'
    const canvas = document.getElementById("canvas"); // img then rectangles
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';  
    
    make_base();
    const canvasInvis = document.getElementById("canvasInvis");
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

    canvas.onmousedown = function (e) { // T WORKS I'M CRYING
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

    canvas.onmouseup = (
        function x(e) {
            if (isDrawing) {
            isDrawing = false;
            ctx.beginPath();
            ctx.rect(startX, startY, e.offsetX - startX, e.offsetY - startY);
            ctx.stroke();

            ctx2.drawImage(image,startX,startY,e.offsetX - startX,e.offsetY - startY,startX,startY,e.offsetX - startX,e.offsetY - startY);
            }
        }
    );

    canvas.onmousemove = function (e) {
        if (isDrawing) {
            const curX = e.offsetX;
            const curY = e.offsetY;
            element.style.width = (curX - startX) + 'px';
            element.style.height = (curY - startY) + 'px';
            element.style.left = startX + 'px';
            element.style.top = startY + 'px';
        }
    };

    function apply() {
      canvas.style.visibility = "hidden"; // lol
      canvasInvis.style.visibility = "visible"; // setted!
    }

    canvas.onmouseover = function (e) { // nice stuff
        canvas.style.cursor = "crosshair";
    }
    canvas.onmouseout = function(e) {
        canvas.style.cursor = "default";
    }

    function make_base() {
        base_image = new Image();
        base_image.src = './logo192.png';
        base_image.onload = function(){
            ctx.drawImage(base_image, 0, 0); // pixel it!
            //canvasInvis.drawImage(base_image, 0, 0); // only add it once apply
        }
    }
    return (
        <div>
            <canvas id="canvas" width="300" height="300"></canvas>
            <canvas id="canvasInvis" width="300" height="300"></canvas>
            <button onClick={apply}>Apply</button>
        </div>
    );
};