radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
    serial.writeLine(receivedString)
})
radio.setGroup(8)
radio.setTransmitPower(7)
radio.setTransmitSerialNumber(true)
serial.setBaudRate(BaudRate.BaudRate115200)
