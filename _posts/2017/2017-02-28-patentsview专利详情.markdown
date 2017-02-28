---
layout: "post"
title: "patentsview专利详情"
date: "2017-02-28 14:32"
---

本文分析从[patentsview](http://www.patentsview.org)网站下载的专利数据信息。

<!-- more -->
### 基本信息

- id
- 类别(Design、reissue等)
- 专利号
- 国家(一般是US)
- 授予日期
- 摘要
- 标题
- WIPO文件类型编号，[种类](http://www.uspto.gov/learning-and-resources/support-centers/electronic-business-center/kind-codes-included-uspto-patent)
- 专利声明的数量

### 申请书(application)

已授权的专利的申请书信息。

- USPTO分配的申请书编号
- 专利号
- 申请书的序列号[点这里](https://www.uspto.gov/web/offices/ac/ido/oeip/taf/filingyr.htm)
- 唯一的申请书识别码
- 申请书归档的国家
- 申请书归档日期

### 专利声明(claim)

说明专利的内容。

- 唯一id
- 专利号
- 内容
- sequence number of claim this is dependent on. -1 if independent
- 专利中该声明出现的次序，即第几个出现

### usreldoc

US Related Documents for granted patents

-----------
**人和机构**
### 专利权人(assignee)

专利的授权人，一般是公司、机构。

- 由消歧算法产生的唯一id
- 专利权人的分类

> 2 - US Company or Corporation, 3 - Foreign Company or Corporation, 4 - US Individual, 5 - Foreign Individual, 6 - US Government, 7 - Foreign Government, 8 - Country Government, 9 - State Government (US). Note: A "1" appearing before any of these codes signifies part interest


- 名
- 姓
- 组织名称
- 位置信息

### 专利发明人(inventor)

- 通过消歧算法计算出来的唯一id
- 名
- 姓
- 位置信息

### 法人

- id
- 名
- 姓
- 机构
- 国家

-------
**分类信息**
### 目前的cpc分类(联合专利分类)

> 由于全球专利文献分类体系众多，单独使用其中任何一种进行检索都有其局限性，为此，欧洲专利局（EPO）和美国专利商标局（USPTO）于2010年开始共同着手创建联合专利分类（CPC）

- 唯一id
- 专利号
- section_id
- cpc section  

A = Human Necessitites, B = Performing Operations; Transporting, C = Chemistry; Metallurgy, D = Textiles; Paper, E = Fixed Constructions, F = Mechanical Engineering; Lighting; Heating; Weapons; Blasting Engines or Pumps, G = Physics, H = Electricity, Y = General Tagging of New Technological Developments)

- [subsection_id](http://www.uspto.gov/web/patents/classification/cpc.html)
- [group_id](http://www.uspto.gov/web/patents/classification/cpc.html)
- [subgroup_id](http://www.uspto.gov/web/patents/classification/cpc.html)
- cpc类别(primary or additional)
- 专利中该分类出现在cpc分类中的次序

### ipc分类(国际专利分类)

- 唯一id
- 专利号
- ipc分类等级
- section

> A = Human Necessitites, B = Performing Operations; Transporting, C = Chemistry; Metallurgy, D = Textiles; Paper, E = Fixed Constructions, F = Mechanical Engineering; Lighting; Heating; Weapons; Blasting, G = Physics, H = Electricity


- ipc_class
- subclass
- main_group
- subgroup
- symbol_position
- classification_value
- classification_status
- classification_data_source
- action_date
- ipc_version_indicator
- sequence

### nber分类(国民经济研究局)

### uspc分类(美国专利商标局)

### WIPO技术分类

--------
**引用信息**
### 专利引用的外国专利(foreigncitation)

- 唯一id
- 专利号
- 引用日期
- 该外文专利的专利号
- 国家
- 类别
- 该外文文献被专利引用的次序

### 专利应用的美国专利申请书

- id
- 专利号
- 申请书号
- 引用日期
- WIPO文档类型编号，[种类](http://www.uspto.gov/learning-and-resources/support-centers/electronic-business-center/kind-codes-included-uspto-patent)
- 申请书的发布号
- 申请书的应用类别(examiner,applicati,other)
- 序号

### 专利引用的美国已授权的专利

- id
- 专利号
- 引用的专利的专利号
- 引用日期
- 名称
- 国家
- 类别(examiner,applicant,other)
- 序号
