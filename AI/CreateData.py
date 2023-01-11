# Make Dataset
import pandas as pd
import numpy as np
import random
import os
import matplotlib.pyplot as plt

temp, humi = [], []
feat, color = [], []
path = r'D:\1 College study.2-2\新国大暑研\3 Artificial Intelligence of Things\P03 Project\AI\Data\\'

def Return_FeatColor(x):
    if x==1:
        return "x"
    elif x==2:
        return "f"
    elif x==3:
        return "h"
    elif x==4:
        return "c"

def DecideFeature(nowtemp, nowhumi):
    if(nowtemp < 25.0):
        return Return_FeatColor(1)
    elif(nowtemp < 30.0):
        return Return_FeatColor(2)
    elif(nowtemp < 35.0 and nowhumi > 60.0):
        return Return_FeatColor(3)
    else:
        return Return_FeatColor(4)

def RandomDecideFeature(nowtemp, nowhumi):
    num = int(random.uniform(1,5))
    return Return_FeatColor(num)

# 展示
def SHOW(df):
    plt.figure()
    # 截取坐标轴某一部分
    plt.xlim((0,45))
    plt.ylim((0,100))
    # 设置坐标轴刻度
    plt.xticks(np.linspace(0,45,10))
    plt.yticks(np.linspace(0,100,11))
    # 设置坐标描述标签
    plt.xlabel("Temperature")
    plt.ylabel("Humidity")
    # 绘制网格
    plt.grid(color = 'r', linestyle = '--', linewidth = 0.3)
    # 设置标题
    plt.title("Train Data")
    # 加入数据
    model_type = df['feat'].unique()
    model_name = ["Open cooling model", "Close everything", "Open the fan", "Open dehumidification mode"]
    colors = ['red', 'black', 'orange', 'blue']
    for i in range(len(model_type)):
        plt.scatter(df.loc[df['feat'] == model_type[i], 'temp'], df.loc[df['feat'] == model_type[i], 'humi'],
        s = 6, c = colors[i], label = model_name[i])
    # 设置图标位置
    plt.legend(loc = 'upper right')
    plt.show()

def main():
    # 限制数据
    for i in range(800):
        nowhumi = random.uniform(0, 100)
        nowtemp = random.uniform(0, 45)
        nowfeat= DecideFeature(nowtemp, nowhumi)
        humi.append(nowhumi)
        temp.append(nowtemp)
        feat.append(nowfeat)
    # 随机数据
    for i in range(200):
        nowhumi = random.uniform(0, 100)
        nowtemp = random.uniform(0, 45)
        nowfeat= RandomDecideFeature(nowtemp, nowhumi)
        humi.append(nowhumi)
        temp.append(nowtemp)
        feat.append(nowfeat)
    Data = {'temp': temp, 'humi': humi, 'feat': feat}
    df = pd.DataFrame(Data)
    # 显示
    SHOW(df)
    # 导出
    df.to_csv(path + "data.csv", index=False, sep=',')



if __name__ == '__main__':
    main()