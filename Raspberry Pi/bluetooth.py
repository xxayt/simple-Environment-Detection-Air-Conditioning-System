# Run in the Raspberry Pi
from bluetooth import ble

import util
from bleuartlib import BleUartDevice
import requests
from paho.mqtt import client as mqtt_client
import time
import json

broker = 'bemfa.com'
port = 9501
topic = "test"
# generate client ID with pub prefix randomly
client_id = '94bb04d4a5c89e128d224f8d408a0f88'


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker!")
    else:
        print("Failed to connect, return code %d\n", rc)


client = mqtt_client.Client(client_id)
client.on_connect = on_connect
client.connect(broker, port)


def publish(client,msg):
    result = client.publish(topic, msg)
    # result: [0, 1]
    status = result[0]
    if status == 0:
        print(f"Send `{msg}` to topic `{topic}`")
    else:
        print(f"Failed to send message to topic {topic}")

def bleUartReceiveCallback(data):
    print('Received data = {}'.format(data))
    if int(data) > 1000:
        temperature = data / 100
        humidity = data % 100
        msg = '#' + str(temperature) + '#' + str(humidity)
        #pub to mqtt
        publish(client,msg)
        # pub to service
        timestr = time.strftime("%Y%m%d-%H%M%S")
        url = "http://gaoyuanwang.top:8080/webproject/environmentRecord?time=" + timestr + "&temperature=" + temperature + "&humidity=" + humidity
        data = requests.get(url)
        results = json.loads(data.text)['status']
        print(results)


if __name__ == '__main__':
    try:

        bleUartDevice1 = None
        found_microbit = False

        service = ble.DiscoveryService()
        devices = service.discover(2)

        print('********** Initiating device discovery......')

        for address, name in devices.items():
            
            print(devices.items())

            found_microbit = False

            if address == 'DA:D3:CD:52:B0:90':
                print('Found BBC micro:bit [zazet]: {}'.format(address))
                found_microbit = True
                break

        if found_microbit:

            bleUartDevice1 = BleUartDevice(address)
            bleUartDevice1.connect()
            print('Connected to micro:bit device')

            data = bleUartDevice1.enable_uart_receive(bleUartReceiveCallback)
            print('Receiving data...')

            while True:
                time.sleep(0.1)

    except KeyboardInterrupt:

        print('********** END')

    except:

        print('********** UNKNOWN ERROR')

    finally:

        if bleUartDevice1 != None:
            bleUartDevice1.disconnect()
            bleUartDevice1 = None
            print('Disconnected from micro:bit device')
