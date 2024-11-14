import {
  _ as g,
  o as s,
  k as x,
  w as N,
  c as n,
  a as r,
  n as m,
  B as C,
  j as B,
  b as y,
  t as p,
  i as c,
  C as S,
  T as F,
  e as $,
  l as I,
  p as O,
  F as u,
  z as f,
  D as b,
  u as d,
  d as v,
  h as w,
  f as P,
  A as V,
} from "./index-Dv0RfSXu.js";
const M = { key: 0, class: "popup__header" },
  j = { class: "popup__content" },
  z = {
    __name: "UserPopup",
    props: {
      show: { type: Boolean, required: !0 },
      style: {
        type: Object,
        default: () => ({ width: "30rem", height: "40vh" }),
      },
      title: String,
      button: String,
      isFull: Boolean,
    },
    emits: ["closeShow", "confirmPopup"],
    setup(i, { emit: t }) {
      const e = i,
        _ = t,
        a = () => {
          _("closeShow", !1);
        },
        o = () => {
          _("confirmPopup");
        };
      return (l, h) => {
        const k = $;
        return (
          s(),
          x(
            F,
            { name: "opacity" },
            {
              default: N(() => [
                e.show
                  ? (s(),
                    n("div", { key: 0, class: "popup__wrapper", onClick: a }, [
                      r(
                        "div",
                        {
                          ref: "containerDOM",
                          class: m([
                            "popup__container",
                            { "full-size": i.isFull },
                          ]),
                          style: C(i.style),
                          onClick: h[0] || (h[0] = B(() => {}, ["stop"])),
                        },
                        [
                          y(k, {
                            class: "popup__close",
                            "icon-name": "Common-Add",
                            onClick: a,
                          }),
                          e.title
                            ? (s(),
                              n("header", M, [
                                r("h2", null, p(e.title), 1),
                                y(k, {
                                  class: "popup__close",
                                  "icon-name": "Common-Add",
                                  onClick: a,
                                }),
                              ]))
                            : c("", !0),
                          r("div", j, [S(l.$slots, "main", {}, void 0, !0)]),
                          r(
                            "footer",
                            {
                              class: m([
                                "popup__footer",
                                { "none-radius ": i.isFull },
                              ]),
                            },
                            [
                              S(l.$slots, "footer", {}, void 0, !0),
                              r(
                                "button",
                                {
                                  class: "ms-auto popup__footer-button",
                                  onClick: o,
                                },
                                p(e.button),
                                1
                              ),
                            ],
                            2
                          ),
                        ],
                        6
                      ),
                    ]))
                  : c("", !0),
              ]),
              _: 3,
            }
          )
        );
      };
    },
  },
  Z = g(z, [["__scopeId", "data-v-b86b1981"]]),
  A = ["for"],
  D = ["id", "placeholder"],
  T = ["for"],
  U = ["id", "placeholder"],
  q = { key: 0 },
  E = { key: 1 },
  L = ["name", "id", "value", "onChange"],
  R = ["for"],
  G = ["id", "value", "onChange"],
  H = ["for"],
  J = { key: 4 },
  K = { key: 5 },
  Q = {
    __name: "CheckInput",
    props: {
      option: { type: [Array, Object], required: !1 },
      id: String,
      name: String,
      type: String,
      regex: RegExp,
      style: Object,
    },
    setup(i) {
      const t = I(),
        e = i;
      return (
        O(() => {
          e.id &&
            ((t.choice = { ...t.choice, [e.id]: "" }),
            (t.regex = { ...t.regex, [e.id]: e.regex }));
        }),
        (_, a) => (
          s(),
          n(
            u,
            null,
            [
              e.type === "textarea"
                ? (s(),
                  n(
                    u,
                    { key: 0 },
                    [
                      r(
                        "label",
                        { for: e.id, class: "form-label" },
                        p(e.name),
                        9,
                        A
                      ),
                      f(
                        r(
                          "textarea",
                          {
                            class: "mb-3",
                            type: "text",
                            id: e.id,
                            placeholder: `請輸入${e.name}`,
                            "onUpdate:modelValue":
                              a[0] || (a[0] = (o) => (d(t).choice[e.id] = o)),
                            rows: "4",
                          },
                          null,
                          8,
                          D
                        ),
                        [[b, d(t).choice[e.id]]]
                      ),
                    ],
                    64
                  ))
                : c("", !0),
              e.type === "input"
                ? (s(),
                  n(
                    u,
                    { key: 1 },
                    [
                      r(
                        "label",
                        { for: e.id, class: "form-label" },
                        p(e.name),
                        9,
                        T
                      ),
                      f(
                        r(
                          "input",
                          {
                            class: "mb-3",
                            type: "text",
                            id: e.id,
                            placeholder: `請輸入${e.name}`,
                            "onUpdate:modelValue":
                              a[1] || (a[1] = (o) => (d(t).choice[e.id] = o)),
                          },
                          null,
                          8,
                          U
                        ),
                        [[b, d(t).choice[e.id]]]
                      ),
                    ],
                    64
                  ))
                : c("", !0),
              e.type === "select"
                ? (s(),
                  n(
                    "div",
                    { key: 2, style: C(i.style), class: "popup__text-option" },
                    [
                      (s(!0),
                      n(
                        u,
                        null,
                        v(
                          i.option,
                          (o) => (
                            s(),
                            n("ul", { key: o.id }, [
                              r("div", null, [
                                r("h3", null, p(o.name) + "選項", 1),
                                r(
                                  "div",
                                  {
                                    class: m({
                                      "popup__message-error":
                                        d(t).errorMessages[o.type],
                                    }),
                                  },
                                  " 必填 ",
                                  2
                                ),
                              ]),
                              o.isSingleChoice
                                ? (s(), n("h5", q, "請擇一選擇"))
                                : (s(), n("h5", E, "可多選擇")),
                              (s(!0),
                              n(
                                u,
                                null,
                                v(
                                  o.children,
                                  (l) => (
                                    s(),
                                    n("li", { key: l.id }, [
                                      o.isSingleChoice
                                        ? (s(),
                                          n(
                                            "input",
                                            {
                                              key: 0,
                                              type: "radio",
                                              name: o.type,
                                              id: `radio-${o.type}-${l.id}`,
                                              value: l.id,
                                              onChange: (h) =>
                                                d(t).singleOption(o.type, l.id),
                                            },
                                            null,
                                            40,
                                            L
                                          ))
                                        : c("", !0),
                                      o.isSingleChoice
                                        ? (s(),
                                          n(
                                            "label",
                                            {
                                              key: 1,
                                              for: `radio-${o.type}-${l.id}`,
                                            },
                                            [
                                              a[2] ||
                                                (a[2] = r(
                                                  "span",
                                                  { class: "check__and-radio" },
                                                  null,
                                                  -1
                                                )),
                                              w(" " + p(l.name), 1),
                                            ],
                                            8,
                                            R
                                          ))
                                        : (s(),
                                          n(
                                            "input",
                                            {
                                              key: 2,
                                              type: "checkbox",
                                              id: `checkbox-${o.type}-${l.id}`,
                                              value: l.id,
                                              onChange: (h) =>
                                                d(t).pluralOption(o.type, l.id),
                                            },
                                            null,
                                            40,
                                            G
                                          )),
                                      o.isSingleChoice
                                        ? c("", !0)
                                        : (s(),
                                          n(
                                            "label",
                                            {
                                              key: 3,
                                              for: `checkbox-${o.type}-${l.id}`,
                                            },
                                            [
                                              a[3] ||
                                                (a[3] = r(
                                                  "span",
                                                  { class: "check__and-mark" },
                                                  null,
                                                  -1
                                                )),
                                              w(" " + p(l.name), 1),
                                            ],
                                            8,
                                            H
                                          )),
                                      l.price
                                        ? (s(), n("p", J, "$" + p(l.price), 1))
                                        : (s(), n("p", K, "免費")),
                                    ])
                                  )
                                ),
                                128
                              )),
                              a[4] ||
                                (a[4] = r("hr", { class: "mb-4" }, null, -1)),
                            ])
                          )
                        ),
                        128
                      )),
                    ],
                    4
                  ))
                : c("", !0),
            ],
            64
          )
        )
      );
    },
  },
  ee = g(Q, [["__scopeId", "data-v-4e79f60b"]]),
  te = P("web", {
    state: () => ({
      sLanguage: { id: -1, name: "請選擇" },
      show: [{ language: !1 }],
      popupShow: { menu: !1, check: !1 },
      shoppingShow: !1,
    }),
    getters: {},
    actions: {
      toggleShow(i) {
        i && (this.show[i] = !this.show[i]);
      },
      togglePopupShow(i, t) {
        this.popupShow[i] = t;
      },
    },
  }),
  W = { key: 0 },
  X = {
    __name: "ConfirmBtn",
    props: {
      iconName: { type: String, default: "" },
      title: { type: String },
      color: { type: String },
    },
    setup(i) {
      const t = i;
      return (e, _) => {
        const a = $;
        return (
          s(),
          n(
            "button",
            { class: m(["drop__btn", { gray: t.color === "gray" }]) },
            [
              f(
                y(
                  a,
                  { iconName: t.iconName, class: "list__svg-first" },
                  null,
                  8,
                  ["iconName"]
                ),
                [[V, t.iconName]]
              ),
              t.title ? (s(), n("h5", W, p(t.title), 1)) : c("", !0),
            ],
            2
          )
        );
      };
    },
  },
  oe = g(X, [["__scopeId", "data-v-610fca2f"]]);
export { ee as _, Z as a, oe as b, te as u };
