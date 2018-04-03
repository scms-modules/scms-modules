import html from './index.html';

export default {
  title: 'cascadeOrganizationSelect',
  author: 'ryan.bian',
  type: 'directive',
  keyName: 'cascadeOrganizationSelectDirective',
  name: '组织&城市级联选择',
  date: '2018-04-3',
  description: '城市级联选择',
  scope: [
    {
      type: 'object',
      key: 'model',
      exampleValue: ['测试事业部', '7bcb87d'],
      description: 'model',
    },
    {
      type: 'string',
      key: 'label',
      scopeType: '@',
      exampleValue: '城市',
      description: 'label',
    },
    {
      type: 'string',
      key: 'openCityType',
      scopeType: '@',
      exampleValue: 'GOODS_TAXI',
      description: '开城业务类型',
    },
    {
      type: 'boolean',
      key: 'isActivated',
      exampleValue: true,
      description: '是否开城',
    },
    {
      type: 'boolean',
      key: 'prependOption',
      scopeType: '@',
      exampleValue: true,
      description: '是否添加前置选项',
    },
    {
      type: 'string',
      key: 'prependOptionName',
      scopeType: '@',
      exampleValue: '所有',
      description: '前置选项名称',
    },
    {
      type: 'string',
      key: 'prependOptionType',
      scopeType: '@',
      exampleValue: 'NULL',
      description: '前置选项值模式，可选 `NULL` 或者 `CONCAT`',
    },
  ],
  deps: [''],
  html,
  api: '',
  htmlUrl: '',
};