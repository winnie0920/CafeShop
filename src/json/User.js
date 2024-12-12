export const homeSide = [
  {
    to: { name: "UserHome" },
    iconName: "Common-Home",
    label: "HOME",
  },
  {
    to: { name: "UserAbout" },
    iconName: "Common-About",
    label: "ABOUT",
  },
];

export const homeLanguage = [
  {
    id: "0",
    name: "EN",
  },
  {
    id: "1",
    name: "CH",
  },
];

export const homeItem = [
  {
    id: 1,
    name: "輕食",
    image: "food_Pescatora.png",
    count: 7,
  },
  {
    id: 2,
    name: "麵包",
    image: "food_Syokupan.png",
    count: 8,
  },
  {
    id: 3,
    name: "炸物",
    image: "food_Ebi_Fry.png",
    count: 6,
  },
  {
    id: 4,
    name: "甜點",
    image: "food_Tarte.png",
    count: 10,
  },
  {
    id: 5,
    name: "純茶",
    image: "food_Tea.png",
    count: 5,
  },
  {
    id: 6,
    name: "拿鐵",
    image: "food_Cafe.png",
    count: 5,
  },
  {
    id: 7,
    name: "那堤",
    image: "food_Milk.png",
    count: 6,
  },
  {
    id: 8,
    name: "冰沙",
    image: "food_Kakigoori.png",
    count: 3,
  },
];

