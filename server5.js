/*
* @Author: lushijie
* @Date:   2018-02-28 11:06:28
* @Last Modified by:   lushijie
* @Last Modified time: 2018-02-28 15:45:56
*/
let { graphql, buildSchema } = require('graphql');

const DBS = [
  {id: 1, name: 'lushijie', sex: 'male'},
  {id: 2, name: 'gexufei', sex: 'female'}
]

let schema = buildSchema(`
  type User {
    id: Int,
    name: String,
    sex: String
  }

  type Query {
    User(id: Int!): User
  }

  input UserInput {
    id: Int!,
    newName: String
  }

  type Mutation {
    setUserById(id: Int, param: UserInput): User
  }
`);

// 根节点为每个 API 入口端点提供一个 resolver 函数
let root = {
  setUserById: async arg => {
    let res = null;
    DBS.forEach((ele) => {
      if (ele.id === +arg.param.id) {
        res = ele;
      }
    });
    res.name = arg.param.newName;
    return res;
  }
};

graphql(
  schema,
  `
    mutation Anonymous($param: UserInput) {
      setUserById(param: $param) {
        id,
        name,
        sex
      }
    }
  `,
  root,
  {}, // context
  {
    param: {
      id: 1,
      newName: 'This is new Name!'
    }
  }, // variableValues
  // operationName
).then((response) => {
  console.log(response);
});
