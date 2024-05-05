from __future__ import print_function


def emotion():
    # -*- coding:utf-8 -*-

    import datetime
    import json
    import os
    import time

    import six
    import paddlehub as hub
    # import kmeans_中文 as category

    date = time.strftime("%Y-%m-%d", time.localtime(time.time()))

    # # 获取今天（现在时间）
    # today = datetime.datetime.today()
    # # 昨天
    # yesterday = today - datetime.timedelta(days=1)
    # date = yesterday.strftime("%Y-%m-%d")

    filename = "./sentences/"+date+".txt"
    # filename = "./sentences/2021-04-02.txt"

    # filename = "./sentences/" + date + ".txt"
    emotion = []
    if os.path.exists(filename):
        emotion_list = []
        # 加载senta模型
        senta = hub.Module(name="senta_bilstm")
        # 把要测试的短文本以str格式放到这个列表里
        test_text = []
        with open(filename, "r", encoding='utf-8') as f:
            for line in f.readlines():
                test_text.append(line.strip('\n'))  # 去掉列表中每一个元素的换行符
                # print(line)
        # 指定模型输入
        input_dict = {"text": test_text}
        # 把数据喂给senta模型的文本分类函数
        results = senta.sentiment_classify(data=input_dict)
        # 遍历分析每个短文本
        for index, text in enumerate(test_text):
            results[index]["text"] = text
        for index, result in enumerate(results):
            if six.PY2:
                json.dumps(results[index], encoding="utf8", ensure_ascii=False)
                # print(json.dumps(results[index], encoding="utf8", ensure_ascii=False))
            else:
                # print('text: {},    predict: {}'.format(results[index]['text'], results[index]['sentiment_key']))
                # print('text: {},    predict: {}'.format(results[index]['text'], results[index]['sentiment_key']))
                emotion_list.append(results[index]['sentiment_key'])

        negative = emotion_list.count('negative')
        positive = emotion_list.count('positive')
        num = len(emotion_list)
        negative_rate = float(negative / num)
        positive_rate = float(positive / num)
        emotion = [negative, positive, num, negative_rate, positive_rate]
    else:
        pass

    # print(emotion)
    return emotion

# emotion()