export const homeMenu = [
  {
    id: 1,
    name: "輕食",
    content: "肉品源產地：台灣雞肉、豬肉、牛肉",
    children: [
      {
        id: 1,
        name: "波隆那肉醬義大利麵",
        price: 140,
        description: "台灣豬肉",
        image: "image-Pasta.jpg",
        count: 30,
        option: ["size", "noddle", "spicy"],
      },
      {
        id: 2,
        name: "茄汁肉醬丸子義大利麵",
        price: 160,
        description: "台灣豬肉、牛肉",
        image: "image-Pasta-2.jpg",
        count: 40,
        option: ["size", "noddle", "spicy"],
      },
      {
        id: 3,
        name: "義式水波蛋肉醬麵",
        price: 160,
        description: "台灣豬肉、牛肉",
        image: "image-Pasta-3.jpg",
        count: 50,
        option: ["size", "noddle"],
      },
      {
        id: 4,
        name: "奶油培羅勒蝦仁義大利麵",
        price: 170,
        image: "image-Pasta-4.jpg",
        count: 50,
        option: ["size", "noddle"],
      },
      {
        id: 5,
        name: "蒜味奶油菌菇雞肉義大利麵",
        price: 180,
        description: "台灣雞肉",
        image: "image-Pasta-5.jpg",
        count: 40,
      },
      {
        id: 6,
        name: "青蓉肉醬義大利麵",
        price: 150,
        description: "台灣豬肉",
        image: "image-Pasta-6.jpg",
        count: 50,
      },
      {
        id: 7,
        name: "香蒜白酒蛤蜊細麵",
        price: 150,
        image: "image-Pasta-7.jpg",
        count: 20,
      },
    ],
  },
  {
    id: 2,
    name: "麵包",
    children: [
      {
        id: 1,
        name: "伯爵可可司康",
        price: 70,
        image: "image-Scone.jpg",
        count: 30,
      },
      {
        id: 2,
        name: "藍莓顆粒貝果",
        price: 70,
        image: "image-Bagel.jpg",
        count: 30,
      },
      {
        id: 3,
        name: "可可減糖貝果",
        price: 80,
        image: "image-Bagel-2.jpg",
        count: 40,
      },
      {
        id: 4,
        name: "肉桂捲",
        price: 75,
        image: "image-CinnamonRoll.jpg",
        count: 50,
      },
      {
        id: 5,
        name: "蜂蜜牛奶麵包",
        price: 50,
        image: "image-Bread.jpg",
        count: 50,
      },
      {
        id: 6,
        name: "培根起司軟歐麵包",
        price: 75,
        image: "image-Bread-2.jpg",
        count: 50,
      },
      {
        id: 7,
        name: "法式可頌",
        price: 65,
        image: "image-Bread-3.jpg",
        count: 25,
      },
      {
        id: 8,
        name: "海鹽奶油捲",
        price: 50,
        image: "image-Bread-4.png",
        count: 35,
      },
    ],
  },
  {
    id: 3,
    name: "炸物",
    children: [
      {
        id: 1,
        name: "薯條",
        price: 45,
        image: "food_Fried.jpeg",
        count: 70,
      },
      {
        id: 2,
        name: "雙色地瓜球",
        price: 40,
        image: "food_Fried-2.jpeg",
        count: 30,
      },
      {
        id: 3,
        name: "麥克雞塊",
        price: 65,
        description: "台灣雞肉",
        image: "food_Fried-3.jpeg",
        count: 20,
      },
      {
        id: 4,
        name: "薯餅",
        price: 30,
        image: "food_Fried-4.jpeg",
        count: 30,
      },
      {
        id: 5,
        name: "小肉豆",
        price: 45,
        description: "台灣豬肉",
        image: "food_Fried-5.jpeg",
        count: 50,
      },
      {
        id: 6,
        name: "小雞翅",
        price: 60,
        description: "台灣雞肉",
        image: "food_Fried-6.jpeg",
        count: 50,
      },
    ],
  },
  {
    id: 4,
    name: "甜食",
    children: [
      {
        id: 1,
        name: "巧克力布蕾戚風捲",
        price: 120,
        image: "image-Dessert.jpg",
        count: 100,
      },
      {
        id: 2,
        name: "蘋果卡士達熱壓可頌",
        price: 120,
        image: "image-Dessert-2.jpg",
        count: 90,
      },
      {
        id: 3,
        name: "栗子可可脆片蛋糕",
        price: 150,
        description: "台灣豬肉、牛肉",
        image: "image-Dessert-3.jpg",
        count: 120,
      },
      {
        id: 4,
        name: "開心果千層蛋塔",
        price: 120,
        image: "image-Dessert-4.jpg",
        count: 90,
      },
      {
        id: 5,
        name: "葡萄蘋果生乳捲",
        price: 130,
        image: "image-Dessert-5.jpg",
        count: 120,
      },
      {
        id: 6,
        name: "馬斯卡邦輕乳蛋糕",
        price: 90,
        image: "image-Dessert-6.jpg",
        count: 100,
      },
      {
        id: 7,
        name: "經典法式千層薄餅",
        price: 120,
        image: "image-Dessert-7.jpg",
        count: 90,
      },
      {
        id: 8,
        name: "黑森林蛋糕",
        price: 120,
        image: "image-Dessert-8.jpg",
        count: 90,
      },
      {
        id: 9,
        name: "可可伯爵薄餅",
        price: 130,
        image: "image-Dessert-9.jpg",
        count: 80,
      },
      {
        id: 10,
        name: "岩漿巧克力蛋糕",
        price: 90,
        image: "image-Dessert-10.jpg",
        count: 90,
      },
    ],
  },
  {
    id: 5,
    name: "純茶",
    children: [
      {
        id: 1,
        name: "冰搖紅茶",
        price: 95,
        image: "image-Tea.jpg",
        count: 100,
      },
      {
        id: 2,
        name: "阿里山蜜柚烏龍青茶",
        price: 145,
        image: "image-Tea-2.jpg",
        count: 90,
      },
      {
        id: 3,
        name: "冰奶香蜂蜜甜梨風味紅茶",
        price: 135,
        image: "image-Tea-3.jpg",
        count: 100,
      },
      {
        id: 4,
        name: "冰搖檸檬果茶",
        price: 110,
        image: "image-Tea-4.jpg",
        count: 80,
      },
      {
        id: 5,
        name: "冰蜜柚紅茶",
        price: 125,
        image: "image-Tea-5.jpg",
        count: 130,
      },
    ],
  },
  {
    id: 6,
    name: "咖啡",
    children: [
      {
        id: 1,
        name: "濃縮咖啡",
        price: 80,
        image: "image-Coffee.jpg",
        count: 90,
      },
      {
        id: 2,
        name: "摩卡",
        price: 135,
        image: "image-Coffee-2.jpg",
        count: 80,
      },
      {
        id: 3,
        name: "可可瑪奇朵",
        price: 140,
        image: "image-Coffee-3.jpg",
        count: 70,
      },
      {
        id: 4,
        name: "馥列白",
        price: 135,
        image: "image-Coffee-4.jpg",
        count: 80,
      },
      {
        id: 5,
        name: "卡布奇諾",
        price: 120,
        image: "image-Coffee-5.jpg",
        count: 130,
      },
    ],
  },
  {
    id: 7,
    name: "那堤",
    children: [
      {
        id: 1,
        name: "冰經典紅茶葛粉燕麥那堤",
        price: 160,
        image: "image-Milk.jpg",
        count: 90,
      },
      {
        id: 2,
        name: "冰芝麻抹茶那堤",
        price: 130,
        image: "image-Milk-2.jpg",
        count: 120,
      },
      {
        id: 3,
        name: "冰福吉茶那堤",
        price: 130,
        image: "image-Milk-3.jpg",
        count: 120,
      },
      {
        id: 4,
        name: "冰醇濃抹茶那堤",
        price: 135,
        image: "image-Milk-4.jpg",
        count: 80,
      },
      {
        id: 5,
        name: "冰玫瑰蜜香茶那堤",
        price: 130,
        image: "image-Milk-5.jpg",
        count: 130,
      },
      {
        id: 6,
        name: "冰經典紅茶那堤",
        price: 130,
        image: "image-Milk-6.jpg",
        count: 90,
      },
    ],
  },
  {
    id: 8,
    name: "冰沙",
    children: [
      {
        id: 1,
        name: "草莓巴西莓檸檬風味冰沙",
        price: 85,
        image: "image-Smoothies.jpg",
        count: 90,
      },
      {
        id: 2,
        name: "冰芝麻抹茶那堤",
        price: 130,
        image: "image-Milk-2.jpg",
        count: 120,
      },
    ],
  },
];

