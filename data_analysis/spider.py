# -*- coding:utf-8 -*-
import ssl

import requests
import parsel
import csv
import time



def spider():
    # 全局取消证书验证
    ssl._create_default_https_context = ssl._create_unverified_context

    # import urllib3  # 使用这个方法就OK了
    # urllib3.disable_warnings()  # 忽略警告

    date = time.strftime("%Y-%m-%d %H", time.localtime(time.time()))
    # time = str(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))

    # f = open('BilibiliData_'+date+'_.csv', mode='a', encoding='utf-8-sig', newline='')
    # csv_writer = csv.DictWriter(f, fieldnames=['标题', '播放量', '弹幕量', '作者', '综合得分', '视频地址'])
    # csv_writer.writeheader()
    url = 'https://www.bilibili.com/v/popular/rank/all?spm_id_from=333.851.b_7072696d61727950616765546162.3'
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'
    }
    response = requests.get(url=url, headers=headers)
    selector = parsel.Selector(response.text)
    lis = selector.css('.rank-list li')
    dit = {}
    show = [[], [], [], [], [], [],[]]
    for li in lis:
        title = li.css('.info a::text').get()  # 标题
        bf_info = li.css('div.content > div.info > div.detail > span:nth-child(1)::text').get().strip()  # 播放量
        dm_info = li.css('div.content > div.info > div.detail > span:nth-child(2)::text').get().strip()  # 弹幕量
        bq_info = li.css('div.content > div.info > div.detail > a > span::text').get().strip()  # 作者
        score = li.css('.pts div::text').get()  # 综合得分
        page_url = li.css('.img a::attr(href)').get()  # 视频地址
        dit = {
            '标题': title,
            '播放量': bf_info,
            '弹幕量': dm_info,
            '作者': bq_info,
            '综合得分': score,
            '视频地址': page_url,
        }
        if('万'in bf_info):
            num = str(bf_info).strip('万')
            bf_info = float(num)*1000
        if ('万' in dm_info):
            num = str(dm_info).strip('万')
            dm_info = float(num) * 1000
        show[0].append(title)
        show[1].append(bf_info)
        show[2].append(dm_info)
        show[3].append(bq_info)
        show[4].append(int(score))
        show[5].append('http:'+page_url)
        show[6].append(title+'\n'+'@['+bq_info+']')
        # csv_writer.writerow(dit)
        # print(dit)
    # print('调用')
    return show



