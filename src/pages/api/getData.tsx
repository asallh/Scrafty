const getData = async () => {
    const res = await fetch('https://dailyhive.com/calgary/calgary-flames-game-unusual-time-blue-jackets')
    const html = await res.text()

    console.log("html", html)
    return ""
}

export default getData;