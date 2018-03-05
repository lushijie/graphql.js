/*
* @Author: lushijie
* @Date:   2018-02-28 17:01:48
* @Last Modified by:   lushijie
* @Last Modified time: 2018-02-28 17:35:19
*/
const graphql = require('graphql');

const DBS = [
  {id: 1, name: 'lushijie', sex: 'm'},
  {id: 2, name: 'gexufei', sex: 'f'},
  {id: 3, name: 'tom', sex: 'm'}
]

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

let schema = graphql.buildSchema(`
  type User {
    id: Int,
    name: String,
    sex: String
  }

  type Query {
    User(id: Int): User
  }
`);

// 定义 User 类型
let userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    sex: {type: graphql.GraphQLString}
  }
});

// 定义 Query 类型
let queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    userInfo: {
      type: userType,
      // `args` 描述了 `user` 查询接受的参数
      args: {
        id: { type: graphql.GraphQLInt }
      },
      resolve: function (_, {id}) {
        let res = null;
        DBS.forEach((ele) => {
          if (ele.id === +id) {
            res = ele;
          }
        });
        return res;
      }
    }
  }
});

let schema1 = new graphql.GraphQLSchema({query: queryType});


graphql.graphql(
  schema1,
  `
    query getUserInfo($id: Int) {
      userInfo(id: $id) {
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
