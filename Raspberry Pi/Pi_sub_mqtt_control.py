# Run in the Raspberry Pi
import json
import requests
import time
from paho.mqtt import client as mqtt_client
import RPi.GPIO as GPIO

# Pin  Definitions
ledPin_red = 11
ledPin_blue = 12
ledPin_ylw = 13

# Pin Setup
GPIO.setmode(GPIO.BOARD)
GPIO.setup(ledPin_red, GPIO.OUT)
GPIO.setup(ledPin_blue, GPIO.OUT)
GPIO.setup(ledPin_ylw, GPIO.OUT)

# Topic Setup
topic = "Control"
#topic = "test"
client_id = '94bb04d4a5c89e128d224f8d408a0f88'

fan_is_manual, temp_is_manual, humi_is_manual = 0, 0, 0
start_fan, start_temp, start_humi = 0, 0, 0



def Flag(devices, opera):
    global fan_is_manual, temp_is_manual, humi_is_manual
    global start_fan, start_temp, start_humi
    if(opera == "m"):
        if(devices == "f"):
            fan_is_manual = 1
            start_fan = time.time()
        elif(devices == "c"):
            temp_is_manual = 1
            start_temp = time.time()
        elif(devices == "h"):
            humi_is_manual = 1
            start_humi = time.time()
        return True
    elif(opera == "a"):
        if(devices == "f"):
            if(fan_is_manual == 1):
                print("Fan has already been manually controlled.")
            else:
                return True
        elif(devices == "c"):
            if(temp_is_manual == 1):
                print("Temperature has already been manually controlled.")
            else:
                return True
        elif(devices == "h"):
            if(humi_is_manual == 1):
                print("Humidity has already been manually controlled.")
            else:
                return True
    else:
        print("Operation command is wrong.")
    return False

def Light(switch, devices):
    global fan_is_manual, temp_is_manual, humi_is_manual
    op = True if switch=="o" else False if switch=="f" else None
    if(op == None):
        print("Switch command is wrong.")
    
    if(devices == "f"):
        GPIO.output(ledPin_ylw, op)
    elif(devices == "c"):
        GPIO.output(ledPin_blue, False)
        GPIO.output(ledPin_red, op)
    elif(devices == "h"):
        GPIO.output(ledPin_red, False)
        GPIO.output(ledPin_blue, op)
    else:
        print("Devices command is wrong.")


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        global fan_is_manual, temp_is_manual, humi_is_manual
        global start_fan, start_temp, start_humi
        # update is_manual
        now_time = time.time()
        fan_is_manual = 0 if start_fan + 10 < now_time else 1
        temp_is_manual = 0 if start_temp + 10 < now_time else 1
        humi_is_manual = 0 if start_humi + 10 < now_time else 1
        # read message data
        data = msg.payload.decode()
        print(data)
        if Flag(devices=data[0], opera=data[2]) == True:
            Light(switch=data[1], devices=data[0])
        
        '''
        data = data.split('#')
        temperature = data[1]
        humidity = data[2]
        timestr = time.strftime("%Y%m%d-%H%M%S")
        url = "http://gaoyuanwang.top:8080/webproject/environmentRecord?time="+ timestr + "&temperature="+temperature + "&humidity="+humidity
        data = requests.get(url)
        results = json.loads(data.text)['status']
        print(results)
        '''

    client.subscribe(topic)
    client.on_message = on_message

def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, is_manuals, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
            print(rc)
        else:
            print("Failed to connect, return code %d\n", rc)
    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(host='bemfa.com', port=9501)
    return client

def main():
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()


if __name__ == '__main__':
    main()
