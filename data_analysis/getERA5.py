import netCDF4 as nc
import pandas as pd

# 读取NC文件
data = nc.Dataset('E:\Desktop\Academic Design\data\dataset\dataset_source-era5_date-2024-04-17_res-0.25_levels-13_steps-01.nc', 'r')

# 获取变量列表
variables = data.variables

# 提取变量数据
temperature_data = data.variables['temperature'][:]

# 转换为DataFrame
df = pd.DataFrame(temperature_data)

# 保存为Excel文件
df.to_excel('output.xlsx', index=False)