# -*- coding:utf-8 -*-
import os
import time
import traceback
import capture_vedios as capture
import pandas as pd
import OCR_paddle


def deal_csv():
    date = time.strftime("%Y-%m-%d", time.localtime(time.time()))
    path = './BilibiliData_' + date + '_.csv'

    # path = './BilibiliData_'+'2021-03-30 06'+'_.csv'

    df = pd.read_csv(path, skiprows=0)
    # print(df.head(5))
    # print('datatype of column hit is: ' + str(df['视频地址'].dtypes))
    urls = list(df['标题'] + '___&$http:' + df['视频地址'])
    dir = './video'

    def download(dir, url):
        try:
            print(dir + '开始下载')
            os.system('you-get' + ' -o ' + dir + ' ' + url)
            print(dir + '下载成功')
        except Exception:
            print(dir + '下载失败')
            traceback.print_exc()

    def delete_files(dir):
        for filename in os.listdir(dir):  # 获取文件夹内所有文件的文件名
            if filename.endswith('.xml'):  # 若文件名满足指定条件
                os.remove(os.path.join(dir, filename))  # 删除符合条件的文件
                # print("{} deleted.".format(filename))           ##输出提示

    def delete_files1(dir):
        for filename in os.listdir(dir):  # 获取文件夹内所有文件的文件名
            if filename.endswith('.download'):  # 若文件名满足指定条件
                os.remove(os.path.join(dir, filename))  # 删除符合条件的文件
                # print("{} deleted.".format(filename))           ##输出提示

    def getVideoPath():
        global pa
        # 指定路径
        path = r'./video/'
        # 返回指定路径的文件夹名称
        dirs = os.listdir(path)
        # 循环遍历该目录下的照片
        for dir in dirs:
            # 拼接字符串
            pa = path + dir
            # 判断是否为照片
            if not os.path.isdir(pa):
                # 使用生成器循环输出
                yield pa

    retry_nmber = []
    once_nmber = []

    # # choice1
    # def videos_result():
    #     i = 1
    #     for url in urls:
    #         URL = str(url).split('___&$')
    #         download(dir, URL[1])
    #         delete_files(dir)
    #         delete_files1(dir)
    #         for Path in getVideoPath():
    #             if (Path != '') & (Path is not None):
    #                 delete_files(dir)
    #                 capture.capture(Path)
    #                 # OCR_paddle.OCR(URL[0])
    #                 OCR_paddle.OCR('URL[0]')
    #                 once_nmber.append(i)
    #             else:
    #                 retry_nmber.append(i)
    #         i += 1
    #         print(once_nmber)
    #
    #
    # def results():
    #     while len(retry_nmber) > 0:
    #         j = retry_nmber[0]
    #         url = urls[j]
    #         URL = str(url).split('___&$')
    #         download(dir, URL[1])
    #         delete_files(dir)
    #         for Path in getVideoPath():
    #             if (Path != '') & (Path is not None):
    #                 capture.capture(Path)
    #                 OCR_paddle.OCR(URL[0])
    #                 once_nmber.append(j)
    #                 retry_nmber.remove(j)
    #             else:
    #                 pass

    # choice2

    Urls = list('http:' + df['视频地址'])
    dirs = './video'

    def get_videos():
        i = 0
        while i < 2:
            for url in Urls:
                download(dirs, url)
                delete_files(dirs)
            i += 1
        delete_files1(dirs)

    # get_videos()

    def videos_result1():
        for Path in getVideoPath():
            capture.capture(Path)
            OCR_paddle.OCR()

    # for url in urls[0:1]:
    #     URL = str(url).split('___&$')
    #     print(URL[1])

    # print('over!')

    # videos_result()
    # delete_files(dir)

    get_videos()
    videos_result1()


