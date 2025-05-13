import{c as p,n as $,h as u,j as h,d as v}from"./index-DNOp9Mq_.js";import{r as i}from"./router-GXfyPTrP.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=p("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),c="horizontal",m=["horizontal","vertical"],s=i.forwardRef((e,r)=>{const{decorative:o,orientation:t=c,...a}=e,n=d(t)?t:c,l=o?{role:"none"}:{"aria-orientation":n==="vertical"?n:void 0,role:"separator"};return i.createElement($.div,u({"data-orientation":n},l,a,{ref:r}))});s.propTypes={orientation(e,r,o){const t=e[r],a=String(t);return t&&!d(t)?new Error(x(a,o)):null}};function x(e,r){return`Invalid prop \`orientation\` of value \`${e}\` supplied to \`${r}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${c}\`.`}function d(e){return m.includes(e)}const f=s,E=i.forwardRef(({className:e,orientation:r="horizontal",decorative:o=!0,...t},a)=>h.jsx(f,{ref:a,decorative:o,orientation:r,className:v("shrink-0 bg-zinc-200 dark:bg-zinc-800",r==="horizontal"?"h-[1px] w-full":"h-full w-[1px]",e),...t}));E.displayName=f.displayName;export{I as C,E as S};
