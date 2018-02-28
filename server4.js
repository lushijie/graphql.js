/*
* @Author: lushijie
* @Date:   2018-02-28 11:06:28
* @Last Modified by:   lushijie
* @Last Modified time: 2018-02-28 15:56:14
*/
let { graphql, buildSchema } = require('graphql');

const DBS = [
  {id: 1, name: 'lushijie', sex: 'm'},
  {id: 2, name: 'gexufei', sex: 'f'},
  {id: 3, name: 'tom', sex: 'm'}
]

let schema = buildSchema(`

  type User {
    id: Int,
    name: String,
    sex: String
  }

  type Query {
    User(id: Int): User
  }
`);

// 根节点为每个 API 入口端点提供一个 resolver 函数
let root = {
  User: async arg => {
    let res = null;
    DBS.forEach((ele) => {
      if (ele.id === +arg.id) {
        res = ele;
      }
    });
    return res;
  }
};

graphql(
  schema,
  `
    query getUserInfo($id: Int) {
      Alias:User(id: $id) {
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
