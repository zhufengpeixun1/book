## RESTful
一种软件架构风格，设计风格而不是标准,全称representation state transfer
1. 每一个URI代表一种资源；
2. 我们把"资源"具体呈现出来的形式，叫做它的"表现
3. 客户端通过四个HTTP动词(get post put delete),对服务器端资源进行操作，实现"表现层状态转化"。

### 例如
GET /books 得到所有的书
GET /books/ID 得到指定ID的书
POST /books 新增一本书
PUT /books/ID 修改一本书
DELETE /books/ID 删除一本书