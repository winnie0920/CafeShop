// 後台側邊欄
export const adminSide = [
  {
    to: { name: "AdminTheme" },
    iconName: "User-Theme",
    label: "THEME",
    name: "主題分類",
  },
  {
    to: { name: "AdminMeal" },
    iconName: "User-Meal",
    label: "MEAL",
    name: "餐點分類",
  },

  {
    to: { name: "AdminAlter" },
    iconName: "User-Alter",
    label: "ALTER",
    name: "自訂項目",
  },
  {
    to: { name: "AdminMenu" },
    iconName: "User-Menu",
    label: "MENU",
    name: "訂單管理",
  },
];

// 記住帳號
export const loginOption = [
  {
    type: "remember",
    selected: false,
    children: [{ id: 1, name: "記住帳號？" }],
  },
];

// 登入帳號管理
export const adminLogin = [
  {
    account: "admin",
    password: "password",
  },
  {
    account: "winnie0920",
    password: "h5693123",
  },
  {
    account: "manager",
    password: "manage",
  },
];

//自訂項目
export const customOption = [
  {
    name: "自定項目",
    type: "option",
    selected: false,
    children: [
      { id: "size", name: "份量" },
      { id: "noddle", name: "麵體" },
      { id: "spicy", name: "辣度" },
    ],
  },
];

// 是否販售
export const choiceOption = [
  {
    name: "是否販售？",
    type: "status",
    selected: true,
    children: [
      { id: 1, name: "是" },
      { id: 2, name: "否" },
    ],
  },
];
