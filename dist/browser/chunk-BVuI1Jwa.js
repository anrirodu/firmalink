import{It as _p,b as BI,ir as xl,qt as cp,wt as UI}from"./main-23MESZPR.js";import{O as et,i as Ea}from"./chunk-6JLh25dE.js";var u=(()=>{class t{get vertical(){return this._vertical}set vertical(i){this._vertical=Ea(i)}_vertical=!1;get inset(){return this._inset}set inset(i){this._inset=Ea(i)}_inset=!1;static ɵfac=function(e){return new(e||t)};static ɵcmp=BI({type:t,selectors:[[`mat-divider`]],hostAttrs:[`role`,`separator`,1,`mat-divider`],hostVars:7,hostBindings:function(e,r){e&2&&(cp(`aria-orientation`,r.vertical?`vertical`:`horizontal`),_p(`mat-divider-vertical`,r.vertical)(`mat-divider-horizontal`,!r.vertical)(`mat-divider-inset`,r.inset))},inputs:{vertical:`vertical`,inset:`inset`},decls:0,vars:0,template:function(e,r){},styles:[`.mat-divider {
  display: block;
  margin: 0;
  border-top-style: solid;
  border-top-color: var(--%NS%mat-divider-color, var(--%NS%mat-sys-outline-variant));
  border-top-width: var(--%NS%mat-divider-width, 1px);
}
.mat-divider.mat-divider-vertical {
  border-top: 0;
  border-right-style: solid;
  border-right-color: var(--%NS%mat-divider-color, var(--%NS%mat-sys-outline-variant));
  border-right-width: var(--%NS%mat-divider-width, 1px);
}
.mat-divider.mat-divider-inset {
  margin-left: 80px;
}
[dir=rtl] .mat-divider.mat-divider-inset {
  margin-left: auto;
  margin-right: 80px;
}
`],encapsulation:2})}return t})();var f=(()=>{class t{static ɵfac=function(e){return new(e||t)};static ɵmod=UI({type:t});static ɵinj=xl({imports:[et]})}return t})();export{u as n,f as t};