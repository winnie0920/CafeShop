import{u as w,_ as y}from"./showStore-m6tnM1e-.js";import{_ as P,a as v,r as x,o as k,h as p,c as m,d as t,f as n,e as g,k as C,F as U,m as j}from"./index-BjlnAQqZ.js";import{u as b}from"./imageStore-fQkg73oQ.js";const B={class:"uploadImg__container",for:"uploadImg"},E=["src"],A={key:1,class:"h-100 d-flex gap-2 flex-column justify-content-center align-items-center uploadImg__tip"},F={__name:"AdminUploadImg",props:{image:{type:String,required:!1}},setup(i){const r=i,c=v(),o=b(),a=w(),u=x(null),_=s=>{const e=s.target.files[0],l=u.value;e&&d(e)&&o.getImageUrl(e),l&&(l.value="")},d=s=>["image/jpeg","image/jpg","image/png"].includes(s.type)?!0:(c.pushMsg("Common-Error","只能上傳JPEG、JPG格式的圖片格式。"),!1),f=()=>{a.togglePopupShow("meal",!0)},I=()=>{o.clearImage(),a.togglePopupShow("meal",!1)},h=s=>{a.togglePopupShow("meal",!1)};return k(()=>{o.clearImage(),r.image&&(o.uploadImg=r.image)}),(s,e)=>{const l=j,S=y;return p(),m(U,null,[t("input",{class:"uploadImg__file",type:"file",id:"uploadImg",name:"uploadImg",ref_key:"fileInput",ref:u,accept:".jpg, .jpeg, .png, .gif",onChange:_},null,544),t("label",B,[e[1]||(e[1]=t("input",{class:"d-none",type:"text",name:"stopPop",id:"stopPop"},null,-1)),n(o).uploadImg||n(o).localUploadImg?(p(),m("label",{key:0,for:"stopPop",onClick:f},[t("img",{src:n(o).localUploadImg||n(o).getImageUrl(n(o).uploadImg),alt:"uploaded"},null,8,E)])):(p(),m("div",A,[g(l,{"icon-name":"User-Camera"}),e[0]||(e[0]=t("p",null,"請選擇上傳圖片",-1))]))]),g(S,{show:n(a).popupShow.meal,title:"送出訂單",button:"確認",onCloseShow:h,onConfirmPopup:I,style:{width:"30rem",height:"15rem"}},{main:C(()=>e[2]||(e[2]=[t("div",{class:"popup__text-content"},[t("p",null,"是否確定送出？")],-1)])),_:1},8,["show"])],64)}}},N=P(F,[["__scopeId","data-v-c7db9d10"]]);export{N as _};