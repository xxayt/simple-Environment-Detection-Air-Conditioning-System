# find & test data
import requests
import json
import pandas as pd
import numpy as np
import time
import datetime
import os
from sklearn import svm
import pickle
from paho.mqtt import client as mqtt_client

model_fan_path = 'P03 Project/AI/model/model_fan.pickle'
model_air_path = 'P03 Project/AI/model/model_air.pickle'

broker = 'bemfa.com'
port = 9501
# topic = "test"
topic = "Control"
# generate client ID with pub prefix randomly
client_id = '94bb04d4a5c89e128d224f8d408a0f88'

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker!")
    else:
        print("Failed to connect, return code %d\n", rc)


def publish(client,msg):
    result = client.publish(topic, msg)
    # result: [0, 1]
    status = result[0]
    if status == 0:
        print(f"Send `{msg}` to topic `{topic}`")
    else:
        print(f"Failed to send message to topic {topic}")

def FindData():
    url = "http://gaoyuanwang.top:8080/webproject/checkLastTenEnvironmentRecord"
    data = requests.get(url)
    # print(data.text)
    global results
    try:
        results = json.loads(data.text)['record']
        # response = json.loads(html.text)
    except Exception as ex:
        print(ex)
    nowtemp, nowhumi = 0., 0.
    for result in results:
        nowtemp += float(result['temperature'])
        nowhumi += float(result['humidity'])
    nowtemp = nowtemp / 10.0
    nowhumi = nowhumi / 10.0
    print("Current time is", datetime.datetime.now())
    print("Current temperature is {:.3f}.\nCurrent humidity is {:.3f}.".format(nowtemp, nowhumi))
    return np.array([nowtemp, nowhumi])

def Test(model, test_data, mark):
    res = model.predict(test_data.reshape(1, -1))[0]
    # print(res)
    if(mark == "fan"):
        if(res == 0):
            print("AI suggests you not turn on the fan.")
        elif(res == 1):
            print("AI suggests you turn on the fan.")
    elif(mark == "air"):
        if(res == 0):
            print("AI suggests you close the Air condition.")
        elif(res == 1):
            print("AI suggests you open dehumidification mode.")
        elif(res == 2):
            print("AI suggests you open the refrigeration mode")
    return res

def DecideFanResult(res):
    if(res == 0): # 全关
        return "ffa"
    elif(res == 1): # 开风扇
        return "foa"

def DecideAirResult(res):
    if(res == 0): # 全关
        return "cfa"
    elif(res == 1): # 开除湿
        return "hoa"
    elif(res == 2): # 开制冷
        return "coa"

def main(model_fan, mode_air):
    # 爬取数据
    test_data = FindData()
    # 预测结果
    res_fan = Test(model_fan, test_data, "fan")
    res_air = Test(model_air, test_data, "air")
    # 上传结果
    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(broker, port)
    publish(client, DecideFanResult(res_fan))
    publish(client, DecideAirResult(res_air))
    print("")


if __name__ == '__main__':
    # 调用模型
    with open(model_fan_path, 'rb') as f:
        model_fan = pickle.load(f)
    with open(model_air_path, 'rb') as f:
        model_air = pickle.load(f)
    
    while(True):
        main(model_fan, model_air)
        time.sleep(5.0)