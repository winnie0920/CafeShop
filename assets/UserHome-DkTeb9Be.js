import{_ as z,n as J,o as D,h as s,c as i,d as e,f as o,F as P,l as j,t as _,p as ee,q as x,e as g,k as E,w as K,s as V,T as oe,v as R,m as F,u as ie,r as $,x as te,y as ne,z as ce,A as ae,B as ue,C as re,D as de,E as _e,G as pe,H as me,j as he}from"./index-BjlnAQqZ.js";import{u as H}from"./menuStore-BJYWBjqX.js";import{u as Q}from"./imageStore-fQkg73oQ.js";import{u as X,_ as se}from"./showStore-m6tnM1e-.js";import{_ as ve}from"./CheckInput-B3X8O6x1.js";import{_ as ge}from"./ConfirmBtn-Bio-Qf65.js";import{_ as fe}from"./DropDown-FOo6tuF-.js";import{a as Se,o as G,b as ke,c as Z}from"./User-CfpT1Yns.js";const Ce={class:"User__shop-container"},be={class:"User__shop-content"},ye={key:0},we=["src"],$e={class:"d-flex flex-column justify-content-center gap-3 ms-3 flex-grow-1"},xe={key:0,class:"d-flex gap-2"},Ue={class:"User__shop-option"},Me={key:0},Ie={class:"menu__image"},Ae={class:"menu__btn-content"},We=["onClick"],Te=["onClick"],Be={key:1,class:"User__shop-clear"},Pe={class:"d-flex justify-content-between mb-2"},Ee={class:"d-flex justify-content-between"},Ve={class:"d-flex align-items-center"},Oe={__name:"UserSopping",props:{option:{type:Array,required:!0}},setup(T){const y=T,U=J(),d=H(),c=Q(),C=r=>y.option.reduce((a,m)=>{const t=Array.isArray(r[m.type])?r[m.type]:[r[m.type]];return a[m.type]=m.children.filter(p=>t.includes(p.id)),a},{});return D(()=>{sessionStorage.removeItem("selectedOptions")}),(r,a)=>{const m=F;return s(),i("div",Ce,[a[4]||(a[4]=e("h3",null,"購物車",-1)),e("div",be,[o(d).menuSelect.length!==0?(s(),i("div",ye,[(s(!0),i(P,null,j(o(d).menuSelect,t=>(s(),i("div",{class:"d-flex mt-3 mb-3 position-relative",key:`${t.menuId}-${t.childId}`},[e("img",{src:o(c).getImageUrl(t.detail.image),alt:"shopImage"},null,8,we),e("div",$e,[e("h4",null,_(t.detail.name),1),e("p",null,"$"+_(t.price),1),t.option?(s(),i("div",xe,[(s(!0),i(P,null,j(C(t.option),(p,u)=>(s(),i("div",{class:"d-flex",key:u},[(s(!0),i(P,null,j(p,(w,I)=>(s(),i("div",{key:w.id},[e("p",Ue,[ee(_(w.name),1),I<p.length-1?(s(),i("span",Me,"、")):x("",!0)])]))),128))]))),128))])):x("",!0),e("div",Ie,[g(oe,{name:"opacity"},{default:E(()=>[e("div",Ae,[e("button",{class:"menu__btn-trash",onClick:K(p=>o(d).removeMenuSelect(t.menuId,t.childId),["stop"])},[o(d).getCount(t.menuId,t.childId)==1?(s(),V(m,{key:0,"icon-name":"Common-Trash"})):x("",!0),o(d).getCount(t.menuId,t.childId)>1?(s(),V(m,{key:1,"icon-name":"Common-Minus"})):x("",!0)],8,We),e("div",null,[e("p",null,_(t.count),1)]),e("button",{class:"menu__btn-add",onClick:p=>o(d).addMenuSelect(t.menuId,t.detail)},[g(m,{"icon-name":"Common-Add"})],8,Te)])]),_:2},1024)])])]))),128))])):(s(),i("div",Be,[g(m,{class:"User__shop-icon","icon-name":"Common-Shopping-Clear"}),a[1]||(a[1]=e("p",null,"購物車目前暫無商品",-1))]))]),e("div",Pe,[a[2]||(a[2]=e("h5",null,"小計",-1)),e("h5",null,"$"+_(o(d).calculateTotal()),1)]),e("div",Ee,[a[3]||(a[3]=e("h5",null,"服務費",-1)),e("h5",null,"$"+_(Math.ceil(o(d).calculateTotal()*.1)),1)]),a[5]||(a[5]=e("hr",null,null,-1)),e("div",Ve,[e("button",{class:R(["User__shop-btn",{"disabled-button":o(d).menuSelect.length<=0}]),onClick:a[0]||(a[0]=t=>o(d).checkOrder(o(U)))}," 查看訂單 ",2)])])}}},le=z(Oe,[["__scopeId","data-v-b6c17f99"]]),Le=["id"],je={class:"menu__background"},Re=["onClick"],Ne={key:0},ze={class:"menu__image"},qe=["src"],De={key:0,class:"menu__btn"},Fe={class:"menu__btn-content"},He=["onClick"],Ke={class:"menu__btn-circle"},Ge={class:"menu__btn-add"},Je={key:1},Qe=["src"],Xe={class:"popup__text-content"},Ye={class:"d-flex gap-4 align-items-center"},Ze={__name:"UserMenuSelect",props:{option:{type:Array,required:!0}},emits:["currentWatchChoose"],setup(T,{expose:y,emit:U}){const d=T,c=H(),C=X(),r=ie(),a=Q(),m=U,t=$(null),p=$([]),u=$({}),w=n=>{C.togglePopupShow("menu",n)},I=()=>{if(u.value.option={...r.choice},u.value.detail={...t.value},Array.isArray(p.value)&&!r.validateOption(p.value))return;let n=c.findMenuItem(u.value.menuId,u.value.childId,u.value.option);u.value.price+=c.totalOptionPrice(p.value,u.value.option),c.debounceAction(()=>{n?n.count<t.value.count&&(n.count+=u.value.count,n.price=n.count*u.value.price):(c.pushMenuSelect(u.value),n=u.value),C.togglePopupShow("menu",!1)},1e3)},B=(n,l)=>{var h;p.value={},t.value=(h=c.homeMenu.find(v=>v.id===n))==null?void 0:h.children.find(v=>v.id===l),t.value.option&&t.value.option.length>0&&(p.value=d.option.filter(v=>t.value.option.includes(v.type)))},O=(n,l,h)=>{r.clearState(),B(n,l),u.value={menuId:n,childId:l,count:1,price:h},C.togglePopupShow("menu",!0)},N=(n,l)=>{B(n,l.id),p.value.length>0?O(n,l.id,l.price):c.addMenuSelect(n,l)},A=(n,l)=>ne(()=>Array.isArray(c.menuSelect)?c.menuSelect.some(h=>h.menuId===n&&h.childId===l&&h.option&&Object.keys(h.option).length>0):!1),b=()=>{u.value.count+=1},f=()=>{u.value.count>1&&(u.value.count-=1)},M=$(null),W=()=>{let n=null,l=1/0;c.homeMenu.forEach(h=>{const v=document.getElementById(h.id);if(v){const L=v.getBoundingClientRect().top;L>=0&&L<l&&(l=L,n=h.id)}}),m("currentWatchChoose",n)};return y({clickChoose:n=>{const l=document.getElementById(n);l&&l.scrollIntoView({behavior:"smooth"})}}),D(()=>{var n;(n=M.value)==null||n.addEventListener("scroll",W)}),te(()=>{var n;(n=M.value)==null||n.addEventListener("scroll",W)}),(n,l)=>{const h=F,v=ve,L=se;return s(),i(P,null,[e("div",{ref_key:"scrollContainer",ref:M,class:"menu__content"},[(s(!0),i(P,null,j(o(c).homeMenu,S=>(s(),i("div",{key:S.id},[e("h1",{id:S.id},_(S.name),9,Le),e("span",null,_(S.content),1),e("ul",je,[(s(!0),i(P,null,j(S.children,k=>(s(),i("li",{key:k.id,onClick:Y=>O(S.id,k.id,k.price)},[e("div",null,[e("h3",null,_(k.name),1),e("p",null,"$"+_(k.price),1),k.description?(s(),i("span",Ne,_(k.description),1)):x("",!0)]),e("div",ze,[e("img",{src:o(a).getImageUrl(k.image),alt:""},null,8,qe),g(oe,{name:"opacity"},{default:E(()=>[o(c).getCount(S.id,k.id)>0&&!A(S.id,k.id).value?(s(),i("div",De,[e("div",Fe,[e("button",{class:"menu__btn-trash",onClick:K(Y=>o(c).removeMenuSelect(S.id,k.id),["stop"])},[o(c).getCount(S.id,k.id)==1?(s(),V(h,{key:0,"icon-name":"Common-Trash"})):x("",!0),o(c).getCount(S.id,k.id)>1?(s(),V(h,{key:1,"icon-name":"Common-Minus"})):x("",!0)],8,He),e("div",null,[e("p",null,_(o(c).getCount(S.id,k.id)),1)]),l[2]||(l[2]=e("button",{class:"menu__btn-add"},null,-1))])])):x("",!0)]),_:2},1024),e("span",Ke,[e("button",Ge,[A(S.id,k.id).value?(s(),i("p",Je,_(o(c).getCount(S.id,k.id)),1)):(s(),V(h,{key:0,"icon-name":"Common-Add",onClick:K(Y=>N(S.id,k),["stop"])},null,8,["onClick"]))])])])],8,Re))),128))])]))),128))],512),g(L,{button:"放入購物車",show:o(C).popupShow.menu,onCloseShow:w,onConfirmPopup:I,style:{width:"50rem",height:"80vh"},isFull:"middle"},{main:E(()=>[e("img",{class:"popup__img",src:o(a).getImageUrl(o(t).image)},null,8,Qe),e("div",Xe,[e("h3",null,_(o(t).name),1),e("p",null,"$"+_(o(t).price),1),e("span",null,_(o(t).description),1),l[3]||(l[3]=e("hr",null,null,-1))]),g(v,{option:o(p),basic:{type:"select"}},null,8,["option"])]),footer:E(()=>[e("div",Ye,[e("button",{onClick:l[0]||(l[0]=S=>f()),class:R(["background-button",{"disabled-button":o(u).count<=1}])},[g(h,{class:"popup__minus","icon-name":"Common-Minus"})],2),e("p",null,_(o(u).count),1),e("button",{class:"background-button",onClick:l[1]||(l[1]=S=>b())},[g(h,{"icon-name":"Common-Add"})])])]),_:1},8,["show"])],64)}}},eo=z(Ze,[["__scopeId","data-v-39a3a7d3"]]),oo={class:"row justify-content-end d-flex"},to={class:"col-auto d-flex"},no={class:"col-auto d-flex"},so={class:"col-auto d-flex"},lo={class:"w-100"},io={class:"d-flex justify-content-between mb-2"},co={class:"d-flex justify-content-between"},ao={__name:"TitleBar",setup(T){const y=X(),U=J(),d=H(),c=$({drop:"language",width:"5rem",iconName:"Common-Earth"}),C=$(!1),r=()=>{C.value=window.innerWidth<=991},a=()=>{},m=()=>{C.value?y.togglePopupShow("shopping",!0):U.push({name:"UserHome"})},t=u=>{y.togglePopupShow("shopping",u)},p=()=>{t(!1),d.checkOrder(U)};return D(()=>{r(),window.addEventListener("resize",r)}),te(()=>{window.removeEventListener("resize",r)}),(u,w)=>{const I=fe,B=ge,O=le,N=se;return s(),i("header",oo,[ce(u.$slots,"default",{},void 0),e("div",to,[g(I,{modelValue:o(y).language,"onUpdate:modelValue":w[0]||(w[0]=A=>o(y).language=A),data:o(Se),dropdown:o(c)},null,8,["modelValue","data","dropdown"])]),e("div",no,[g(B,{iconName:"Common-Shopping",onClick:m})]),e("div",so,[g(B,{iconName:"Common-Menu",onClick:a})]),g(N,{class:"popup__none",show:o(y).popupShow.shopping,title:"購物車",onCloseShow:t,isFull:"large"},{main:E(()=>[g(O,{option:o(G)},null,8,["option"])]),footer:E(()=>[e("div",lo,[e("div",io,[w[1]||(w[1]=e("h5",null,"小計",-1)),e("h5",null,"$"+_(o(d).calculateTotal()),1)]),e("div",co,[w[2]||(w[2]=e("h5",null,"服務費",-1)),e("h5",null,"$"+_(Math.ceil(o(d).calculateTotal()*.1)),1)]),e("button",{onClick:p,class:R(["User__shop-btn",{"disabled-button":o(d).menuSelect.length<=0}])}," 查看訂單 ",2)])]),_:1},8,["show"])])}}},uo=z(ao,[["__scopeId","data-v-b211062e"]]),ro={class:"search__container"},_o={__name:"SearchBar",props:{value:String},emits:["sendSearch","submitSearch"],setup(T,{emit:y}){const U=T,d=y,c=()=>{d("submitSearch")},C=ne({get(){return U.value},set(r){d("sendSearch",r)}});return(r,a)=>{const m=F;return s(),i("div",ro,[ae(e("input",{class:"search__input",type:"text",id:"search",name:"search",placeholder:"Search here","onUpdate:modelValue":a[0]||(a[0]=t=>re(C)?C.value=t:null),onKeyup:de(c,["enter"])},null,544),[[ue,o(C)]]),e("button",{class:"search__icon",type:"button",onClick:c},[g(m,{"icon-name":"Common-Search"})])])}}},po=z(_o,[["__scopeId","data-v-3cb643b2"]]),mo={class:"User__container"},ho={class:"col-12 col-sm-7 col-md-6 col-lg-4 me-auto d-flex"},vo={key:1,class:"row g-5 User__side-row",style:{"margin-top":"0 !important"}},go={class:"col-12 col-lg-8 User__side-col"},fo={class:"User__side"},So=["onClick"],ko=["src"],Co={class:"col-12 col-lg-4 d-lg-block d-none mt-0"},bo={class:"User__side sticky-top"},yo={class:"User__footer d-block d-lg-none"},wo={__name:"UserHome",setup(T){const y=H(),U=Q(),d=X(),c=_e({search:""}),C=$(null),r=$(null),a=J(),m=$(1),t=$(!1),p=$(0),u=b=>c.search=b,w=()=>{r.value&&(t.value=r.value.scrollWidth>r.value.clientWidth)},I=b=>{const f=r.value;if(!f)return;const M=f.scrollLeft;p.value=f.scrollWidth-f.clientWidth;const W=f.clientWidth/2,q=typeof b=="number"?Math.max(0,Math.min(b,p.value)):b==="left"?Math.max(0,M-W):Math.min(p.value,M+W);f.scrollTo({left:q,behavior:"smooth"})},B=b=>{if(m.value=b,r.value){const f=r.value.querySelector("li").offsetWidth,M=r.value.clientWidth,W=(f+8)*b-M/2+f/2;I(Math.max(0,Math.min(W,p.value)))}C.value.clickChoose(b)},O=b=>{m.value=b},N=()=>{d.togglePopupShow("shopping",!0)},A=$(!1);return pe(()=>a.currentRoute.value.name,b=>{b==="UserCheckout"?A.value=!0:A.value=!1},{immediate:!0}),D(()=>{window.addEventListener("resize",w),w(),y.setHomeMenu(ke)}),me(()=>{window.removeEventListener("resize",w)}),(b,f)=>{const M=po,W=uo,q=he("router-view"),n=F,l=eo,h=le;return s(),i("div",mo,[g(W,{class:"sticky-top"},{default:E(()=>[e("div",ho,[o(A)?x("",!0):(s(),V(M,{key:0,class:"mb-4 mb-sm-0",value:o(c).search,onSendSearch:u},null,8,["value"]))])]),_:1}),o(A)?(s(),V(q,{key:0})):(s(),i("section",vo,[e("div",go,[e("div",fo,[o(t)?(s(),i("button",{key:0,class:"User__side-left",onClick:f[0]||(f[0]=v=>I("left"))},[g(n,{"icon-name":"Common-Arrow-Circle"})])):x("",!0),o(t)?(s(),i("button",{key:1,class:"User__side-right",onClick:f[1]||(f[1]=v=>I("right"))},[g(n,{"icon-name":"Common-Arrow-Circle"})])):x("",!0),e("ul",{class:R([{"User__side-label-margin":o(t)},"User__side-label"]),ref_key:"labelRef",ref:r},[(s(!0),i(P,null,j(o(Z),v=>(s(),i("li",{key:v.id,class:R({active:o(m)===v.id}),onClick:L=>B(v.id,o(Z))},[e("img",{src:o(U).getImageUrl(v.image),alt:""},null,8,ko),e("h5",null,[ee(_(v.name),1),e("span",null,"("+_(v.count)+")",1)])],10,So))),128))],2)]),g(l,{ref_key:"chooseRef",ref:C,option:o(G),onCurrentWatchChoose:O},null,8,["option"])]),e("div",Co,[e("div",bo,[g(h,{option:o(G)},null,8,["option"])])]),e("div",yo,[e("button",{onClick:N,class:R(["User__shop-btn d-flex",{"disabled-button":o(y).menuSelect.length<=0}])},[f[2]||(f[2]=e("span",{class:"mx-auto"},"查看購物車",-1)),e("span",null,"$ "+_(o(y).calculateTotal()),1)],2)])]))])}}},Bo=z(wo,[["__scopeId","data-v-e1db8d5b"]]);export{Bo as default};
