# -*- coding:utf-8 -*-
import datetime
import gc
import os
import time

import jieba.analyse
import jieba.analyse as analyse
import jieba
import pandas as pd
from gensim import corpora, models, similarities
import gensim
import numpy as np
import matplotlib.pyplot as plt
# from pprint import pprint

date = time.strftime("%Y-%m-%d", time.localtime(time.time()))


# # 获取今天（现在时间）
# today = datetime.datetime.today()
# # 昨天
# yesterday = today - datetime.timedelta(days=1)
# date = yesterday.strftime("%Y-%m-%d")


# 基于 LDA 主题模型进行关键词提取
# 语料是一个关于汽车的短文本，下面通过 Gensim 库完成基于 LDA 的关键字提取。
# 整个过程的步骤为：文件加载 -> jieba 分词 -> 去停用词 -> 构建词袋模型 -> LDA 模型训练 -> 结果可视化
def LDA():
    # 设置文件路径
    dir = "./"
    stop_words = "".join([dir, 'stopword.txt'])
    # 定义停用词
    # 不设置quoting，默认会去除英文双引号，只留下英文双引号内的内容，设置quoting = 3，会如实读取内容
    stopwords = pd.read_csv(stop_words, index_col=False, quoting=3, sep="\n", names=['stopword'], encoding='utf-8')
    print(stopwords.head())
    stopwords = stopwords['stopword'].values

    filename = "./sentences/" + date + ".txt"
    # filename = "./sentences/2021-04-02.txt"

    if os.path.exists(filename):
        # 加载语料
        lines = []
        with open(filename, "r", encoding='utf-8') as f:
            for line in f.readlines():
                lines.append(line.strip('\n'))  # 去掉列表中每一个元素的换行符

        # lines = ['日前，有文章质疑青海省美术家协会主席、中国美术家协会理事王筱丽长期复制、抄袭著名书画家马寒松的多幅作品。3月26日下午，青海美协主席王筱丽通过青海省文联向外界发布致歉信，承认抄袭艺术家马寒松作品。',
        #          '此后，青海省文学艺术界联合会官网发布公告，经省文联党组研究决定，王筱丽同志停职检查。',
        #          '今天（30日）下午，马寒松回应称，非常相信青海文联以及美协组织能够正确、更好地解决此事，希望个人生活恢复平静。',
        #          '据@雷军微博消息，今天，小米发布新LOGO。消息原文：原研哉为我们设计一款小产品，「小米环保袋」，这是应用小米新logo第一款产品。',
        #          '采用传统中神奇环保材料，杜邦纸，100%可循环，看起来像纸，实际上是无纺布，好看又耐用，还可水洗。包装袋上，还有原研哉为小米专门设计的新logo。',
        #          '据武汉市气象台3月30日20时44分发布的雷电黄色预警：未来6小时，全市大部又将有雷电活动，并伴有30~50毫米的雨量，阵风也会达到6~8级。',
        #          '另外，今天16时37分，武汉市气象台还发布了一条暴雨黄色预警，估计马上这阵大雨就降来临，伴随而来的，也有雷电。'
        #          ]

        # pprint(lines)
        # 开始分词
        sentences = []
        for line in lines:
            try:
                segs = jieba.lcut(line)
                segs = [v for v in segs if not str(v).isdigit()]  # 去数字
                segs = list(filter(lambda x: x.strip(), segs))  # 去左右空格
                segs = list(filter(lambda x: x not in stopwords, segs))  # 去掉停用词
                sentences.append(segs)
            except Exception:
                print(line)
                continue

        # 构建词袋模型
        # print(sentences)
        # print(sentences[0])
        dictionary = corpora.Dictionary(sentences)
        # print(dictionary)
        # print(dictionary.token2id)
        # print(dictionary.dfs)

        # 词频向量
        corpus = [dictionary.doc2bow(sentence) for sentence in sentences]
        # lda模型，num_topics是主题的个数，这里定义了10个
        lda = gensim.models.ldamodel.LdaModel(corpus=corpus, id2word=dictionary, num_topics=10)
        print("主题向量：\n", )
        # pprint(list(lda[corpus]))

        # 我们查一下第1号分类，其中最常出现的5个词是：
        # print(lda.print_topic(1, topn=5))

        # 我们打印所有10个主题，每个主题显示10个词
        for topic in lda.print_topics(num_topics=10, num_words=10):
            print(topic[1])

        # 显示中文matplotlib
        plt.rcParams['font.sans-serif'] = [u'SimHei']
        plt.rcParams['axes.unicode_minus'] = False
        # 在可视化部分，我们首先画出了九个主题的7个词的概率分布图
        num_show_term = 10  # 每个主题下显示几个词
        num_topics = 10
        for i, k in enumerate(range(num_topics)):
            ax = plt.subplot(10, 1, i + 1)
            # get_topic_terms 方法以（词汇 id，概率）的形式返回指定主题的重要词汇，调用方式为：get_topic_terms(topicid, topn=10)
            item_dis_all = lda.get_topic_terms(topicid=k)
            # print(item_dis_all)
            item_dis = np.array(item_dis_all[:num_show_term])
            ax.plot(range(num_show_term), item_dis[:, 1], 'g*')
            item_word_id = item_dis[:, 0].astype(np.int)
            word = [dictionary.id2token[i] for i in item_word_id]
            ax.set_ylabel(u"概率")
            for j in range(num_show_term):
                ax.text(j, item_dis[j, 1], word[j], bbox=dict(facecolor='green', alpha=0.1))
        plt.suptitle(u'B站热榜:Top10-topics&Probability of 10-keywords', fontsize=18)
        plt.savefig("./static/LDA/Bilibili_theme.png", dpi=800, bbox_inches='tight')  # 解决图片不清晰，不完整的问题
        # plt.show()
    else:
        pass
    gc.collect()




