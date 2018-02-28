/*
* @Author: lushijie
* @Date:   2018-02-28 11:06:28
* @Last Modified by:   lushijie
* @Last Modified time: 2018-02-28 15:04:37
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
    UserInfo(name: String!): User
  }

  type User {
    name: String,
    sex: String
  }
`);

function getSex() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('M');
    }, 3000);
  })
}

class User {
  constructor(name) {
    this.name = name;
  }
  async sex() {
    return await getSex();
  }
}

// 根节点为每个 API 入口端点提供一个 resolver 函数
let root = {
  UserInfo: async (arg) => {
    return new User(arg.name);
  }
};

graphql(
  schema,
  `
    query getUserByName($name: String!) {
      UserInfo(name: $name) {
        name,
        sex
      }
    }
  `,
  root,
  {}, // context
  {name: 'tom'}, // variableValues
  // operationName
).then((response) => {
  console.log(response);
});
