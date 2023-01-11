let humidity = 0
let temp = 0
radio.setGroup(8)
radio.setTransmitPower(7)
radio.setTransmitSerialNumber(true)
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    temp = sensors.get_DHT11_value(
        DigitalPin.P0,
        sensors.Dht11Result.Celsius
    )
    basic.pause(1000)
    humidity = sensors.get_DHT11_value(
        DigitalPin.P0,
        sensors.Dht11Result.humidity
    )
    radio.sendString("" + temp.toString() + humidity.toString())
    basic.showString("T")
    basic.pause(1000)
})
