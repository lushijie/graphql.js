/*
* @Author: lushijie
* @Date:   2018-02-28 11:06:28
* @Last Modified by:   lushijie
* @Last Modified time: 2018-02-28 16:15:03
*/
let { graphql, buildSchema } = require('graphql');

let schema = buildSchema(`
  type Query {
    name(age: Int): String,
    sex: String
  }
`);

// 根节点为每个 API 入口端点提供一个 resolver 函数
let root = {
  name: async (arg) => {
    console.log('接受到参数：', arg);
    return 'x' + arg.age;
  },
  sex: () => {
    return 'f';
  }
};

graphql(
  schema,
  `
    query getNameByAge($age: Int) {
      name(age: $age),
      sex
    }
  `,
  root,
  {}, // context
  {age: 25}, // variableValues
  // operationName
).then((response) => {
  console.log(response);
});
