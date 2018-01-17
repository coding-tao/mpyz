const api = 'http://www.easy-mock.com/mock/59bd441fe0dc663341acbf1d/EFly/admin/';
module.exports = {
  //管理员
  ADMIN: {
    LOGIN: api + 'acl/login', //登录接口
    MODIFYPWD: api + 'acl/modifyPwd' //重置密码接口
  },
  //消息管理
  MSG:{
    SAVEMSG:api + 'msg/saveMsg', //保存信息
    FINDMSGLIST:api + 'msg/findMsgList',//分页查询获取消息列表
    DELETEMSG:api+'msg/deleteMsg'//删除消息
  },
  //用户管理
  USER:{
    FINDUSERLIST:api+'user/findUserByList',//获取用户信息
    DISABLEACCESS:api+'user/disableAccess',//禁止访问
    DSIABLESPEAK:api+'user/disableSpeaking',//禁止访问
    ALLOWACCESS:api+'user/allowAccess',
    ALLOWSPEAK:api+'user/allowSpeaking',//禁止访问
    FINDALLUSER:api+'user/findAllUser',//获取用户所有信息
    AUDITINGUSER:api+'user/auditingUser'//认证用户
  },
  // 标签管理
  LABEL:{
    SAVELABEL:api+'label/saveLabel',//保存标签
    FINDLABELLIST:api+'label/findLabelList',//标签列表
    DELETELABEL:api+'label/deleteLabel'//删除标签
  },
  //等级
  LEVEL:{
    DELETELEVEL:api+'level/deleteLevel',//删除等级
    SAVELEVEL:api+'level/saveLevel',//添加等级
    EDITLEVEL:api+'level/editLevel',//编辑等级
    FINDLEVELLIST:api+'level/findLevelList'//获取等级列表
  },
  RULE:{
    EDITRULE:api+'contributeRule/editRule',//编辑贡献值
    FINDRULELIST:api+'contributeRule/findRuleList'//获取规则
  },
  USERWORDS: {
     FINDUSERWORDSDETAIL: api+'entryUser/findEntryDetail',
     FINDUSERWORDSLIST: api+'entryUser/findEntryList'
  },
  WORDS: {
      FINDWORDSLIST: api+'entryAdmin/findEntryList',
      FINDWORDSDETAIL: api+'entryAdmin/findEntryDetail'
  },
  //用户问题
  USERPROBLEMS: {
      FINDUSERPROBLEMSLIST: api+'questionUser/findQuestionList',
      FINDUSERPROBLEMSDETAIL: api+'questionUser/findQuestionDetail'
  },
  PROBLEMS: {
      FINDPROBLEMSLIST: api+'questionAdmin/findQuestionList',
      FINDPROBLEMSDETAIL: api+'questionAdmin/findQuestionDetail'
  },
  COMMENT: {
      FINDCOMMENTLIST: api+'comment/findCommentList'
  }
}
