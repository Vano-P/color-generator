const colorBlocks = document.querySelectorAll('.colorBlock')
const genBtn = document.querySelector('#genBtn')

document.addEventListener("click", event=> event.target === genBtn ? render() : '')
document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code.toLowerCase() === 'space') {
        render()
    }
})

document.addEventListener("click", event => {
    const lockType = event.target.dataset.type
    const unLockBtn = event.target.querySelector('.colorBLock__unLock')
    const lockBtn = event.target.querySelector('.colorBLock__lock')
    if (lockType === 'lock') {
        unLockBtn.classList.toggle('lock')
        lockBtn.classList.toggle('lock')
    }
})

function render (isInitial) {
    let hashColors = isInitial ? getLocationHash() : []

    colorBlocks.forEach((colorBlock, index) => {
        const isLocked = colorBlock.querySelector('img').classList.contains('lock')
        const hexText = colorBlock.querySelector('.hexText')
        const rgbText = colorBlock.querySelector('.rgbText')

        const hexCode = isInitial
            ? hashColors[index]
                ? hashColors[index] : setHexCode()
            : setHexCode()

        if (isLocked) {
            hashColors.push(hexText.textContent)
            return
        }

        if (!isInitial) hashColors.push(hexCode)

        colorBlock.style.backgroundColor = hexCode //FIX
        hexText.textContent = hexCode
        rgbText.textContent = 'RGB: ' + hexToRgb(hexCode)
    })
    addLocationHash(hashColors)
}


function setHexCode () {
    let randomHexCode = Math.floor(Math.random() * 0xffffff).toString(16)
    return randomHexCode = `#${randomHexCode.padStart(6, '0')}`
}
function hexToRgb (hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return r + ', ' + g + ', ' + b
}
function copy () {
    const hexCode = document.querySelectorAll('.colorBlock__code')
    hexCode.forEach(code => {
        code.addEventListener('click', () => {
            if(code.classList.contains('rgbText')) {
                return navigator.clipboard.writeText(code.innerHTML.slice(5, code.length))
            }
            return navigator.clipboard.writeText(code.innerHTML)
        })
    })
}
copy()
function addLocationHash (hashColors = []) {
    document.location.hash = hashColors.map(hash => {
        return hash.substring(1)
    }).join('-')
}
function getLocationHash () {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map(hash => '#' + hash)
    }
    return []
}

render(true)
