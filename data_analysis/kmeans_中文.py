#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import time

import jieba
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
import joblib
from sklearn import metrics
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.manifold import TSNE
# import datetime

score = []
score2 = []

date = time.strftime("%Y-%m-%d", time.localtime(time.time()))


# # 获取今天（现在时间）
# today = datetime.datetime.today()
# # 昨天
# yesterday = today - datetime.timedelta(days=1)
# date = yesterday.strftime("%Y-%m-%d")

# def kmeans():
#     def jieba_tokenize(text):
#         return jieba.lcut(text)
#
#     tfidf_vectorizer = TfidfVectorizer(tokenizer=jieba_tokenize, lowercase=False)
#
#     '''
#     tokenizer: 指定分词函数
#     lowercase: 在分词之前将所有的文本转换成小写，因为涉及到中文文本处理，
#     所以最好是False
#     '''
#     text_list = []
#     with open("./sentences/2021-04-01.txt", "r", encoding='utf-8') as f:
#         for line in f.readlines():
#             text_list.append(line.strip('\n'))  # 去掉列表中每一个元素的换行符
#
#     # text_list = ["今天天气真好啊啊啊啊",
#     # "小明上了清华大学",
#     # "我今天拿到了Google的Offer",
#     # "清华大学在自然语言处理方面真厉害"]
#
#     # 需要进行聚类的文本集
#
#     tfidf_matrix = tfidf_vectorizer.fit_transform(text_list)
#
#     num_clusters = 5
#     km_cluster = KMeans(n_clusters=num_clusters, max_iter=300, n_init=40,
#                         init='k-means++', n_jobs=-1)
#
#     '''
#     n_clusters: 指定K的值
#     max_iter: 对于单次初始值计算的最大迭代次数
#     n_init: 重新选择初始值的次数
#     init: 制定初始值选择的算法
#     n_jobs: 进程个数，为-1的时候是指默认跑满CPU
#     注意，这个对于单个初始值的计算始终只会使用单进程计算，
#     并行计算只是针对与不同初始值的计算。比如n_init=10，n_jobs=40,
#     服务器上面有20个CPU可以开40个进程，最终只会开10个进程
#     '''
#
#     # 返回各自文本的所被分配到的类索引
#     result = km_cluster.fit_predict(tfidf_matrix)
#
#     print("Predicting result: ", result)
#
#     category = []
#     i = 1
#     result = list(result)
#     for every in iter(set(result)):
#         category.append(('category' + str(i), result.count(every)))
#         i += 1
#     category_number = len(category)
#
#     print(category_number, category)
#
#     return category

# date = time.strftime("%Y-%m-%d", time.localtime(time.time()))
# filename = "./sentences/"+date+".txt"
#
# # filename = "./sentences/2021-04-02.txt"
#
# corpus = []
# with open(filename, "r", encoding='utf-8') as f:
#     for line in f.readlines():
#         corpus.append(line.strip('\n'))  # 去掉列表中每一个元素的换行符


def kmeans_inertia(center):
    global date
    filename = "./sentences/" + date + ".txt"
    # filename = "./sentences/2021-04-02.txt"

    if os.path.exists(filename):
        corpus = []
        with open(filename, "r", encoding='utf-8') as f:
            for line in f.readlines():
                corpus.append(line.strip('\n'))  # 去掉列表中每一个元素的换行符
        # bigram分词
        segment_bigram = lambda text: " ".join(
            [word + text[idx + 1] for idx, word in enumerate(text) if idx < len(text) - 1])
        # 结巴中文分词
        segment_jieba = lambda text: " ".join(jieba.cut(text))

        '''
            2、计算tf-idf设为权重
        '''

        vectorizer = CountVectorizer()
        transformer = TfidfTransformer()
        tfidf = transformer.fit_transform(vectorizer.fit_transform(corpus))

        ''' 
            3、获取词袋模型中的所有词语特征
            如果特征数量非常多的情况下可以按照权重降维
        '''

        word = vectorizer.get_feature_names()
        # print("word feature length: {}".format(len(word)))

        ''' 
            4、导出权重，到这边就实现了将文字向量化的过程，矩阵中的每一行就是一个文档的向量表示
        '''
        tfidf_weight = tfidf.toarray()

        '''
            5、对向量进行聚类
        '''

        # 指定分成7个类
        kmeans = KMeans(n_clusters=7)
        kmeans.fit(tfidf_weight)

        # 打印出各个族的中心点
        # print(kmeans.cluster_centers_)
        # for index, label in enumerate(kmeans.labels_, 1):
        #     print("index: {}, label: {}".format(index, label))

        # 样本距其最近的聚类中心的平方距离之和，用来评判分类的准确度，值越小越好
        # k-means的超参数n_clusters可以通过该值来评估
        # print("inertia: {}".format(kmeans.inertia_))
        score.append(kmeans.inertia_)
    else:
        pass


