/*
* @Author: lushijie
* @Date:   2018-02-28 11:06:28
* @Last Modified by:   lushijie
* @Last Modified time: 2018-02-28 11:51:38
*/
let { graphql, buildSchema } = require('graphql');

function getName(age) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('小明' + age);
    }, 3000);
  })
}

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
    return await getName(arg.age);
  },
  sex: () => {
    return 'Female';
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
