import{c as h,j as n,J as v,G as g,e as b}from"./index-B2fn0e3J.js";import{d as N,C as j,j as I}from"./useCustomQuery-BSE_bnCf.js";import{r as l}from"./router-DMIetGpf.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=h("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);function C({name:e,label:t,size:o,borderColor:a,inputValidation:r,...i}){const{control:u}=N();return n.jsx(j,{name:e,control:u,render:({field:{ref:d,...c},fieldState:{error:s}})=>n.jsxs(n.Fragment,{children:[n.jsx("label",{className:"text-muted-foreground text-xs font-bold",htmlFor:t,children:t}),n.jsx("textarea",{ref:d,...c,value:typeof c.value=="number"&&c.value===0?"":c.value,onInput:$=>{r&&I($,r)},className:`bg-transparent block w-full rounded-lg border dark:text-white ${o==="small"&&"p-1"||o==="medium"&&"p-3"||o==="large"&&"p-4"||"p-2"} placeholder-gray-500 focus:outline-none focus:z-10 
              ${s?"focus:border-red-400":"focus:border-indigo-400"}  
              ${s?"border-red-400":a??"border-gray-300"}
          `,...i}),s&&n.jsx("span",{className:"text-red-400 text-xs",children:s==null?void 0:s.message})]})})}const f="horizontal",R=["horizontal","vertical"],p=l.forwardRef((e,t)=>{const{decorative:o,orientation:a=f,...r}=e,i=m(a)?a:f,d=o?{role:"none"}:{"aria-orientation":i==="vertical"?i:void 0,role:"separator"};return l.createElement(v.div,g({"data-orientation":i},d,r,{ref:t}))});p.propTypes={orientation(e,t,o){const a=e[t],r=String(a);return a&&!m(a)?new Error(w(r,o)):null}};function w(e,t){return`Invalid prop \`orientation\` of value \`${e}\` supplied to \`${t}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${f}\`.`}function m(e){return R.includes(e)}const x=p,E=l.forwardRef(({className:e,orientation:t="horizontal",decorative:o=!0,...a},r)=>n.jsx(x,{ref:r,decorative:o,orientation:t,className:b("shrink-0 bg-zinc-200 dark:bg-zinc-800",t==="horizontal"?"h-[1px] w-full":"h-full w-[1px]",e),...a}));E.displayName=x.displayName;export{z as C,C as R,E as S};
