/*
* @Author: lushijie
* @Date:   2018-02-28 16:21:26
* @Last Modified by:   lushijie
* @Last Modified time: 2018-02-28 17:15:03
*/

/*
* @Author: lushijie
* @Date:   2018-02-28 11:06:28
* @Last Modified by:   lushijie
* @Last Modified time: 2018-02-28 16:15:03
*/
const graphql= require('graphql');

let root = {
  name: async (arg) => {
    console.log('接受到参数：', arg);
    return 'x' + arg.age;
  },
  sex: () => {
    return 'f';
  }
};

let schema = graphql.buildSchema(`
  type Query {
    name(age: Int): String,
    sex: String
  }
`);

let queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    name: {
      type: graphql.GraphQLString,
      args: {
        age: {
          type: graphql.GraphQLInt
        }
      },
      resolve(_, args) {
        console.log(args);
        return 'lushijie';
      }
    },
    sex: {
      type: graphql.GraphQLString,
      resolve(_, args) {
        console.log(args);
        return 'm';
      }
    }
  }
});
let schema1 = new graphql.GraphQLSchema({query: queryType});

graphql.graphql(
  schema, // schema1
  `
    query getNameByAge($age: Int) {
      name(age: $age),
      sex
    }
  `,
  root, // root
  {}, // context
  {age: 25}, // variableValues
  // operationName
).then((response) => {
  console.log(response);
});

