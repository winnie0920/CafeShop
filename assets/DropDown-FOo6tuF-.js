import{_ as C,N,O as V,y as B,o as M,H as x,h as o,c as t,f as e,t as i,q as l,s as D,d as h,P as A,e as v,k as E,F as L,l as b,T as q,v as z,w as F,m as I}from"./index-BjlnAQqZ.js";import{u as O}from"./showStore-m6tnM1e-.js";const T={key:0,class:"list__title mb-1"},$={key:0,class:"list__drop"},j=["onClick"],H={__name:"DropDown",props:N({data:{type:Array},dropdown:{type:Object,required:!0}},{modelValue:{default:{id:-1,name:"請選擇"}},modelModifiers:{}}),emits:["update:modelValue"],setup(d){const s=O(),m=d,{drop:n,width:f,iconName:a,title:c,active:g}=m.dropdown,k=V(d,"modelValue"),S=()=>{s.toggleShow(n)},_=p=>{k.value=p},y=B({get(){return[{id:-1,name:"請選擇"},...m.data]}}),u=()=>{s.dropdownShow[n]=!1};return M(()=>{_({id:-1,name:"請選擇"}),document.addEventListener("click",u)}),x(()=>{document.removeEventListener("click",u)}),(p,P)=>{const w=I;return o(),t("div",{class:z([{empty:!e(c),isSvg:e(a),isActive:e(g)},"list__container"]),onClick:F(S,["stop"])},[e(c)?(o(),t("p",T,i(e(c)),1)):l("",!0),e(a)?(o(),D(w,{key:1,iconName:e(a),class:"list__svg-first"},null,8,["iconName"])):l("",!0),h("h5",{style:A({width:e(f)})},i(e(s)[e(n)].name),5),v(w,{class:"list__svg-end",iconName:"Common-Arrow-Circle-Down"}),v(q,{name:"move-up"},{default:E(()=>[e(s).dropdownShow[e(n)]?(o(),t("ul",$,[(o(!0),t(L,null,b(e(y),r=>(o(),t("li",{onClick:U=>_(r),key:r.id,class:"list__drop-item"},[h("p",null,i(r.name),1)],8,j))),128))])):l("",!0)]),_:1})],2)}}},K=C(H,[["__scopeId","data-v-40082702"]]);export{K as _};