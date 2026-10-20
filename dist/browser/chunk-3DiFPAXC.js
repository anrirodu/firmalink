import{At as R0,B as Eo,Ct as PI,D as Bp,Dt as Pu,Ft as S,G as Gc,I as Ef,In as jI,Jn as oh,Jt as Vp,Kn as mD,Kt as Um,Lt as T$1,M as DD,R as Eh,S as $c,Un as kp,Vt as UD,Wt as Ue$1,X as ID,Xn as pD,Xt as Wh,Yt as Wc,Zt as Wp,an as Z,at as Kp,gt as Mr,in as Yp,j as Cu,jn as gD,jt as RD,kt as Qv,m as me,mr as vD,nr as sD,ot as L0,qt as Uo,sn as ZE,tn as YE,tt as Jl,u as Yo,un as _E,ur as tw,ut as Lp,vt as NE,xr as zc,xt as Op,yn as bu,z as Ei,zn as k0}from"./main-MN3L4JXS.js";import{B as tt$1,F as qt,L as ss,N as mo,O as cs,W as zr,d as Kt,g as R,h as Pr,j as hn,k as et$1,z as tr}from"./chunk-CXZfQ-Rm.js";import{i as j,n as I,r as _}from"./chunk-BbCkhr8b.js";import{A as nn,I as xt,N as qn,S as Wi,a as Dn,c as G,f as Ia,i as Ct,j as no,n as $e$1,t as $,v as Qr,y as Ra}from"./chunk-D3gFRIa_.js";import{D as qe,T as nn$1}from"./chunk-Da_PtdIA.js";import"./chunk-C8fv0Wnp.js";import{t as O}from"./chunk-Bo5m8Vo-.js";import{n as u,t as f}from"./chunk-CByaMlvF.js";import{n as Z$1,t as J}from"./chunk-DUxnEVQb.js";var Ge=[`*`];var Ue=(()=>{class o{labelPosition=`after`;static ɵfac=function(t){return new(t||o)};static ɵcmp=_E({type:o,selectors:[[``,`mat-internal-form-field`,``]],hostAttrs:[1,`mdc-form-field`,`mat-internal-form-field`],hostVars:2,hostBindings:function(t,n){t&2&&Kp(`mdc-form-field--align-end`,n.labelPosition===`before`)},inputs:{labelPosition:`labelPosition`},ngContentSelectors:Ge,decls:1,vars:0,template:function(t,n){t&1&&(gD(),mD(0))},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label, .mat-internal-form-field > .mat-internal-form-field-label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label, [dir=rtl] .mat-internal-form-field > .mat-internal-form-field-label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label, .mdc-form-field--align-end > .mat-internal-form-field-label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label, [dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end .mat-internal-form-field-label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2})}return o})();var We=[`switch`];var Xe=[`*`];function $e(o,a){o&1&&(Ei(0,`span`,11),Pu(),Ei(1,`svg`,13),Lp(2,`path`,14),$c(),Ei(3,`svg`,15),Lp(4,`path`,16),$c()())}var Ze=new S(`mat-slide-toggle-default-options`,{providedIn:`root`,factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})});var T=class{source;checked;constructor(a,e){this.source=a,this.checked=e}};var D=(()=>{class o{_elementRef=T$1(Mr);_focusMonitor=T$1(Kt);_changeDetectorRef=T$1(R0);defaults=T$1(Ze);_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new T(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=tt$1();_focused=!1;name=null;id;labelPosition=`after`;ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;fullWidth=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new Ue$1;toggleChange=new Ue$1;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){T$1(R).load(hn);let e=T$1(new Eh(`tabindex`),{optional:!0}),t=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=t.color||`accent`,this.id=this._uniqueId=T$1(qt).getId(`mat-mdc-slide-toggle-`),this.hideIcon=t.hideIcon??!1,this.disabledInteractive=t.disabledInteractive??!1,this._labelId=this._uniqueId+`-label`}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e===`keyboard`||e===`program`?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new T(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static ɵfac=function(t){return new(t||o)};static ɵcmp=_E({type:o,selectors:[[`mat-slide-toggle`]],viewQuery:function(t,n){if(t&1&&Wp(We,5),t&2){let m;vD(m=ID())&&(n._switchElement=m.first)}},hostAttrs:[1,`mat-mdc-slide-toggle`],hostVars:15,hostBindings:function(t,n){t&2&&(Vp(`id`,n.id),Op(`tabindex`,null)(`aria-label`,null)(`name`,null)(`aria-labelledby`,null),RD(n.color?`mat-`+n.color:``),Kp(`mat-mdc-slide-toggle-focused`,n._focused)(`mat-mdc-slide-toggle-checked`,n.checked)(`mat-slide-toggle-full-width`,n.fullWidth)(`_mat-animation-noopable`,n._noopAnimations))},inputs:{name:`name`,id:`id`,labelPosition:`labelPosition`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],required:[2,`required`,`required`,k0],color:`color`,disabled:[2,`disabled`,`disabled`,k0],fullWidth:[2,`fullWidth`,`fullWidth`,k0],disableRipple:[2,`disableRipple`,`disableRipple`,k0],tabIndex:[2,`tabIndex`,`tabIndex`,e=>e==null?0:L0(e)],checked:[2,`checked`,`checked`,k0],hideIcon:[2,`hideIcon`,`hideIcon`,k0],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,k0]},outputs:{change:`change`,toggleChange:`toggleChange`},exportAs:[`matSlideToggle`],features:[tw([{provide:$,useExisting:Eo(()=>o),multi:!0},{provide:G,useExisting:o,multi:!0}]),Um],ngContentSelectors:Xe,decls:14,vars:27,consts:[[`switch`,``],[`mat-internal-form-field`,``,3,`labelPosition`],[`role`,`switch`,`type`,`button`,1,`mdc-switch`,3,`click`,`tabIndex`,`disabled`],[1,`mat-mdc-slide-toggle-touch-target`],[1,`mdc-switch__track`],[1,`mdc-switch__handle-track`],[1,`mdc-switch__handle`],[1,`mdc-switch__shadow`],[1,`mdc-elevation-overlay`],[1,`mdc-switch__ripple`],[`mat-ripple`,``,1,`mat-mdc-slide-toggle-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mdc-switch__icons`],[1,`mdc-label`,3,`click`,`for`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--on`],[`d`,`M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--off`],[`d`,`M20 13H4v-2h16v2z`]],template:function(t,n){if(t&1&&(gD(),Ei(0,`div`,1)(1,`button`,2,0),Bp(`click`,function(){return n._handleClick()}),Lp(3,`div`,3)(4,`span`,4),Ei(5,`span`,5)(6,`span`,6)(7,`span`,7),Lp(8,`span`,8),$c(),Ei(9,`span`,9),Lp(10,`span`,10),$c(),ZE(11,$e,5,0,`span`,11),$c()()(),Ei(12,`label`,12),Bp(`click`,function(w){return w.stopPropagation()}),mD(13),$c()()),t&2){let m=DD(2);kp(`labelPosition`,n.labelPosition),Qv(),Kp(`mdc-switch--selected`,n.checked)(`mdc-switch--unselected`,!n.checked)(`mdc-switch--checked`,n.checked)(`mdc-switch--disabled`,n.disabled)(`mat-mdc-slide-toggle-disabled-interactive`,n.disabledInteractive),kp(`tabIndex`,n.disabled&&!n.disabledInteractive?-1:n.tabIndex)(`disabled`,n.disabled&&!n.disabledInteractive),Op(`id`,n.buttonId)(`name`,n.name)(`aria-label`,n.ariaLabel)(`aria-labelledby`,n._getAriaLabelledBy())(`aria-describedby`,n.ariaDescribedby)(`aria-required`,n.required||null)(`aria-checked`,n.checked)(`aria-disabled`,n.disabled&&n.disabledInteractive?`true`:null),Qv(9),kp(`matRippleTrigger`,m)(`matRippleDisabled`,n.disableRipple||n.disabled)(`matRippleCentered`,!0),Qv(),YE(n.hideIcon?-1:11),Qv(),kp(`for`,n.buttonId),Op(`id`,n._labelId)}},dependencies:[tr,Ue],styles:[`.mdc-switch {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  position: relative;
  width: var(--%NS%mat-slide-toggle-track-width, 52px);
}
.mdc-switch.mdc-switch--disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-switch.mat-mdc-slide-toggle-disabled-interactive {
  pointer-events: auto;
}

.mdc-switch__track {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--%NS%mat-slide-toggle-track-height, 32px);
  border-radius: var(--%NS%mat-slide-toggle-track-shape, var(--%NS%mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--%NS%mat-slide-toggle-disabled-track-opacity, 0.12);
}
.mdc-switch__track::before, .mdc-switch__track::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  border-width: var(--%NS%mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--%NS%mat-slide-toggle-track-outline-color, var(--%NS%mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--%NS%mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--%NS%mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--%NS%mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--%NS%mat-slide-toggle-disabled-unselected-track-outline-color, var(--%NS%mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--%NS%mat-slide-toggle-unselected-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--%NS%mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--%NS%mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--%NS%mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--%NS%mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-unselected-hover-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-unselected-focus-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-unselected-pressed-track-color, var(--%NS%mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-disabled-unselected-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--%NS%mat-slide-toggle-selected-track-color, var(--%NS%mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--%NS%mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--%NS%mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--%NS%mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--%NS%mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-selected-hover-track-color, var(--%NS%mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-selected-focus-track-color, var(--%NS%mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-selected-pressed-track-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-disabled-selected-track-color, var(--%NS%mat-sys-on-surface));
}

.mdc-switch__handle-track {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  right: auto;
  transform: translateX(0);
  width: calc(100% - var(--%NS%mat-slide-toggle-handle-width));
}
[dir=rtl] .mdc-switch__handle-track {
  left: auto;
  right: 0;
}
.mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(-100%);
}

.mdc-switch__handle {
  display: flex;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: auto;
  transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1), height 75ms cubic-bezier(0.4, 0, 0.2, 1), margin 75ms cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--%NS%mat-slide-toggle-handle-width);
  height: var(--%NS%mat-slide-toggle-handle-height);
  border-radius: var(--%NS%mat-slide-toggle-handle-shape, var(--%NS%mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--%NS%mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--%NS%mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--%NS%mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--%NS%mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--%NS%mat-slide-toggle-selected-handle-size, 24px);
  height: var(--%NS%mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--%NS%mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--%NS%mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--%NS%mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--%NS%mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--%NS%mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--%NS%mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--%NS%selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--%NS%mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--%NS%unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--%NS%mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--%NS%mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--%NS%mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
}
.mdc-switch__handle::before, .mdc-switch__handle::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1), border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
@media (forced-colors: active) {
  .mdc-switch__handle::before, .mdc-switch__handle::after {
    border-color: currentColor;
  }
}
.mdc-switch--%NS%selected:enabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-handle-color, var(--%NS%mat-sys-on-primary));
}
.mdc-switch--%NS%selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-hover-handle-color, var(--%NS%mat-sys-primary-container));
}
.mdc-switch--%NS%selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-focus-handle-color, var(--%NS%mat-sys-primary-container));
}
.mdc-switch--%NS%selected:enabled:active .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-pressed-handle-color, var(--%NS%mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--%NS%selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--%NS%selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--%NS%selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-disabled-selected-handle-color, var(--%NS%mat-sys-surface));
}
.mdc-switch--%NS%unselected:enabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-handle-color, var(--%NS%mat-sys-outline));
}
.mdc-switch--%NS%unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-hover-handle-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-switch--%NS%unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-focus-handle-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-switch--%NS%unselected:enabled:active .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-pressed-handle-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-disabled-unselected-handle-color, var(--%NS%mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--%NS%mat-slide-toggle-handle-surface-color);
}

