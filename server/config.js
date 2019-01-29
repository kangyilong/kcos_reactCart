module.exports = {
  _SQLCONFIG: {
    host: 'localhost',
    user: 'root',
    port: '3306',
    database: 'kcos',
    password: 'kyl666666',
    connectionLimit: 100  // 最大连接数
  }
};

/*
* 增加数据：insert into 表名 (字段1,字段2,字段3) values (?,?,?)
* 有则替换，无则增加数据：replace into 表名 (字段1,字段2,字段3) values (?,?,?)
* 查询数据：select * from 表名 where id = ?
* 更改数据：update 表名 set 字段1 = ?,字段2 = ?,字段3 = ? where id = ?
* 删除数据：delete from 表名 where id = ?
* */
