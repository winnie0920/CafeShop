import {
  _ as c,
  r as l,
  o as s,
  c as a,
  a as t,
  b as e,
  w as r,
  F as p,
  d as f,
  t as b,
  u as g,
  e as h,
} from "./index-Dv0RfSXu.js";
import { h as v } from "./UserHome-CXLP5dFp.js";
const k = "/CafeShop/assets/Logo-coffee-BIeBqaO9.png",
  S = { class: "sidebar__container d-lg-block d-none" },
  x = { class: "sidebar__head" },
  B = {
    __name: "UserSide",
    setup(i) {
      return (d, o) => {
        const n = l("router-link"),
          u = h;
        return (
          s(),
          a("nav", S, [
            t("div", x, [
              e(
                n,
                { to: { name: "UserHome" } },
                {
                  default: r(
                    () =>
                      o[0] || (o[0] = [t("img", { src: k, alt: "" }, null, -1)])
                  ),
                  _: 1,
                }
              ),
              t("ul", null, [
                (s(!0),
                a(
                  p,
                  null,
                  f(
                    g(v),
                    (_, m) => (
                      s(),
                      a("li", { key: m }, [
                        e(
                          n,
                          { to: _.to, class: "sidebar__item" },
                          {
                            default: r(() => [
                              e(u, { "icon-name": _.iconName }, null, 8, [
                                "icon-name",
                              ]),
                              t("h3", null, b(_.label), 1),
                            ]),
                            _: 2,
                          },
                          1032,
                          ["to"]
                        ),
                      ])
                    )
                  ),
                  128
                )),
              ]),
            ]),
          ])
        );
      };
    },
  },
  w = c(B, [["__scopeId", "data-v-4bb86d95"]]),
  I = {};
function U(i, d) {
  const o = w,
    n = l("RouterView");
  return s(), a("div", null, [e(o), e(n)]);
}
const C = c(I, [
  ["render", U],
  ["__scopeId", "data-v-1a45009a"],
]);
export { C as default };
