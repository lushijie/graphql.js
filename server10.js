/*
* @Author: lushijie
* @Date:   2018-03-05 16:56:26
* @Last Modified by:   lushijie
* @Last Modified time: 2018-03-05 19:08:09
*/
// Fragment
let { graphql, buildSchema } = require('graphql');

let schema = buildSchema(`
  type User {
    name: String!
    age: Int
    email: String
    city: String
  }

  type Query {
    users: User
  }
`);

// 根节点为每个 API 入口端点提供一个 resolver 函数
let root = {
  users: () => {
    return {
      name: 'lushijie',
      age: 18,
      email: 'email123@126.com',
      city: 'jinan'
    }
  }
};

graphql(
  schema,
  `
    query getNameByAge {
      users {
        ...UserFragment
      }
    }
    fragment UserFragment on User {
      name
      email
    }
  `,
  root,
  {}, // context
  {
    age: 25,
    name: 'gexufei'
  }, // variableValues
  // operationName
).then((response) => {
  console.log(response);
});
