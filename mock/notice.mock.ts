import { defineMock } from "./base";

export default defineMock([
  {
    url: "notices/page",
    method: ["GET"],
    body: {
      code: "00000",
      data: {
        list: [
          {
            id: 1,
            title: "v2.12.0 新增系统日志，访问趋势统计功能。",
            publishStatus: 1,
            type: 1,
            publisherName: "系统管理员",
            level: "L",
            publishTime: "2024-09-30 17:21",
            isRead: null,
            targetType: 1,
            createTime: "2024-09-28 11:21",
            revokeTime: "2024-09-30 17:21",
          },
          {
            id: 2,
            title: "v2.13.0 新增菜单搜索。",
            publishStatus: 1,
            type: 1,
            publisherName: "系统管理员",
            level: "L",
            publishTime: "2024-09-30 17:22",
            isRead: null,
            targetType: 1,
            createTime: "2024-09-28 11:21",
            revokeTime: "2024-09-30 17:21",
          },
          {
            id: 3,
            title: "\r\nv2.14.0 新增个人中心。",
            publishStatus: 1,
            type: 1,
            publisherName: "系统管理员",
            level: "L",
            publishTime: "2024-09-30 17:23",
            isRead: null,
            targetType: 1,
            createTime: "2024-09-28 11:21",
            revokeTime: "2024-09-30 17:21",
          },
          {
            id: 4,
            title: "v2.15.0 登录页面改造。",
            publishStatus: 1,
            type: 1,
            publisherName: "系统管理员",
            level: "L",
            publishTime: "2024-09-30 17:24",
            isRead: null,
            targetType: 1,
            createTime: "2024-09-28 11:21",
            revokeTime: "2024-09-30 17:21",
          },
          {
            id: 5,
            title: "v2.16.0 通知公告、字典翻译组件。",
            publishStatus: 1,
            type: 1,
            publisherName: "系统管理员",
            level: "L",
            publishTime: "2024-09-30 17:25",
            isRead: null,
            targetType: 1,
            createTime: "2024-09-28 11:21",
            revokeTime: "2024-09-30 17:21",
          },
          {
            id: 6,
            title: "系统将于本周六凌晨 2 点进行维护，预计维护时间为 2 小时。",
            publishStatus: 1,
            type: 2,
            publisherName: "系统管理员",
            level: "L",
            publishTime: "2024-09-30 17:26",
            isRead: null,
            targetType: 1,
            createTime: "2024-09-28 11:21",
            revokeTime: "2024-09-30 17:21",
          },
          {
            id: 7,
            title: "最近发现一些钓鱼邮件，请大家提高警惕，不要点击陌生链接。",
            publishStatus: 1,
            type: 3,
            publisherName: "系统管理员",
            level: "L",
            publishTime: "2024-09-30 17:27",
            isRead: null,
            targetType: 1,
            createTime: "2024-09-28 11:21",
            revokeTime: "2024-09-30 17:21",
          },
          {
            id: 8,
            title: "国庆假期从 10 月 1 日至 10 月 7 日放假，共 7 天。",
            publishStatus: 1,
            type: 4,
            publisherName: "系统管理员",
            level: "L",
            publishTime: "2024-09-30 17:28",
            isRead: null,
            targetType: 1,
            createTime: "2024-09-28 11:21",
            revokeTime: "2024-09-30 17:21",
          },
          {
            id: 9,
            title: "公司将在 10 月 15 日举办新产品发布会，敬请期待。",
            publishStatus: 1,
            type: 5,
            publisherName: "系统管理员",
            level: "L",
            publishTime: "2024-09-30 17:29",
            isRead: null,
            targetType: 1,
            createTime: "2024-09-28 11:21",
            revokeTime: "2024-09-30 17:21",
          },
          {
            id: 10,
            title:
              "v2.16.1 版本修复了 WebSocket 重复连接导致的后台线程阻塞问题，优化了通知公告。",
            publishStatus: 1,
            type: 1,
            publisherName: "系统管理员",
            level: "L",
            publishTime: "2024-09-30 17:30",
            isRead: null,
            targetType: 1,
            createTime: "2024-09-28 11:21",
            revokeTime: "2024-09-30 17:21",
          },
        ],
        total: 10,
      },
      msg: "一切ok",
    },
  },

  // 新增通知
  {
    url: "notices",
    method: ["POST"],
    body() {
      return {
        code: "00000",
        data: null,
        msg: "新增成功",
      };
    },
  },

  // 获取通知表单数据
  {
    url: "notices/:id/form",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: noticeMap[params.id],
        msg: "一切ok",
      };
    },
  },

  // 获取通知详情
  {
    url: "notices/:id/detail",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: noticeMap[params.id],
        msg: "一切ok",
      };
    },
  },
  // 修改通知
  {
    url: "roles/:id",
    method: ["PUT"],
    body({ body }) {
      return {
        code: "00000",
        data: null,
        msg: "修改通知" + body.name + "成功",
      };
    },
  },

  // 删除通知
  {
    url: "roles/:id",
    method: ["DELETE"],
    body({ params }) {
      return {
        code: "00000",
        data: null,
        msg: "删除通知" + params.id + "成功",
      };
    },
  },

  // 我的通知分页列表
  {
    url: "notices/my-page",
    method: ["GET"],
    body: {
      code: "00000",
      data: {
        list: [
          {
            id: 10,
            title:
              "v2.16.1 版本修复了 WebSocket 重复连接导致的后台线程阻塞问题，优化了通知公告。",
            type: 1,
            level: "L",
            publisherName: "系统管理员",
            publishTime: "2024-09-30 17:30",
            isRead: 0,
          },
          {
            id: 9,
            title: "公司将在 10 月 15 日举办新产品发布会，敬请期待。",
            type: 5,
            level: "L",
            publisherName: "系统管理员",
            publishTime: "2024-09-30 17:29",
            isRead: 0,
          },
          {
            id: 8,
            title: "国庆假期从 10 月 1 日至 10 月 7 日放假，共 7 天。",
            type: 4,
            level: "L",
            publisherName: "系统管理员",
            publishTime: "2024-09-30 17:28",
            isRead: 0,
          },
          {
            id: 7,
            title: "最近发现一些钓鱼邮件，请大家提高警惕，不要点击陌生链接。",
            type: 3,
            level: "L",
            publisherName: "系统管理员",
            publishTime: "2024-09-30 17:27",
            isRead: 0,
          },
          {
            id: 6,
            title: "系统将于本周六凌晨 2 点进行维护，预计维护时间为 2 小时。",
            type: 2,
            level: "L",
            publisherName: "系统管理员",
            publishTime: "2024-09-30 17:26",
            isRead: 0,
          },
        ],
        total: 10,
      },
      msg: "一切ok",
    },
  },
]);