# def picture_inertia(centernumber):
#     global score
#     x = centernumber
#     y = score
# plt.figure(figsize=(6, 4))
# plt.plot(x, y, color="blue", linewidth=1, marker="x")
# plt.xlabel("clustering number")  # xlabel、ylabel：分别设置X、Y轴的标题文字。
# plt.ylabel("avg-score")
# plt.title("Kmeans-mark-line graph")  # title：设置子图的标题。
# plt.ylim(90.5, 91.75)  # xlim、ylim：分别设置X、Y轴的显示范围。
# plt.xlim(0, centernumber[len(centernumber) - 1] + 1)
# plt.savefig('Kmeans_Quality_inertia.png', dpi=120, bbox_inches='tight')
# plt.show()
# plt.close()


def kmeans_DBI(center):
    global date
    filename = "./sentences/" + date + ".txt"

    # filename = "./sentences/2021-04-02.txt"

    if os.path.exists(filename):
        corpus = []
        with open(filename, "r", encoding='utf-8') as f:
            for line in f.readlines():
                corpus.append(line.strip('\n'))  # 去掉列表中每一个元素的换行符
        # bigram分词
        segment_bigram = lambda text: " ".join(
            [word + text[idx + 1] for idx, word in enumerate(text) if idx < len(text) - 1])
        # 结巴中文分词
        segment_jieba = lambda text: " ".join(jieba.cut(text))

        '''
            2、计算tf-idf设为权重
        '''

        vectorizer = CountVectorizer()
        transformer = TfidfTransformer()
        tfidf = transformer.fit_transform(vectorizer.fit_transform(corpus))

        ''' 
            3、获取词袋模型中的所有词语特征
            如果特征数量非常多的情况下可以按照权重降维
        '''

        word = vectorizer.get_feature_names()
        # print("word feature length: {}".format(len(word)))

        ''' 
            4、导出权重，到这边就实现了将文字向量化的过程，矩阵中的每一行就是一个文档的向量表示
        '''
        tfidf_weight = tfidf.toarray()

        '''
            5、对向量进行聚类
        '''

        # 指定分成7个类
        kmeans = KMeans(n_clusters=7)
        kmeans.fit(tfidf_weight)

        # 打印出各个族的中心点
        # print(kmeans.cluster_centers_)
        # for index, label in enumerate(kmeans.labels_, 1):
        #     print("index: {}, label: {}".format(index, label))

        # 样本距其最近的聚类中心的平方距离之和，用来评判分类的准确度，值越小越好
        # k-means的超参数n_clusters可以通过该值来评估
        # print("inertia: {}".format(kmeans.inertia_))
        # score.append(kmeans.inertia_)
        labels = kmeans.labels_
        # print(type(labels),labels)
        labels = list(labels)
        # print(metrics.calinski_harabasz_score(tfidf_weight, labels))
        davies_bouldin_score = metrics.davies_bouldin_score(tfidf_weight, labels)
        # print(davies_bouldin_score)
        score2.append(davies_bouldin_score)
    else:
        pass


# def picture_DBI(centernumber):
#     global score2
#     x = centernumber
#     y = score2
#     plt.figure(figsize=(6, 4))
#     plt.plot(x, y, color="red", linewidth=1, marker="*")
#     plt.xlabel("clustering number")  # xlabel、ylabel：分别设置X、Y轴的标题文字。
#     plt.ylabel("davies_bouldin_score")
#     plt.title("Kmeans-mark-line graph")  # title：设置子图的标题。
#     plt.ylim(3.2, 6)  # xlim、ylim：分别设置X、Y轴的显示范围。
#     plt.xlim(1, centernumber[len(centernumber) - 1] + 1)
#     plt.savefig('Kmeans_Quality_DBI.png', dpi=120, bbox_inches='tight')
# plt.show()
# plt.close()


