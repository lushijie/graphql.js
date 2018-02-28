/*
* @Author: lushijie
* @Date:   2018-02-28 11:06:28
* @Last Modified by:   lushijie
* @Last Modified time: 2018-02-28 12:00:08
*/
let { graphql, buildSchema } = require('graphql');

function getName() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('小明');
    }, 3000);
  })
}

let schema = buildSchema(`
  type Query {
    UserInfo(name1: String): User
  }

  type User {
    name: String,
    sex: String
  }
`);

// 根节点为每个 API 入口端点提供一个 resolver 函数
let root = {
  UserInfo: (arg) => {
    console.log('接受到参数：', arg);
    return {
      name: arg.name1 || '无姓名',
      sex: 'Male'
    }
  }
};

graphql(
  schema,
  `
    query getUserByName($name1: String) {
      UserInfo(name1: $name1) {
        name,
        sex
      }
    }
  `,
  root,
  {}, // context
  {name1: 'lushijie'}, // variableValues
  // operationName
).then((response) => {
  console.log(response);
});
