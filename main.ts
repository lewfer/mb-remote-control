
//% color="#ff7f50" icon="\uf0b2" block="Controller"
namespace plotter {

    //% blockId=sendMessage
    //% block="send message on radio"
    export function sendMessage () {
        if (mode == 0) {
            readMicrobit()
        } else {
            readGamepad()
        }
        basic.clearScreen()
        showPixel()
        outgoing = "" + button + "," + x + "," + y
        radio.sendString(outgoing)
        basic.pause(100)
    }

    function readMicrobit () {
        x = input.acceleration(Dimension.X)
        y = input.acceleration(Dimension.Y)
        if (x > 512) {
            x = 512
        }
        if (x < -512) {
            x = -512
        }
        if (y > 512) {
            y = 512
        }
        if (y < -512) {
            y = -512
        }
        x = Math.round(x / 1024 * 200)
        y = Math.round(y / 1024 * -200)
        a = 0
        b = 0
        button = ""
        if (input.buttonIsPressed(Button.A)) {
            a = 1
            button = "A"
        }
        if (input.buttonIsPressed(Button.B)) {
            b = 1
            button = "B"
        }
        if (a == 1 && b == 1) {
            button = "C"
        }
    }
    function showPixel () {
        pix = Math.round((x + 100) / 50)
        piy = Math.round(4 - (y + 100) / 50)
        led.plot(pix, piy)
    }
    function readGamepad () {
        x = pins.analogReadPin(AnalogPin.P0)
        x = Math.round(x * 200 / 1024 - 100)
        y = pins.analogReadPin(AnalogPin.P1)
        y = Math.round(y * 200 / 1024 - 100)
        gamepad = pins.analogReadPin(AnalogPin.P2)
        button = ""
        if (gamepad < 256) {
            button = "A"
        } else if (gamepad < 597) {
            button = "B"
        } else if (gamepad < 725) {
            button = "C"
        } else if (gamepad < 793) {
            button = "D"
        } else if (gamepad < 836) {
            button = "E"
        } else if (gamepad < 938) {
            button = "F"
        }
    }
    let gamepad = 0
    let piy = 0
    let pix = 0
    let b = 0
    let a = 0
    let y = 0
    let x = 0
    let button = ""
    let outgoing = ""
    let mode = 0
    mode = 0
    basic.forever(function () {
        if (mode == 0) {
            gamepad = pins.analogReadPin(AnalogPin.P2)
            if (gamepad < 50) {
                mode = 1
            }
            basic.pause(1000)
        }
    })
}