def LDA_UPs():
    # 设置文件路径
    dir = "./"
    stop_words = "".join([dir, 'stopword.txt'])
    # 定义停用词
    # 不设置quoting，默认会去除英文双引号，只留下英文双引号内的内容，设置quoting = 3，会如实读取内容
    stopwords = pd.read_csv(stop_words, index_col=False, quoting=3, sep="\n", names=['stopword'], encoding='utf-8')
    print(stopwords.head())
    stopwords = stopwords['stopword'].values

    date = time.strftime("%Y-%m-%d", time.localtime(time.time()))
    path = './BilibiliData_' + date + '_.csv'

    # path = './BilibiliData_'+'2021-03-30 06'+'_.csv'

    df = pd.read_csv(path, skiprows=0)
    UPs = list(df['作者'])
    # 加载语料
    lines = UPs

    # pprint(lines)
    # 开始分词
    sentences = []
    for line in lines:
        try:
            segs = jieba.lcut(line)
            segs = [v for v in segs if not str(v).isdigit()]  # 去数字
            segs = list(filter(lambda x: x.strip(), segs))  # 去左右空格
            segs = list(filter(lambda x: x not in stopwords, segs))  # 去掉停用词
            sentences.append(segs)
        except Exception:
            print(line)
            continue

    # 构建词袋模型
    # print(sentences)
    # print(sentences[0])
    dictionary = corpora.Dictionary(sentences)
    # print(dictionary)
    # print(dictionary.token2id)
    # print(dictionary.dfs)

    # 词频向量
    corpus = [dictionary.doc2bow(sentence) for sentence in sentences]
    # lda模型，num_topics是主题的个数，这里定义了10个
    lda = gensim.models.ldamodel.LdaModel(corpus=corpus, id2word=dictionary, num_topics=10)
    print("主题向量：\n", )
    # pprint(list(lda[corpus]))

    # 我们查一下第1号分类，其中最常出现的5个词是：
    # print(lda.print_topic(1, topn=5))

    # 我们打印所有10个主题，每个主题显示10个词
    for topic in lda.print_topics(num_topics=10, num_words=10):
        print(topic[1])

    # 显示中文matplotlib
    plt.rcParams['font.sans-serif'] = [u'SimHei']
    plt.rcParams['axes.unicode_minus'] = False
    # 在可视化部分，我们首先画出了九个主题的7个词的概率分布图
    num_show_term = 10  # 每个主题下显示几个词
    num_topics = 10
    for i, k in enumerate(range(num_topics)):
        ax = plt.subplot(10, 1, i + 1)
        # get_topic_terms 方法以（词汇 id，概率）的形式返回指定主题的重要词汇，调用方式为：get_topic_terms(topicid, topn=10)
        item_dis_all = lda.get_topic_terms(topicid=k)
        # print(item_dis_all)
        item_dis = np.array(item_dis_all[:num_show_term])
        ax.plot(range(num_show_term), item_dis[:, 1], 'g*')
        item_word_id = item_dis[:, 0].astype(np.int)
        word = [dictionary.id2token[i] for i in item_word_id]
        ax.set_ylabel(u"概率")
        for j in range(num_show_term):
            ax.text(j, item_dis[j, 1], word[j], bbox=dict(facecolor='green', alpha=0.1))
    plt.suptitle(u'B站热榜UP:Top10-topics&P of UP-keywords', fontsize=18)
    plt.savefig("./static/LDA/Bilibili_theme_UPs.png", dpi=800, bbox_inches='tight')  # 解决图片不清晰，不完整的问题
    # plt.show()
    gc.collect()


