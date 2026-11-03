import{$t as YE,An as hw,B as Eo,C as $c,Ct as Pp,Dt as Qv,En as eu,Ft as T,G as Gc,Gt as Up,H as F0,Ht as Ue,Jt as Wc,K as Gh,Ln as ju,M as DD,Mt as S,O as Bp,On as gD,Pn as jI,Q as ID,Rn as k0,Sr as zc,Un as mD,Ut as Um,W as Fp,Wn as ng,Wt as Uo,Zt as Xp,b as Y,cr as tw,dn as _u,er as sD,fn as ae$1,gr as wh,hr as wf,ht as NE,in as ZE,kt as RD,lt as Lp,m as me,mr as vD,mt as Mu,nn as Z$1,pt as Mr,qn as pD,qt as Vu,sn as _E,tr as sh,tt as Jp,u as Yo,vt as P0,wr as zp,yt as PI,z as Ei,zt as UD}from"./main-CAKTF7WJ.js";import{C as is,O as oe,S as ht$1,l as N,m as Vt$1}from"./chunk-C4kuPPzu.js";import{c as Ze,d as xe,i as Gt$1,l as pn,n as Ee,o as Ye,r as Gn}from"./chunk-BLSGWHp7.js";import{A as nn$1,I as xt$1,N as qn,S as Wi,a as Dn,c as G,f as Ia,i as Ct,j as no,n as $e,t as $,v as Qr,y as Ra}from"./chunk-Bmy1r9qd.js";import"./chunk-BrgxpeHh.js";import{n as mt$1,t as Yt$1}from"./chunk-CdJ5Uk51.js";import{t as v}from"./chunk-BWWKMKPF.js";import{i as le,n as Xe,o as se,r as ht$2}from"./chunk-DQo622PZ.js";import{n as u,t as f}from"./chunk-Dbv5Uiek.js";import{i as j,n as I,r as _}from"./chunk-CprTbXld.js";import{n as Z$2,t as J$1}from"./chunk-Lr8lgqLd.js";var dt=[`*`];var at=(()=>{class t{labelPosition=`after`;static ɵfac=function(a){return new(a||t)};static ɵcmp=_E({type:t,selectors:[[``,`mat-internal-form-field`,``]],hostAttrs:[1,`mdc-form-field`,`mat-internal-form-field`],hostVars:2,hostBindings:function(a,o){a&2&&Xp(`mdc-form-field--align-end`,o.labelPosition===`before`)},inputs:{labelPosition:`labelPosition`},ngContentSelectors:dt,decls:1,vars:0,template:function(a,o){a&1&&(gD(),mD(0))},styles:[`.mat-internal-form-field {
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
`],encapsulation:2})}return t})();var lt=[`switch`];var mt=[`*`];function gt(t,r){t&1&&(Ei(0,`span`,11),ju(),Ei(1,`svg`,13),Fp(2,`path`,14),$c(),Ei(3,`svg`,15),Fp(4,`path`,16),$c()())}var pt=new S(`mat-slide-toggle-default-options`,{providedIn:`root`,factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})});var Z=class{source;checked;constructor(r,e){this.source=r,this.checked=e}};var ie=(()=>{class t{_elementRef=T(Mr);_focusMonitor=T(ht$1);_changeDetectorRef=T(k0);defaults=T(pt);_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new Z(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=is();_focused=!1;name=null;id;labelPosition=`after`;ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;fullWidth=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new Ue;toggleChange=new Ue;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){T(N).load(Gt$1);let e=T(new wh(`tabindex`),{optional:!0}),a=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=a.color||`accent`,this.id=this._uniqueId=T(oe).getId(`mat-mdc-slide-toggle-`),this.hideIcon=a.hideIcon??!1,this.disabledInteractive=a.disabledInteractive??!1,this._labelId=this._uniqueId+`-label`}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e===`keyboard`||e===`program`?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new Z(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static ɵfac=function(a){return new(a||t)};static ɵcmp=_E({type:t,selectors:[[`mat-slide-toggle`]],viewQuery:function(a,o){if(a&1&&zp(lt,5),a&2){let d;vD(d=ID())&&(o._switchElement=d.first)}},hostAttrs:[1,`mat-mdc-slide-toggle`],hostVars:15,hostBindings:function(a,o){a&2&&(Bp(`id`,o.id),Lp(`tabindex`,null)(`aria-label`,null)(`name`,null)(`aria-labelledby`,null),RD(o.color?`mat-`+o.color:``),Xp(`mat-mdc-slide-toggle-focused`,o._focused)(`mat-mdc-slide-toggle-checked`,o.checked)(`mat-slide-toggle-full-width`,o.fullWidth)(`_mat-animation-noopable`,o._noopAnimations))},inputs:{name:`name`,id:`id`,labelPosition:`labelPosition`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],required:[2,`required`,`required`,P0],color:`color`,disabled:[2,`disabled`,`disabled`,P0],fullWidth:[2,`fullWidth`,`fullWidth`,P0],disableRipple:[2,`disableRipple`,`disableRipple`,P0],tabIndex:[2,`tabIndex`,`tabIndex`,e=>e==null?0:F0(e)],checked:[2,`checked`,`checked`,P0],hideIcon:[2,`hideIcon`,`hideIcon`,P0],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,P0]},outputs:{change:`change`,toggleChange:`toggleChange`},exportAs:[`matSlideToggle`],features:[tw([{provide:$,useExisting:Eo(()=>t),multi:!0},{provide:G,useExisting:t,multi:!0}]),Um],ngContentSelectors:mt,decls:14,vars:27,consts:[[`switch`,``],[`mat-internal-form-field`,``,3,`labelPosition`],[`role`,`switch`,`type`,`button`,1,`mdc-switch`,3,`click`,`tabIndex`,`disabled`],[1,`mat-mdc-slide-toggle-touch-target`],[1,`mdc-switch__track`],[1,`mdc-switch__handle-track`],[1,`mdc-switch__handle`],[1,`mdc-switch__shadow`],[1,`mdc-elevation-overlay`],[1,`mdc-switch__ripple`],[`mat-ripple`,``,1,`mat-mdc-slide-toggle-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mdc-switch__icons`],[1,`mdc-label`,3,`click`,`for`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--on`],[`d`,`M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--off`],[`d`,`M20 13H4v-2h16v2z`]],template:function(a,o){if(a&1&&(gD(),Ei(0,`div`,1)(1,`button`,2,0),Up(`click`,function(){return o._handleClick()}),Fp(3,`div`,3)(4,`span`,4),Ei(5,`span`,5)(6,`span`,6)(7,`span`,7),Fp(8,`span`,8),$c(),Ei(9,`span`,9),Fp(10,`span`,10),$c(),ZE(11,gt,5,0,`span`,11),$c()()(),Ei(12,`label`,12),Up(`click`,function(w){return w.stopPropagation()}),mD(13),$c()()),a&2){let d=DD(2);Pp(`labelPosition`,o.labelPosition),Qv(),Xp(`mdc-switch--selected`,o.checked)(`mdc-switch--unselected`,!o.checked)(`mdc-switch--checked`,o.checked)(`mdc-switch--disabled`,o.disabled)(`mat-mdc-slide-toggle-disabled-interactive`,o.disabledInteractive),Pp(`tabIndex`,o.disabled&&!o.disabledInteractive?-1:o.tabIndex)(`disabled`,o.disabled&&!o.disabledInteractive),Lp(`id`,o.buttonId)(`name`,o.name)(`aria-label`,o.ariaLabel)(`aria-labelledby`,o._getAriaLabelledBy())(`aria-describedby`,o.ariaDescribedby)(`aria-required`,o.required||null)(`aria-checked`,o.checked)(`aria-disabled`,o.disabled&&o.disabledInteractive?`true`:null),Qv(9),Pp(`matRippleTrigger`,d)(`matRippleDisabled`,o.disableRipple||o.disabled)(`matRippleCentered`,!0),Qv(),YE(o.hideIcon?-1:11),Qv(),Pp(`for`,o.buttonId),Lp(`id`,o._labelId)}},dependencies:[Gn,at],styles:[`.mdc-switch {
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
`],encapsulation:2})}return t})();var ot=(()=>{class t{static ɵfac=function(a){return new(a||t)};static ɵmod=NE({type:t});static ɵinj=eu({imports:[ie,Vt$1]})}return t})();var ht=`ABCDEFGHIJKLMNOPQRSTUVWXYZ234567`;function x(t){return(t??``).toUpperCase().replace(/[\s\-_]/g,``).replace(/=+$/,``)}function rt(t){return x(t).replace(/(.{4})/g,`$1 `).trim()}function ft(t){let r=x(t);if(!r)throw new Error(`La clave TOTP está vacía.`);let e=0,a=0,o=[];for(let w of r){let P=ht.indexOf(w);if(P===-1)throw new Error(`La clave TOTP contiene caracteres inválidos.`);a=a<<5|P,e+=5,e>=8&&(o.push(a>>>e-8&255),e-=8)}let d=new ArrayBuffer(o.length);return new Uint8Array(d).set(o),d}function _t(t){let r=Math.floor(t/1e3/30),e=new ArrayBuffer(8),a=new Uint8Array(e),o=r;for(let d=7;d>=0;d--)a[d]=o&255,o=Math.floor(o/256);return e}async function bt(t,r=Date.now()){let e=globalThis.crypto;if(!e?.subtle)throw new Error(`El navegador no permite verificar el código (WebCrypto no disponible).`);let a=await e.subtle.importKey(`raw`,ft(t),{name:`HMAC`,hash:`SHA-1`},!1,[`sign`]),o=new Uint8Array(await e.subtle.sign(`HMAC`,a,_t(r))),d=o[o.length-1]&15,w=(o[d]&127)<<24|o[d+1]<<16|o[d+2]<<8|o[d+3];return String(w%10**6).padStart(6,`0`)}async function ct(t,r,e=1){let a=(r??``).replace(/\D/g,``);if(a.length!==6)return!1;let o=Date.now();for(let d=-e;d<=e;d++)if(await bt(t,o+d*3e4)===a)return!0;return!1}function ae(t=Date.now()){return Math.max(1,Math.ceil((3e4-t%3e4)/1e3))}var J=class t{auth=T(Xe);api=T(v);generarQr(){return this.auth.generarTotpQr()}consultarSecreto(){return this.auth.consultarSecretoTotp()}async activar(r){let e=this.loginActual();if(!e)throw new Error(`No se pudo identificar al usuario de la sesión. Vuelva a iniciar sesión.`);let a=x(r);if(!a)throw new Error(`La clave generada no es válida.`);let o=await ng(this.api.ExecColeccion({coleccion:Y.colecciones.USUARIO,donde:JSON.stringify({login:e}),objeto:{token:a},upsert:!0,driver:``})),d=this.numero(o?.MatchedCount??o?.matchedCount),w=this.numero(o?.UpsertedCount??o?.upsertedCount);if(d<1)throw new Error(w>0?`El servidor no encontró su registro de usuario y la clave no se guardó.`:`El servidor no encontró su registro de usuario. No se guardó la clave.`);let P=await this.leerSecretoEnBd();if(P!==null&&x(P)!==a)throw new Error(`El servidor no confirmó el guardado de la clave. Intente de nuevo.`)}async desactivar(r){let e=new Set,a=x(r);a&&e.add(a);let d=x(await this.leerSecretoEnBd()||``);d&&e.add(d);for(let w of e){let P=null;try{let ee=await ng(this.auth.actualizarTotp(w));P=ee&&typeof ee.MatchedCount==`number`?ee.MatchedCount:null}catch{continue}if(P===0)continue;let oe=await this.leerSecretoEnBd();if(oe===``||oe===null)return!0}return!1}async leerSecretoEnBd(){try{return await ng(this.consultarSecreto())??null}catch{return null}}loginActual(){let r=sessionStorage.getItem(`token`)||``;if(!r)return``;let e=this.auth.getUserDecrypt(r)?.Usuario;return(e?.login||e?.usuario||``).trim()}numero(r){return typeof r==`number`&&Number.isFinite(r)?r:0}static ɵfac=function(e){return new(e||t)};static ɵprov=ae$1({token:t,factory:t.ɵfac,providedIn:`root`})};function xt(t,r){if(t&1&&(Ei(0,`p`),UD(1),$c()),t&2){let e=pD();Qv(),sh(e.subtitulo())}}function yt(t,r){t&1&&(Ei(0,`mat-icon`),UD(1,`check`),$c())}function Pt(t,r){t&1&&UD(0,` 1 `)}function Ot(t,r){t&1&&(Ei(0,`mat-icon`),UD(1,`check`),$c())}function St(t,r){t&1&&UD(0,` 2 `)}function kt(t,r){if(t&1&&(Ei(0,`ol`,6)(1,`li`)(2,`span`,12),ZE(3,yt,2,0,`mat-icon`)(4,Pt,1,0),$c(),Ei(5,`span`,13),UD(6,`Confirmar`),$c()(),Ei(7,`li`)(8,`span`,12),ZE(9,Ot,2,0,`mat-icon`)(10,St,1,0),$c(),Ei(11,`span`,13),UD(12,`Escanear`),$c()(),Ei(13,`li`)(14,`span`,12),UD(15,`3`),$c(),Ei(16,`span`,13),UD(17,`Verificar`),$c()()()),t&2){let e=pD();Qv(),Xp(`activo`,e.indicePaso()===0)(`hecho`,e.indicePaso()>0),Qv(2),YE(e.indicePaso()>0?3:4),Qv(4),Xp(`activo`,e.indicePaso()===1)(`hecho`,e.indicePaso()>1),Qv(2),YE(e.indicePaso()>1?9:10),Qv(4),Xp(`activo`,e.indicePaso()===2)}}function Nt(t,r){t&1&&(Ei(0,`div`,14)(1,`mat-icon`),UD(2,`help_outline`),$c(),Ei(3,`div`)(4,`strong`),UD(5,`¿Está seguro de que desea activar la verificación en dos pasos?`),$c(),Ei(6,`p`),UD(7,` A partir de ahora, cada inicio de sesión pedirá su contraseña `),Ei(8,`em`),UD(9,`y`),$c(),UD(10,` un código temporal de 6 dígitos generado en su teléfono. `),$c()()(),Ei(11,`ol`,15)(12,`li`)(13,`span`,16),UD(14,`1`),$c(),Ei(15,`div`,17)(16,`h3`),UD(17,`Descargue una aplicación de autenticación`),$c(),Ei(18,`p`),UD(19,` Instale `),Ei(20,`strong`),UD(21,`Google Authenticator`),$c(),UD(22,`, Authy o Microsoft Authenticator desde la tienda de su teléfono. `),$c(),Ei(23,`div`,18)(24,`a`,19),Fp(25,`img`,20),$c(),Ei(26,`a`,21),Fp(27,`img`,22),$c()()()(),Ei(28,`li`)(29,`span`,16),UD(30,`2`),$c(),Ei(31,`div`,17)(32,`h3`),UD(33,`Abra la aplicación`),$c(),Ei(34,`p`),UD(35,` Pulse el botón «+» o «Añadir cuenta» y elija la opción `),Ei(36,`strong`),UD(37,`«Escanear código QR»`),$c(),UD(38,`. `),$c()()(),Ei(39,`li`)(40,`span`,16),UD(41,`3`),$c(),Ei(42,`div`,17)(43,`h3`),UD(44,`Escanee el código y confirme`),$c(),Ei(45,`p`),UD(46,` En el siguiente paso verá el código QR. Escanéelo y escriba aquí el código de 6 dígitos que mostrará la aplicación para confirmar que todo quedó bien configurado. `),$c()()()(),Ei(47,`p`,23)(48,`mat-icon`),UD(49,`info`),$c(),Ei(50,`span`),UD(51,` Si cambia o pierde su teléfono necesitará la clave secreta para recuperar el acceso. Guárdela en un lugar seguro. `),$c()())}function Dt(t,r){t&1&&(Ei(0,`div`,26),Fp(1,`mat-spinner`,36),Ei(2,`small`),UD(3,`Generando código QR…`),$c()())}function Et(t,r){if(t&1&&Fp(0,`img`,27),t&2)Pp(`src`,pD(2).qrUrl(),wf)}function Tt(t,r){t&1&&(Ei(0,`div`,28)(1,`mat-icon`),UD(2,`qr_code_2`),$c(),Ei(3,`small`),UD(4,`Sin código QR`),$c()())}function Ft(t,r){t&1&&(Ei(0,`small`,33),UD(1,`Clave copiada al portapapeles`),$c())}function It(t,r){if(t&1){let e=sD();Ei(0,`button`,38),Up(`click`,function(){_u(e);return Mu(pD(3).generarQr())}),UD(1,` Reintentar `),$c()}}function At(t,r){if(t&1&&(Ei(0,`p`,35)(1,`mat-icon`),UD(2,`error`),$c(),Ei(3,`span`),UD(4),$c(),ZE(5,It,2,0,`button`,37),$c()),t&2){let e=pD(2);Qv(4),sh(e.error()),Qv(),YE(!e.cargandoQr()&&!e.qrUrl()?5:-1)}}function zt(t,r){if(t&1){let e=sD();Ei(0,`div`,24)(1,`div`,25),ZE(2,Dt,4,0,`div`,26)(3,Et,1,1,`img`,27)(4,Tt,5,0,`div`,28),$c(),Ei(5,`div`,29)(6,`h3`),UD(7,`Escanee este código`),$c(),Ei(8,`p`),UD(9,` Abra su aplicación de autenticación, pulse «+» y apunte la cámara a este código QR. `),$c(),Fp(10,`mat-divider`,30),Ei(11,`h3`),UD(12,`¿No puede escanearlo?`),$c(),Ei(13,`p`),UD(14,` Copie esta clave y péguela en la aplicación con la opción `),Ei(15,`strong`),UD(16,`«Introducir clave de configuración»`),$c(),UD(17,`. `),$c(),Ei(18,`div`,31)(19,`code`),UD(20),$c(),Ei(21,`button`,32),Up(`click`,function(){_u(e);return Mu(pD().copiarSecreto())}),Ei(22,`mat-icon`),UD(23),$c()()(),ZE(24,Ft,2,0,`small`,33),Ei(25,`small`,34),UD(26,`Tipo de clave: TOTP · 6 dígitos · 30 segundos.`),$c()()(),ZE(27,At,6,2,`p`,35)}if(t&2){let e=pD();Qv(2),YE(e.cargandoQr()?2:e.qrUrl()?3:4),Qv(18),sh(e.secretoFormateado()),Qv(),Pp(`disabled`,!e.secreto())(`matTooltip`,e.copiado()?`Clave copiada`:`Copiar clave`),Qv(2),sh(e.copiado()?`check`:`content_copy`),Qv(),YE(e.copiado()?24:-1),Qv(3),YE(e.error()?27:-1)}}function Rt(t,r){if(t&1&&(Ei(0,`p`,35)(1,`mat-icon`),UD(2,`error`),$c(),Ei(3,`span`),UD(4),$c()()),t&2){let e=pD(2);Qv(4),sh(e.error())}}function Vt(t,r){if(t&1){let e=sD();Ei(0,`div`,8)(1,`p`,39),UD(2,` Escriba el código de `),Ei(3,`strong`),UD(4,`6 dígitos`),$c(),UD(5,` que muestra su aplicación para confirmar que la configuración quedó bien hecha. `),$c(),Ei(6,`label`,40),UD(7,`Código de verificación`),$c(),Ei(8,`input`,41),Up(`input`,function(o){_u(e);return Mu(pD().onCodigo(o))}),$c(),Ei(9,`small`,34),UD(10),$c(),ZE(11,Rt,5,1,`p`,35),$c()}if(t&2){let e=pD();Qv(8),Xp(`td-otp--error`,!!e.error()),Pp(`value`,e.codigo()),Qv(2),zc(` El código cambia cada 30 segundos. El actual vence en `,e.segundos(),` s. `),Qv(),YE(e.error()?11:-1)}}function qt(t,r){if(t&1&&(Ei(0,`p`,35)(1,`mat-icon`),UD(2,`error`),$c(),Ei(3,`span`),UD(4),$c()()),t&2){let e=pD(2);Qv(4),sh(e.error())}}function Bt(t,r){if(t&1){let e=sD();Ei(0,`div`,42)(1,`mat-icon`),UD(2,`warning`),$c(),Ei(3,`div`)(4,`strong`),UD(5,`¿Está seguro de que desea desactivar la verificación en dos pasos?`),$c(),Ei(6,`p`),UD(7,` Su cuenta quedará protegida únicamente por la contraseña. Para confirmarlo, escriba el código de 6 dígitos que muestra su aplicación. `),$c()()(),Ei(8,`div`,8)(9,`label`,43),UD(10,`Código de verificación`),$c(),Ei(11,`input`,44),Up(`input`,function(o){_u(e);return Mu(pD().onCodigo(o))}),$c(),Ei(12,`small`,34),UD(13),$c(),ZE(14,qt,5,1,`p`,35),$c()}if(t&2){let e=pD();Qv(11),Xp(`td-otp--error`,!!e.error()),Pp(`value`,e.codigo()),Qv(2),zc(` El código cambia cada 30 segundos. El actual vence en `,e.segundos(),` s. `),Qv(),YE(e.error()?14:-1)}}function Lt(t,r){t&1&&UD(0,` Su cuenta volverá a pedir únicamente la contraseña al iniciar sesión. `)}function jt(t,r){t&1&&UD(0,` Desde ahora, al iniciar sesión se le pedirá el código de 6 dígitos de su aplicación de autenticación. `)}function Ut(t,r){if(t&1&&(Ei(0,`div`,9),ju(),Ei(1,`svg`,45),Fp(2,`circle`,46)(3,`path`,47),$c(),Vu(),Ei(4,`h3`),UD(5),$c(),Ei(6,`p`),ZE(7,Lt,1,0)(8,jt,1,0),$c()()),t&2){let e=pD();Qv(5),zc(` `,e.esDesactivar()?`Verificación desactivada`:`Verificación en dos pasos activada`,` `),Qv(2),YE(e.esDesactivar()?7:8)}}function Qt(t,r){if(t&1){let e=sD();Ei(0,`button`,48),Up(`click`,function(){_u(e);return Mu(pD().cerrar())}),UD(1,`Cancelar`),$c(),Ei(2,`button`,49),Up(`click`,function(){_u(e);return Mu(pD().comenzarConfiguracion())}),Ei(3,`mat-icon`),UD(4,`arrow_forward`),$c(),UD(5,` Sí, continuar `),$c()}}function Gt(t,r){if(t&1){let e=sD();Ei(0,`button`,48),Up(`click`,function(){_u(e);return Mu(pD().atras())}),UD(1,`Atrás`),$c(),Ei(2,`button`,50),Up(`click`,function(){_u(e);return Mu(pD().irAVerificar())}),Ei(3,`mat-icon`),UD(4,`qr_code_scanner`),$c(),UD(5,` Ya escaneé el código `),$c()}if(t&2){let e=pD();Qv(2),Pp(`disabled`,!e.secreto()||e.cargandoQr())}}function Wt(t,r){t&1&&(Fp(0,`mat-spinner`,52),Ei(1,`span`),UD(2,`Verificando…`),$c())}function Ht(t,r){t&1&&(Wc(0),Ei(1,`mat-icon`),UD(2,`verified_user`),$c(),Ei(3,`span`),UD(4,`Activar verificación`),$c(),Gc())}function Xt(t,r){if(t&1){let e=sD();Ei(0,`button`,51),Up(`click`,function(){_u(e);return Mu(pD().atras())}),UD(1,` Atrás `),$c(),Ei(2,`button`,50),Up(`click`,function(){_u(e);return Mu(pD().verificarYActivar())}),ZE(3,Wt,3,0)(4,Ht,5,0,`ng-container`),$c()}if(t&2){let e=pD();Pp(`disabled`,e.verificando()),Qv(2),Pp(`disabled`,!e.codigoCompleto()||e.verificando()),Qv(),YE(e.verificando()?3:4)}}function $t(t,r){t&1&&(Fp(0,`mat-spinner`,52),Ei(1,`span`),UD(2,`Desactivando…`),$c())}function Yt(t,r){t&1&&(Wc(0),Ei(1,`mat-icon`),UD(2,`lock_open`),$c(),Ei(3,`span`),UD(4,`Desactivar`),$c(),Gc())}function Zt(t,r){if(t&1){let e=sD();Ei(0,`button`,51),Up(`click`,function(){_u(e);return Mu(pD().cerrar())}),UD(1,` Cancelar `),$c(),Ei(2,`button`,53),Up(`click`,function(){_u(e);return Mu(pD().verificarYDesactivar())}),ZE(3,$t,3,0)(4,Yt,5,0,`ng-container`),$c()}if(t&2){let e=pD();Pp(`disabled`,e.verificando()),Qv(2),Pp(`disabled`,!e.codigoCompleto()||e.verificando()||e.sinSecreto()),Qv(),YE(e.verificando()?3:4)}}function Jt(t,r){if(t&1){let e=sD();Ei(0,`button`,49),Up(`click`,function(){_u(e);return Mu(pD().finalizar())}),UD(1,` Entendido `),$c()}}var K=class t{ref=T(se);totp=T(J);data=T(ht$2,{optional:!0})??{modo:`activar`};paso=Uo(`intro`);secreto=Uo(``);qrUrl=Uo(``);cargandoQr=Uo(!1);codigo=Uo(``);verificando=Uo(!1);copiado=Uo(!1);error=Uo(``);sinSecreto=Uo(!1);segundos=Uo(ae());esDesactivar=hw(()=>this.data.modo===`desactivar`);secretoFormateado=hw(()=>rt(this.secreto()));codigoCompleto=hw(()=>this.codigo().length===6);indicePaso=hw(()=>{switch(this.paso()){case`intro`:return 0;case`configurar`:return 1;case`verificar`:return 2;default:return 3}});titulo=hw(()=>this.paso()===`listo`?this.esDesactivar()?`Verificación desactivada`:`Verificación activada`:this.esDesactivar()?`Desactivar verificación en dos pasos`:`Activar verificación en dos pasos`);subtitulo=hw(()=>{switch(this.paso()){case`intro`:return`Añada un código temporal a su inicio de sesión.`;case`configurar`:return`Vincule su aplicación de autenticación.`;case`verificar`:return`Confirme el código que muestra su teléfono.`;case`desactivar`:return`Confirme su identidad con el código actual.`;default:return``}});iconoCabecera=hw(()=>{if(this.paso()===`listo`)return this.esDesactivar()?`gpp_bad`:`verified_user`;if(this.esDesactivar())return`lock_open`;switch(this.paso()){case`configurar`:return`qr_code_2`;case`verificar`:return`pin`;default:return`shield`}});reloj;cierreAutomatico;ngOnInit(){this.esDesactivar()&&(this.paso.set(`desactivar`),this.prepararDesactivacion()),this.reloj=setInterval(()=>this.segundos.set(ae()),1e3)}ngOnDestroy(){this.reloj&&clearInterval(this.reloj),this.cierreAutomatico&&clearTimeout(this.cierreAutomatico)}comenzarConfiguracion(){this.paso.set(`configurar`),this.error.set(``),this.generarQr()}generarQr(){this.cargandoQr.set(!0),this.error.set(``),this.qrUrl.set(``),this.secreto.set(``),this.totp.generarQr().subscribe({next:r=>{let e=r?.contenido||``,a=r?.msj||``;if(this.cargandoQr.set(!1),!e||!a){this.error.set(`No se pudo generar el código QR. Intente de nuevo.`);return}this.qrUrl.set(e),this.secreto.set(x(a))},error:()=>{this.cargandoQr.set(!1),this.error.set(`No se pudo generar el código QR. Intente de nuevo.`)}})}irAVerificar(){if(!this.secreto()){this.error.set(`Genere el código QR antes de continuar.`);return}this.error.set(``),this.codigo.set(``),this.paso.set(`verificar`)}async verificarYActivar(){if(!this.secreto()){this.error.set(`No hay una clave que verificar. Vuelva al paso anterior.`);return}if(!this.codigoCompleto()){this.error.set(`Escriba los 6 dígitos que muestra su aplicación.`);return}if(this.verificando.set(!0),this.error.set(``),!await this.codigoLocalValido()){this.verificando.set(!1),this.error()||this.error.set(`El código no es válido o ya expiró. Verifique que la hora de su teléfono esté sincronizada e intente con el código actual.`);return}try{await this.totp.activar(this.secreto())}catch(e){this.verificando.set(!1),this.error.set(this.mensaje(e)||`No se pudo guardar la configuración. Intente de nuevo.`);return}this.verificando.set(!1),this.mostrarExito({secreto:this.secreto()})}prepararDesactivacion(){let r=x(this.data.secreto||``);if(r){this.secreto.set(r);return}this.totp.consultarSecreto().subscribe(e=>{let a=x(e||``);if(a){this.secreto.set(a);return}this.sinSecreto.set(!0),this.error.set(`No se pudo recuperar la clave configurada para validar el código. Cierre sesión, vuelva a entrar y reintente la desactivación.`)})}async verificarYDesactivar(){if(this.sinSecreto())return;if(!this.codigoCompleto()){this.error.set(`Escriba los 6 dígitos que muestra su aplicación.`);return}if(this.verificando.set(!0),this.error.set(``),!await this.codigoLocalValido()){this.verificando.set(!1),this.error()||this.error.set(`El código no es válido o ya expiró. Intente con el código actual.`);return}let e;try{e=await this.totp.desactivar(this.secreto())}catch(a){this.verificando.set(!1),this.error.set(this.mensaje(a)||`No se pudo desactivar la verificación. Intente de nuevo.`);return}if(this.verificando.set(!1),!e){this.error.set(`El servidor no confirmó el borrado de la clave. Cierre sesión, vuelva a entrar y reintente.`);return}this.mostrarExito({secreto:``})}async codigoLocalValido(){try{return await ct(this.secreto(),this.codigo())}catch{return this.error.set(`No se pudo comprobar el código en este navegador. Asegúrese de estar en una conexión segura (HTTPS) y vuelva a intentarlo.`),!1}}onCodigo(r){let e=r.target,a=(e.value||``).replace(/\D/g,``).slice(0,6);e.value=a,this.codigo.set(a),this.error()&&this.error.set(``)}copiarSecreto(){let r=this.secreto();r&&navigator.clipboard.writeText(r).then(()=>{this.copiado.set(!0),setTimeout(()=>this.copiado.set(!1),2500)}).catch(()=>this.error.set(`No se pudo copiar la clave. Cópiela manualmente.`))}atras(){if(this.error.set(``),this.paso()===`verificar`){this.codigo.set(``),this.paso.set(`configurar`);return}this.paso.set(`intro`)}mostrarExito(r){this.paso.set(`listo`),this.codigo.set(``),this.cierreAutomatico=setTimeout(()=>this.ref.close(r),2400)}finalizar(){this.cierreAutomatico&&clearTimeout(this.cierreAutomatico),this.ref.close({secreto:this.esDesactivar()?``:this.secreto()})}cerrar(){this.ref.close()}mensaje(r){let e=r?.error?.msj||r?.error?.msg||r?.error?.mensaje||r?.message||``;return typeof e==`string`?e.trim():``}static ɵfac=function(e){return new(e||t)};static ɵcmp=_E({type:t,selectors:[[`app-totp-dos-factores-dialog`]],decls:26,vars:9,consts:[[1,`td`],[1,`td-cabecera`],[`aria-hidden`,`true`,1,`td-brillo`],[1,`td-icono`],[1,`td-titulos`],[`mat-icon-button`,``,`type`,`button`,`aria-label`,`Cerrar`,1,`td-cerrar`,3,`click`,`disabled`],[`aria-label`,`Pasos de la activación`,1,`td-pasos`],[1,`td-cuerpo`],[1,`td-verificacion`],[`role`,`status`,`aria-live`,`polite`,1,`td-exito`],[1,`td-pie`],[`mat-flat-button`,``,`color`,`primary`,`type`,`button`],[1,`td-paso-punto`],[1,`td-paso-texto`],[1,`td-aviso`],[1,`td-instrucciones`],[1,`td-num`],[1,`td-instruccion`],[1,`td-tiendas`],[`href`,`https://apps.apple.com/app/google-authenticator/id388497605`,`target`,`_blank`,`rel`,`noopener noreferrer`,`aria-label`,`Descargar Google Authenticator en el App Store de Apple`,1,`td-tienda`,`td-tienda--apple`],[`src`,`assets/images/app-store.svg`,`alt`,`Descargar en el App Store`],[`href`,`https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2`,`target`,`_blank`,`rel`,`noopener noreferrer`,`aria-label`,`Descargar Google Authenticator en Google Play`,1,`td-tienda`,`td-tienda--android`],[`src`,`assets/images/play-store.svg`,`alt`,`Disponible en Google Play`],[1,`td-nota`],[1,`td-qr-grid`],[1,`td-qr`],[1,`td-qr-cargando`],[`alt`,`Código QR para configurar la aplicación de autenticación`,3,`src`],[1,`td-qr-vacio`],[1,`td-qr-info`],[1,`td-separador`],[1,`td-clave`],[`mat-icon-button`,``,`type`,`button`,`color`,`primary`,3,`click`,`disabled`,`matTooltip`],[1,`td-copiado`],[1,`td-hint`],[`role`,`alert`,1,`td-error`],[`diameter`,`34`],[`mat-button`,``,`type`,`button`,`color`,`primary`],[`mat-button`,``,`type`,`button`,`color`,`primary`,3,`click`],[1,`td-verificacion-texto`],[`for`,`td-otp`,1,`td-etiqueta`],[`id`,`td-otp`,`type`,`text`,`inputmode`,`numeric`,`autocomplete`,`one-time-code`,`maxlength`,`6`,`placeholder`,`000000`,1,`td-otp`,3,`input`,`value`],[1,`td-aviso`,`td-aviso--peligro`],[`for`,`td-otp-baja`,1,`td-etiqueta`],[`id`,`td-otp-baja`,`type`,`text`,`inputmode`,`numeric`,`autocomplete`,`one-time-code`,`maxlength`,`6`,`placeholder`,`000000`,1,`td-otp`,3,`input`,`value`],[`viewBox`,`0 0 52 52`,`aria-hidden`,`true`,1,`td-check`],[`cx`,`26`,`cy`,`26`,`r`,`24`],[`d`,`M15 27 l8 8 l15 -17`],[`mat-stroked-button`,``,`type`,`button`,3,`click`],[`mat-flat-button`,``,`color`,`primary`,`type`,`button`,3,`click`],[`mat-flat-button`,``,`color`,`primary`,`type`,`button`,3,`click`,`disabled`],[`mat-stroked-button`,``,`type`,`button`,3,`click`,`disabled`],[`diameter`,`18`,1,`td-spinner`],[`mat-flat-button`,``,`color`,`warn`,`type`,`button`,3,`click`,`disabled`]],template:function(e,a){if(e&1&&(Ei(0,`div`,0)(1,`header`,1),Fp(2,`span`,2),Ei(3,`span`,3)(4,`mat-icon`),UD(5),$c()(),Ei(6,`div`,4)(7,`h2`),UD(8),$c(),ZE(9,xt,2,1,`p`),$c(),Ei(10,`button`,5),Up(`click`,function(){return a.cerrar()}),Ei(11,`mat-icon`),UD(12,`close`),$c()()(),ZE(13,kt,18,12,`ol`,6),Ei(14,`div`,7),ZE(15,Nt,52,0)(16,zt,28,7)(17,Vt,12,5,`div`,8)(18,Bt,15,5)(19,Ut,9,2,`div`,9),$c(),Ei(20,`footer`,10),ZE(21,Qt,6,0)(22,Gt,6,1)(23,Xt,5,3)(24,Zt,5,3)(25,Jt,2,0,`button`,11),$c()()),e&2){let o,d;Xp(`td--peligro`,a.esDesactivar()),Qv(5),sh(a.iconoCabecera()),Qv(3),sh(a.titulo()),Qv(),YE(a.subtitulo()?9:-1),Qv(),Pp(`disabled`,a.verificando()),Qv(3),YE(!a.esDesactivar()&&a.paso()!==`listo`?13:-1),Qv(2),YE((o=a.paso())===`intro`?15:o===`configurar`?16:o===`verificar`?17:o===`desactivar`?18:o===`listo`?19:-1),Qv(6),YE((d=a.paso())===`intro`?21:d===`configurar`?22:d===`verificar`?23:d===`desactivar`?24:d===`listo`?25:-1)}},dependencies:[Yo,Ee,xe,pn,f,u,Ye,Ze,J$1,Z$2,Yt$1,mt$1],styles:[`@charset "UTF-8";[_nghost-%COMP%]{display:block;color:var(--%NS%text-primary)}.td[_ngcontent-%COMP%]{display:flex;flex-direction:column;max-height:90vh;background:var(--%NS%surface)}.td-cabecera[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center;gap:.9rem;padding:1.15rem 1.25rem;color:#fff;overflow:hidden;background:linear-gradient(135deg,#0d1b3e,#0c2d48 45%,#12406b);flex-shrink:0}.td-brillo[_ngcontent-%COMP%]{position:absolute;top:-70px;right:-40px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,rgba(0,201,167,.45) 0%,transparent 70%);pointer-events:none}.td-icono[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:14px;flex-shrink:0;background:#ffffff1f;border:1px solid rgba(255,255,255,.18);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.td-icono[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:26px;width:26px;height:26px;color:#4ee1c8}.td-titulos[_ngcontent-%COMP%]{flex:1;min-width:0}.td-titulos[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;font-size:1.15rem;font-weight:700;line-height:1.25;letter-spacing:.2px}.td-titulos[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.15rem 0 0;font-size:.8rem;color:#ffffffc7;line-height:1.35}.td-cerrar[_ngcontent-%COMP%]{flex-shrink:0;color:#ffffffd9!important}.td-cerrar[_ngcontent-%COMP%]:hover:not([disabled]){background:#ffffff1f!important}.td--peligro[_ngcontent-%COMP%]   .td-cabecera[_ngcontent-%COMP%]{background:linear-gradient(135deg,#4a1414,#7a1f1f 55%,#a33a1f)}.td--peligro[_ngcontent-%COMP%]   .td-icono[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#ffd08a}.td-pasos[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:.35rem;margin:0;padding:.9rem 1.25rem;list-style:none;background:#0c2d4808;border-bottom:1px solid var(--%NS%border);flex-shrink:0}.td-pasos[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.4rem;color:var(--%NS%text-secondary);font-size:.78rem;font-weight:600;white-space:nowrap}.td-pasos[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:after{content:"";width:26px;height:2px;margin:0 .35rem;border-radius:2px;background:var(--%NS%border)}.td-pasos[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child:after{display:none}.td-pasos[_ngcontent-%COMP%]   li.activo[_ngcontent-%COMP%]{color:var(--%NS%primary)}.td-pasos[_ngcontent-%COMP%]   li.activo[_ngcontent-%COMP%]   .td-paso-punto[_ngcontent-%COMP%]{background:var(--%NS%primary);border-color:var(--%NS%primary);color:#fff;box-shadow:0 0 0 4px #0c2d481a}.td-pasos[_ngcontent-%COMP%]   li.hecho[_ngcontent-%COMP%]{color:#2e7d32}.td-pasos[_ngcontent-%COMP%]   li.hecho[_ngcontent-%COMP%]   .td-paso-punto[_ngcontent-%COMP%]{background:#2e7d321f;border-color:#2e7d32;color:#2e7d32}.td-pasos[_ngcontent-%COMP%]   li.hecho[_ngcontent-%COMP%]:after{background:#2e7d3273}.td-paso-punto[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;border:2px solid var(--%NS%border);background:var(--%NS%surface);font-size:.72rem;font-weight:700;transition:all .25s ease}.td-paso-punto[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:14px;width:14px;height:14px}.td-cuerpo[_ngcontent-%COMP%]{padding:1.4rem 1.5rem;overflow-y:auto;flex:1 1 auto}.td-cuerpo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:.85rem;color:var(--%NS%text-secondary);line-height:1.5}.td-cuerpo[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0 0 .2rem;font-size:.88rem;font-weight:700;color:var(--%NS%text-primary)}.td-cuerpo[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:var(--%NS%text-primary)}.td-aviso[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:.7rem;padding:.85rem .95rem;border-radius:12px;background:#00c9a717;border:1px solid rgba(0,201,167,.35)}.td-aviso[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{flex-shrink:0;font-size:22px;width:22px;height:22px;color:#00806b;margin-top:1px}.td-aviso[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;font-size:.88rem;margin-bottom:.15rem}.td-aviso[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:.82rem}.td-aviso--peligro[_ngcontent-%COMP%]{background:#c6282812;border-color:#c6282859}.td-aviso--peligro[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:#c62828}.td-instrucciones[_ngcontent-%COMP%]{list-style:none;margin:1.1rem 0 0;padding:0;display:flex;flex-direction:column;gap:.9rem}.td-instrucciones[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{display:flex;gap:.75rem;align-items:flex-start}.td-num[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;flex-shrink:0;font-size:.78rem;font-weight:700;color:var(--%NS%primary);background:#0c2d4814;border:1px solid rgba(12,45,72,.18)}.td-instruccion[_ngcontent-%COMP%]{flex:1;min-width:0}.td-tiendas[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.6rem;margin-top:.6rem;padding:.5rem 0}.td-tienda[_ngcontent-%COMP%]{display:inline-flex;border-radius:8px;transition:transform .2s ease,box-shadow .2s ease}.td-tienda[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;height:40px;width:auto}.td-tienda[_ngcontent-%COMP%]:hover{transform:translateY(-2px);box-shadow:0 6px 16px #0000002e}.td-tienda[_ngcontent-%COMP%]:focus-visible{outline:2px solid var(--%NS%accent);outline-offset:3px}[data-theme=dark][_nghost-%COMP%]   .td-tienda[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td-tienda[_ngcontent-%COMP%]{background:#f5f5f5;padding:2px 4px}.td-nota[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:.45rem;margin-top:1.1rem!important;padding-top:.9rem;border-top:1px dashed var(--%NS%border);font-size:.78rem!important}.td-nota[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px;color:var(--%NS%text-secondary);flex-shrink:0;margin-top:1px}.td-qr-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:210px minmax(0,1fr);gap:1.35rem;align-items:start}.td-qr[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:210px;height:210px;padding:.5rem;border-radius:14px;background:#fff;border:1px solid var(--%NS%border);box-shadow:var(--%NS%shadow-sm)}.td-qr[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:contain}.td-qr-cargando[_ngcontent-%COMP%], .td-qr-vacio[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:.5rem;color:#9e9e9e;text-align:center}.td-qr-cargando[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .td-qr-vacio[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:42px;width:42px;height:42px;color:#bdbdbd}.td-qr-cargando[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .td-qr-vacio[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-size:.75rem}.td-qr-info[_ngcontent-%COMP%]{min-width:0}.td-qr-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:.35rem}.td-separador[_ngcontent-%COMP%]{margin:.9rem 0!important}.td-clave[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.25rem;padding:.2rem .2rem .2rem .7rem;border-radius:10px;background:#0c2d480d;border:1px dashed rgba(12,45,72,.3)}.td-clave[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{flex:1;min-width:0;font-family:SFMono-Regular,ui-monospace,Menlo,Consolas,monospace;font-size:.82rem;font-weight:600;letter-spacing:.06em;color:var(--%NS%primary);word-break:break-all}.td-copiado[_ngcontent-%COMP%]{display:block;margin-top:.35rem;font-size:.75rem;font-weight:600;color:#2e7d32}.td-hint[_ngcontent-%COMP%]{display:block;margin-top:.5rem;font-size:.74rem;color:var(--%NS%text-secondary)}.td-verificacion[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;text-align:center}.td-verificacion[_ngcontent-%COMP%]   .td-verificacion-texto[_ngcontent-%COMP%]{margin-bottom:1.1rem;max-width:420px}.td-etiqueta[_ngcontent-%COMP%]{font-size:.78rem;font-weight:700;color:var(--%NS%text-primary);margin-bottom:.4rem}.td-otp[_ngcontent-%COMP%]{width:100%;max-width:320px;padding:.75rem .9rem;border-radius:12px;border:1.5px solid var(--%NS%border);background:var(--%NS%surface);color:var(--%NS%text-primary);font-family:SFMono-Regular,ui-monospace,Menlo,Consolas,monospace;font-size:1.65rem;font-weight:700;letter-spacing:.5em;text-align:center;transition:border-color .2s ease,box-shadow .2s ease}.td-otp[_ngcontent-%COMP%]::placeholder{color:var(--%NS%text-secondary);opacity:.4;letter-spacing:.5em}.td-otp[_ngcontent-%COMP%]:focus{outline:none;border-color:var(--%NS%accent);box-shadow:0 0 0 3px #00c9a72e}.td-otp.td-otp--error[_ngcontent-%COMP%]{border-color:var(--%NS%warn);box-shadow:0 0 0 3px #f443361f}.td-error[_ngcontent-%COMP%]{display:flex;align-items:center;flex-wrap:wrap;gap:.4rem;margin-top:.8rem!important;padding:.55rem .7rem;border-radius:10px;font-size:.79rem!important;color:#b71c1c!important;background:#f4433614;border:1px solid rgba(244,67,54,.28)}.td-error[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:17px;width:17px;height:17px;flex-shrink:0}.td-error[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-left:auto}.td-exito[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;text-align:center;padding:.75rem 0 .25rem}.td-exito[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:.9rem 0 .3rem;font-size:1rem}.td-exito[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{max-width:380px}.td-check[_ngcontent-%COMP%]{width:74px;height:74px;overflow:visible}.td-check[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%]{fill:none;stroke:#2e7d32;stroke-width:3;stroke-dasharray:151;stroke-dashoffset:151;animation:_ngcontent-%COMP%_td-trazo .6s ease-out forwards}.td-check[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{fill:none;stroke:#2e7d32;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:36;stroke-dashoffset:36;animation:_ngcontent-%COMP%_td-trazo .4s ease-out .45s forwards}.td--peligro[_ngcontent-%COMP%]   .td-check[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%], .td--peligro[_ngcontent-%COMP%]   .td-check[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{stroke:#c62828}@keyframes _ngcontent-%COMP%_td-trazo{to{stroke-dashoffset:0}}.td-pie[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;gap:.6rem;padding:.9rem 1.25rem;border-top:1px solid var(--%NS%border);background:#0c2d4805;flex-shrink:0}.td-pie[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%], .td-pie[_ngcontent-%COMP%]   button[mat-stroked-button][_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;gap:.4rem}.td-pie[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .td-pie[_ngcontent-%COMP%]   button[mat-stroked-button][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px}.td-spinner[_ngcontent-%COMP%]{display:inline-block;--%NS%mat-progress-spinner-active-indicator-color: #ffffff}[data-theme=dark][_nghost-%COMP%]   .td[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td[_ngcontent-%COMP%]{background:#1e1e1e}[data-theme=dark][_nghost-%COMP%]   .td-pasos[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td-pasos[_ngcontent-%COMP%]{background:#ffffff08}[data-theme=dark][_nghost-%COMP%]   .td-paso-punto[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td-paso-punto[_ngcontent-%COMP%]{background:#242424;border-color:#444}[data-theme=dark][_nghost-%COMP%]   .td-pasos[_ngcontent-%COMP%]   li.activo[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td-pasos[_ngcontent-%COMP%]   li.activo[_ngcontent-%COMP%]{color:var(--%NS%accent-light)}[data-theme=dark][_nghost-%COMP%]   .td-num[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td-num[_ngcontent-%COMP%]{color:#4ee1c8;background:#00c9a71f;border-color:#00c9a759}[data-theme=dark][_nghost-%COMP%]   .td-aviso[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td-aviso[_ngcontent-%COMP%]{background:#00c9a714;border-color:#00c9a759}[data-theme=dark][_nghost-%COMP%]   .td-aviso[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td-aviso[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:#4ee1c8}[data-theme=dark][_nghost-%COMP%]   .td-aviso--peligro[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td-aviso--peligro[_ngcontent-%COMP%]{background:#ff52521a;border-color:#ff525266}[data-theme=dark][_nghost-%COMP%]   .td-aviso--peligro[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td-aviso--peligro[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:#ff8a80}[data-theme=dark][_nghost-%COMP%]   .td-clave[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td-clave[_ngcontent-%COMP%]{background:#ffffff0d;border-color:#ffffff40}[data-theme=dark][_nghost-%COMP%]   .td-clave[_ngcontent-%COMP%]   code[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td-clave[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{color:#5ff0d4}[data-theme=dark][_nghost-%COMP%]   .td-otp[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td-otp[_ngcontent-%COMP%]{background:#242424;border-color:#3a3a3a}[data-theme=dark][_nghost-%COMP%]   .td-error[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td-error[_ngcontent-%COMP%]{color:#ff8a80!important}[data-theme=dark][_nghost-%COMP%]   .td-exito[_ngcontent-%COMP%]   .td-check[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td-exito[_ngcontent-%COMP%]   .td-check[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%], [data-theme=dark][_nghost-%COMP%]   .td-exito[_ngcontent-%COMP%]   .td-check[_ngcontent-%COMP%]   path[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td-exito[_ngcontent-%COMP%]   .td-check[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{stroke:#5ff0d4}[data-theme=dark][_nghost-%COMP%]   .td--peligro[_ngcontent-%COMP%]   .td-check[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td--peligro[_ngcontent-%COMP%]   .td-check[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%], [data-theme=dark][_nghost-%COMP%]   .td--peligro[_ngcontent-%COMP%]   .td-check[_ngcontent-%COMP%]   path[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td--peligro[_ngcontent-%COMP%]   .td-check[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{stroke:#ff8a80}[data-theme=dark][_nghost-%COMP%]   .td-pie[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .td-pie[_ngcontent-%COMP%]{background:#ffffff05}@media(max-width:560px){.td-cabecera[_ngcontent-%COMP%]{padding:.95rem 1rem;gap:.7rem}.td-titulos[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:.95rem}.td-pasos[_ngcontent-%COMP%]{padding:.75rem;gap:0}.td-pasos[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{font-size:.7rem}.td-pasos[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:after{width:14px;margin:0 .2rem}.td-paso-texto[_ngcontent-%COMP%]{display:none}.td-cuerpo[_ngcontent-%COMP%]{padding:1rem}.td-qr-grid[_ngcontent-%COMP%]{grid-template-columns:1fr;justify-items:center;text-align:center}.td-qr-info[_ngcontent-%COMP%]{width:100%}.td-qr-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .td-qr-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:left}.td-otp[_ngcontent-%COMP%]{max-width:none;font-size:1.4rem}.td-pie[_ngcontent-%COMP%]{padding:.8rem 1rem;flex-direction:column-reverse}.td-pie[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%}}`]})};function Kt(t,r){if(t&1&&(Ei(0,`div`,7)(1,`div`,17)(2,`small`,18),UD(3),$c(),Ei(4,`small`,19),UD(5),$c()(),Ei(6,`div`,20),Fp(7,`div`,21),$c()()),t&2){let e=pD();Qv(2),RD(`label-`+e.passwordStrengthColor()),Qv(),zc(` Nivel de seguridad: `,e.passwordStrengthLabel(),` `),Qv(2),zc(``,e.passwordStrengthWidth(),`%`),Qv(2),RD(`bg-`+e.passwordStrengthColor()),Jp(`width`,e.passwordStrengthWidth(),`%`)}}function en(t,r){t&1&&(Ei(0,`div`,9)(1,`mat-icon`),UD(2,`warning`),$c(),Ei(3,`small`),UD(4,`Las contraseñas no coinciden`),$c()())}function tn(t,r){t&1&&(Fp(0,`mat-spinner`,22),Ei(1,`span`),UD(2,`Guardando...`),$c())}function nn(t,r){t&1&&(Wc(0),Ei(1,`mat-icon`),UD(2,`save`),$c(),Ei(3,`span`),UD(4,`Guardar`),$c(),Gc())}function an(t,r){t&1&&UD(0,` Al iniciar sesión deberá ingresar, además de su contraseña, el código de 6 dígitos que genera su aplicación de autenticación. Para desactivarla se le pedirá ese mismo código. `)}function on(t,r){t&1&&UD(0,` Active la verificación para proteger su cuenta con un código temporal generado en su teléfono. Se le guiará paso a paso. `)}var st=class t{showClave=Uo(!1);showNueva=Uo(!1);showRepite=Uo(!1);saving=Uo(!1);changeClaveCtrl=new Dn(``);changeNuevaCtrl=new Dn(``);changeRepiteCtrl=new Dn(``);get changeNuevaLength(){return this.changeNuevaCtrl.value?.length||0}get changeRepiteLength(){return this.changeRepiteCtrl.value?.length||0}get passwordsMatch(){return this.changeNuevaCtrl.value!==this.changeRepiteCtrl.value&&this.changeRepiteLength>0}get canSave(){return this.isFuerte()&&this.changeNuevaCtrl.value===this.changeRepiteCtrl.value}passwordStrengthWidth=Uo(0);passwordStrengthLabel=Uo(`Sin seguridad`);passwordStrengthColor=Uo(``);isFuerte=Uo(!1);totpSecret=Uo(``);isTotpActive=Uo(!1);_unsubscribeAll=new Z$1;usuario=``;tokenData=null;authService=T(Xe);router=T(me);dialog=T(le);ngOnInit(){let r=sessionStorage.getItem(`token`);if(r){let e=this.authService.getUserDecrypt(r);this.tokenData=e?.Usuario||null,this.usuario=this.tokenData?.usuario||this.tokenData?.cedula||``;let a=sessionStorage.getItem(`totp`),o=this.tokenData?.token||``;(a!==null?a===`1`:this.tokenData?.token&&this.tokenData.token!==``)&&(this.isTotpActive.set(!0),o?this.totpSecret.set(o):this.authService.consultarSecretoTotp().subscribe(w=>{w&&this.totpSecret.set(w)}))}this.changeNuevaCtrl.valueChanges.pipe(Gh(this._unsubscribeAll)).subscribe(e=>this.checkPasswordStrength(e||``))}checkPasswordStrength(r){let e=0;r.length>=8&&(e+=20),r.match(/[A-Z]/)&&(e+=20),r.match(/[a-z]/)&&(e+=20),r.match(/[0-9]/)&&(e+=20),r.match(/[@$!%*?&]/)&&(e+=20),this.passwordStrengthWidth.set(e),this.isFuerte.set(e>=80),e<40?(this.passwordStrengthLabel.set(`Débil`),this.passwordStrengthColor.set(`danger`)):e<60?(this.passwordStrengthLabel.set(`Media`),this.passwordStrengthColor.set(`warning`)):e===100?(this.passwordStrengthLabel.set(`Fuerte`),this.passwordStrengthColor.set(`success`)):(this.passwordStrengthLabel.set(`Buena`),this.passwordStrengthColor.set(`info`))}async save(){if(!this.usuario){this.alertMini(`error`,`No existe un usuario`);return}if(this.passwordsMatch){this.alertMini(`error`,`La nueva contraseña y su repetición no coinciden.`);return}let r=this.changeNuevaCtrl.value;if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(r)){this.alertMini(`error`,`La clave no cumple con los requisitos de complejidad.`);return}this.saving.set(!0);let a=this.changeClaveCtrl.value,o=this.changeNuevaCtrl.value;console.log(`[CambiarContrasena] Enviando cambio para usuario:`,this.usuario);let d=await this.authService.cambiarContrasena(this.usuario,a,o);this.saving.set(!1),d&&this.router.navigate([`/login`])}toggleTotp(r){let e=r.checked;if(e===this.isTotpActive())return;let a={modo:e?`activar`:`desactivar`,secreto:e?``:this.totpSecret()};this.dialog.open(K,{width:`min(96vw, 720px)`,maxWidth:`96vw`,maxHeight:`92vh`,autoFocus:!1,disableClose:!0,panelClass:`totp-dialog-panel`,data:a}).afterClosed().pipe(Gh(this._unsubscribeAll)).subscribe(d=>{if(!d){r.source.checked=this.isTotpActive();return}if(d.secreto){this.totpSecret.set(d.secreto),this.isTotpActive.set(!0),this.guardarEstadoTotp(`1`),this.alertMini(`success`,`Verificación en dos pasos activada.`);return}this.totpSecret.set(``),this.isTotpActive.set(!1),this.guardarEstadoTotp(`0`),this.alertMini(`success`,`Verificación en dos pasos desactivada.`)})}guardarEstadoTotp(r){sessionStorage.setItem(`totp`,r)}alertMini(r,e){import(`./chunk-B3W1-qDS.js`).then(({default:a})=>{a.fire({toast:!0,position:`top-end`,icon:r,title:e,showConfirmButton:!1,timer:3e3,timerProgressBar:!0})})}ngOnDestroy(){this._unsubscribeAll.next(void 0),this._unsubscribeAll.complete()}static ɵfac=function(e){return new(e||t)};static ɵcmp=_E({type:t,selectors:[[`app-cambiar-contrasena`]],decls:60,vars:23,consts:[[1,`section-header`],[1,`form-card`],[1,`alert`,`info-alert`],[`appearance`,`outline`,1,`full-width`],[`matInput`,``,`placeholder`,`Ingrese su clave actual`,`autocomplete`,`current-password`,3,`type`,`formControl`],[`mat-icon-button`,``,`matSuffix`,``,`type`,`button`,3,`click`],[`matInput`,``,`placeholder`,`Ingrese su nueva clave`,`autocomplete`,`new-password`,3,`type`,`formControl`],[1,`strength-wrapper`],[`matInput`,``,`placeholder`,`Confirme su nueva clave`,`autocomplete`,`new-password`,3,`type`,`formControl`],[1,`mismatch-alert`],[1,`form-actions`],[`mat-flat-button`,``,`color`,`primary`,3,`click`,`disabled`],[1,`totp-card`],[1,`totp-header`],[1,`totp-title`],[`color`,`primary`,3,`change`,`checked`],[1,`totp-estado`],[1,`strength-header`],[1,`strength-label`],[1,`strength-percent`],[1,`progress-track`],[1,`progress-bar`],[`diameter`,`18`,1,`inline-spinner`]],template:function(e,a){e&1&&(Ei(0,`div`,0)(1,`h1`),UD(2,`Cambiar Contraseña`),$c(),Ei(3,`p`),UD(4,`Actualice la clave de acceso y gestione la autenticación de dos factores de su cuenta.`),$c()(),Ei(5,`mat-card`,1)(6,`mat-card-content`)(7,`div`,2)(8,`mat-icon`),UD(9,`info`),$c(),Ei(10,`small`),UD(11,`La contraseña debe tener entre 8-16 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales (@$!%*?&).`),$c()(),Ei(12,`mat-form-field`,3)(13,`mat-label`),UD(14,`Contraseña Actual`),$c(),Fp(15,`input`,4),PI(),Ei(16,`button`,5),Up(`click`,function(){return a.showClave.set(!a.showClave())}),Ei(17,`mat-icon`),UD(18),$c()()(),Ei(19,`mat-form-field`,3)(20,`mat-label`),UD(21,`Nueva Contraseña`),$c(),Fp(22,`input`,6),PI(),Ei(23,`button`,5),Up(`click`,function(){return a.showNueva.set(!a.showNueva())}),Ei(24,`mat-icon`),UD(25),$c()()(),ZE(26,Kt,8,8,`div`,7),Ei(27,`mat-form-field`,3)(28,`mat-label`),UD(29,`Repetir Contraseña`),$c(),Fp(30,`input`,8),PI(),Ei(31,`button`,5),Up(`click`,function(){return a.showRepite.set(!a.showRepite())}),Ei(32,`mat-icon`),UD(33),$c()()(),ZE(34,en,5,0,`div`,9),Ei(35,`div`,10)(36,`button`,11),Up(`click`,function(){return a.save()}),ZE(37,tn,3,0)(38,nn,5,0,`ng-container`),$c()()()(),Ei(39,`mat-card`,12)(40,`mat-card-content`)(41,`div`,13)(42,`div`,14)(43,`mat-icon`),UD(44,`smartphone`),$c(),Ei(45,`div`)(46,`h3`),UD(47,`Autenticación de Dos Factores (TOTP)`),$c(),Ei(48,`small`),UD(49,`Añade una capa extra de seguridad a tu cuenta.`),$c()()(),Ei(50,`mat-slide-toggle`,15),Up(`change`,function(d){return a.toggleTotp(d)}),$c()(),Ei(51,`div`,16)(52,`mat-icon`),UD(53),$c(),Ei(54,`div`)(55,`strong`),UD(56),$c(),Ei(57,`small`),ZE(58,an,1,0)(59,on,1,0),$c()()()()()),e&2&&(Qv(15),Pp(`type`,a.showClave()?`text`:`password`)(`formControl`,a.changeClaveCtrl),jI(),Qv(3),sh(a.showClave()?`visibility_off`:`visibility`),Qv(4),Xp(`invalid`,a.passwordsMatch),Pp(`type`,a.showNueva()?`text`:`password`)(`formControl`,a.changeNuevaCtrl),jI(),Qv(3),sh(a.showNueva()?`visibility_off`:`visibility`),Qv(),YE(a.changeNuevaLength>0?26:-1),Qv(4),Xp(`invalid`,a.passwordsMatch),Pp(`type`,a.showRepite()?`text`:`password`)(`formControl`,a.changeRepiteCtrl),jI(),Qv(3),sh(a.showRepite()?`visibility_off`:`visibility`),Qv(),YE(a.passwordsMatch?34:-1),Qv(2),Pp(`disabled`,!a.canSave||a.saving()),Qv(),YE(a.saving()?37:38),Qv(13),Pp(`checked`,a.isTotpActive()),Qv(),Xp(`totp-estado--activa`,a.isTotpActive()),Qv(2),sh(a.isTotpActive()?`verified_user`:`gpp_maybe`),Qv(3),zc(` `,a.isTotpActive()?`Verificación en dos pasos activada`:`Verificación en dos pasos desactivada`,` `),Qv(2),YE(a.isTotpActive()?58:59))},dependencies:[Yo,no,nn$1,Qr,Wi,Ia,Ra,xt$1,$e,qn,Ct,Ee,xe,pn,Ye,Ze,J$1,Z$2,j,I,_,ot,ie],styles:[`@charset "UTF-8";[_nghost-%COMP%]{display:block}.section-header[_ngcontent-%COMP%]{margin-bottom:1.5rem}.section-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;color:#0c2d48;margin:0 0 .25rem}.section-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#757575;font-size:.92rem}.form-card[_ngcontent-%COMP%]{border-radius:16px!important;border:1px solid rgba(224,224,224,.5);margin-bottom:1.5rem}.full-width[_ngcontent-%COMP%]{width:100%}.alert.info-alert[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:.5rem;background:#e0f7f1;border:1px solid #b2ece1;border-radius:8px;padding:.65rem .8rem;margin-bottom:1rem}.alert.info-alert[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;color:#0c2d48;flex-shrink:0;margin-top:1px}.alert.info-alert[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:#12406b;line-height:1.35}.strength-wrapper[_ngcontent-%COMP%]{margin:.15rem 0 .9rem}.strength-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:.3rem}.strength-label[_ngcontent-%COMP%]{font-weight:600}.label-danger[_ngcontent-%COMP%]{color:#d32f2f}.label-warning[_ngcontent-%COMP%]{color:#f9a825}.label-success[_ngcontent-%COMP%]{color:#2e7d32}.label-info[_ngcontent-%COMP%]{color:#0277bd}.strength-percent[_ngcontent-%COMP%]{color:#757575}.progress-track[_ngcontent-%COMP%]{height:6px;background:#eee;border-radius:3px;overflow:hidden}.progress-bar[_ngcontent-%COMP%]{height:100%;border-radius:3px;transition:width .3s ease,background .3s ease}.bg-danger[_ngcontent-%COMP%]{background:#d32f2f}.bg-warning[_ngcontent-%COMP%]{background:#f9a825}.bg-success[_ngcontent-%COMP%]{background:#2e7d32}.bg-info[_ngcontent-%COMP%]{background:#0277bd}.mismatch-alert[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.4rem;color:#d32f2f;margin:-.3rem 0 .5rem}.mismatch-alert[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:16px;width:16px;height:16px}.form-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;margin-top:.5rem;padding-top:1rem;border-top:1px solid #eeeeee}.inline-spinner[_ngcontent-%COMP%]{display:inline-block;margin-right:.4rem;vertical-align:middle}.form-actions[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:row;gap:.4rem;line-height:normal}.form-actions[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%]   .mdc-button__label[_ngcontent-%COMP%], .form-actions[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%]   .mat-button-wrapper[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-direction:row;gap:.4rem}.form-actions[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;font-size:18px;width:18px;height:18px;line-height:1;vertical-align:middle;flex-shrink:0}.form-actions[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{line-height:normal;display:inline-flex;align-items:center;vertical-align:middle}.totp-card[_ngcontent-%COMP%]{border-radius:16px!important;border:1px solid rgba(224,224,224,.5)}.totp-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:1rem}.totp-title[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem}.totp-title[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{font-size:30px;width:30px;height:30px;color:#0c2d48}.totp-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0;font-size:1rem;font-weight:600;color:#212121}.totp-title[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:#9e9e9e;font-size:.78rem}.totp-estado[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:.6rem;margin-top:1.1rem;padding:.7rem .85rem;border-radius:10px;background:#9e9e9e14;border:1px solid rgba(158,158,158,.28)}.totp-estado[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{flex-shrink:0;font-size:20px;width:20px;height:20px;color:#757575;margin-top:1px}.totp-estado[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;font-size:.84rem;font-weight:600;color:#424242;margin-bottom:.1rem}.totp-estado[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{display:block;font-size:.78rem;color:#757575;line-height:1.4}.totp-estado--activa[_ngcontent-%COMP%]{background:#00c9a714;border-color:#00c9a759}.totp-estado--activa[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:#00806b}.totp-estado--activa[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#0c2d48}@media(max-width:480px){.totp-header[_ngcontent-%COMP%]{align-items:flex-start;gap:.6rem}.totp-title[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{font-size:26px;width:26px;height:26px}}[data-theme=dark][_nghost-%COMP%]   .section-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .section-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#00c9a7}[data-theme=dark][_nghost-%COMP%]   .section-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .section-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#9e9e9e}[data-theme=dark][_nghost-%COMP%]   .form-card[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .form-card[_ngcontent-%COMP%], [data-theme=dark][_nghost-%COMP%]   .totp-card[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .totp-card[_ngcontent-%COMP%]{background:#1e1e1e!important;color:#e0e0e0!important;border-color:#333!important;box-shadow:0 4px 12px #00000080!important}[data-theme=dark][_nghost-%COMP%]   .totp-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .totp-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#fff}[data-theme=dark][_nghost-%COMP%]   .totp-title[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .totp-title[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:#b0b0b0}[data-theme=dark][_nghost-%COMP%]   .totp-title[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .totp-title[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:#00c9a7}[data-theme=dark][_nghost-%COMP%]   .alert.info-alert[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .alert.info-alert[_ngcontent-%COMP%]{background:#1e5f9e26;border-color:#1e5f9e66}[data-theme=dark][_nghost-%COMP%]   .alert.info-alert[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .alert.info-alert[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#8fe8d8}[data-theme=dark][_nghost-%COMP%]   .alert.info-alert[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .alert.info-alert[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:#b3bac5}[data-theme=dark][_nghost-%COMP%]   .strength-percent[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .strength-percent[_ngcontent-%COMP%]{color:#9e9e9e}[data-theme=dark][_nghost-%COMP%]   .progress-track[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .progress-track[_ngcontent-%COMP%]{background:#333}[data-theme=dark][_nghost-%COMP%]   .totp-estado[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .totp-estado[_ngcontent-%COMP%]{background:#ffffff0a;border-color:#ffffff1f}[data-theme=dark][_nghost-%COMP%]   .totp-estado[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .totp-estado[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:#9e9e9e}[data-theme=dark][_nghost-%COMP%]   .totp-estado[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .totp-estado[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#e0e0e0}[data-theme=dark][_nghost-%COMP%]   .totp-estado[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .totp-estado[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:#b0b0b0}[data-theme=dark][_nghost-%COMP%]   .totp-estado--activa[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .totp-estado--activa[_ngcontent-%COMP%]{background:#00c9a71a;border-color:#00c9a759}[data-theme=dark][_nghost-%COMP%]   .totp-estado--activa[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .totp-estado--activa[_ngcontent-%COMP%] > mat-icon[_ngcontent-%COMP%]{color:#4ee1c8}[data-theme=dark][_nghost-%COMP%]   .totp-estado--activa[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .totp-estado--activa[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:#fff}[data-theme=dark][_nghost-%COMP%]   .form-actions[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%], [data-theme=dark]   [_nghost-%COMP%]   .form-actions[_ngcontent-%COMP%]   button[mat-flat-button][_ngcontent-%COMP%]{background:linear-gradient(135deg,#00c9a7 0% 100%)!important;color:#fff!important}`]})};export{st as CambiarContrasenaComponent};