// 通知映射表数据
const noticeMap: Record<string, any> = {
  1: {
    id: 1,
    title: "v2.12.0 新增系统日志，访问趋势统计功能。",
    publishStatus: 1,
    type: 1,
    publisherName: "系统管理员",
    level: "L",
    levelLabel: null,
    publishTime: "2024-09-30 17:21",
    isRead: null,
    targetType: 1,
    createTime: "2024-09-28 11:21",
    revokeTime: "2024-09-30 17:21",
  },
  2: {
    id: 2,
    title: "v2.13.0 新增菜单搜索。",
    publishStatus: 1,
    type: 1,
    publisherName: "系统管理员",
    level: "L",
    levelLabel: null,
    publishTime: "2024-09-30 17:22",
    isRead: null,
    targetType: 1,
    createTime: "2024-09-28 11:21",
    revokeTime: "2024-09-30 17:21",
  },
  3: {
    id: 3,
    title: "\r\nv2.14.0 新增个人中心。",
    publishStatus: 1,
    type: 1,
    publisherName: "系统管理员",
    level: "L",
    levelLabel: null,
    publishTime: "2024-09-30 17:23",
    isRead: null,
    targetType: 1,
    createTime: "2024-09-28 11:21",
    revokeTime: "2024-09-30 17:21",
  },
  4: {
    id: 4,
    title: "v2.15.0 登录页面改造。",
    publishStatus: 1,
    type: 1,
    publisherName: "系统管理员",
    level: "L",
    levelLabel: null,
    publishTime: "2024-09-30 17:24",
    isRead: null,
    targetType: 1,
    createTime: "2024-09-28 11:21",
    revokeTime: "2024-09-30 17:21",
  },

  5: {
    id: 5,
    title: "v2.16.0 通知公告、字典翻译组件。",
    publishStatus: 1,
    type: 1,
    publisherName: "系统管理员",
    level: "L",
    levelLabel: null,
    publishTime: "2024-09-30 17:25",
    isRead: null,
    targetType: 1,
    createTime: "2024-09-28 11:21",
    revokeTime: "2024-09-30 17:21",
  },
  6: {
    id: 6,
    title: "系统将于本周六凌晨 2 点进行维护，预计维护时间为 2 小时。",
    publishStatus: 1,
    type: 2,
    publisherName: "系统管理员",
    level: "L",
    levelLabel: null,
    publishTime: "2024-09-30 17:26",
    isRead: null,
    targetType: 1,
    createTime: "2024-09-28 11:21",
    revokeTime: "2024-09-30 17:21",
  },
  7: {
    id: 7,
    title: "最近发现一些钓鱼邮件，请大家提高警惕，不要点击陌生链接。",
    publishStatus: 1,
    type: 3,
    publisherName: "系统管理员",
    level: "L",
    levelLabel: null,
    publishTime: "2024-09-30 17:27",
    isRead: null,
    targetType: 1,
    createTime: "2024-09-28 11:21",
    revokeTime: "2024-09-30 17:21",
  },
  8: {
    id: 8,
    title: "国庆假期从 10 月 1 日至 10 月 7 日放假，共 7 天。",
    publishStatus: 1,
    type: 4,
    publisherName: "系统管理员",
    level: "L",
    levelLabel: null,
    publishTime: "2024-09-30 17:28",
    isRead: null,
    targetType: 1,
    createTime: "2024-09-28 11:21",
    revokeTime: "2024-09-30 17:21",
  },
  9: {
    id: 9,
    title: "公司将在 10 月 15 日举办新产品发布会，敬请期待。",
    publishStatus: 1,
    type: 5,
    publisherName: "系统管理员",
    level: "L",
    levelLabel: null,
    publishTime: "2024-09-30 17:29",
    isRead: null,
    targetType: 1,
    createTime: "2024-09-28 11:21",
    revokeTime: "2024-09-30 17:21",
  },
  10: {
    id: 10,
    title:
      "v2.16.1 版本修复了 WebSocket 重复连接导致的后台线程阻塞问题，优化了通知公告。",
    publishStatus: 1,
    type: 1,
    publisherName: "系统管理员",
    level: "L",
    levelLabel: null,
    publishTime: "2024-09-30 17:30",
    isRead: null,
    targetType: 1,
    createTime: "2024-09-28 11:21",
    revokeTime: "2024-09-30 17:21",
  },
};