export const option = [
  {
    type: "size",
    name: "份量",
    isSingleChoice: false,
    children: [
      { id: 1, name: "小", price: 0, selected: true },
      { id: 2, name: "中", price: 10 },
      { id: 3, name: "大", price: 15 },
    ],
  },
  {
    type: "noddle",
    name: "麵體",
    isSingleChoice: true,
    children: [
      { id: 1, name: "細麵", price: 0 },
      { id: 2, name: "筆管麵", price: 10 },
      { id: 3, name: "螺旋麵", price: 10 },
    ],
  },
  {
    type: "spicy",
    name: "辣度",
    isSingleChoice: true,
    children: [
      { id: 1, name: "小辣", price: 0 },
      { id: 2, name: "中辣", price: 0 },
      { id: 3, name: "大辣", price: 0 },
    ],
  },
];

export const payOption = [
  {
    type: "size",
    name: "付款項目",
    isSingleChoice: true,
    children: [
      { id: 1, name: "現金付款" },
      { id: 2, name: "LINE PAY" },
    ],
  },
];

// id(pk) | orderNum | orderDate | orderStatus | PayStatus | table | allAmount | payMethod | remark | menuId | childId | foodName | foodCount | foodPrice | foodAmount | foodDescription | foodImage | optId | optKey | optVal |

// 1 | 20240001 | '2024-01-01' | '已完成' | '已付款' | 1 | 795 | '信用卡' | '' | 1 | 1 | '波隆那肉醬義大利麵' | 4 | 140 | 560 | '台灣豬肉' | "image-Pasta.jpg" | 1 | 'noodle' | 1 |

// 2 | 20240001 | '2024-01-01' | '已完成' | '已付款' | 1 | 795 | '信用卡' | '' | 1 | 1 | '波隆那肉醬義大利麵' | 4 | 140 | 560 | '台灣豬肉' | "image-Pasta.jpg" | 1 | 'spicy' | 2 |

// 3 | 20240001 | '2024-01-01' | '已完成' | '已付款' | 1 | 795 | '信用卡' | '' | 8 | 1 | '草莓巴西莓檸檬風味冰沙' | 2 | 85 | 170 | '' | "image-Smoothies.jpg" | 2 | null | null |

// 4 | 20240001 | '2024-01-01' | '已完成' | '已付款' | 1 | 795 | '信用卡' | '' | 1 | 7 | '香蒜白酒蛤蜊細麵' | 1 | 150 | 150 | '' | "image-Pasta-7.jpg" | 3 | 'noodle' | 3 |

// 5 | 20240001 | '2024-01-01' | '已完成' | '已付款' | 1 | 795 | '信用卡' | '' | 1 | 7 | '香蒜白酒蛤蜊細麵' | 1 | 150 | 150 | '' | "image-Pasta-7.jpg" | 3 | 'spicy' | 3 |

const data = [
  {
    id: 1,
    orderNum: 20240001,
    orderDate: "2024-01-01",
    orderStatus: "已完成",
    PayStatus: "已付款",
    table: 1,
    allAmount: 795,
    payMethod: "信用卡",
    remark: "無",
    menuList: [
      {
        id: 1,
        menuId: 1,
        childId: 1,
        name: "波隆那肉醬義大利麵",
        price: 140,
        amount: 560,
        description: "台灣豬肉",
        image: "image-Pasta.jpg",
        count: 4,
        option: {
          noodle: 1,
          spicy: 2,
        },
      },
      {
        id: 2,
        menuId: 8,
        childId: 1,
        name: "草莓巴西莓檸檬風味冰沙",
        price: 85,
        amount: 170,
        description: "",
        image: "image-Smoothies.jpg",
        count: 2,
      },
      {
        id: 1,
        menuId: 1,
        childId: 7,
        name: "香蒜白酒蛤蜊細麵",
        price: 150,
        amount: 150,
        description: "",
        image: "image-Pasta-7.jpg",
        count: 1,
        option: {
          noodle: 3,
          spicy: 3,
        },
      },
    ],
  },
];

const orderData = [
  {
    orderStatus: "1", //未完成
    PayStatus: "1", //未付款
    table: 1,
    allAmount: 795,
    payMethod: "1", //信用卡
    remark: "無",
    menuList: [
      {
        menuId: 1,
        childId: 1,
        price: 600,
        count: 4,
      },
      {
        menuId: 1,
        childId: 1,
        price: 140,
        count: 1,
        option: {
          noodle: 1,
          spicy: 2,
        },
      },
      {
        menuId: 1,
        childId: 1,
        price: 280,
        count: 2,
        option: {
          size: [1, 2],
          noodle: 1,
          spicy: 2,
        },
      },
    ],
  },
];