def LDA_title():
    # 设置文件路径
    dir = "./"
    stop_words = "".join([dir, 'stopword.txt'])
    # 定义停用词
    # 不设置quoting，默认会去除英文双引号，只留下英文双引号内的内容，设置quoting = 3，会如实读取内容
    stopwords = pd.read_csv(stop_words, index_col=False, quoting=3, sep="\n", names=['stopword'], encoding='utf-8')
    print(stopwords.head())
    stopwords = stopwords['stopword'].values

    date = time.strftime("%Y-%m-%d", time.localtime(time.time()))
    path = './BilibiliData_' + date + '_.csv'

    # path = './BilibiliData_'+'2021-03-30 06'+'_.csv'

    df = pd.read_csv(path, skiprows=0)
    title = list(df['标题'])
    # 加载语料
    lines = title

    # lines = ['日前，有文章质疑青海省美术家协会主席、中国美术家协会理事王筱丽长期复制、抄袭著名书画家马寒松的多幅作品。3月26日下午，青海美协主席王筱丽通过青海省文联向外界发布致歉信，承认抄袭艺术家马寒松作品。',
    #          '此后，青海省文学艺术界联合会官网发布公告，经省文联党组研究决定，王筱丽同志停职检查。',
    #          '今天（30日）下午，马寒松回应称，非常相信青海文联以及美协组织能够正确、更好地解决此事，希望个人生活恢复平静。',
    #          '据@雷军微博消息，今天，小米发布新LOGO。消息原文：原研哉为我们设计一款小产品，「小米环保袋」，这是应用小米新logo第一款产品。',
    #          '采用传统中神奇环保材料，杜邦纸，100%可循环，看起来像纸，实际上是无纺布，好看又耐用，还可水洗。包装袋上，还有原研哉为小米专门设计的新logo。',
    #          '据武汉市气象台3月30日20时44分发布的雷电黄色预警：未来6小时，全市大部又将有雷电活动，并伴有30~50毫米的雨量，阵风也会达到6~8级。',
    #          '另外，今天16时37分，武汉市气象台还发布了一条暴雨黄色预警，估计马上这阵大雨就降来临，伴随而来的，也有雷电。'
    #          ]

    # pprint(lines)
    # 开始分词
    sentences = []
    for line in lines:
        try:
            segs = jieba.lcut(line)
            segs = [v for v in segs if not str(v).isdigit()]  # 去数字
            segs = list(filter(lambda x: x.strip(), segs))  # 去左右空格
            segs = list(filter(lambda x: x not in stopwords, segs))  # 去掉停用词
            sentences.append(segs)
        except Exception:
            print(line)
            continue
    # 构建词袋模型
    # print(sentences)
    # print(sentences[0])
    dictionary = corpora.Dictionary(sentences)
    # print(dictionary)
    # print(dictionary.token2id)
    # print(dictionary.dfs)

    # 词频向量
    corpus = [dictionary.doc2bow(sentence) for sentence in sentences]
    # lda模型，num_topics是主题的个数，这里定义了10个
    lda = gensim.models.ldamodel.LdaModel(corpus=corpus, id2word=dictionary, num_topics=10)
    print("主题向量：\n", )
    # pprint(list(lda[corpus]))

    # 我们查一下第1号分类，其中最常出现的5个词是：
    # print(lda.print_topic(1, topn=5))

    # 我们打印所有10个主题，每个主题显示10个词
    for topic in lda.print_topics(num_topics=10, num_words=10):
        print(topic[1])

    # 显示中文matplotlib
    plt.rcParams['font.sans-serif'] = [u'SimHei']
    plt.rcParams['axes.unicode_minus'] = False
    # 在可视化部分，我们首先画出了九个主题的7个词的概率分布图
    num_show_term = 10  # 每个主题下显示几个词
    num_topics = 10
    for i, k in enumerate(range(num_topics)):
        ax = plt.subplot(10, 1, i + 1)
        # get_topic_terms 方法以（词汇 id，概率）的形式返回指定主题的重要词汇，调用方式为：get_topic_terms(topicid, topn=10)
        item_dis_all = lda.get_topic_terms(topicid=k)
        # print(item_dis_all)
        item_dis = np.array(item_dis_all[:num_show_term])
        ax.plot(range(num_show_term), item_dis[:, 1], 'g*')
        item_word_id = item_dis[:, 0].astype(np.int)
        word = [dictionary.id2token[i] for i in item_word_id]
        ax.set_ylabel(u"概率")
        for j in range(num_show_term):
            ax.text(j, item_dis[j, 1], word[j], bbox=dict(facecolor='green', alpha=0.1))
    plt.suptitle(u'B站热榜UP:Top10-topics&P of UP-keywords', fontsize=18)
    plt.savefig("./static/LDA/Bilibili_theme_title.png", dpi=800, bbox_inches='tight')  # 解决图片不清晰，不完整的问题
    # plt.show()
    gc.collect()
