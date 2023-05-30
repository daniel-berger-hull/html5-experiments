

const boxesState = {    box1: { id: "box1" , drag: false , position : {x: 120, y: 20}  },
                        box2: { id: "box2" , drag: false , position : {x: 320, y: 120} },
                        box3: { id: "box3" , drag: false , position : {x: 250, y: 200} } ,
                        selectedBoxId: "none"
                    };

const boxIDs = ["box1","box2","box3"] ;
    


function registerHandlers() {

    window.addEventListener("load",loadPageHandler);
    document.body.addEventListener('keydown', keyDownBoxHandler );



    boxIDs.forEach(nextID => {
        const nextBox = document.getElementById(nextID);
        
        nextBox.addEventListener("mousedown",   mouseDownBoxHandler);
        nextBox.addEventListener("mouseup",     mouseUpBoxHandler);
        nextBox.addEventListener("mousemove",   mouseMoveBoxHandler);
    });


    document.getElementById("css-click-section").addEventListener("mousedown", mouseDownBoxSectionHandler);
    // document.getElementById("css-click-section").addEventListener("mousemove", mouseDownBoxSectionHandler);

}



//this handler is not used, but can be hander later...
function loadPageHandler() {

    const mainSection = document.getElementById("css-click-section");
    console.log("page is fully loaded");

}

function displayState(boxID,action) {

    document.getElementById("mouse-status").innerHTML = boxID + " Action:" + action;
}


// Just put a visible border around a box, to help to user to see which box is highlighted...
function highlightSelectedBox(boxID) {


    if (boxID === undefined) {
        console.log("highlightSelectedBox Wow boxID is not defined!");
        return;
    }

    document.getElementById(boxID).style.borderStyle = 'solid';
}


function unHighlightBoxes() {

    boxIDs.forEach(boxID => {
        const boxToUnSelect = document.getElementById(boxID);
        boxToUnSelect.style.borderStyle = 'none';
    });

    boxesState.box1.drag = false;
    boxesState.box2.drag = false;
    boxesState.box3.drag = false;

    boxesState.selectedBoxId = "none";

}


function mouseDownBoxSectionHandler(event) {

    unHighlightBoxes();

    displayState( " ", " ");
}

function mouseDownBoxHandler(event) {


    unHighlightBoxes();
    
    const id = event.currentTarget.id;

    let box = boxesState[id];
    box.drag = true;

    boxesState.selectedBoxId = id;

    event.stopPropagation();

    displayState(id, "Mouse Down");

    highlightSelectedBox(id);

    // console.log("Mouse down on box "  + id + " Drag state is "  + box.drag);
}

function mouseUpBoxHandler(event) {

      const id = event.currentTarget.id;

      let box = boxesState[id];
      box.drag = false;

      displayState(id, "Mouse Up");
   //  console.log("Mouse Up on box "  + id+ " Drag state is "  + box.drag);

}


function mouseMoveBoxHandler(event) {


    const id = event.currentTarget.id;


    let box = boxesState[id];
    if ( box.drag ) {

        box.position.x += event.movementX;
        box.position.y += event.movementY;


        const newPosX =  box.position.x + "px";
        const newPosY =  box.position.y + "px";
        event.currentTarget.style.left = newPosX;
        event.currentTarget.style.top = newPosY;

            // console.log("mouseMoveBoxHandler  New  pos is " + newPosX + "," + newPosY +
            // " movement" + event.movementX + ","  + event.movementY );

            displayState(id, "Mouse Drag");
            event.stopPropagation();
    }
}


function keyDownBoxHandler(event) {
   
    var keyCode = event.keyCode;
    if(keyCode==13) {
         console.log("You hit the enter key.");
    } else {
         console.log("Oh no you didn't." + keyCode);
    }

    console.log("Box current selected: " + boxesState.selectedBoxId );
}


registerHandlers();