import { u as z, _ as x, b as S, a as C } from "./ConfirmBtn-CJsd-lR-.js";
import { p as B } from "./UserHome-CXLP5dFp.js";
import {
  _ as P,
  l as U,
  m as v,
  c as _,
  a as e,
  b as o,
  u,
  F as f,
  d as $,
  J as N,
  w as V,
  o as m,
  t as i,
  g as O,
} from "./index-Dv0RfSXu.js";
const F = { class: "row g-lg-5 g-4" },
  I = { class: "col-lg-8 col-12" },
  A = { class: "new__container new__scrollbar" },
  E = { class: "mb-3 new__menu-content check__inputBox" },
  H = { class: "col-md-6 col-12" },
  D = { class: "col-lg-4 col-12" },
  J = { class: "new__container new__width" },
  L = { class: "new__content" },
  R = { class: "User__shop-option" },
  X = { class: "new__container flex-row mb-5 mb-lg-0" },
  j = {
    __name: "UserCheckout",
    setup(q) {
      const p = U(),
        a = z(),
        d = O(),
        r = v([...B]),
        h = v([
          {
            name: "肉醬義大利麵",
            count: 1,
            size: "小份",
            spicy: "小辣",
            price: 130,
          },
          {
            name: "肉醬義大利麵",
            count: 1,
            size: "小份",
            spicy: "小辣",
            price: 130,
          },
          {
            name: "肉醬義大利麵",
            count: 1,
            size: "小份",
            spicy: "小辣",
            price: 130,
          },
          {
            name: "肉醬義大利麵",
            count: 1,
            size: "小份",
            spicy: "小辣",
            price: 130,
          },
          {
            name: "肉醬義大利麵",
            count: 1,
            size: "小份",
            spicy: "小辣",
            price: 130,
          },
          {
            name: "肉醬義大利麵",
            count: 1,
            size: "小份",
            spicy: "小辣",
            price: 130,
          },
          {
            name: "肉醬義大利麵",
            count: 1,
            size: "小份",
            spicy: "小辣",
            price: 130,
          },
          {
            name: "肉醬義大利麵",
            count: 1,
            size: "小份",
            spicy: "小辣",
            price: 130,
          },
          {
            name: "肉醬義大利麵",
            count: 1,
            size: "小份",
            spicy: "小辣",
            price: 130,
          },
          {
            name: "肉醬義大利麵",
            count: 1,
            size: "小份",
            spicy: "小辣",
            price: 130,
          },
          {
            name: "肉醬義大利麵",
            count: 1,
            size: "小份",
            spicy: "小辣",
            price: 130,
          },
          {
            name: "肉醬義大利麵",
            count: 1,
            size: "小份",
            spicy: "小辣",
            price: 130,
          },
          {
            name: "肉醬義大利麵",
            count: 1,
            size: "小份",
            spicy: "小辣",
            price: 130,
          },
          {
            name: "肉醬義大利麵",
            count: 1,
            size: "小份",
            spicy: "小辣",
            price: 130,
          },
        ]),
        w = () => {
          d.push({ name: "UserHome" });
        },
        b = () => {
          p.clearError();
          const t = [
              {
                id: "tableNumber",
                name: "桌號",
                message: "請輸入正確桌號，請勿輸入英文字母",
              },
            ].every((n) => p.validateInput(n.id, n.name, n.message)),
            c = Array.isArray(r.value) && p.validateOption(r.value);
          !t || !c || a.togglePopupShow("check", !0);
        },
        y = () => {
          a.togglePopupShow("check", !1), d.push({ name: "UserHome" });
        },
        g = (l) => {
          a.togglePopupShow("check", l);
        };
      return (l, t) => {
        const c = x,
          n = S,
          k = C;
        return (
          m(),
          _(
            f,
            null,
            [
              e("section", F, [
                e("div", I, [
                  e("div", A, [
                    e("div", E, [
                      e("div", H, [
                        o(c, {
                          regex: /^[0-9]{1,2}$/,
                          type: "input",
                          id: "tableNumber",
                          name: "桌號",
                        }),
                      ]),
                      t[2] || (t[2] = e("hr", { class: "mb-3" }, null, -1)),
                      o(
                        c,
                        {
                          style: { padding: "0" },
                          option: u(r),
                          type: "select",
                        },
                        null,
                        8,
                        ["option"]
                      ),
                      o(c, { type: "textarea", id: "remark", name: "備註" }),
                      t[3] || (t[3] = e("hr", { class: "mb-3" }, null, -1)),
                    ]),
                  ]),
                ]),
                e("div", D, [
                  e("div", J, [
                    t[4] || (t[4] = e("h3", { class: "mb-4" }, "您的訂單", -1)),
                    e("div", L, [
                      (m(!0),
                      _(
                        f,
                        null,
                        $(
                          u(h),
                          (s) => (
                            m(),
                            _(
                              "div",
                              { class: "mb-3 new__menu-content", key: s.index },
                              [
                                e("div", null, [
                                  e(
                                    "p",
                                    null,
                                    i(s.name) + " X" + i(s.count),
                                    1
                                  ),
                                  e("p", R, i(s.size) + " " + i(s.spicy), 1),
                                ]),
                                e("p", null, i(s.price), 1),
                              ]
                            )
                          )
                        ),
                        128
                      )),
                    ]),
                    t[5] ||
                      (t[5] = N(
                        '<hr class="new__hr" data-v-f29ef9b7><div class="new__floor" data-v-f29ef9b7></div><div class="new__gray-text new__menu-content mb-2" data-v-f29ef9b7><p data-v-f29ef9b7>小計</p><p data-v-f29ef9b7>$100</p></div><div class="new__gray-text new__menu-content mb-2" data-v-f29ef9b7><p data-v-f29ef9b7>服務費</p><p data-v-f29ef9b7>$10</p></div><div class="new__strong-text new__menu-content mt-4" data-v-f29ef9b7><h2 data-v-f29ef9b7>總計</h2><h2 data-v-f29ef9b7>$110</h2></div>',
                        5
                      )),
                  ]),
                  e("div", X, [
                    o(n, {
                      class: "ms-auto me-3",
                      title: "送出訂單",
                      onClick: t[0] || (t[0] = (s) => b()),
                    }),
                    o(n, {
                      color: "gray",
                      title: "取消",
                      onClick: t[1] || (t[1] = (s) => w()),
                    }),
                  ]),
                ]),
              ]),
              o(
                k,
                {
                  show: u(a).popupShow.check,
                  title: "送出訂單",
                  button: "確認",
                  onCloseShow: g,
                  onConfirmPopup: y,
                  style: { width: "30rem", height: "15rem" },
                },
                {
                  main: V(
                    () =>
                      t[6] ||
                      (t[6] = [
                        e(
                          "div",
                          { class: "popup__text-content" },
                          [e("p", null, "是否確定送出？")],
                          -1
                        ),
                      ])
                  ),
                  _: 1,
                },
                8,
                ["show"]
              ),
            ],
            64
          )
        );
      };
    },
  },
  Q = P(j, [["__scopeId", "data-v-f29ef9b7"]]);
export { Q as default };