def kmeans_last(center):
    global date,text,category,corpus,points
    filename = "./sentences/" + date + ".txt"

    # filename = "./sentences/2021-04-02.txt"
    points = []
    corpus = []
    category = []
    # text = [[], [], [], [], [], [], [], [], [], []]
    text = [[], [], [], [], [], [], [], [], [], [], [], []]  # 可改进之处
    if os.path.exists(filename):
        with open(filename, "r", encoding='utf-8') as f:
            for line in f.readlines():
                corpus.append(line.strip('\n'))  # 去掉列表中每一个元素的换行符
        # bigram分词
        segment_bigram = lambda text: " ".join(
            [word + text[idx + 1] for idx, word in enumerate(text) if idx < len(text) - 1])
        # 结巴中文分词
        segment_jieba = lambda text: " ".join(jieba.cut(text))
        '''
            2、计算tf-idf设为权重
        '''

        vectorizer = CountVectorizer()
        transformer = TfidfTransformer()
        tfidf = transformer.fit_transform(vectorizer.fit_transform(corpus))

        ''' 
            3、获取词袋模型中的所有词语特征
            如果特征数量非常多的情况下可以按照权重降维
        '''

        word = vectorizer.get_feature_names()
        # print("word feature length: {}".format(len(word)))

        ''' 
            4、导出权重，到这边就实现了将文字向量化的过程，矩阵中的每一行就是一个文档的向量表示
        '''
        tfidf_weight = tfidf.toarray()

        '''
            5、对向量进行聚类
        '''

        # 指定分成n个类
        kmeans = KMeans(n_clusters=center)
        kmeans.fit(tfidf_weight)

        # 打印出各个族的中心点
        # print(kmeans.cluster_centers_)
        # for index, label in enumerate(kmeans.labels_, 1):
        #     print("index: {}, label: {}".format(index, label))

        # 样本距其最近的聚类中心的平方距离之和，用来评判分类的准确度，值越小越好
        # k-means的超参数n_clusters可以通过该值来评估
        # print("inertia: {}".format(kmeans.inertia_))

        # print('davies_bouldin_score', score2[center])

        '''
            6、可视化
        '''

        # 使用T-SNE算法，对权重进行降维，准确度比PCA算法高，但是耗时长
        tsne = TSNE(n_components=2)
        decomposition_data = tsne.fit_transform(tfidf_weight)

        x = []
        y = []

        for i in decomposition_data:
            x.append(i[0])
            y.append(i[1])
            points.append([i[0], i[1]])
        # print(x)
        # print(y)
        # print(kmeans.labels_)

        fig = plt.figure(figsize=(10, 10))
        ax = plt.axes()
        plt.scatter(x, y, c=kmeans.labels_, marker="x")
        plt.xticks(())
        plt.yticks(())
        plt.savefig('./static/Bilibili_Kmeans_Better' + str(center) + '.png', aspect=1)
        # plt.savefig('./static/Bilibili_Kmeans_Better' + str(center) + '.png')
        # plt.show()
        labels = kmeans.labels_
        result = list(labels)
        # print(result)
        # print(len(result))
        i = 1
        for every in iter(set(result)):
            category.append(('category' + str(i), result.count(every)))
            i += 1
        category_number = len(category)

        # print(category_number, category)
        k = 0
        while k < len(result):
            text[result[k] - 1].append(corpus[k])
            k += 1
    else:
        pass
    return category, text, points


# 测试
def test(Tnumber):  # Tnumber 测试的最大分类数
    centernumber = [i + 1 for i in range(0, Tnumber)]
    for center in centernumber:
        kmeans_inertia(center)
    j = len(centernumber)
    while j > 1:
        kmeans_DBI(centernumber[j - 1])
        j -= 1

    # picture_inertia(centernumber)
    # picture_DBI(centernumber[1:])
    return centernumber, score, score2

# category, text_category,points = kmeans_last(12)
# for text in text_category:
#     print(len(text))

# test(20)
