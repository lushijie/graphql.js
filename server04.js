/*
* @Author: lushijie
* @Date:   2018-02-28 11:06:28
* @Last Modified by:   lushijie
* @Last Modified time: 2018-02-28 18:36:22
*/
let { graphql, buildSchema } = require('graphql');

function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  })
}

const DBS = [
  {id: 1, name: 'lushijie', sex: 'm'},
  {id: 2, name: 'gexufei', sex: 'f'},
  {id: 3, name: 'tom', sex: 'm'}
]

let schema = buildSchema(`
  type Query {
    UserInfo(id: Int!): User
  }

  type User {
    id: Int,
    name: String,
    sex: String
  }
`);

class User {
  constructor(id) {
    this.id = id;
  }
  async name() {
    let name = null;
    DBS.forEach((ele) => {
      if (ele.id === +this.id) {
        name = ele.name;
      }
    });
    await sleep(2000);
    return name;
  }

  sex() {
    return Math.random() > 0.5 ? 'f1' : 'm1';
  }
}

// 根节点为每个 API 入口端点提供一个 resolver 函数
let root = {
  UserInfo: async (arg) => {
    return new User(arg.id);
  }
};

graphql(
  schema,
  `
    query getUserById($id: Int!) {
      Alias: UserInfo(id: $id) {
        id,
        name,
        sex
      }
    }
  `,
  root,
  {}, // context
  {id: 1}, // variableValues
  // operationName
).then((response) => {
  console.log(response);
});
