// load nodes

desktop = document.getElementById("desktop")



for (let i = 0; i < 8; i++) {
    row = document.createElement("div")
    row.classList.add("desktopRow")
    desktop.appendChild(row)
    for (let j =0; j < 18; j++){
        tile = document.createElement("div")
        tile.classList.add("desktopTile")
        row.appendChild(tile)
    }
    
}

nodes = document.getElementsByClassName("desktopTile")

for (let i =0; i < nodes.length; i++){
    nodes[i].innerHTML = i
}
