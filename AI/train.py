# train dataset
import pandas as pd
import numpy as np
import random
import os
import matplotlib.pyplot as plt
from sklearn import svm
from sklearn.utils import shuffle
import pickle


train_path = './P03 Project/AI/Data/data.csv'
model_fan_path = 'P03 Project/AI/model/model_fan.pickle'
model_air_path = 'P03 Project/AI/model/model_air.pickle'

def Init(train_path):
    # 读取训练样本
    traindata = pd.read_csv(train_path)
    traindata = shuffle(traindata)
    # 生成数据集
    train_images = traindata.drop(columns='feat')
    train_images = train_images.values
    # 生成标签集
    train_labels = traindata.drop(columns='temp')
    train_labels = train_labels.drop(columns='humi')
    train_labels = train_labels.values
    # 返回
    return np.array(train_images), np.array(train_labels)

def Train(images, labels, mode):
    # print(mode, ": ")
    if(mode == "SVC"):
        model = svm.SVC()
    if(mode == "NuSVC"):
        model = svm.NuSVC()
    if(mode == "LinearSVC"):
        model = svm.LinearSVC()
    
    model.fit(images, labels)
    res = model.predict(images)
    print("Train Accuracy: {:.7f}".format(np.sum(res == labels) / labels.size))
    return model


def main():
    train_images, train_labels = Init(train_path)
    # Train on/off fan
    fan_labels = np.array([0 if x=="x" else 1 for x in train_labels])
    print("Train fan model:")
    model_fan = Train(train_images, fan_labels, "SVC")
    with open(model_fan_path,'wb') as f:
        pickle.dump(model_fan, f)
    # Train off/cold/humidity air condition
    air_labels = np.array([0 if x=="x" or x == "f" else 1 if x=="h" else 2 for x in train_labels])
    print("Train air condition model:")
    model_air = Train(train_images, air_labels, "SVC")
    with open(model_air_path,'wb') as f:
        pickle.dump(model_air,f)


if __name__ == '__main__':
    main()