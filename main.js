var startActive = false

const desktop = document.getElementById("desktop")
const nodes = document.getElementsByClassName("desktopTile")
const startmenu = document.getElementById("startMenu")
const startBtn = document.getElementById("Startbtn")

function makeElementDraggable(element, t) {
    let isDragging = false
    let offsetx = 0
    let offsety = 0
    let atTile = t

    element.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetx = e.clientX - element.offsetLeft
        offsety = e.clientY - element.offsetTop
        if (atTile) { atTile.className = "desktopTile" }
    })
    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            const left = e.clientX - offsetx;
            const top = e.clientY - offsety;
            element.style.left = left + "px";
            element.style.top = top + "px";
        }
    })
    document.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false
            atTile = placeDesktopTile(element)
        }
    })
}

function placeDesktopTile(element) {
    const tiles = document.querySelectorAll(".desktopTile")
    let closestTile = null
    let minDist = Infinity

    tiles.forEach((tile) => {
        const bb = tile.getBoundingClientRect()
        const ebb = element.getBoundingClientRect()
        const dist = Math.sqrt(
            Math.pow((element.offsetLeft + ebb.width / 2) - bb.left - bb.width / 2, 2) +
            Math.pow((element.offsetTop + ebb.height / 2) - bb.top - bb.height / 2, 2)
        )
        if (dist < minDist) {
            closestTile = tile
            minDist = dist
        }})
    if (closestTile) {
        const rect = closestTile.getBoundingClientRect()
        element.style.left = rect.left + "px"
        element.style.top = rect.top + "px"
        closestTile.className = "desktopTileTaken"
    }
    return closestTile
}

function toggleStart() {
    if (startActive) {
        startBtn.classList.remove("startbtnToggled")
        startmenu.classList.add("hidden")
        startActive = !startActive
    } else {
        startBtn.classList.add("startbtnToggled")
        startmenu.classList.remove("hidden")
        startActive = !startActive
    }
    console.log(startActive)
}

function closeStart() {
    if (startActive) {
        startBtn.classList.remove("startbtnToggled")
        startmenu.classList.add("hidden")
        startActive = !startActive
    }
}

function PopulateDeskNodes() {
    for (let i = 0; i < 8; i++) {
        row = document.createElement("div")
        row.classList.add("desktopRow")
        desktop.appendChild(row)
        for (let j = 0; j < 18; j++) {
            tile = document.createElement("div")
            tile.classList.add("desktopTile")
            row.appendChild(tile)
    }}
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].innerHTML = i
    }
    for (let i = 0; i < 4; i++){
        MakeDesktopIcon()
    }
}

function MakeDesktopIcon() {
    const icon = document.createElement("div")
    icon.classList.add("desktopIcon")
    icon.style.top = 0 + "px"
    icon.style.left = 0 + "px"
    desktop.appendChild(icon)
    const t = placeDesktopTile(icon)
    makeElementDraggable(icon, t)
}

function clockSync() {
    const clock = document.getElementById("clock")
    const currTime = new Date()
    const hours = currTime.getHours().toString().padStart(2, "0");
    const minutes = currTime.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`
    clock.textContent = formattedTime
}

PopulateDeskNodes()

// Apply draggable functionality to each element with the "draggable" class
// const draggableElements = document.querySelectorAll(".desktopIcon");
// draggableElements.forEach((element) => {
//     makeElementDraggable(element);
// });
clockSync()
setInterval(clockSync, 10000)

document.addEventListener("click", (e) => {
    const clickedElement = e.target
    if (!clickedElement.closest(".startMenu") && !clickedElement.closest(".startbtn")) {
        closeStart()
    }
})