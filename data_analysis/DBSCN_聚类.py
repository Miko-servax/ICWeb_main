import jieba
from sklearn.cluster import DBSCAN
from sklearn.cluster import DBSCAN
from sklearn import metrics
from sklearn.manifold import TSNE
from sklearn.preprocessing import StandardScaler
import numpy as np
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer, TfidfTransformer, CountVectorizer

filename = "./sentences/2021-04-02.txt"

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

X = tfidf_weight

# Compute DBSCAN
db = DBSCAN(eps=0.18, min_samples=1).fit(X)
core_samples_mask = np.zeros_like(db.labels_, dtype=bool)
core_samples_mask[db.core_sample_indices_] = True
labels = db.labels_

# Number of clusters in labels, ignoring noise if present.
n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)

print(labels)
labels_true = tfidf_weight
# print(tfidf_weight)

# print('Estimated number of clusters: %d' % n_clusters_)
# print("Homogeneity: %0.3f" % metrics.homogeneity_score(labels_true, labels))
# print("Completeness: %0.3f" % metrics.completeness_score(labels_true, labels))
# print("V-measure: %0.3f" % metrics.v_measure_score(labels_true, labels))
# print("Adjusted Rand Index: %0.3f"% metrics.adjusted_rand_score(labels_true, labels))
# print("Adjusted Mutual Information: %0.3f"% metrics.adjusted_mutual_info_score(labels_true, labels))
# print("Silhouette Coefficient: %0.3f"
#       % metrics.silhouette_score(X, labels))


#
import matplotlib.pyplot as plt

# 使用T-SNE算法，对权重进行降维，准确度比PCA算法高，但是耗时长
tsne = TSNE(n_components=2)
decomposition_data = tsne.fit_transform(tfidf_weight)

x = []
y = []

for i in decomposition_data:
    x.append(i[0])
    y.append(i[1])

fig = plt.figure(figsize=(10, 10))
ax = plt.axes()
plt.scatter(x, y, marker="*")
plt.xticks(())
plt.yticks(())
plt.savefig('./static/Bilibili_bdscn_init' + '.png', aspect=1)
# plt.show()


# Black removed and is used for noise instead.
unique_labels = set(labels)
colors = [plt.cm.Spectral(each)
          for each in np.linspace(0, 1, len(unique_labels))]
for k, col in zip(unique_labels, colors):
    if k == -1:
        # Black used for noise.
        col = [0, 0, 0, 1]

    class_member_mask = (labels == k)

    xy = X[class_member_mask & core_samples_mask]
    plt.plot(xy[:, 0], xy[:, 1], 'o', markerfacecolor=tuple(col),
             markeredgecolor='k', markersize=14)

    xy = X[class_member_mask & ~core_samples_mask]
    plt.plot(xy[:, 0], xy[:, 1], 'o', markerfacecolor=tuple(col),
             markeredgecolor='k', markersize=6)

plt.title('Estimated number of clusters: %d' % n_clusters_)
plt.savefig('./static/DBSCN_Quality_DBI_2.png', dpi=120, bbox_inches='tight')
# plt.show()
