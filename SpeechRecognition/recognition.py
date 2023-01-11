import speech_recognition as sr
# 设置麦克风
r = sr.Recognizer()  
mic = sr.Microphone()

#进行录音
print('录音中...')
with mic as source:
    r.adjust_for_ambient_noise(source)
    audio = r.listen(source)
#进行识别
print('录音结束，识别中...')
try:
    text = r.recognize_google(audio)
    print(text)
except sr.UnknownValueError:
    print("Could not understand")