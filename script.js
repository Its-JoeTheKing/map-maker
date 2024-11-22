let selected = 1;
let selectedEl = document.getElementById(`opt${selected}`);
let inpt = selectedEl.childNodes[3];
let fillWith = 0;
let mapArr = [];
let wallC, emptyC, cellC;
let editMode = 1;

document.onkeydown = (e) => {
    if (e.keyCode === 40 && selected < 5) {
        inpt.disabled = true;
        selected++;
        selectedEl.style.color = "white";
        selectedEl = document.getElementById(`opt${selected}`);
        inpt = selectedEl.childNodes[3];
    } else if (e.keyCode === 38 && selected > 1) {
        inpt.disabled = true;
        selected--;
        selectedEl.style.color = "white";
        selectedEl = document.getElementById(`opt${selected}`);
        inpt = selectedEl.childNodes[3];
    } else if (e.keyCode === 13) {
        inpt.disabled = false;
        inpt.value = '';
        inpt.focus();
    }
    else if (e.keyCode === 70)
    {
        editMode = (editMode === 0)?1:0;
        document.getElementById("fillM").innerText = (editMode === 1)?"hover":"click";
    }
    else if (e.keyCode === 67)
        changeFill();
};

setInterval(() => {
    if (selectedEl.style.color === "grey") {
        selectedEl.style.color = "white";
    } else {
        selectedEl.style.color = "grey";
    }
}, 500);

document.getElementById("edit").onclick = () => {
    let h = parseInt(document.getElementById("height").value);
    let w = parseInt(document.getElementById("width").value);
    wallC = document.getElementById("wallc").value;
    emptyC = document.getElementById("emptyc").value;
    cellC = document.getElementById("cellc").value;

    let map = document.getElementById("map");
    map.style.background = emptyC;
    map.innerHTML = "";
    map.style.width = `${w * 31}px`;
    map.style.height = `${h * 31}px`;
    map.style.gridTemplateColumns = `repeat(${w}, 1fr)`;

    mapArr = Array.from({ length: h }, () => Array(w).fill(0));

    for (let i = 0; i < h * w; i++) {
        map.innerHTML += `<div class='cell' id='cell-${i}' style='background: ${emptyC}' onclick="change_cell(${i}, ${w}, 0)" onmouseover="change_cell(${i}, ${w}, 1)"></div>`;
    }
};

const change_cell = (id, w, mode) => {
    if (mode === editMode)
    {
        let cell = document.getElementById(`cell-${id}`);
        let row = Math.floor(id / w);
        let col = id % w;
        mapArr[row][col] = fillWith;
    
        if (fillWith === 0) {
            cell.style.background = emptyC;
        } else if (fillWith === 1) {
            cell.style.background = cellC;
        } else {
            cell.style.background = wallC;
        }
    }
};

const changeFill = () => {
    let fillCont = document.getElementById("fillW");
    fillWith = (fillWith + 1) % 3;

    if (fillWith === 2) {
        fillCont.style.background = wallC;
    } else if (fillWith === 1) {
        fillCont.style.background = cellC;
    } else {
        fillCont.style.background = emptyC;
    }
};

const export_map = () => {
    for (let row of mapArr) {
        console.log(row.join(" "));
    }
};
