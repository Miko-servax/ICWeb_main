## 基于AI+GraphCast的智慧城市与气象多元融合云应用平台

### 一、框架结构

​		本项目分为三个部分：

​		Service端用于控制服务器后端程序，使用Node.JS编写，用于消息的接受、服务器之间的通讯、前后端之间的交互、图片传输、支付系统Base后端与邮箱注册系统的后端URL等服务，同时也包含了智慧城市与气象系统两个模块的前端界面。针对第三个模块提供了了MJ中转服务与API接口的调用。

​		Admin端负责管理员端（不开放）的交互、数据爬虫系统、AutoDL交互系统的服务，使用Python后端Flask框架和Vue编写，负责天气数据的协同交互、GraphCast模型的训练生成、EARTH模型的三维可视化生成等操作，负责与智慧城市与气象可视化系统进行数据交互。

​		Chat端用于AI模块的前端界面，使用Vue+TypeScript编写，负责IC+AI模块的界面服务，包含了ChatGPT对话、Midjourney图片生成、思维导图等功能。



### 二、环境准备

- Node.JS > = 16
- pnpm > 6
- npm > 9
- MySQL >= 5.7
- Redis
- Python > 3.8
- Python开源包中Requirements环境 使用 pip 安装
- Docker 环境





### 三、部署教程（本地搭建）

1 、安装 Node.js 环境



2 、安装 PM2

```shell
npm install pm2 -g
```



3、安装 PNPM

```shell
npm install -g pnpm
```



4、数据导入

将`ICWeb.sql`数据库文件导入至MySQL环境中

打开Redis（默认6379端口）



5、部署 service  服务端

```shell
cd service
npm install --registry=https://registry.npmmirror.com
pnpm start
```



6、部署 admin 资源管理端

```shell
cd admin
npm install --registry=https://registry.npmmirror.com
npm run dev

cd ../data_analysis/flask

```



7、部署chat用户前端

```shell
cd chat
npm install --registry=https://registry.npmmirror.com
npm run dev
```



8、数据爬虫与模型训练（可选）

```shell
cd data_analysis
pip install -r requirements.txt
python app.py
cd collect_data
python main.py

cd ../GraphCast-from-Ground-Zero-main
```

使用AutoDL环境针对GraphCast进行搭建(省略搭建步骤)

按照`graphcast_demo_Chinese.ipynb`文件中的步骤进行训练

得到训练好的模型文件，基于数据筛选器的结果进行标准化预测



9、统一端口化

```shell
VITE_GLOB_API_URL=http://127.0.0.1:9520/api
```



### 四、使用说明（完成部署教程中1-7后方可使用）

将`service`文件夹中的`.env`文件按照自己的配置进行修改（数据库、邮箱配置）

安装`fonts.ttf`字体文件

自动化部署：npm install之后，直接运行项目根文件夹下的`run.bat`即可。

停止项目：运行项目根文件夹下的`stop.bat`即可



### 五、服务搭建

第一步：分别在 service、admin、chat 中，执⾏ `npm run build` 命令，最后会在各自目录中生成 dist ⽬录，然后将生成的目录整合打包。



第二步：部署好Redis与MySQL，将整理好的整个目录上传到服务器，复制 .env为 .env.production，修改 .env  文件下对应的配置⽂件。 在此目录下执行 `npm install`等待成功。



第三步： npm start  后将会启动项⽬，并默认会监听 9520  端口。

![image-20240505173722106](C:\Users\xqsx4\AppData\Roaming\Typora\typora-user-images\image-20240505173722106.png)

查看日志确认是否 9520  监控成功，执行`pm2 logs 0`

![image-20240505173759661](C:\Users\xqsx4\AppData\Roaming\Typora\typora-user-images\image-20240505173759661.png)



第四步：Nginx  代理反向配置

```nginx
server
 {
 listen 80;
 listen [::]:80;
 server_name www.xxx.com ;
 index index.html index.htm index.php default.html 
default.htm default.php;
 root /home/wwwroot/webAI/public;
 include enable-php-pathinfo.conf;
 location /api/ {
 proxy_buffering off;
 proxy_pass http://127.0.0.1:9520;
 proxy_set_header Host 127.0.0.1;
 proxy_set_header X-Real-IP $remote_addr;
 proxy_set_header X-Forwarded-For
 }
 location / { 
try_files $uri $uri/ /index.html; 
}
access_log  /home/wwwlogs/www.xxx.com.log;
 }
```



### 六、平台访问

默认首页：localhost:9520/Welcome/Welcome.html

默认账号： super

默认密码： 123456



#### 首界面

![image-20240505175128745](C:\Users\xqsx4\AppData\Roaming\Typora\typora-user-images\image-20240505175128745.png)



#### 智慧气象模块

![image-20240505175305607](C:\Users\xqsx4\AppData\Roaming\Typora\typora-user-images\image-20240505175305607.png)



#### 碳中和模块

![image-20240505175149309](C:\Users\xqsx4\AppData\Roaming\Typora\typora-user-images\image-20240505175149309.png)



#### AI赋能模块

![image-20240505175233881](C:\Users\xqsx4\AppData\Roaming\Typora\typora-user-images\image-20240505175233881.png)



#### GraphCast预测模块

![image-20240505175250563](C:\Users\xqsx4\AppData\Roaming\Typora\typora-user-images\image-20240505175250563.png)





### 附录：开源项目与开源数据集

- GraphCast开源训练模型 **[GraphCast-from-Ground-Zero](https://github.com/sfsun67/GraphCast-from-Ground-Zero)**

- 三维化地球模型接口 [earth](https://github.com/cambecc/earth)

- ERA5数据集 https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels?tab=form 

- Google气象数据集 https://cloud.google.com/storage/docs/public-datasets/era5?hl=zh-cn