.mdc-switch__shadow {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.mdc-switch:enabled .mdc-switch__shadow {
  box-shadow: var(--%NS%mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--%NS%mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--%NS%mat-slide-toggle-state-layer-size, 40px);
  height: var(--%NS%mat-slide-toggle-state-layer-size, 40px);
}
.mdc-switch__ripple::after {
  content: "";
  opacity: 0;
}
.mdc-switch--disabled .mdc-switch__ripple::after {
  display: none;
}
.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after {
  display: block;
}
.mdc-switch:hover .mdc-switch__ripple::after {
  transition: 75ms opacity cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--%NS%unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-unselected-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-slide-toggle-unselected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mdc-switch--%NS%unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-unselected-focus-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-slide-toggle-unselected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mdc-switch--%NS%unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-unselected-pressed-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--%NS%selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-selected-hover-state-layer-color, var(--%NS%mat-sys-primary));
  opacity: var(--%NS%mat-slide-toggle-selected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mdc-switch--%NS%selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-selected-focus-state-layer-color, var(--%NS%mat-sys-primary));
  opacity: var(--%NS%mat-slide-toggle-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mdc-switch--%NS%selected:enabled:active .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-selected-pressed-state-layer-color, var(--%NS%mat-sys-primary));
  opacity: var(--%NS%mat-slide-toggle-selected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}

.mdc-switch__icons {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  transform: translateZ(0);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons {
  opacity: var(--%NS%mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--%NS%mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
}

.mdc-switch__icon {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1);
}
.mdc-switch--unselected .mdc-switch__icon {
  width: var(--%NS%mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--%NS%mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--%NS%mat-slide-toggle-unselected-icon-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--%NS%mat-slide-toggle-disabled-unselected-icon-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--%NS%mat-slide-toggle-selected-icon-size, 16px);
  height: var(--%NS%mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--%NS%mat-slide-toggle-selected-icon-color, var(--%NS%mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--%NS%mat-slide-toggle-disabled-selected-icon-color, var(--%NS%mat-sys-on-surface));
}

.mdc-switch--selected .mdc-switch__icon--on,
.mdc-switch--unselected .mdc-switch__icon--off {
  opacity: 1;
  transition: opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1);
}

.mat-mdc-slide-toggle {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.mat-mdc-slide-toggle .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,
.mat-mdc-slide-toggle .mdc-switch__ripple::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),
.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty) {
  transform: translateZ(0);
}
.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-slide-toggle .mat-internal-form-field {
  color: var(--%NS%mat-slide-toggle-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-slide-toggle-label-text-font, var(--%NS%mat-sys-body-medium-font));
  line-height: var(--%NS%mat-slide-toggle-label-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-slide-toggle-label-text-size, var(--%NS%mat-sys-body-medium-size));
  letter-spacing: var(--%NS%mat-slide-toggle-label-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
  font-weight: var(--%NS%mat-slide-toggle-label-text-weight, var(--%NS%mat-sys-body-medium-weight));
}
.mat-mdc-slide-toggle .mat-ripple-element {
  opacity: 0.12;
}
.mat-mdc-slide-toggle .mat-focus-indicator::before {
  border-radius: 50%;
}
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after {
  transition: none;
}
.mat-mdc-slide-toggle .mdc-switch:enabled + .mdc-label {
  cursor: pointer;
}
.mat-mdc-slide-toggle .mdc-switch--disabled + label {
  color: var(--%NS%mat-slide-toggle-disabled-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-slide-toggle-full-width {
  width: 100%;
}
.mat-slide-toggle-full-width .mat-internal-form-field {
  width: 100%;
  justify-content: space-between;
}
.mat-slide-toggle-full-width .mat-internal-form-field label {
  margin: 0;
  flex-grow: 1;
  text-align: end;
}
.mat-slide-toggle-full-width .mdc-form-field--align-end label {
  text-align: start;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--%NS%mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--%NS%mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2})}return o})();var Ve=(()=>{class o{static ɵfac=function(t){return new(t||o)};static ɵmod=NE({type:o});static ɵinj=Jl({imports:[D,et$1]})}return o})();function Ye(o,a){if(o&1&&(Ei(0,`div`,7)(1,`div`,16)(2,`small`,17),UD(3),$c(),Ei(4,`small`,18),UD(5),$c()(),Ei(6,`div`,19),Lp(7,`div`,20),$c()()),o&2){let e=pD();Qv(2),RD(`label-`+e.passwordStrengthColor()),Qv(),zc(` Nivel de seguridad: `,e.passwordStrengthLabel(),` `),Qv(2),zc(``,e.passwordStrengthWidth(),`%`),Qv(2),RD(`bg-`+e.passwordStrengthColor()),Yp(`width`,e.passwordStrengthWidth(),`%`)}}function Je(o,a){o&1&&(Ei(0,`div`,9)(1,`mat-icon`),UD(2,`warning`),$c(),Ei(3,`small`),UD(4,`Las contraseñas no coinciden`),$c()())}function Ke(o,a){o&1&&(Lp(0,`mat-spinner`,21),Ei(1,`span`),UD(2,`Guardando...`),$c())}function et(o,a){o&1&&(Wc(0),Ei(1,`mat-icon`),UD(2,`save`),$c(),Ei(3,`span`),UD(4,`Guardar`),$c(),Gc())}function tt(o,a){o&1&&(Ei(0,`div`,27),Lp(1,`mat-spinner`,35),Ei(2,`small`),UD(3,`Generando código...`),$c()())}function nt(o,a){if(o&1&&Lp(0,`img`,28),o&2)kp(`src`,pD(2).totpQrCodeUrl(),Ef)}function at(o,a){o&1&&(Ei(0,`div`,27)(1,`mat-icon`),UD(2,`qr_code`),$c(),Ei(3,`small`),UD(4,`Sin código QR`),$c()())}function it(o,a){o&1&&(Ei(0,`small`,34),UD(1,`¡Clave copiada!`),$c())}function ot(o,a){if(o&1){let e=sD();Lp(0,`mat-divider`,22),Ei(1,`div`,23)(2,`div`,24)(3,`mat-icon`),UD(4,`help`),$c(),Ei(5,`small`),UD(6,` Para mayor seguridad, active la autenticación de dos factores. Escanee el código QR con una aplicación como Google Authenticator, Authy o similar. `),$c()(),Ei(7,`div`,25)(8,`div`,26),ZE(9,tt,4,0,`div`,27)(10,nt,1,1,`img`,28)(11,at,5,0,`div`,27),$c(),Ei(12,`div`,29)(13,`p`,30),UD(14,`Si no puede escanear el código, ingrese manualmente la siguiente clave en su aplicación de autenticación:`),$c(),Ei(15,`div`,31),Lp(16,`input`,32),Ei(17,`button`,33),Bp(`click`,function(){bu(e);return Cu(pD().copyTotpSecret())}),Ei(18,`mat-icon`),UD(19),$c()()(),ZE(20,it,2,0,`small`,34),$c()()()}if(o&2){let e=pD();Qv(9),YE(e.generatingQr()?9:e.totpQrCodeUrl()?10:11),Qv(7),kp(`value`,e.totpSecret()),Qv(),kp(`disabled`,!e.totpSecret()),Qv(2),oh(e.isTotpSecretCopied()?`check`:`content_copy`),Qv(),YE(e.isTotpSecretCopied()?20:-1)}}var Be=class o{showClave=Uo(!1);showNueva=Uo(!1);showRepite=Uo(!1);saving=Uo(!1);changeClaveCtrl=new Dn(``);changeNuevaCtrl=new Dn(``);changeRepiteCtrl=new Dn(``);get changeNuevaLength(){return this.changeNuevaCtrl.value?.length||0}get changeRepiteLength(){return this.changeRepiteCtrl.value?.length||0}get passwordsMatch(){return this.changeNuevaCtrl.value!==this.changeRepiteCtrl.value&&this.changeRepiteLength>0}get canSave(){return this.isFuerte()&&this.changeNuevaCtrl.value===this.changeRepiteCtrl.value}passwordStrengthWidth=Uo(0);passwordStrengthLabel=Uo(`Sin seguridad`);passwordStrengthColor=Uo(``);isFuerte=Uo(!1);showTotpSection=Uo(!1);totpQrCodeUrl=Uo(``);totpSecret=Uo(``);isTotpSecretCopied=Uo(!1);isTotpActive=Uo(!1);generatingQr=Uo(!1);_unsubscribeAll=new Z;usuario=``;tokenData=null;authService=T$1(O);router=T$1(me);ngOnInit(){let a=sessionStorage.getItem(`token`);if(a){let e=this.authService.getUserDecrypt(a);this.tokenData=e?.Usuario||null,this.usuario=this.tokenData?.usuario||this.tokenData?.cedula||``;let t=sessionStorage.getItem(`totp`),n=this.tokenData?.token||``;(t!==null?t===`1`:this.tokenData?.token&&this.tokenData.token!==``)&&(this.showTotpSection.set(!0),this.isTotpActive.set(!0),n?(this.totpSecret.set(n),this.cargarQrExistente(n)):this.authService.consultarSecretoTotp().subscribe(w=>{w&&(this.totpSecret.set(w),this.cargarQrExistente(w))}))}this.changeNuevaCtrl.valueChanges.pipe(Wh(this._unsubscribeAll)).subscribe(e=>this.checkPasswordStrength(e||``))}checkPasswordStrength(a){let e=0;a.length>=8&&(e+=20),a.match(/[A-Z]/)&&(e+=20),a.match(/[a-z]/)&&(e+=20),a.match(/[0-9]/)&&(e+=20),a.match(/[@$!%*?&]/)&&(e+=20),this.passwordStrengthWidth.set(e),this.isFuerte.set(e>=80),e<40?(this.passwordStrengthLabel.set(`Débil`),this.passwordStrengthColor.set(`danger`)):e<60?(this.passwordStrengthLabel.set(`Media`),this.passwordStrengthColor.set(`warning`)):e===100?(this.passwordStrengthLabel.set(`Fuerte`),this.passwordStrengthColor.set(`success`)):(this.passwordStrengthLabel.set(`Buena`),this.passwordStrengthColor.set(`info`))}async save(){if(!this.usuario){this.alertMini(`error`,`No existe un usuario`);return}if(this.passwordsMatch){this.alertMini(`error`,`La nueva contraseña y su repetición no coinciden.`);return}let a=this.changeNuevaCtrl.value;if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(a)){this.alertMini(`error`,`La clave no cumple con los requisitos de complejidad.`);return}this.saving.set(!0);let t=this.changeClaveCtrl.value,n=this.changeNuevaCtrl.value;console.log(`[CambiarContrasena] Enviando cambio para usuario:`,this.usuario);let m=await this.authService.cambiarContrasena(this.usuario,t,n);this.saving.set(!1),m&&this.router.navigate([`/login`])}toggleTotp(a){!!a?.checked?this.activarTotp():this.desactivarTotp()}activarTotp(){this.showTotpSection.set(!0),this.isTotpActive.set(!0),this.generatingQr.set(!0),this.totpQrCodeUrl.set(``),this.totpSecret.set(``),this.authService.generarTotpQr().subscribe({next:a=>{if(!this.isTotpActive()){this.generatingQr.set(!1);return}let e=a?.contenido||``,t=a?.msj||``;if(!e||!t){this.activacionFallida(`No se pudo generar el código QR.`);return}this.totpQrCodeUrl.set(e),this.totpSecret.set(t),this.generatingQr.set(!1),this.guardarEstadoTotp(`1`),this.alertMini(`success`,`Autenticación de dos factores activada.`)},error:()=>this.activacionFallida(`No se pudo generar el código QR.`)})}desactivarTotp(){this.showTotpSection.set(!1),this.isTotpActive.set(!1);let a=this.totpSecret(),e=a?[a,``]:[``];this.probarDesactivacion(e,0,void 0)}probarDesactivacion(a,e,t){if(e>=a.length){this.desactivacionFallida(t);return}this.authService.actualizarTotp(a[e]).subscribe({next:n=>{let m=n&&typeof n.MatchedCount==`number`?n.MatchedCount:null;if(m===0&&e+1<a.length){this.probarDesactivacion(a,e+1);return}this.verificarDesactivacion(a,e,m)},error:n=>{if(e+1<a.length){this.probarDesactivacion(a,e+1,n?.message);return}this.desactivacionFallida(n?.message||t)}})}verificarDesactivacion(a,e,t){this.authService.consultarSecretoTotp().subscribe(n=>{if(n===``){this.limpiarTotpLocal(),this.alertMini(`success`,`Autenticación de dos factores desactivada.`);return}if(n===null){if(t===0){this.restaurarTotpActivo(),this.alertMini(`error`,`La función no encontró su registro (MatchedCount 0): el secreto NO se borró.`);return}this.limpiarTotpLocal(),this.alertMini(`warning`,`Desactivación enviada, pero el servidor no confirmó que el secreto quedó borrado.`);return}if(e+1<a.length){this.probarDesactivacion(a,e+1);return}this.restaurarTotpActivo(),this.alertMini(`error`,t===0?`La función no encontró su registro (MatchedCount 0): el secreto sigue en la base de datos.`:`El servidor no borró el secreto TOTP. Verifique la función _SYS_UUserTOTP.`)})}desactivacionFallida(a){this.restaurarTotpActivo(),this.alertMini(`error`,this.msjCorto(a)||`No se pudo desactivar la verificación en dos factores.`)}restaurarTotpActivo(){this.showTotpSection.set(!0),this.isTotpActive.set(!0)}limpiarTotpLocal(){this.totpQrCodeUrl.set(``),this.totpSecret.set(``),this.generatingQr.set(!1),this.guardarEstadoTotp(`0`)}guardarEstadoTotp(a){sessionStorage.setItem(`totp`,a)}msjCorto(a){let e=(a||``).trim();return e?e.length>110?e.slice(0,107)+`…`:e:``}activacionFallida(a){this.generatingQr.set(!1),this.totpQrCodeUrl.set(``),this.totpSecret.set(``),this.showTotpSection.set(!1),this.isTotpActive.set(!1),this.alertMini(`error`,a)}cargarQrExistente(a){this.generatingQr.set(!0),this.authService.getImagenQr(a).subscribe({next:e=>{this.totpQrCodeUrl.set(e?.contenido||``),this.generatingQr.set(!1)},error:()=>{this.totpQrCodeUrl.set(``),this.generatingQr.set(!1)}})}copyTotpSecret(){this.totpSecret()&&navigator.clipboard.writeText(this.totpSecret()).then(()=>{this.isTotpSecretCopied.set(!0),setTimeout(()=>this.isTotpSecretCopied.set(!1),2500)}).catch(a=>{console.error(`Error al copiar la clave TOTP:`,a),this.alertMini(`error`,`No se pudo copiar la clave.`)})}alertMini(a,e){import(`./chunk-BOulzNO2.js`).then(({default:t})=>{t.fire({toast:!0,position:`top-end`,icon:a,title:e,showConfirmButton:!1,timer:3e3,timerProgressBar:!0})})}ngOnDestroy(){this._unsubscribeAll.next(void 0),this._unsubscribeAll.complete()}static ɵfac=function(e){return new(e||o)};static ɵcmp=_E({type:o,selectors:[[`app-cambiar-contrasena`]],decls:52,vars:19,consts:[[1,`section-header`],[1,`form-card`],[1,`alert`,`info-alert`],[`appearance`,`outline`,1,`full-width`],[`matInput`,``,`placeholder`,`Ingrese su clave actual`,`autocomplete`,`current-password`,3,`type`,`formControl`],[`mat-icon-button`,``,`matSuffix`,``,`type`,`button`,3,`click`],[`matInput`,``,`placeholder`,`Ingrese su nueva clave`,`autocomplete`,`new-password`,3,`type`,`formControl`],[1,`strength-wrapper`],[`matInput`,``,`placeholder`,`Confirme su nueva clave`,`autocomplete`,`new-password`,3,`type`,`formControl`],[1,`mismatch-alert`],[1,`form-actions`],[`mat-flat-button`,``,`color`,`primary`,3,`click`,`disabled`],[1,`totp-card`],[1,`totp-header`],[1,`totp-title`],[`color`,`primary`,3,`change`,`checked`],[1,`strength-header`],[1,`strength-label`],[1,`strength-percent`],[1,`progress-track`],[1,`progress-bar`],[`diameter`,`18`,1,`inline-spinner`],[1,`totp-divider`],[1,`totp-body`],[1,`alert`,`light-info-alert`],[1,`totp-qr-row`],[1,`qr-area`],[1,`qr-placeholder`],[`alt`,`Código QR TOTP`,1,`qr-image`,3,`src`],[1,`qr-info`],[1,`muted`],[1,`secret-box`],[`type`,`text`,`readonly`,``,`placeholder`,`Clave secreta...`,3,`value`],[`mat-icon-button`,``,`color`,`primary`,`matTooltip`,`Copiar clave`,3,`click`,`disabled`],[1,`copied-msg`],[`diameter`,`28`]],template:function(e,t){e&1&&(Ei(0,`div`,0)(1,`h1`),UD(2,`Cambiar Contraseña`),$c(),Ei(3,`p`),UD(4,`Actualice la clave de acceso y gestione la autenticación de dos factores de su cuenta.`),$c()(),Ei(5,`mat-card`,1)(6,`mat-card-content`)(7,`div`,2)(8,`mat-icon`),UD(9,`info`),$c(),Ei(10,`small`),UD(11,`La contraseña debe tener entre 8-16 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales (@$!%*?&).`),$c()(),Ei(12,`mat-form-field`,3)(13,`mat-label`),UD(14,`Contraseña Actual`),$c(),Lp(15,`input`,4),PI(),Ei(16,`button`,5),Bp(`click`,function(){return t.showClave.set(!t.showClave())}),Ei(17,`mat-icon`),UD(18),$c()()(),Ei(19,`mat-form-field`,3)(20,`mat-label`),UD(21,`Nueva Contraseña`),$c(),Lp(22,`input`,6),PI(),Ei(23,`button`,5),Bp(`click`,function(){return t.showNueva.set(!t.showNueva())}),Ei(24,`mat-icon`),UD(25),$c()()(),ZE(26,Ye,8,8,`div`,7),Ei(27,`mat-form-field`,3)(28,`mat-label`),UD(29,`Repetir Contraseña`),$c(),Lp(30,`input`,8),PI(),Ei(31,`button`,5),Bp(`click`,function(){return t.showRepite.set(!t.showRepite())}),Ei(32,`mat-icon`),UD(33),$c()()(),ZE(34,Je,5,0,`div`,9),Ei(35,`div`,10)(36,`button`,11),Bp(`click`,function(){return t.save()}),ZE(37,Ke,3,0)(38,et,5,0,`ng-container`),$c()()()(),Ei(39,`mat-card`,12)(40,`mat-card-content`)(41,`div`,13)(42,`div`,14)(43,`mat-icon`),UD(44,`smartphone`),$c(),Ei(45,`div`)(46,`h3`),UD(47,`Autenticación de Dos Factores (TOTP)`),$c(),Ei(48,`small`),UD(49,`Añade una capa extra de seguridad a tu cuenta.`),$c()()(),Ei(50,`mat-slide-toggle`,15),Bp(`change`,function(m){return t.toggleTotp(m)}),$c()(),ZE(51,ot,21,5),$c()()),e&2&&(Qv(15),kp(`type`,t.showClave()?`text`:`password`)(`formControl`,t.changeClaveCtrl),jI(),Qv(3),oh(t.showClave()?`visibility_off`:`visibility`),Qv(4),Kp(`invalid`,t.passwordsMatch),kp(`type`,t.showNueva()?`text`:`password`)(`formControl`,t.changeNuevaCtrl),jI(),Qv(3),oh(t.showNueva()?`visibility_off`:`visibility`),Qv(),YE(t.changeNuevaLength>0?26:-1),Qv(4),Kp(`invalid`,t.passwordsMatch),kp(`type`,t.showRepite()?`text`:`password`)(`formControl`,t.changeRepiteCtrl),jI(),Qv(3),oh(t.showRepite()?`visibility_off`:`visibility`),Qv(),YE(t.passwordsMatch?34:-1),Qv(2),kp(`disabled`,!t.canSave||t.saving()),Qv(),YE(t.saving()?37:38),Qv(13),kp(`checked`,t.isTotpActive()),Qv(),YE(t.showTotpSection()?51:-1))},dependencies:[Yo,no,nn,Qr,Wi,Ia,Ra,xt,$e$1,qn,Ct,zr,Pr,mo,cs,ss,J,Z$1,j,I,_,Ve,D,f,u,nn$1,qe],styles:[`@charset "UTF-8";[_nghost-%COMP%]{display:block}.section-header[_ngcontent-%COMP%]{margin-bottom:1.5rem}.section-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;color:#0c2d48;margin:0 0 .25rem}.section-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#757575;font-size:.92rem}.form-card[_ngcontent-%COMP%]{border-radius:16px!important;border:1px solid rgba(224,224,224,.5);margin-bottom:1.5rem}.full-width[_ngcontent-%COMP%]{width:100%}.alert.info-alert[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:.5rem;background:#e0f7f1;border:1px solid #b2ece1;border-radius:8px;padding:.65rem .8rem;margin-bottom:1rem}.alert.info-alert[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;color:#0c2d48;flex-shrink:0;margin-top:1px}.alert.info-alert[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:#12406b;line-height:1.35}.strength-wrapper[_ngcontent-%COMP%]{margin:.15rem 0 .9rem}.strength-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:.3rem}.strength-label[_ngcontent-%COMP%]{font-weight:600}.label-danger[_ngcontent-%COMP%]{color:#d32f2f}.label-warning[_ngcontent-%COMP%]{color:#f9a825}.label-success[_ngcontent-%COMP%]{color:#2e7d32}.label-info[_ngcontent-%COMP%]{color:#0277bd}.strength-percent[_ngcontent-%COMP%]{color:#757575}.progress-track[_ngcontent-%COMP%]{height:6px;background:#eee;border-radius:3px;overflow:hidden}.progress-bar[_ngcontent-%COMP%]{height:100%;border-radius:3px;transition:width .3s ease,background .3s ease}.bg-danger[_ngcontent-%COMP%]{background:#d32f2f}.bg-warning[_ngcontent-%COMP%]{background:#f9a825}.bg-success[_ngcontent-%COMP%]{background:#2e7d32}.bg-info[_ngcontent-%COMP%]{background:#0277bd}.mismatch-alert[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.4rem;color:#d32f2f;margin:-.3rem 0 .5rem}.mismatch-alert[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.form-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;margin-top:.5rem;padding-top:1rem;border-top:1px solid #eeeeee}.inline-spinner[_ngcontent-%COMP%]{display:inline-block;margin-right:.4rem;vertical-align:middle}.form-actions[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:row;gap:.4rem;line-height:normal}.form-actions[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%]   .mdc-button__label[_ngcontent-%COMP%], .form-actions[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%]   .mat-button-wrapper[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:row;gap:.4rem}.form-actions[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;font-size:18px;width:18px;height:18px;line-height:1;vertical-align:middle;flex-shrink:0}.form-actions[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{line-height:normal;display:inline-flex;align-items:center;vertical-align:middle}.totp-card[_ngcontent-%COMP%]{border-radius:16px!important;border:1px solid rgba(224,224,224,.5)}.totp-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:1rem}.totp-title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem}.totp-title[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{font-size:30px;width:30px;height:30px;color:#0c2d48}.totp-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0;font-size:1rem;font-weight:600;color:#212121}.totp-title[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:#9e9e9e;font-size:.78rem}.totp-divider[_ngcontent-%COMP%]{margin:1.25rem 0}.totp-body[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fadeIn .3s ease-out}@keyframes _ngcontent-%COMP%_fadeIn{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}.alert.light-info-alert[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:.5rem;background:#e3f2fd;border:1px solid #bbdefb;border-radius:8px;padding:.65rem .8rem;margin-bottom:1.25rem}.alert.light-info-alert[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;color:#0277bd;flex-shrink:0;margin-top:1px}.alert.light-info-alert[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:#01579b;line-height:1.35}.totp-qr-row[_ngcontent-%COMP%]{display:flex;gap:1.5rem;align-items:center;flex-wrap:wrap}.qr-area[_ngcontent-%COMP%]{width:168px;height:168px;border:1px solid #e0e0e0;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;background:#fff}.qr-image[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:contain}.qr-placeholder[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:.5rem;color:#9e9e9e}.qr-placeholder[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:42px;width:42px;height:42px}.qr-placeholder[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-size:.78rem}.qr-info[_ngcontent-%COMP%]{flex:1;min-width:220px}.qr-info[_ngcontent-%COMP%]   .muted[_ngcontent-%COMP%]{font-size:.82rem;color:#757575;margin:0 0 .5rem;line-height:1.4}.secret-box[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.4rem;border:1px solid #e0e0e0;border-radius:8px;padding:.1rem .1rem .1rem .75rem;background:#fafafa}.secret-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;border:none;outline:none;background:transparent;font-size:.85rem;color:#424242;font-family:monospace;letter-spacing:1px;padding:.55rem 0;min-width:0}.copied-msg[_ngcontent-%COMP%]{display:block;margin-top:.45rem;color:#2e7d32;font-weight:600;font-size:.78rem}@media(max-width:480px){.totp-qr-row[_ngcontent-%COMP%]{flex-direction:column;align-items:center}.qr-info[_ngcontent-%COMP%]{width:100%}}[data-theme=dark][_nghost-%COMP%]   .section-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .section-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#00c9a7}[data-theme=dark][_nghost-%COMP%]   .section-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .section-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#9e9e9e}[data-theme=dark][_nghost-%COMP%]   .form-card[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .form-card[_ngcontent-%COMP%], [data-theme=dark][_nghost-%COMP%]   .totp-card[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .totp-card[_ngcontent-%COMP%]{background:#1e1e1e!important;color:#e0e0e0!important;border-color:#333!important;box-shadow:0 4px 12px #00000080!important}[data-theme=dark][_nghost-%COMP%]   .totp-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .totp-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#fff}[data-theme=dark][_nghost-%COMP%]   .totp-title[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .totp-title[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:#b0b0b0}[data-theme=dark][_nghost-%COMP%]   .totp-title[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .totp-title[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:#00c9a7}[data-theme=dark][_nghost-%COMP%]   .alert.info-alert[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .alert.info-alert[_ngcontent-%COMP%]{background:#1e5f9e26;border-color:#1e5f9e66}[data-theme=dark][_nghost-%COMP%]   .alert.info-alert[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .alert.info-alert[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#8fe8d8}[data-theme=dark][_nghost-%COMP%]   .alert.info-alert[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .alert.info-alert[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:#b3bac5}[data-theme=dark][_nghost-%COMP%]   .alert.light-info-alert[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .alert.light-info-alert[_ngcontent-%COMP%]{background:#0079bd26;border-color:#0079bd66}[data-theme=dark][_nghost-%COMP%]   .alert.light-info-alert[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .alert.light-info-alert[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#4fc3f7}[data-theme=dark][_nghost-%COMP%]   .alert.light-info-alert[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .alert.light-info-alert[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:#a9cbe0}[data-theme=dark][_nghost-%COMP%]   .strength-percent[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .strength-percent[_ngcontent-%COMP%]{color:#9e9e9e}[data-theme=dark][_nghost-%COMP%]   .progress-track[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .progress-track[_ngcontent-%COMP%]{background:#333}[data-theme=dark][_nghost-%COMP%]   .secret-box[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .secret-box[_ngcontent-%COMP%]{background:#242424;border-color:#333}[data-theme=dark][_nghost-%COMP%]   .secret-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .secret-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{color:#e0e0e0}[data-theme=dark][_nghost-%COMP%]   .qr-area[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .qr-area[_ngcontent-%COMP%]{background:#1e1e1e;border-color:#333}[data-theme=dark][_nghost-%COMP%]   .qr-info[_ngcontent-%COMP%]   .muted[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .qr-info[_ngcontent-%COMP%]   .muted[_ngcontent-%COMP%]{color:#9e9e9e}[data-theme=dark][_nghost-%COMP%]   .form-actions[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .form-actions[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%]{background:linear-gradient(135deg,#00c9a7 0% 100%)!important;color:#fff!important}`]})};export{Be as CambiarContrasenaComponent};