import{n as p,h as $,j as u,f as v}from"./index-C7Z2d9pn.js";import{r as i}from"./router-GXfyPTrP.js";const c="horizontal",x=["horizontal","vertical"],s=i.forwardRef((r,e)=>{const{decorative:o,orientation:t=c,...a}=r,n=f(t)?t:c,l=o?{role:"none"}:{"aria-orientation":n==="vertical"?n:void 0,role:"separator"};return i.createElement(p.div,$({"data-orientation":n},l,a,{ref:e}))});s.propTypes={orientation(r,e,o){const t=r[e],a=String(t);return t&&!f(t)?new Error(m(a,o)):null}};function m(r,e){return`Invalid prop \`orientation\` of value \`${r}\` supplied to \`${e}\`, expected one of:
  - horizontal
  - vertical

Defaulting to \`${c}\`.`}function f(r){return x.includes(r)}const d=s,h=i.forwardRef(({className:r,orientation:e="horizontal",decorative:o=!0,...t},a)=>u.jsx(d,{ref:a,decorative:o,orientation:e,className:v("shrink-0 bg-zinc-200 dark:bg-zinc-800",e==="horizontal"?"h-[1px] w-full":"h-full w-[1px]",r),...t}));h.displayName=d.displayName;export{h as S};
