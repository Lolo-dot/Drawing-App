$(function(){
    $("#slider").slider({
        min: 3, max: 30, slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
        }
    });

    var paint = false;
    var paint_erase = "paint";

    //getting the canvas and the context
    var canvas = document.getElementById("paint");
    var context = canvas.getContext('2d');

    var container = $("#container");
    var mouse = {x: 0, y: 0};

    //load saved work
    if(localStorage.getItem("drawing") != null){
        var image = new Image();
        image.onload = function(){
            context.drawImage(image, 0, 0);
        }
        image.src = localStorage.getItem("drawing")
    }

    //set drawing parameters
    context.lineWidth = 3;
    context.lineJoin = "round";
    context.lineCap = "round";

    container.mousedown(function(event){
        paint = true;
        context.beginPath();
        mouse.x = event.pageX - this.offsetLeft;
        mouse.y = event.pageY - this.offsetTop;
        context.moveTo(mouse.x,mouse.y);
    });

    container.mousemove(function(event){
        mouse.x = event.pageX - this.offsetLeft;
        mouse.y = event.pageY - this.offsetTop;
        if(paint){
            if(paint_erase == "paint"){
                //get color
                context.strokeStyle = $("#paintcolor").val();
            }
            else{
                //white color
                context.strokeStyle = "white";
            }
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
        }

        context.moveTo(mouse.x,mouse.y);
    });

    container.mouseup(function(){
        paint = false;
    });


    container.mouseleave(function(event){
        paint = false;
    });


    //click on the erase button
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";
        }
        else{
            paint_erase = "paint";
        }
        $(this).toggleClass("eraseMode");
    });

    //click on the save button 
    $("#save").click(function(){
        if(typeof(localStorage) != null){
            localStorage.setItem("drawing", canvas.toDataURL());
        }
        else{
            window.alert("Your browser does not support local storage!");
        }
    });

    //click on the reset button
    $("#reset").click(function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });


    //change line width using the slider
    $("#slider").slider({
        min: 3, max: 30, slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            context.lineWidth = ui.value;
        }
    });

    //change the color
    $("#paintcolor").change(function(){
        $("#circle").css("background-color", $(this).val());
    });


});