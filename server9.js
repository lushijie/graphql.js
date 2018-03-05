/*
* @Author: lushijie
* @Date:   2018-03-05 15:12:52
* @Last Modified by:   lushijie
* @Last Modified time: 2018-03-05 16:23:26
*/

// Schema 与 类型
let { graphql, buildSchema } = require('graphql');

let schema = buildSchema(`
  # 标量类型 Int, Float, String, Boolean, ID
  # 对象类型
  # 枚举类型
  # 列表类型

  interface Friends {
    fname: String,
    fage: Int
  }

  enum Sex {
    F
    M
  }

  type School {
    address: String,
    grade: Int
  }

  type Query implements Friends {
    name(name: String = "lushijie"): String,  # 字符串, 默认值
    sex: Sex,  # 枚举类型
    age(age: Int): Int,  # 整型
    nickname: [String]!, # 列表并非空
    school: School,
    fname: String,
    fage: Int
  }
`);

// 根节点为每个 API 入口端点提供一个 resolver 函数
let root = {
  name: (arg) => {
    return '_' + arg.name;
  },
  sex: () => {
    return 'M';
  },
  age: (arg) => {
    return arg.age;
  },
  nickname: () => {
    return ['a'];
  },
  school: () => {
    return {
      address: 'beijing',
      grade: 10
    }
  },
  fname: () => {
    return 'xiaoming';
  }
};

graphql(
  schema,
  `
    query getNameByAge($age: Int, $name: String) {
      name(name: $name),
      sex,
      age(age: $age),
      nickname,
      school {
        address,
        grade
      },
      fname,
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
