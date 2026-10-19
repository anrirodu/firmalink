import{a as v,n as s,t as r}from"./chunk-C9yOwMO6.js";import{A as Al,B as Dr,Cn as g0,Ct as PE,Dn as hr,Dt as Ql,Et as Q,F as Be,Gn as p0,H as Eg,Ht as Vc,Kn as pE,M as Ap,Mn as ja,Mt as S,Nn as jc,Nt as Sm,On as iD,Pn as jh,Pt as T,Qn as sg,S as $D,T as $p,Tt as Pp,U as Ep,Vn as nD,X as Fp,Yn as rD,Zn as sD,_ as Ls,_t as Ne,ar as uv,at as Ie,b as j$1,bt as Op,cn as b,cr as vE,ct as Jh,fn as bp,hr as xi,it as ID,kn as j,mt as Lv,nr as ue$1,on as ae,pr as wg,pt as Ln,q as FE,r as Ie$1,rr as ug,tt as He,ur as vo$1,v as O,vt as Np,w as $h,wn as gE,xn as en,y as Y,yn as eD,zn as m0,zt as Up}from"./main-4TJD7ILE.js";import{n as _,t as I}from"./chunk-Bbvfoj67.js";import{B as tt,D as bo,F as qt$1,M as ka,P as nn,R as to$1,_ as Tn,f as M,k as et,l as Gt$1,p as Mt,w as _$1,x as Wt$1}from"./chunk-D1OpZURi.js";import{E as q,O as z,a as Ht$1,c as J,f as Q$1,r as G$1,u as K,w as j$2}from"./chunk-BMnLpOpi.js";import{C as _t,f as Q$2}from"./chunk-iBS8sCt7.js";import{E as ut,T as pt,b as ht,n as Di,v as be,w as mt,x as ki}from"./chunk-BY0FC1k0.js";function kt(e,i){e&1&&Np(0,`div`,2)}var qt=new S(`MAT_PROGRESS_BAR_DEFAULT_OPTIONS`);var Ci=(()=>{class e{_elementRef=T(Dr);_ngZone=T(Ne);_changeDetectorRef=T(p0);_renderer=T(ja);_cleanupTransitionEnd;constructor(){let t=to$1(),o=T(qt,{optional:!0});this._isNoopAnimation=t===`di-disabled`,t===`reduced-motion`&&this._elementRef.nativeElement.classList.add(`mat-progress-bar-reduced-motion`),o&&(o.color&&(this.color=this._defaultColor=o.color),this.mode=o.mode||this.mode)}_isNoopAnimation;get color(){return this._color||this._defaultColor}set color(t){this._color=t}_color;_defaultColor=`primary`;get value(){return this._value}set value(t){this._value=bt(t||0),this._changeDetectorRef.markForCheck()}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(t){this._bufferValue=bt(t||0),this._changeDetectorRef.markForCheck()}_bufferValue=0;animationEnd=new Be;get mode(){return this._mode}set mode(t){this._mode=t,this._changeDetectorRef.markForCheck()}_mode=`determinate`;ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._cleanupTransitionEnd=this._renderer.listen(this._elementRef.nativeElement,`transitionend`,this._transitionendHandler)})}ngOnDestroy(){this._cleanupTransitionEnd?.()}_getPrimaryBarTransform(){return`scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return`${this.mode===`buffer`?this.bufferValue:100}%`}_isIndeterminate(){return this.mode===`indeterminate`||this.mode===`query`}_transitionendHandler=t=>{this.animationEnd.observers.length===0||!t.target||!t.target.classList.contains(`mdc-linear-progress__primary-bar`)||(this.mode===`determinate`||this.mode===`buffer`)&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}))};static ɵfac=function(o){return new(o||e)};static ɵcmp=pE({type:e,selectors:[[`mat-progress-bar`]],hostAttrs:[`role`,`progressbar`,`aria-valuemin`,`0`,`aria-valuemax`,`100`,`tabindex`,`-1`,1,`mat-mdc-progress-bar`,`mdc-linear-progress`],hostVars:10,hostBindings:function(o,n){o&2&&(bp(`aria-valuenow`,n._isIndeterminate()?null:n.value)(`mode`,n.mode),ID(`mat-`+n.color),Up(`_mat-animation-noopable`,n._isNoopAnimation)(`mdc-linear-progress--animation-ready`,!n._isNoopAnimation)(`mdc-linear-progress--indeterminate`,n._isIndeterminate()))},inputs:{color:`color`,value:[2,`value`,`value`,m0],bufferValue:[2,`bufferValue`,`bufferValue`,m0],mode:`mode`},outputs:{animationEnd:`animationEnd`},exportAs:[`matProgressBar`],decls:7,vars:5,consts:[[`aria-hidden`,`true`,1,`mdc-linear-progress__buffer`],[1,`mdc-linear-progress__buffer-bar`],[1,`mdc-linear-progress__buffer-dots`],[`aria-hidden`,`true`,1,`mdc-linear-progress__bar`,`mdc-linear-progress__primary-bar`],[1,`mdc-linear-progress__bar-inner`],[`aria-hidden`,`true`,1,`mdc-linear-progress__bar`,`mdc-linear-progress__secondary-bar`]],template:function(o,n){o&1&&(jc(0,`div`,0),Np(1,`div`,1),PE(2,kt,1,0,`div`,2),Vc(),jc(3,`div`,3),Np(4,`span`,4),Vc(),jc(5,`div`,5),Np(6,`span`,4),Vc()),o&2&&(Lv(),$p(`flex-basis`,n._getBufferBarFlexBasis()),Lv(),FE(n.mode===`buffer`?2:-1),Lv(),$p(`transform`,n._getPrimaryBarTransform()))},styles:[`.mat-mdc-progress-bar {
  --%NS%mat-progress-bar-animation-multiplier: 1;
  display: block;
  text-align: start;
}
.mat-mdc-progress-bar[mode=query] {
  transform: scaleX(-1);
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner {
  animation: none;
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar {
  transition: transform 1ms;
}

.mat-progress-bar-reduced-motion {
  --%NS%mat-progress-bar-animation-multiplier: 2;
}

.mdc-linear-progress {
  position: relative;
  width: 100%;
  transform: translateZ(0);
  outline: 1px solid transparent;
  overflow-x: hidden;
  transition: opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: max(var(--%NS%mat-progress-bar-track-height, 4px), var(--%NS%mat-progress-bar-active-indicator-height, 4px));
}
@media (forced-colors: active) {
  .mdc-linear-progress {
    outline-color: CanvasText;
  }
}

.mdc-linear-progress__bar {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  animation: none;
  transform-origin: top left;
  transition: transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: var(--%NS%mat-progress-bar-active-indicator-height, 4px);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__bar {
  transition: none;
}
[dir=rtl] .mdc-linear-progress__bar {
  right: 0;
  transform-origin: center right;
}

.mdc-linear-progress__bar-inner {
  display: inline-block;
  position: absolute;
  width: 100%;
  animation: none;
  border-top-style: solid;
  border-color: var(--%NS%mat-progress-bar-active-indicator-color, var(--%NS%mat-sys-primary));
  border-top-width: var(--%NS%mat-progress-bar-active-indicator-height, 4px);
}

.mdc-linear-progress__buffer {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  overflow: hidden;
  height: var(--%NS%mat-progress-bar-track-height, 4px);
  border-radius: var(--%NS%mat-progress-bar-track-shape, var(--%NS%mat-sys-corner-none));
}

.mdc-linear-progress__buffer-dots {
  background-image: radial-gradient(circle, var(--%NS%mat-progress-bar-track-color, var(--%NS%mat-sys-surface-variant)) calc(var(--%NS%mat-progress-bar-track-height, 4px) / 2), transparent 0);
  background-repeat: repeat-x;
  background-size: calc(calc(var(--%NS%mat-progress-bar-track-height, 4px) / 2) * 5);
  background-position: left;
  flex: auto;
  transform: rotate(180deg);
  animation: mdc-linear-progress-buffering calc(250ms * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
@media (forced-colors: active) {
  .mdc-linear-progress__buffer-dots {
    background-color: ButtonBorder;
  }
}
[dir=rtl] .mdc-linear-progress__buffer-dots {
  animation: mdc-linear-progress-buffering-reverse calc(250ms * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
  transform: rotate(0);
}

.mdc-linear-progress__buffer-bar {
  flex: 0 1 100%;
  transition: flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  background-color: var(--%NS%mat-progress-bar-track-color, var(--%NS%mat-sys-surface-variant));
}

.mdc-linear-progress__primary-bar {
  transform: scaleX(0);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  left: -145.166611%;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation: mdc-linear-progress-primary-indeterminate-translate calc(2s * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-primary-indeterminate-scale calc(2s * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation-name: mdc-linear-progress-primary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  right: -145.166611%;
  left: auto;
}

.mdc-linear-progress__secondary-bar {
  display: none;
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  left: -54.888891%;
  display: block;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation: mdc-linear-progress-secondary-indeterminate-translate calc(2s * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-secondary-indeterminate-scale calc(2s * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation-name: mdc-linear-progress-secondary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  right: -54.888891%;
  left: auto;
}

@keyframes mdc-linear-progress-buffering {
  from {
    transform: rotate(180deg) translateX(calc(var(--%NS%mat-progress-bar-track-height, 4px) * -2.5));
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(83.67142%);
  }
  100% {
    transform: translateX(200.611057%);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-scale {
  0% {
    transform: scaleX(0.08);
  }
  36.65% {
    animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
    transform: scaleX(0.08);
  }
  69.15% {
    animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
    transform: scaleX(0.661479);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(84.386165%);
  }
  100% {
    transform: translateX(160.277782%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-scale {
  0% {
    animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
    transform: scaleX(0.08);
  }
  19.15% {
    animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);
    transform: scaleX(0.457104);
  }
  44.15% {
    animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
    transform: scaleX(0.72796);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(-83.67142%);
  }
  100% {
    transform: translateX(-200.611057%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(-37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(-84.386165%);
  }
  100% {
    transform: translateX(-160.277782%);
  }
}
@keyframes mdc-linear-progress-buffering-reverse {
  from {
    transform: translateX(-10px);
  }
}
`],encapsulation:2})}return e})();function bt(e,i=0,t=100){return Math.max(i,Math.min(t,e))}var Si=(()=>{class e{static ɵfac=function(o){return new(o||e)};static ɵmod=gE({type:e});static ɵinj=Ql({imports:[et]})}return e})();var re=v(Ls());var yt=class e{toast=re.default.mixin({toast:!0,position:`top-end`,showConfirmButton:!1,timer:5e3,timerProgressBar:!0});aviso(i,t){this.toast.fire({icon:`warning`,title:i,text:t})}info(i,t){this.toast.fire({icon:`info`,title:i,text:t})}exito(i,t){this.toast.fire({icon:`success`,title:i,text:t})}error(i,t){this.toast.fire({icon:`error`,title:i,text:t})}errorModal(i,t){return re.default.fire({icon:`error`,title:i,html:t,confirmButtonColor:`#0c2d48`})}static detalle(i){if(i==null)return`Sin detalle`;if(typeof i==`string`)return i;let t=i;return t.error?.msj?t.error.msj:t.status?`HTTP ${t.status}${t.message?` — `+t.message:``}`:t.message??`Sin detalle`}static ɵfac=function(t){return new(t||e)};static ɵprov=ae({token:e,factory:e.ɵfac,providedIn:`root`})};var Bt=[`panel`];var zt=[`*`];function $t(e,i){if(e&1&&(jc(0,`div`,1,0),rD(2),Vc()),e&2){let t=i.id,o=eD();ID(o._classList),Up(`mat-mdc-autocomplete-visible`,o.showPanel)(`mat-mdc-autocomplete-hidden`,!o.showPanel)(`mat-autocomplete-panel-animations-enabled`,!o._animationsDisabled)(`mat-primary`,o._color===`primary`)(`mat-accent`,o._color===`accent`)(`mat-warn`,o._color===`warn`),Ap(`id`,o.id),bp(`aria-label`,o.ariaLabel||null)(`aria-labelledby`,o._getPanelAriaLabelledby(t))}}var se=class{source;option;constructor(i,t){this.source=i,this.option=t}};var Et=new S(`mat-autocomplete-default-options`,{providedIn:`root`,factory:()=>({autoActiveFirstOption:!1,autoSelectActiveOption:!1,hideSingleSelectionIndicator:!1,requireSelection:!1,hasBackdrop:!1})});var Ki=(()=>{class e{_changeDetectorRef=T(p0);_elementRef=T(Dr);_defaults=T(Et);_animationsDisabled=tt();_activeOptionChanges=j.EMPTY;_keyManager;showPanel=!1;get isOpen(){return this._isOpen&&this.showPanel}_isOpen=!1;_latestOpeningTrigger;_setColor(t){this._color=t,this._changeDetectorRef.markForCheck()}_color;template;panel;options;optionGroups;ariaLabel;ariaLabelledby;displayWith=null;autoActiveFirstOption;autoSelectActiveOption;requireSelection;panelWidth;disableRipple=!1;optionSelected=new Be;opened=new Be;closed=new Be;optionActivated=new Be;set classList(t){this._classList=t,this._elementRef.nativeElement.className=``}_classList;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(t){this._hideSingleSelectionIndicator=t,this._syncParentProperties()}_hideSingleSelectionIndicator;_syncParentProperties(){if(this.options)for(let t of this.options)t._changeDetectorRef.markForCheck()}id=T(qt$1).getId(`mat-autocomplete-`);inertGroups;constructor(){let t=T(_$1);this.inertGroups=t?.SAFARI||!1,this.autoActiveFirstOption=!!this._defaults.autoActiveFirstOption,this.autoSelectActiveOption=!!this._defaults.autoSelectActiveOption,this.requireSelection=!!this._defaults.requireSelection,this._hideSingleSelectionIndicator=this._defaults.hideSingleSelectionIndicator??!1}ngAfterContentInit(){this._keyManager=new Gt$1(this.options).withWrap().skipPredicate(this._skipPredicate),this._activeOptionChanges=this._keyManager.change.subscribe(t=>{this.isOpen&&this.optionActivated.emit({source:this,option:this.options.toArray()[t]||null})}),this._setVisibility()}ngOnDestroy(){this._keyManager?.destroy(),this._activeOptionChanges.unsubscribe()}_setScrollTop(t){this.panel&&(this.panel.nativeElement.scrollTop=t)}_getScrollTop(){return this.panel?this.panel.nativeElement.scrollTop:0}_setVisibility(){this.showPanel=!!this.options?.length,this._changeDetectorRef.markForCheck()}_emitSelectEvent(t){let o=new se(this,t);this.optionSelected.emit(o)}_getPanelAriaLabelledby(t){if(this.ariaLabel)return null;let o=t?t+` `:``;return this.ariaLabelledby?o+this.ariaLabelledby:t}_skipPredicate(){return!1}static ɵfac=function(o){return new(o||e)};static ɵcmp=pE({type:e,selectors:[[`mat-autocomplete`]],contentQueries:function(o,n,a){if(o&1&&Pp(a,be,5)(a,ut,5),o&2){let r;iD(r=sD())&&(n.options=r),iD(r=sD())&&(n.optionGroups=r)}},viewQuery:function(o,n){if(o&1&&Fp(hr,7)(Bt,5),o&2){let a;iD(a=sD())&&(n.template=a.first),iD(a=sD())&&(n.panel=a.first)}},hostAttrs:[1,`mat-mdc-autocomplete`],inputs:{ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],displayWith:`displayWith`,autoActiveFirstOption:[2,`autoActiveFirstOption`,`autoActiveFirstOption`,g0],autoSelectActiveOption:[2,`autoSelectActiveOption`,`autoSelectActiveOption`,g0],requireSelection:[2,`requireSelection`,`requireSelection`,g0],panelWidth:`panelWidth`,disableRipple:[2,`disableRipple`,`disableRipple`,g0],classList:[0,`class`,`classList`],hideSingleSelectionIndicator:[2,`hideSingleSelectionIndicator`,`hideSingleSelectionIndicator`,g0]},outputs:{optionSelected:`optionSelected`,opened:`opened`,closed:`closed`,optionActivated:`optionActivated`},exportAs:[`matAutocomplete`],features:[$D([{provide:ht,useExisting:e}])],ngContentSelectors:zt,decls:1,vars:0,consts:[[`panel`,``],[`role`,`listbox`,1,`mat-mdc-autocomplete-panel`,`mdc-menu-surface`,`mdc-menu-surface--open`,3,`id`]],template:function(o,n){o&1&&(nD(),Ep(0,$t,3,17,`ng-template`))},styles:[`div.mat-mdc-autocomplete-panel {
  width: 100%;
  max-height: 256px;
  visibility: hidden;
  transform-origin: center top;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  position: relative;
  border-radius: var(--%NS%mat-autocomplete-container-shape, var(--%NS%mat-sys-corner-extra-small));
  box-shadow: var(--%NS%mat-autocomplete-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  background-color: var(--%NS%mat-autocomplete-background-color, var(--%NS%mat-sys-surface-container));
}
@media (forced-colors: active) {
  div.mat-mdc-autocomplete-panel {
    outline: solid 1px;
  }
}
.cdk-overlay-pane:not(.mat-mdc-autocomplete-panel-above) div.mat-mdc-autocomplete-panel {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.mat-mdc-autocomplete-panel-above div.mat-mdc-autocomplete-panel {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  transform-origin: center bottom;
}
div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-visible {
  visibility: visible;
}

div.mat-mdc-autocomplete-panel.mat-mdc-autocomplete-hidden,
.cdk-overlay-pane:has(> .mat-mdc-autocomplete-hidden) {
  visibility: hidden;
  pointer-events: none;
}

@keyframes _mat-autocomplete-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.mat-autocomplete-panel-animations-enabled {
  animation: _mat-autocomplete-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}

mat-autocomplete {
  display: none;
}
`],encapsulation:2})}return e})();var Gt={provide:Q$2,useExisting:vo$1(()=>Ut),multi:!0};var Xt=new S(`mat-autocomplete-scroll-strategy`,{providedIn:`root`,factory:()=>{let e=T(Ie);return()=>q(e)}});var Ut=(()=>{class e{_environmentInjector=T(ue$1);_element=T(Dr);_injector=T(Ie);_viewContainerRef=T(xi);_zone=T(Ne);_changeDetectorRef=T(p0);_dir=T(bo,{optional:!0});_formField=T(_t,{optional:!0,host:!0});_viewportRuler=T(z);_scrollStrategy=T(Xt);_renderer=T(ja);_animationsDisabled=tt();_defaults=T(Et,{optional:!0});_overlayRef=null;_portal;_componentDestroyed=!1;_initialized=new Q;_keydownSubscription;_outsideClickSubscription;_cleanupWindowBlur;_previousValue=null;_valueOnAttach=null;_valueOnLastKeydown=null;_positionStrategy;_manuallyFloatingLabel=!1;_closingActionsSubscription;_viewportSubscription=j.EMPTY;_breakpointObserver=T(Wt$1);_handsetLandscapeSubscription=j.EMPTY;_canOpenOnNextFocus=!0;_valueBeforeAutoSelection;_pendingAutoselectedOption=null;_closeKeyEventStream=new Q;_overlayPanelClass=Mt(this._defaults?.overlayPanelClass||[]);_windowBlurHandler=()=>{this._canOpenOnNextFocus=this.panelOpen||!this._hasFocus()};_onChange=()=>{};_onTouched=()=>{};autocomplete;position=`auto`;connectedTo;autocompleteAttribute=`off`;autocompleteDisabled=!1;_aboveClass=`mat-mdc-autocomplete-panel-above`;ngAfterViewInit(){this._initialized.next(),this._initialized.complete(),this._cleanupWindowBlur=this._renderer.listen(`window`,`blur`,this._windowBlurHandler)}ngOnChanges(t){t.position&&this._positionStrategy&&(this._setStrategyPositions(this._positionStrategy),this.panelOpen&&this._overlayRef.updatePosition())}ngOnDestroy(){this._cleanupWindowBlur?.(),this._handsetLandscapeSubscription.unsubscribe(),this._viewportSubscription.unsubscribe(),this._componentDestroyed=!0,this._destroyPanel(),this._closeKeyEventStream.complete()}get panelOpen(){return this._overlayAttached&&this.autocomplete.showPanel}_overlayAttached=!1;openPanel(){this._openPanelInternal()}closePanel(){this._resetLabel(),this._overlayAttached&&(this.panelOpen&&this._zone.run(()=>{this.autocomplete.closed.emit()}),this.autocomplete._latestOpeningTrigger===this&&(this.autocomplete._isOpen=!1,this.autocomplete._latestOpeningTrigger=null),this._overlayAttached=!1,this._pendingAutoselectedOption=null,this._overlayRef&&this._overlayRef.hasAttached()&&(this._overlayRef.detach(),this._closingActionsSubscription.unsubscribe()),this._updatePanelState(),this._componentDestroyed||this._changeDetectorRef.detectChanges())}updatePosition(){this._overlayAttached&&this._overlayRef.updatePosition()}get panelClosingActions(){return sg(this.optionSelections,this.autocomplete._keyManager.tabOut.pipe(Ln(()=>this._overlayAttached)),this._closeKeyEventStream,this._getOutsideClickStream(),this._overlayRef?this._overlayRef.detachments().pipe(Ln(()=>this._overlayAttached)):jh()).pipe(He(t=>t instanceof mt?t:null))}optionSelections=Jh(()=>{let t=this.autocomplete?this.autocomplete.options:null;return t?t.changes.pipe(Eg(t),Al(()=>sg(...t.map(o=>o.onSelectionChange)))):this._initialized.pipe(Al(()=>this.optionSelections))});get activeOption(){return this.autocomplete&&this.autocomplete._keyManager?this.autocomplete._keyManager.activeItem:null}_getOutsideClickStream(){return new b(t=>{let o=a=>{let r=M(a),l=this._formField?this._formField.getConnectedOverlayOrigin().nativeElement:null,d=this.connectedTo?this.connectedTo.elementRef.nativeElement:null;this._overlayAttached&&r!==this._element.nativeElement&&!this._hasFocus()&&(!l||!l.contains(r))&&(!d||!d.contains(r))&&this._overlayRef&&!this._overlayRef.overlayElement.contains(r)&&t.next(a)},n=[this._renderer.listen(`document`,`click`,o),this._renderer.listen(`document`,`auxclick`,o),this._renderer.listen(`document`,`touchend`,o)];return()=>{n.forEach(a=>a())}})}writeValue(t){Promise.resolve(null).then(()=>this._assignOptionValue(t))}registerOnChange(t){this._onChange=t}registerOnTouched(t){this._onTouched=t}setDisabledState(t){this._element.nativeElement.disabled=t}_handleKeydown(t){let o=t,n=o.keyCode,a=nn(o);if(n===27&&!a&&o.preventDefault(),this._valueOnLastKeydown=this._element.nativeElement.value,this.activeOption&&n===13&&this.panelOpen&&!a)this.activeOption._selectViaInteraction(),this._resetActiveItem(),o.preventDefault();else if(this.autocomplete){let r=this.autocomplete._keyManager.activeItem,l=n===38||n===40;n===9||l&&!a&&this.panelOpen?this.autocomplete._keyManager.onKeydown(o):l&&this._canOpen()&&this._openPanelInternal(this._valueOnLastKeydown),(l||this.autocomplete._keyManager.activeItem!==r)&&(this._scrollToOption(this.autocomplete._keyManager.activeItemIndex||0),this.autocomplete.autoSelectActiveOption&&this.activeOption&&(this._pendingAutoselectedOption||(this._valueBeforeAutoSelection=this._valueOnLastKeydown),this._pendingAutoselectedOption=this.activeOption,this._assignOptionValue(this.activeOption.value)))}}_handleInput(t){let o=t.target,n=o.value;if(o.type===`number`&&(n=n==``?null:parseFloat(n)),this._previousValue!==n){if(this._previousValue=n,this._pendingAutoselectedOption=null,(!this.autocomplete||!this.autocomplete.requireSelection)&&this._onChange(n),!n)this._clearPreviousSelectedOption(null,!1);else if(this.panelOpen&&!this.autocomplete.requireSelection){let a=this.autocomplete.options?.find(r=>r.selected);if(a){let r=this._getDisplayValue(a.value);n!==r&&a.deselect(!1)}}if(this._canOpen()&&this._hasFocus()){let a=this._valueOnLastKeydown??this._element.nativeElement.value;this._valueOnLastKeydown=null,this._openPanelInternal(a)}}}_handleFocus(){this._canOpenOnNextFocus?this._canOpen()&&(this._previousValue=this._element.nativeElement.value,this._attachOverlay(this._previousValue),this._floatLabel(!0)):this._canOpenOnNextFocus=!0}_handleClick(){this._canOpen()&&!this.panelOpen&&this._openPanelInternal()}_hasFocus(){return Tn()===this._element.nativeElement}_floatLabel(t=!1){this._formField&&this._formField.floatLabel===`auto`&&(t?this._formField._animateAndLockLabel():this._formField.floatLabel=`always`,this._manuallyFloatingLabel=!0)}_resetLabel(){this._manuallyFloatingLabel&&(this._formField&&(this._formField.floatLabel=`auto`),this._manuallyFloatingLabel=!1)}_subscribeToClosingActions(){return sg(new b(n=>{uv(()=>{n.next()},{injector:this._environmentInjector})}),this.autocomplete.options?.changes.pipe(wg(()=>this._positionStrategy.reapplyLastPosition()),ug(0))??jh()).pipe(Al(()=>this._zone.run(()=>{let n=this.panelOpen;return this._resetActiveItem(),this._updatePanelState(),this._changeDetectorRef.detectChanges(),this.panelOpen&&this._overlayRef.updatePosition(),n!==this.panelOpen&&(this.panelOpen?this._emitOpened():this.autocomplete.closed.emit()),this.panelClosingActions})),en(1)).subscribe(n=>this._setValueAndClose(n))}_emitOpened(){this.autocomplete.opened.emit()}_destroyPanel(){this._overlayRef&&(this.closePanel(),this._overlayRef.dispose(),this._overlayRef=null)}_getDisplayValue(t){let o=this.autocomplete;return o&&o.displayWith?o.displayWith(t):t}_assignOptionValue(t){let o=this._getDisplayValue(t);t??this._clearPreviousSelectedOption(null,!1),this._updateNativeInputValue(o??``)}_updateNativeInputValue(t){this._formField?this._formField._control.value=t:this._element.nativeElement.value=t,this._previousValue=t}_setValueAndClose(t){let o=this.autocomplete,n=t?t.source:this._pendingAutoselectedOption;n?(this._clearPreviousSelectedOption(n),this._assignOptionValue(n.value),this._onChange(n.value),o._emitSelectEvent(n),this._element.nativeElement.focus()):o.requireSelection&&this._element.nativeElement.value!==this._valueOnAttach&&(this._clearPreviousSelectedOption(null),this._assignOptionValue(null),this._onChange(null)),this.closePanel()}_clearPreviousSelectedOption(t,o){this.autocomplete?.options?.forEach(n=>{n!==t&&n.selected&&n.deselect(o)})}_openPanelInternal(t=this._element.nativeElement.value){this._attachOverlay(t),this._floatLabel()}_attachOverlay(t){if(!this.autocomplete)return;let o=this._overlayRef;o?(this._positionStrategy.setOrigin(this._getConnectedElement()),o.updateSize({width:this._getPanelWidth()})):(this._portal=new G$1(this.autocomplete.template,this._viewContainerRef,{id:this._formField?.getLabelId()}),o=J(this._injector,this._getOverlayConfig()),this._overlayRef=o,this._viewportSubscription=this._viewportRuler.change().subscribe(()=>{this.panelOpen&&o&&o.updateSize({width:this._getPanelWidth()})}),this._handsetLandscapeSubscription=this._breakpointObserver.observe(ka.HandsetLandscape).subscribe(a=>{a.matches?this._positionStrategy.withFlexibleDimensions(!0).withGrowAfterOpen(!0).withViewportMargin(8):this._positionStrategy.withFlexibleDimensions(!1).withGrowAfterOpen(!1).withViewportMargin(0)})),o&&!o.hasAttached()&&(o.attach(this._portal),this._valueOnAttach=t,this._valueOnLastKeydown=null,this._closingActionsSubscription=this._subscribeToClosingActions());let n=this.panelOpen;this.autocomplete._isOpen=this._overlayAttached=!0,this.autocomplete._latestOpeningTrigger=this,this.autocomplete._setColor(this._formField?.color),this._updatePanelState(),this.panelOpen&&n!==this.panelOpen&&this._emitOpened()}_handlePanelKeydown=t=>{(t.keyCode===27&&!nn(t)||t.keyCode===38&&nn(t,`altKey`))&&(this._pendingAutoselectedOption&&(this._updateNativeInputValue(this._valueBeforeAutoSelection??``),this._pendingAutoselectedOption=null),this._closeKeyEventStream.next(),this._resetActiveItem(),t.stopPropagation(),t.preventDefault())};_updatePanelState(){if(this.autocomplete._setVisibility(),this.panelOpen){let t=this._overlayRef;this._keydownSubscription||(this._keydownSubscription=t.keydownEvents().subscribe(this._handlePanelKeydown)),this._outsideClickSubscription||(this._outsideClickSubscription=t.outsidePointerEvents().subscribe())}else this._keydownSubscription?.unsubscribe(),this._outsideClickSubscription?.unsubscribe(),this._keydownSubscription=this._outsideClickSubscription=void 0}_getOverlayConfig(){return new K({positionStrategy:this._getOverlayPosition(),scrollStrategy:this._scrollStrategy(),width:this._getPanelWidth(),direction:this._dir??void 0,hasBackdrop:this._defaults?.hasBackdrop,backdropClass:this._defaults?.backdropClass||`cdk-overlay-transparent-backdrop`,panelClass:this._overlayPanelClass,disableAnimations:this._animationsDisabled})}_getOverlayPosition(){let t=Q$1(this._injector,this._getConnectedElement()).withFlexibleDimensions(!1).withPush(!1).withPopoverLocation(`inline`);return this._setStrategyPositions(t),this._positionStrategy=t,t}_setStrategyPositions(t){let o=[{originX:`start`,originY:`bottom`,overlayX:`start`,overlayY:`top`},{originX:`end`,originY:`bottom`,overlayX:`end`,overlayY:`top`}],n=this._aboveClass,a=[{originX:`start`,originY:`top`,overlayX:`start`,overlayY:`bottom`,panelClass:n},{originX:`end`,originY:`top`,overlayX:`end`,overlayY:`bottom`,panelClass:n}],r;this.position===`above`?r=a:this.position===`below`?r=o:r=[...o,...a],t.withPositions(r)}_getConnectedElement(){return this.connectedTo?this.connectedTo.elementRef:this._formField?this._formField.getConnectedOverlayOrigin():this._element}_getPanelWidth(){return this.autocomplete.panelWidth||this._getHostWidth()}_getHostWidth(){return this._getConnectedElement().nativeElement.getBoundingClientRect().width}_resetActiveItem(){let t=this.autocomplete;if(t.autoActiveFirstOption){let o=-1;for(let n=0;n<t.options.length;n++)if(!t.options.get(n).disabled){o=n;break}t._keyManager.setActiveItem(o)}else t._keyManager.setActiveItem(-1)}_canOpen(){let t=this._element.nativeElement;return!t.readOnly&&!t.disabled&&!this.autocompleteDisabled}_scrollToOption(t){let o=this.autocomplete,n=Di(t,o.options,o.optionGroups);if(t===0&&n===1)o._setScrollTop(0);else if(o.panel){let a=o.options.toArray()[t];if(a){let r=a._getHostElement(),l=ki(r.offsetTop,r.offsetHeight,o._getScrollTop(),o.panel.nativeElement.offsetHeight);o._setScrollTop(l)}}}static ɵfac=function(o){return new(o||e)};static ɵdir=vE({type:e,selectors:[[`input`,`matAutocomplete`,``],[`textarea`,`matAutocomplete`,``]],hostAttrs:[1,`mat-mdc-autocomplete-trigger`],hostVars:7,hostBindings:function(o,n){o&1&&Op(`focusin`,function(){return n._handleFocus()})(`blur`,function(){return n._onTouched()})(`input`,function(r){return n._handleInput(r)})(`keydown`,function(r){return n._handleKeydown(r)})(`click`,function(){return n._handleClick()}),o&2&&bp(`autocomplete`,n.autocompleteAttribute)(`role`,n.autocompleteDisabled?null:`combobox`)(`aria-autocomplete`,n.autocompleteDisabled?null:`list`)(`aria-activedescendant`,n.panelOpen&&n.activeOption?n.activeOption.id:null)(`aria-expanded`,n.autocompleteDisabled?null:n.panelOpen.toString())(`aria-controls`,n.autocompleteDisabled||!n.panelOpen?null:n.autocomplete?.id)(`aria-haspopup`,n.autocompleteDisabled?null:`listbox`)},inputs:{autocomplete:[0,`matAutocomplete`,`autocomplete`],position:[0,`matAutocompletePosition`,`position`],connectedTo:[0,`matAutocompleteConnectedTo`,`connectedTo`],autocompleteAttribute:[0,`autocomplete`,`autocompleteAttribute`],autocompleteDisabled:[2,`matAutocompleteDisabled`,`autocompleteDisabled`,g0]},exportAs:[`matAutocompleteTrigger`],features:[$D([Gt]),Sm]})}return e})();var Yi=(()=>{class e{static ɵfac=function(o){return new(o||e)};static ɵmod=gE({type:e});static ɵinj=Ql({imports:[Ht$1,pt,j$2,pt,et]})}return e})();var Wt=[{valor:`V`,etiqueta:`Natural venezolano`,corta:`Nacional`,descripcion:`Persona natural con cédula V: consumo masivo o profesional independiente.`,icono:`person`,documentos:[`V`]},{valor:`E`,etiqueta:`Extranjero`,corta:`Extranjero`,descripcion:`Persona natural con cédula E o pasaporte: residentes o transeúntes.`,icono:`public`,documentos:[`E`,`P`]},{valor:`J`,etiqueta:`Jurídico (empresa)`,corta:`Jurídico`,descripcion:`Empresas y comercios con RIF J. Retienen IVA/ISLR según su condición.`,icono:`business`,documentos:[`J`]},{valor:`G`,etiqueta:`Gobierno / Estado`,corta:`Gobierno`,descripcion:`Ministerios, gobernaciones, alcaldías y entes públicos. Pago por partida presupuestaria.`,icono:`account_balance`,documentos:[`G`]},{valor:`D`,etiqueta:`Diplomático`,corta:`Diplomático`,descripcion:`Embajadas, consulados, organismos internacionales y funcionarios acreditados.`,icono:`flag`,documentos:[`G`,`J`,`E`,`P`]},{valor:`C`,etiqueta:`Comunal (Poder Popular)`,corta:`Comunal`,descripcion:`Consejos comunales, comunas y organizaciones del Poder Popular (RIF C).`,icono:`groups`,documentos:[`C`]}];var Qi={V:`V — Cédula venezolana`,E:`E — Cédula de extranjero`,P:`P — Pasaporte`,J:`J — RIF persona jurídica`,G:`G — RIF gobierno / ente público`,C:`C — RIF comunal`};var Ht=[{valor:`especial`,etiqueta:`Contribuyente especial`,descripcion:`Calificado por el SENIAT como sujeto pasivo especial: agente de retención de IVA.`,icono:`verified`},{valor:`ordinario`,etiqueta:`Contribuyente ordinario`,descripcion:`Registrado y declarante regular de IVA, sin la calificación de especial.`,icono:`receipt_long`},{valor:`formal`,etiqueta:`Contribuyente formal`,descripcion:`Sujeto de bajos ingresos que solo cumple deberes formales del IVA.`,icono:`description`},{valor:`exento`,etiqueta:`Exento`,descripcion:`No paga ciertos tributos por disposición de ley (fundaciones, asociaciones sin fines de lucro, franquicia diplomática).`,icono:`shield`},{valor:`exonerado`,etiqueta:`Exonerado`,descripcion:`Dispensado del pago por decreto del Ejecutivo, con vigencia limitada (p. ej. sector agropecuario).`,icono:`event_available`},{valor:`no_contribuyente`,etiqueta:`No contribuyente`,descripcion:`Consumidor final sin obligaciones de IVA: se factura con su cédula o pasaporte.`,icono:`person_outline`}];var eo=[{valor:`activo`,etiqueta:`Activo`,icono:`check_circle`},{valor:`inactivo`,etiqueta:`Inactivo`,icono:`pause_circle`},{valor:`suspendido`,etiqueta:`Suspendido`,icono:`block`}];var to=[{valor:`embajada`,etiqueta:`Embajada o misión diplomática`},{valor:`consulado`,etiqueta:`Consulado`},{valor:`organismo_internacional`,etiqueta:`Organismo internacional (ONU, OEA…)`},{valor:`funcionario`,etiqueta:`Funcionario extranjero acreditado`}];var io=[{valor:`nacional`,etiqueta:`Nacional (ministerios y adscritos)`},{valor:`estadal`,etiqueta:`Estadal (gobernaciones)`},{valor:`municipal`,etiqueta:`Municipal (alcaldías)`},{valor:`descentralizado`,etiqueta:`Descentralizado (institutos y empresas del Estado)`}];var oo=[{valor:`consejo_comunal`,etiqueta:`Consejo comunal`},{valor:`comuna`,etiqueta:`Comuna`},{valor:`eps`,etiqueta:`Empresa de propiedad social (EPS)`},{valor:`otra`,etiqueta:`Otra organización del Poder Popular`}];var no=[`Amazonas`,`Anzoátegui`,`Apure`,`Aragua`,`Barinas`,`Bolívar`,`Carabobo`,`Cojedes`,`Delta Amacuro`,`Distrito Capital`,`Falcón`,`Guárico`,`La Guaira`,`Lara`,`Mérida`,`Miranda`,`Monagas`,`Nueva Esparta`,`Portuguesa`,`Sucre`,`Táchira`,`Trujillo`,`Yaracuy`,`Zulia`,`Dependencias Federales`];var ao=[`Soltero(a)`,`Casado(a)`,`Divorciado(a)`,`Viudo(a)`,`Unión estable de hecho`];var ro=[{valor:`VES`,etiqueta:`Bolívares (Bs.)`},{valor:`USD`,etiqueta:`Dólares (USD)`},{valor:`EUR`,etiqueta:`Euros (EUR)`}];var so=[{valor:`transferencia`,etiqueta:`Transferencia bancaria (Bs.)`},{valor:`pago_movil`,etiqueta:`Pago móvil`},{valor:`punto_venta`,etiqueta:`Punto de venta`},{valor:`efectivo_bs`,etiqueta:`Efectivo (Bs.)`},{valor:`divisas_efectivo`,etiqueta:`Divisas en efectivo`},{valor:`transferencia_divisas`,etiqueta:`Transferencia en divisas`},{valor:`cheque`,etiqueta:`Cheque`}];var lo=[{valor:`referido`,etiqueta:`Referido`},{valor:`web`,etiqueta:`Sitio web`},{valor:`redes`,etiqueta:`Redes sociales`},{valor:`visita`,etiqueta:`Visita comercial`},{valor:`licitacion`,etiqueta:`Licitación / concurso`},{valor:`contacto_directo`,etiqueta:`Llamada o correo`},{valor:`otro`,etiqueta:`Otro`}];var co=[{valor:`0102`,etiqueta:`Banco de Venezuela`},{valor:`0104`,etiqueta:`Venezolano de Crédito`},{valor:`0105`,etiqueta:`Mercantil`},{valor:`0108`,etiqueta:`BBVA Provincial`},{valor:`0114`,etiqueta:`Bancaribe`},{valor:`0115`,etiqueta:`Banco Exterior`},{valor:`0128`,etiqueta:`Banco Caroní`},{valor:`0134`,etiqueta:`Banesco`},{valor:`0137`,etiqueta:`Sofitasa`},{valor:`0138`,etiqueta:`Banco Plaza`},{valor:`0146`,etiqueta:`Bangente`},{valor:`0151`,etiqueta:`BFC Banco Fondo Común`},{valor:`0156`,etiqueta:`100% Banco`},{valor:`0157`,etiqueta:`DelSur`},{valor:`0163`,etiqueta:`Banco del Tesoro`},{valor:`0166`,etiqueta:`Banco Agrícola de Venezuela`},{valor:`0168`,etiqueta:`Bancrecer`},{valor:`0169`,etiqueta:`R4 Banco Microfinanciero`},{valor:`0171`,etiqueta:`Banco Activo`},{valor:`0172`,etiqueta:`Bancamiga`},{valor:`0173`,etiqueta:`Banco Internacional de Desarrollo`},{valor:`0174`,etiqueta:`Banplus`},{valor:`0175`,etiqueta:`Banco Digital de los Trabajadores`},{valor:`0177`,etiqueta:`BANFANB`},{valor:`0178`,etiqueta:`N58 Banco Digital`},{valor:`0191`,etiqueta:`BNC Banco Nacional de Crédito`}];function pe(e){return Wt.find(i=>i.valor===e)}function Jt(e){return Ht.find(i=>i.valor===e)}function me(e){return e.categoria===`V`||e.categoria===`E`||e.categoria===`D`&&e.tipoSujetoDiplomatico===`funcionario`}function X(e){return e===`J`||e===`G`||e===`C`}function Kt(e){switch(e){case`G`:return`Nombre del ente u organismo`;case`D`:return`Nombre de la misión u organismo`;case`C`:return`Nombre de la organización`;default:return`Razón social`}}function uo(e){return e?.estado===`eliminado`||e?.eliminado===!0}function p(e){return String(e??``).replace(/\D+/g,``)}function U(e){return String(e??``).toUpperCase().replace(/[^A-Z0-9]/g,``)}var Yt={V:[4],E:[8],J:[12],P:[16],G:[20],C:[12,24]};var Zt=[3,2,7,6,5,4,3,2];function ge(e,i){let t=Yt[String(e??``).toUpperCase()],o=p(i);if(!t||!o||o.length>8)return[];let n=o.padStart(8,`0`),a=Zt.reduce((l,d,m)=>l+d*Number(n[m]),0),r=t.map(l=>{let d=11-(l+a)%11;return d>=10?0:d});return[...new Set(r)]}function Qt(e,i,t){return/^\d$/.test(String(t??``))?ge(e,i).includes(Number(t)):!1}function ei(e,i){if(!e)return``;if(e===`P`){let o=U(i);return o?`P-${o}`:``}let t=p(i);return t?`${e}-${t.padStart(8,`0`)}`:``}function ti(e,i,t){let o=p(i);if(!e||!o||o.length>8)return``;let n=o.padStart(8,`0`);if(e===`V`||e===`E`){let[a]=ge(e,o);return a===void 0?``:`${e}-${n}-${a}`}return X(e)&&/^\d$/.test(t)?`${e}-${n}-${t}`:``}function po(e){let i=String(e??``).toUpperCase().replace(/[\s.]/g,``),t=/^([VEJGC])-?(\d{1,8})(?:-?(\d))?$/.exec(i);if(!t)return null;let o=t[1],n=t[2],a=t[3]??``;return X(o)&&!a&&n.length===9?{tipo:o,numero:n.slice(0,8),digito:n.slice(8)}:{tipo:o,numero:n,digito:a}}function ii(e){return p(e).replace(/^0+(?=\d)/,``).replace(/\B(?=(\d{3})+(?!\d))/g,`.`)}function mo(e){if(!e?.tipoDocumento||!e.numeroDocumento)return``;if(e.tipoDocumento===`V`||e.tipoDocumento===`E`)return`${e.tipoDocumento}-${ii(e.numeroDocumento)}`;if(e.tipoDocumento===`P`)return`P-${U(e.numeroDocumento)}`;let i=p(e.numeroDocumento).padStart(8,`0`);return e.digitoVerificador?`${e.tipoDocumento}-${i}-${e.digitoVerificador}`:`${e.tipoDocumento}-${i}`}function fe(e){return e?(me({categoria:e.categoria??`V`,tipoSujetoDiplomatico:e.tipoSujetoDiplomatico??``})?`${e.nombres??``} ${e.apellidos??``}`.trim():(e.razonSocial??``).trim())||e.nombreComercial?.trim()||e.identificacion||`(Cliente sin nombre)`:``}var oi=`CLI-`;function Ot(e){return`${oi}${String(e).padStart(6,`0`)}`}function Pt(e){let i=/^CLI-(\d+)$/.exec(String(e??``));return i?parseInt(i[1],10):0}function At(e){return/^CLI-\d{6,9}$/.test(String(e??``))}function It(e){switch(e){case`J`:return{condicionFiscal:`ordinario`,agenteRetencionIva:!1,porcentajeRetencionIva:0,agenteRetencionIslr:!0,exentoIgtf:!1};case`G`:return{condicionFiscal:`no_contribuyente`,agenteRetencionIva:!0,porcentajeRetencionIva:75,agenteRetencionIslr:!0,exentoIgtf:!0};case`D`:return{condicionFiscal:`exento`,agenteRetencionIva:!1,porcentajeRetencionIva:0,agenteRetencionIslr:!1,exentoIgtf:!1};default:return{condicionFiscal:`no_contribuyente`,agenteRetencionIva:!1,porcentajeRetencionIva:0,agenteRetencionIslr:!1,exentoIgtf:!1}}}function go(e){let i=It(e.categoria);return Object.keys(i).every(t=>e[t]===i[t])}function Dt(e=`V`){return s(r({codigo:``,categoria:e,estado:`activo`,tipoDocumento:pe(e)?.documentos[0]??`V`,numeroDocumento:``,digitoVerificador:``,identificacion:``,rif:``,paisEmisor:``,nombres:``,apellidos:``,fechaNacimiento:``,sexo:``,estadoCivil:``,nacionalidad:e===`V`?`Venezolana`:``,profesion:``,condicionMigratoria:``,razonSocial:``,nombreComercial:``,actividadEconomica:``,registroMercantil:{oficina:``,numero:``,tomo:``,fecha:``},nivelGobierno:``,enteAdscripcion:``,unidadAdministradora:``,partidaPresupuestaria:``,tipoSujetoDiplomatico:``,paisRepresentado:``,credencialDiplomatica:``,vencimientoCredencial:``,tipoOrganizacionComunal:``,registroComunal:``,representante:{nombre:``,documento:``,cargo:``,telefono:``,correo:``}},It(e)),{baseLegalBeneficio:``,vigenciaBeneficio:``,correo:``,correoFacturacion:``,telefonoMovil:``,telefonoFijo:``,sitioWeb:``,direccion:xt(),moneda:`VES`,formaPago:``,condicionPago:`contado`,diasCredito:null,limiteCredito:null,ejecutivo:``,origen:``,bancario:{banco:``,tipoCuenta:``,numeroCuenta:``,telefonoPagoMovil:``},observaciones:``})}function xt(){return{estado:``,municipio:``,parroquia:``,ciudad:``,zonaPostal:``,domicilio:``,referencia:``}}var ni=[`estado`,`municipio`,`parroquia`,`ciudad`,`zonaPostal`,`domicilio`,`referencia`];function Rt(e){let i=xt();if(typeof e==`string`)return i.domicilio=e.trim(),i;if(!e||typeof e!=`object`)return i;let t=e;for(let o of ni){let n=t[o];typeof n==`string`&&(i[o]=n.trim())}return i}function W(e){let t=Dt(pe(e?.categoria)?e.categoria:`V`),o=e??{};return s(r(r({},t),o),{registroMercantil:r(r({},t.registroMercantil),o.registroMercantil??{}),representante:r(r({},t.representante),o.representante??{}),direccion:Rt(o.direccion),bancario:r(r({},t.bancario),o.bancario??{})})}function fo(e,i=new Date){return{codigo:e.codigo,categoria:e.categoria,identificacion:e.identificacion,rif:e.rif,nombre:fe(e),condicionFiscal:e.condicionFiscal,agenteRetencionIva:e.agenteRetencionIva,porcentajeRetencionIva:e.porcentajeRetencionIva,agenteRetencionIslr:e.agenteRetencionIslr,exentoIgtf:e.exentoIgtf,correo:e.correoFacturacion||e.correo,telefono:e.telefonoMovil||e.telefonoFijo,direccion:ai(e),copiadoEn:i.toISOString()}}function ai(e){let i=Rt(e.direccion);return[i.domicilio,i.parroquia,i.municipio,i.estado,i.zonaPostal?`Z.P. ${i.zonaPostal}`:``].map(t=>(t??``).trim()).filter(Boolean).join(`, `)}function ue(e){if(typeof e==`string`)return e.trim();if(Array.isArray(e))return e.map(i=>ue(i));if(e&&typeof e==`object`){let i={};for(let[t,o]of Object.entries(e))i[t]=ue(o);return i}return e}function wt(e){let i=ue(W(e));delete i._id,delete i.__v,i.numeroDocumento=i.tipoDocumento===`P`?U(i.numeroDocumento):p(i.numeroDocumento),X(i.tipoDocumento)?i.numeroDocumento=i.numeroDocumento.padStart(8,`0`):i.digitoVerificador=``,i.identificacion=ei(i.tipoDocumento,i.numeroDocumento),i.rif=ti(i.tipoDocumento,i.numeroDocumento,i.digitoVerificador),i.tipoDocumento!==`P`&&(i.paisEmisor=``);let t=Dt(i.categoria);return me(i)?(i.razonSocial=``,i.nombreComercial=``,i.representante=t.representante):(i.nombres=``,i.apellidos=``,i.fechaNacimiento=``,i.sexo=``,i.estadoCivil=``,i.profesion=``),i.categoria!==`E`&&(i.condicionMigratoria=``),i.categoria!==`J`&&(i.registroMercantil=t.registroMercantil),i.categoria!==`G`&&(i.nivelGobierno=``,i.enteAdscripcion=``,i.unidadAdministradora=``,i.partidaPresupuestaria=``),i.categoria!==`D`&&(i.tipoSujetoDiplomatico=``,i.paisRepresentado=``,i.credencialDiplomatica=``,i.vencimientoCredencial=``),i.categoria!==`C`&&(i.tipoOrganizacionComunal=``,i.registroComunal=``),i.agenteRetencionIva||(i.porcentajeRetencionIva=0),i.condicionFiscal!==`exonerado`&&(i.vigenciaBeneficio=``),i.condicionPago===`contado`&&(i.diasCredito=null,i.limiteCredito=null),i.bancario.numeroCuenta=p(i.bancario.numeroCuenta),i.correo=i.correo.toLowerCase(),i.correoFacturacion=i.correoFacturacion.toLowerCase(),i}var ri=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;var si=/^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#]\S*)?$/i;function le(e){return ri.test(String(e??``).trim())}function ce(e){let i=String(e??``).trim();if(!/^\+?[\d\s().-]{7,22}$/.test(i))return!1;let t=p(i);return i.startsWith(`+`)?t.length>=8&&t.length<=15:t.length===11&&t.startsWith(`0`)||t.length===12&&t.startsWith(`58`)}function li(e){let i=p(e);return i.length===12&&i.startsWith(`58`)&&(i=`0`+i.slice(2)),/^04\d{9}$/.test(i)}function G(e,i=new Date){if(!e)return!1;let t=new Date(`${e}T23:59:59`);return!isNaN(t.getTime())&&t<i}function ho(e,i=new Date){let t=[],o=[],n=(c,g,H)=>t.push({pestana:c,campo:g,mensaje:H}),a=(c,g,H)=>o.push({pestana:c,campo:g,mensaje:H}),r=c=>!String(c??``).trim(),l=pe(e.categoria);l||n(`identificacion`,`categoria`,`Seleccione la categoría del cliente.`);let d=String(e.numeroDocumento??``).trim();if(e.tipoDocumento?l&&!l.documentos.includes(e.tipoDocumento)&&n(`identificacion`,`tipoDocumento`,`El documento ${e.tipoDocumento} no corresponde a la categor\xEDa ${l.corta}.`):n(`identificacion`,`tipoDocumento`,`Seleccione el tipo de documento.`),!d)n(`identificacion`,`numeroDocumento`,`Indique el número de documento.`);else if(e.tipoDocumento===`P`)/^[A-Z0-9]{5,15}$/.test(U(d))||n(`identificacion`,`numeroDocumento`,`El pasaporte debe tener entre 5 y 15 letras o números.`);else if(!/^[\d.\s-]+$/.test(d))n(`identificacion`,`numeroDocumento`,`El número solo admite dígitos.`);else if(e.tipoDocumento===`V`||e.tipoDocumento===`E`){let c=p(d);(c.length>8||Number(c)===0)&&n(`identificacion`,`numeroDocumento`,`La cédula debe tener entre 1 y 8 dígitos.`)}else if(X(e.tipoDocumento)){let c=p(d);if(c.length!==8)n(`identificacion`,`numeroDocumento`,`El RIF lleva 8 dígitos además del dígito verificador.`);else if(!/^\d$/.test(String(e.digitoVerificador??``)))n(`identificacion`,`digitoVerificador`,`Indique el dígito verificador del RIF.`);else if(!Qt(e.tipoDocumento,c,e.digitoVerificador)){let g=ge(e.tipoDocumento,c).join(` o `);n(`identificacion`,`digitoVerificador`,`El d\xEDgito verificador no coincide: para ${e.tipoDocumento}-${c} corresponde ${g}.`)}}e.tipoDocumento===`P`&&r(e.paisEmisor)&&n(`identificacion`,`paisEmisor`,`Indique el país emisor del pasaporte.`);let m=me(e);if(e.categoria===`D`&&!e.tipoSujetoDiplomatico&&n(`datos`,`tipoSujetoDiplomatico`,`Indique si es una misión, un organismo o un funcionario acreditado.`),m){if(r(e.nombres)&&n(`datos`,`nombres`,`Los nombres son obligatorios.`),r(e.apellidos)&&n(`datos`,`apellidos`,`Los apellidos son obligatorios.`),e.fechaNacimiento){let c=new Date(`${e.fechaNacimiento}T00:00:00`);(isNaN(c.getTime())||c>i)&&n(`datos`,`fechaNacimiento`,`La fecha de nacimiento no es válida.`)}(e.categoria===`E`||e.categoria===`D`)&&r(e.nacionalidad)&&n(`datos`,`nacionalidad`,`Indique la nacionalidad.`)}else r(e.razonSocial)&&n(`datos`,`razonSocial`,`El campo "${Kt(e.categoria)}" es obligatorio.`);if(e.categoria===`G`&&!e.nivelGobierno&&n(`datos`,`nivelGobierno`,`Indique el nivel de gobierno del ente.`),e.categoria===`D`&&(r(e.paisRepresentado)&&n(`datos`,`paisRepresentado`,`Indique el país u organismo que representa.`),r(e.credencialDiplomatica)&&n(`datos`,`credencialDiplomatica`,`Indique el N° de la credencial emitida por la Cancillería.`),G(e.vencimientoCredencial,i)&&a(`datos`,`vencimientoCredencial`,`La credencial diplomática está vencida: la franquicia no debería aplicarse hasta renovarla.`)),e.categoria===`C`&&(e.tipoOrganizacionComunal||n(`datos`,`tipoOrganizacionComunal`,`Indique el tipo de organización comunal.`),r(e.registroComunal)&&n(`datos`,`registroComunal`,`Indique el código de registro ante el Ministerio de Comunas.`)),m||(e.representante.correo&&!le(e.representante.correo)&&n(`datos`,`representante.correo`,`El correo del representante no es válido.`),e.representante.telefono&&!ce(e.representante.telefono)&&n(`datos`,`representante.telefono`,`El teléfono del representante no es válido.`)),Jt(e.condicionFiscal)||n(`fiscal`,`condicionFiscal`,`Seleccione la condición ante el SENIAT.`),e.agenteRetencionIva&&![75,100].includes(Number(e.porcentajeRetencionIva))&&n(`fiscal`,`porcentajeRetencionIva`,`Indique el porcentaje de retención de IVA (75 % o 100 %).`),e.condicionFiscal===`especial`&&!m&&!e.agenteRetencionIva&&a(`fiscal`,`agenteRetencionIva`,`Los contribuyentes especiales distintos a personas naturales son agentes de retención de IVA.`),(e.condicionFiscal===`exento`||e.condicionFiscal===`exonerado`)&&r(e.baseLegalBeneficio)&&n(`fiscal`,`baseLegalBeneficio`,`Indique la base legal (ley, decreto o Gaceta Oficial) del beneficio.`),e.condicionFiscal===`exonerado`&&(e.vigenciaBeneficio?G(e.vigenciaBeneficio,i)&&a(`fiscal`,`vigenciaBeneficio`,`La exoneración está vencida: corresponde facturar con IVA.`):n(`fiscal`,`vigenciaBeneficio`,`Indique hasta cuándo está vigente la exoneración.`)),e.condicionFiscal!==`no_contribuyente`&&e.tipoDocumento===`P`&&a(`fiscal`,`condicionFiscal`,`Un contribuyente debe facturarse con su RIF: el pasaporte no genera uno automáticamente.`),r(e.correo)&&r(e.telefonoMovil)&&r(e.telefonoFijo)&&n(`contacto`,`correo`,`Registre al menos un medio de contacto (correo o teléfono).`),e.correo&&!le(e.correo)&&n(`contacto`,`correo`,`El correo electrónico no es válido.`),e.correoFacturacion&&!le(e.correoFacturacion)&&n(`contacto`,`correoFacturacion`,`El correo de facturación no es válido.`),e.telefonoMovil&&!ce(e.telefonoMovil)&&n(`contacto`,`telefonoMovil`,`Teléfono no válido (ej. 0414-1234567 o +58 414 1234567).`),e.telefonoFijo&&!ce(e.telefonoFijo)&&n(`contacto`,`telefonoFijo`,`Teléfono no válido (ej. 0212-1234567).`),e.sitioWeb&&!si.test(e.sitioWeb.trim())&&n(`contacto`,`sitioWeb`,`El sitio web no es válido.`),(!m||e.condicionFiscal!==`no_contribuyente`)&&(e.direccion.estado||n(`contacto`,`direccion.estado`,`Seleccione el estado del domicilio fiscal.`),r(e.direccion.domicilio)&&n(`contacto`,`direccion.domicilio`,`Indique el domicilio fiscal.`)),e.direccion.zonaPostal&&!/^\d{4}$/.test(e.direccion.zonaPostal.trim())&&n(`contacto`,`direccion.zonaPostal`,`La zona postal tiene 4 dígitos.`),e.condicionPago===`credito`){let c=Number(e.diasCredito);if((!Number.isInteger(c)||c<1||c>365)&&n(`comercial`,`diasCredito`,`Los días de crédito deben estar entre 1 y 365.`),e.limiteCredito!==null&&e.limiteCredito!==void 0&&String(e.limiteCredito)!==``){let g=Number(e.limiteCredito);(isNaN(g)||g<0)&&n(`comercial`,`limiteCredito`,`El límite de crédito no puede ser negativo.`)}}let ve=p(e.bancario.numeroCuenta);r(e.bancario.numeroCuenta)||(ve.length!==20?n(`comercial`,`bancario.numeroCuenta`,`La cuenta bancaria debe tener 20 dígitos.`):e.bancario.banco&&!ve.startsWith(e.bancario.banco)&&n(`comercial`,`bancario.numeroCuenta`,`La cuenta no corresponde al banco elegido: debe comenzar por ${e.bancario.banco}.`)),e.bancario.telefonoPagoMovil&&!li(e.bancario.telefonoPagoMovil)&&n(`comercial`,`bancario.telefonoPagoMovil`,`El pago móvil requiere un celular venezolano (04XX-XXXXXXX).`);let _e={},be={identificacion:0,datos:0,fiscal:0,contacto:0,comercial:0};for(let c of t)_e[c.campo]??=c.mensaje,be[c.pestana]++;return{errores:t,avisos:o,porCampo:_e,porPestana:be}}function de(e){let i=/^(\d{4})-(\d{2})-(\d{2})/.exec(e??``);return i?`${i[3]}/${i[2]}/${i[1]}`:e}function vo(e,i=new Date){let t=[];if(e.condicionFiscal===`exento`)t.push({icono:`shield`,titulo:`IVA exento`,detalle:e.baseLegalBeneficio?`Factura sin IVA. Base legal: ${e.baseLegalBeneficio}.`:`Factura sin IVA: registre la base legal de la exención.`,tono:`ok`});else if(e.condicionFiscal===`exonerado`){let o=G(e.vigenciaBeneficio,i);t.push({icono:o?`event_busy`:`event_available`,titulo:o?`Exoneración vencida`:`IVA exonerado`,detalle:o?`Venci\xF3 el ${de(e.vigenciaBeneficio)}: corresponde facturar con IVA (16 %).`:`Factura sin IVA${e.vigenciaBeneficio?` hasta el ${de(e.vigenciaBeneficio)}`:``}.`,tono:o?`aviso`:`ok`})}else t.push({icono:`receipt_long`,titulo:`IVA 16 %`,detalle:`Se factura con la alícuota general del impuesto al valor agregado.`,tono:`info`});return e.agenteRetencionIva&&t.push({icono:`percent`,titulo:`Retiene ${e.porcentajeRetencionIva||75} % del IVA`,detalle:`El cliente paga el IVA neto de la retención y entrega el comprobante (PA SNAT/2025/000054).`,tono:`aviso`}),e.agenteRetencionIslr&&t.push({icono:`request_quote`,titulo:`Retiene ISLR`,detalle:`Practica retención sobre servicios y honorarios (Decreto 1.808); exija el comprobante.`,tono:`aviso`}),e.exentoIgtf?t.push({icono:`verified_user`,titulo:`Exento de IGTF`,detalle:`Exención del art. 8 de la Ley de IGTF (entes públicos y supuestos equivalentes).`,tono:`ok`}):e.categoria===`D`?t.push({icono:`currency_exchange`,titulo:`IGTF solo exento en bolívares`,detalle:`La exención diplomática (art. 8, num. 8) no cubre pagos en divisas: ahí aplica 3 %.`,tono:`aviso`}):t.push({icono:`currency_exchange`,titulo:`IGTF 3 % en divisas`,detalle:e.moneda===`VES`?`Aplica si paga en divisas o criptoactivos a un sujeto pasivo especial.`:`Paga en divisas: si el emisor es sujeto pasivo especial, percibe el 3 % de IGTF.`,tono:e.moneda===`VES`?`info`:`aviso`}),e.categoria===`G`&&t.push({icono:`account_balance`,titulo:`Pago presupuestario`,detalle:`Sujeto a orden de pago y disponibilidad presupuestaria${e.partidaPresupuestaria?` (partida ${e.partidaPresupuestaria})`:``}.`,tono:`info`}),e.categoria===`D`&&G(e.vencimientoCredencial,i)&&t.push({icono:`gpp_maybe`,titulo:`Credencial vencida`,detalle:`Venci\xF3 el ${de(e.vencimientoCredencial)}: solicite la renovaci\xF3n antes de facturar exento.`,tono:`aviso`}),t}var ci={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`};function yo(e){return String(e??``).replace(/[&<>"']/g,i=>ci[i]??i)}var he=class extends Error{constructor(t){super(`El documento ${t.identificacion} ya pertenece al cliente ${t.codigo} (${fe(t)}).`);this.existente=t;this.name=`ClienteDuplicadoError`}existente};var di=3;var Tt=class e{api=T(I);auth=T(_);async listar(){let i=j$1.functions.CONSULTAR_CLIENTES,t=await $h(this.api.Ejecutar({funcion:i,parametros:``}));return this.interpretarConsulta(t,i).map(o=>W(o))}async obtener(i){this.exigirCodigo(i);let t=j$1.functions.CONSULTAR_CLIENTE,o=await $h(this.api.Ejecutar({funcion:t,parametros:i})),[n]=this.interpretarConsulta(o,t);if(!n)throw new Error(`No se encontr\xF3 el cliente ${i} en el servidor.`);return W(n)}async guardar(i,t){let o=new Date().toISOString(),n=this.usuarioActual(),a=s(r({},wt(i)),{eliminado:!1,actualizadoEn:o,actualizadoPorCedula:n.cedula,actualizadoPorNombre:n.nombre});if(a.estado===`eliminado`&&(a.estado=`activo`),t.restaurar&&(a.restauradoEn=o),!t.nuevo){if(this.exigirCodigo(a.codigo),this.exigirUnico(await this.listar(),a),!await this.upsert({codigo:a.codigo},a))throw this.exigirUnico(await this.listar(),a),new Error(`El servidor no confirmó el guardado del cliente.`);return a}for(let r$1=1;r$1<=di;r$1++){let l=await this.listar();this.exigirUnico(l,a);let d=s(r({},a),{codigo:this.siguienteCodigo(l),creadoEn:o,creadoPorCedula:n.cedula,creadoPorNombre:n.nombre});if(await this.upsert({codigo:d.codigo,identificacion:d.identificacion},d))return d}throw new Error(`No se pudo asignar un código único al cliente. Intente de nuevo.`)}async cambiarEstado(i,t){this.exigirCodigo(i);let o=this.usuarioActual();if(!await this.upsert({codigo:i},{estado:t,actualizadoEn:new Date().toISOString(),actualizadoPorCedula:o.cedula,actualizadoPorNombre:o.nombre}))throw new Error(`El servidor no confirmó el cambio de estado.`)}async eliminar(i){this.exigirCodigo(i);let t=this.usuarioActual(),o=new Date().toISOString();if(!await this.upsert({codigo:i},{estado:`eliminado`,eliminado:!0,eliminadoEn:o,eliminadoPorCedula:t.cedula,eliminadoPorNombre:t.nombre,actualizadoEn:o}))throw new Error(`El servidor no confirmó la eliminación.`)}siguienteCodigo(i){return Ot(i.reduce((o,n)=>Math.max(o,Pt(n.codigo)),0)+1)}exigirCodigo(i){if(!At(i))throw new Error(`C\xF3digo de cliente inv\xE1lido: "${i??``}".`)}exigirUnico(i,t){let o=i.find(n=>n.identificacion===t.identificacion&&n.codigo!==t.codigo);if(o)throw new he(o)}async upsert(i,t){let o=await $h(this.api.ExecColeccion({coleccion:j$1.colecciones.CLIENTE,objeto:t,donde:JSON.stringify(i),driver:j$1.driver.PRINCIPAL,upsert:!0}));if(!o||typeof o!=`object`||Array.isArray(o))return null;let n=o;return typeof n.MatchedCount==`number`||typeof n.UpsertedCount==`number`?n:null}interpretarConsulta(i,t){let o=i&&typeof i==`object`&&`Cuerpo`in i?i.Cuerpo:i;if(typeof o==`string`)try{o=JSON.parse(o)}catch{throw new Error(`La funci\xF3n ${t} devolvi\xF3 una respuesta ilegible.`)}if(o==null)return[];if(Array.isArray(o))return o;if(typeof o==`object`&&`tipo`in o){let{msj:n,tipo:a}=o,r=a===77?` Verifique que la funci\xF3n ${t} est\xE9 registrada en apicore.`:``;throw new Error(`El servidor respondi\xF3: ${n??`sin detalle`}.${r}`)}if(typeof o==`object`)return[o];throw new Error(`La funci\xF3n ${t} no devolvi\xF3 una lista.`)}usuarioActual(){let i=this.auth.getUserDecrypt(sessionStorage.getItem(`token`)??``)?.Usuario;return{cedula:i?.cedula??``,nombre:i?.nombre??``}}static ɵfac=function(t){return new(t||e)};static ɵprov=ae({token:e,factory:e.ɵfac,providedIn:`root`})};var Ft=class e{location=T(Ie$1);privilegios(){return this.privilegiosDe(this.location.path())}metodos(){return this.privilegios().map(i=>i.metodo)}tiene(i){return this.tieneEn(this.location.path(),i)}privilegiosDe(i){let t=this.menuFirmado();return t?this.buscarPrivilegios(t,O(i)):[]}tieneEn(i,t){return this.privilegiosDe(i).some(o=>o.metodo===t)}menuFirmado(){let i=sessionStorage.getItem(`menu`),t=sessionStorage.getItem(`crypt`);if(!i||!t||Y(i)!==t)return null;try{let o=JSON.parse(i);return Array.isArray(o)?o:null}catch{return null}}buscarPrivilegios(i,t){let o=n=>{for(let a of n??[]){if(O(a?.url)===t){let l=a?.Privilegios??a?.Privilegio;if(Array.isArray(l)&&l.length)return l;let d=(a?.SubMenu??[]).find(m=>(m?.Privilegios??m?.Privilegio)?.length);return d?.Privilegios??d?.Privilegio??[]}let r=o(a?.SubMenu??[]);if(r.length)return r}return[]};return o(i)}static ɵfac=function(t){return new(t||e)};static ɵprov=ae({token:e,factory:e.ɵfac,providedIn:`root`})};export{mo as A,uo as B,ge as C,io as D,ho as E,po as F,yo as H,ro as I,so as L,oo as M,p as N,lo as O,pe as P,ti as R,fo as S,he as T,yt as U,vo as V,ao as _,It as a,eo as b,Kt as c,Tt as d,Ut as f,Yi as g,X as h,Ht as i,no as j,me as k,Qi as l,Wt as m,Dt as n,Jt as o,W as p,Ft as r,Ki as s,Ci as t,Si as u,co as v,go as w,fe as x,ei as y,to as z};