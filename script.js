const gifStages = [
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHY4bzk0Ynk3bmdpM2wzdjFvMmY2NHQzZWV0a2J4dzdnYTA0a29naCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bO92lDCMv65he/giphy.gif",    // 0 normal
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXU3ZHE3dHh4azB6eTR4NDBsaTE0anVzY3dmN2x3ZDc4azgydm1keSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/oGtJSe9HLktXckMzC5/giphy.gif",  // 1 confused
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGxkY3B5bmRrejJnOWJtbnd2NTh6cW85YjUzOXF2NTQ4aHBmaXd1biZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/mjst2rw7fVYpzMo1S7/giphy.gif",             // 2 pleading
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjJuZTdzNmV2a2ZxdGJ1dG94em1mc3NjbzBwNDBqOXVpZ281dHlrNiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/W4RizlO6qZWQRYw9mb/giphy.gif",             // 3 sad
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2lpenF3dzd6ZXU4MWw3aXN5dmVzbG15N2xqc3kzZ2lhZ3piMDN3ZSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/urMkyDJRQajn6VGhdg/giphy.gif",       // 4 sadder
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTJhcDhranBkZHM0Nzdvbmp0bHV2bGp3bnFndDgzeWx2dmhuYTRuMCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/uWzRXTQRoQzxDO9W0p/giphy.gif",             // 5 devastated
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTJhcDhranBkZHM0Nzdvbmp0bHV2bGp3bnFndDgzeWx2dmhuYTRuMCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/rE5ivfsHKwcw9kyaBP/giphy.gif",               // 6 very devastated
    "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MXZ2N3gza3FkOXNoM2s0NmIwZ2NsdTJ5bTl6cWVnbGZmZHM3NzZoMSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/qxRMbqPKaXbUYB28Eu/giphy.gif"  // 7 crying runaway
]

const noMessages = [
    "No",
    "Are you positive? 🤔",
    "Pookie please... 🥺",
    "If you say no, I will be really sad...",
    "I will be very sad... 😢",
    "Please??? 💔",
    "Don't do this to me...",
    "Last chance! 😭",
    "You can't catch me anyway 😜"
]

const yesTeasePokes = [
    "try saying no first... I bet you want to know what happens 😏",
    "go on, hit no... just once 👀",
    "you're missing out 😈",
    "click no, I dare you 😏"
]

let yesTeasedCount = 0

let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

// Autoplay: audio starts muted (bypasses browser policy), unmute immediately
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    // Fallback: unmute on first interaction
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

function handleYesClick() {
    if (!runawayEnabled) {
        // Tease her to try No first
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }
    window.location.href = 'yes.html'
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    // Cycle through guilt-trip messages
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    // Grow the Yes button bigger each time
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`
    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    // Shrink No button to contrast
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // Swap cat GIF through stages
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // Runaway starts at click 5
    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}
