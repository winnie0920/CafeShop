import{_ as h}from"./ConfirmBtn-Bio-Qf65.js";import{_ as w}from"./CheckInput-B3X8O6x1.js";import{_ as k,u as b,a as y,b as v,r as A,o as S,c as x,d as t,w as C,e as s,f as V,g as i,h as B,i as L}from"./index-BjlnAQqZ.js";import{_ as T}from"./Logo-coffee-CrTyvvxg.js";import{l as M,a as E}from"./Admin-CYE_-21Z.js";const I={class:"login__container"},O={class:"new__container"},z={__name:"LoginView",setup(F){const o=b(),r=y(),c=v(),m=A([...M]),u=[{id:"account",message:"帳號有誤，請重新輸入。"},{id:"password",message:"密碼有誤，請重新輸入。"}],p=async()=>{f()&&_()&&(l(),r.pushMsg("Common-Ok","登入成功","brown"),c.saveToken({name:o.choice.account,role:"admin"}),c.verifyToken()&&L.push({name:"AdminLayout"}))},d=()=>{const n=i.getCookie("account");n&&(o.choice.account=n)},l=()=>{o.choice.remember&&i.setCookie("account",o.choice.account,1)},_=()=>E.find(e=>e.account===o.choice.account&&e.password===o.choice.password)?!0:(r.pushMsg("Common-Error","帳號或密碼錯誤，請重新輸入。"),!1),f=()=>(o.clearError(),!u.map(e=>o.validateInput(e.id,e.name,e.message)).includes(!1));return S(()=>{d()}),(n,e)=>{const a=w,g=h;return B(),x("div",I,[e[0]||(e[0]=t("img",{src:T,alt:"loginLogo"},null,-1)),t("div",O,[t("form",{class:"check__inputBox",onSubmit:C(p,["prevent"])},[s(a,{regex:/^[a-zA-Z0-9]{4,}$/,basic:{type:"input",id:"account",name:"帳號"}}),s(a,{style:{marginTop:"0.5rem"},regex:/^[a-zA-Z0-9]{4,}$/,basic:{type:"password",id:"password",name:"密碼"}}),s(a,{style:{padding:"0",marginTop:"1rem"},option:V(m),basic:{type:"select"}},null,8,["option"]),t("div",null,[s(g,{styles:"brown",class:"justify-content-center w-100",title:"登入",type:"submit"})])],32)])])}}},D=k(z,[["__scopeId","data-v-aa8d471b"]]);export{D as default};