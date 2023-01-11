# Run in the Raspberry Pi
import requests
from paho.mqtt import client as mqtt_client
import time
import json
import serial


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

def receive(data):
    print('Received data = {}'.format(data))
    data = int(data)
    if int(data) > 1000:
        temperature = str(data / 100)
        humidity = str(data % 100)
        msg = '#' + temperature + '#' + humidity
        #pub mqtt
        publish(client,msg)
        #pub aly
        timestr = time.strftime("%Y%m%d-%H%M%S")
        url = "http://gaoyuanwang.top:8080/webproject/environmentRecord?time=" + timestr + "&temperature=" + temperature + "&humidity=" + humidity
        data = requests.get(url)
        results = json.loads(data.text)['status']
        print(results)


if __name__ == '__main__':
    try:
        print("Listening on /dev/ttyACM0... Press CTRL+C to exit")
        ser = serial.Serial(port='/dev/ttyACM0', baudrate=115200, timeout=1)
        while True:
            msg = ser.readline()
            smsg = msg.decode('utf-8').strip()
            if len(smsg) > 0:
                print('RX:{}'.format(smsg))
                receive(smsg)
            time.sleep(1)

    except KeyboardInterrupt:
        if ser.is_open:
            ser.close()

        print("Program terminated!")