export const adminSide = [
  {
    to: { name: "AdminMeal" },
    iconName: "User-Meal",
    label: "MEAL",
    name: "餐點分類",
  },
  {
    to: { name: "AdminTheme" },
    iconName: "User-Theme",
    label: "THEME",
    name: "主題分類",
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

export const loginOption = [
  {
    type: "remember",
    isSingleChoice: true,
    children: [{ id: 1, name: "記住帳號？" }],
  },
];

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
