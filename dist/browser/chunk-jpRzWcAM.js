import{a as v}from"./chunk-C9yOwMO6.js";import{A as Al,B as Dr,Cn as g0,Ct as PE,Dn as hr,Dt as Ql,Et as Q,F as Be,Gn as p0,H as Eg,Ht as Vc,Kn as pE,M as Ap,Mn as ja,Mt as S,Nn as jc,Nt as Sm,On as iD,Pn as jh,Pt as T,Qn as sg,S as $D,T as $p,Tt as Pp,U as Ep,Vn as nD,X as Fp,Yn as rD,Zn as sD,_ as Ls,_t as Ne,ar as uv,at as Ie,bt as Op,cn as b,cr as vE,ct as Jh,fn as bp,hr as xi,it as ID,kn as j,mt as Lv,nr as ue,on as ae,pr as wg,pt as Ln,q as FE,r as Ie$1,rr as ug,tt as He,ur as vo,v as D,vt as Np,wn as gE,x as w,xn as en,yn as eD,zn as m0,zt as Up}from"./main-37D5L7QZ.js";import{B as tt$1,D as bo,F as qt,M as ka,P as nn,R as to,_ as Tn,f as M,k as et,l as Gt,p as Mt,w as _,x as Wt}from"./chunk-BCB08J8Q.js";import{C as _t,f as Q$1}from"./chunk-DwMogGu3.js";import{E as q,O as z,a as Ht,c as J,f as Q$2,r as G$1,u as K,w as j$1}from"./chunk-Bx3cOEj3.js";import{E as ut,T as pt$1,b as ht,n as Di,v as be,w as mt$1,x as ki}from"./chunk-BG_nS_af.js";function tt(i,r){i&1&&Np(0,`div`,2)}var nt=new S(`MAT_PROGRESS_BAR_DEFAULT_OPTIONS`);var Ot=(()=>{class i{_elementRef=T(Dr);_ngZone=T(Ne);_changeDetectorRef=T(p0);_renderer=T(ja);_cleanupTransitionEnd;constructor(){let e=to(),t=T(nt,{optional:!0});this._isNoopAnimation=e===`di-disabled`,e===`reduced-motion`&&this._elementRef.nativeElement.classList.add(`mat-progress-bar-reduced-motion`),t&&(t.color&&(this.color=this._defaultColor=t.color),this.mode=t.mode||this.mode)}_isNoopAnimation;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;_defaultColor=`primary`;get value(){return this._value}set value(e){this._value=Ge(e||0),this._changeDetectorRef.markForCheck()}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(e){this._bufferValue=Ge(e||0),this._changeDetectorRef.markForCheck()}_bufferValue=0;animationEnd=new Be;get mode(){return this._mode}set mode(e){this._mode=e,this._changeDetectorRef.markForCheck()}_mode=`determinate`;ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._cleanupTransitionEnd=this._renderer.listen(this._elementRef.nativeElement,`transitionend`,this._transitionendHandler)})}ngOnDestroy(){this._cleanupTransitionEnd?.()}_getPrimaryBarTransform(){return`scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return`${this.mode===`buffer`?this.bufferValue:100}%`}_isIndeterminate(){return this.mode===`indeterminate`||this.mode===`query`}_transitionendHandler=e=>{this.animationEnd.observers.length===0||!e.target||!e.target.classList.contains(`mdc-linear-progress__primary-bar`)||(this.mode===`determinate`||this.mode===`buffer`)&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}))};static ɵfac=function(t){return new(t||i)};static ɵcmp=pE({type:i,selectors:[[`mat-progress-bar`]],hostAttrs:[`role`,`progressbar`,`aria-valuemin`,`0`,`aria-valuemax`,`100`,`tabindex`,`-1`,1,`mat-mdc-progress-bar`,`mdc-linear-progress`],hostVars:10,hostBindings:function(t,n){t&2&&(bp(`aria-valuenow`,n._isIndeterminate()?null:n.value)(`mode`,n.mode),ID(`mat-`+n.color),Up(`_mat-animation-noopable`,n._isNoopAnimation)(`mdc-linear-progress--animation-ready`,!n._isNoopAnimation)(`mdc-linear-progress--indeterminate`,n._isIndeterminate()))},inputs:{color:`color`,value:[2,`value`,`value`,m0],bufferValue:[2,`bufferValue`,`bufferValue`,m0],mode:`mode`},outputs:{animationEnd:`animationEnd`},exportAs:[`matProgressBar`],decls:7,vars:5,consts:[[`aria-hidden`,`true`,1,`mdc-linear-progress__buffer`],[1,`mdc-linear-progress__buffer-bar`],[1,`mdc-linear-progress__buffer-dots`],[`aria-hidden`,`true`,1,`mdc-linear-progress__bar`,`mdc-linear-progress__primary-bar`],[1,`mdc-linear-progress__bar-inner`],[`aria-hidden`,`true`,1,`mdc-linear-progress__bar`,`mdc-linear-progress__secondary-bar`]],template:function(t,n){t&1&&(jc(0,`div`,0),Np(1,`div`,1),PE(2,tt,1,0,`div`,2),Vc(),jc(3,`div`,3),Np(4,`span`,4),Vc(),jc(5,`div`,5),Np(6,`span`,4),Vc()),t&2&&(Lv(),$p(`flex-basis`,n._getBufferBarFlexBasis()),Lv(),FE(n.mode===`buffer`?2:-1),Lv(),$p(`transform`,n._getPrimaryBarTransform()))},styles:[`.mat-mdc-progress-bar {
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
`],encapsulation:2})}return i})();function Ge(i,r=0,e=100){return Math.max(r,Math.min(e,i))}var St=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=gE({type:i});static ɵinj=Ql({imports:[et]})}return i})();var G=v(Ls());var Ye=class i{toast=G.default.mixin({toast:!0,position:`top-end`,showConfirmButton:!1,timer:5e3,timerProgressBar:!0});aviso(r,e){this.toast.fire({icon:`warning`,title:r,text:e})}info(r,e){this.toast.fire({icon:`info`,title:r,text:e})}exito(r,e){this.toast.fire({icon:`success`,title:r,text:e})}error(r,e){this.toast.fire({icon:`error`,title:r,text:e})}errorModal(r,e){return G.default.fire({icon:`error`,title:r,html:e,confirmButtonColor:`#0c2d48`})}static detalle(r){if(r==null)return`Sin detalle`;if(typeof r==`string`)return r;let e=r;return e.error?.msj?e.error.msj:e.status?`HTTP ${e.status}${e.message?` — `+e.message:``}`:e.message??`Sin detalle`}static ɵfac=function(e){return new(e||i)};static ɵprov=ae({token:i,factory:i.ɵfac,providedIn:`root`})};var at=[`panel`];var st=[`*`];function lt(i,r){if(i&1&&(jc(0,`div`,1,0),rD(2),Vc()),i&2){let e=r.id,t=eD();ID(t._classList),Up(`mat-mdc-autocomplete-visible`,t.showPanel)(`mat-mdc-autocomplete-hidden`,!t.showPanel)(`mat-autocomplete-panel-animations-enabled`,!t._animationsDisabled)(`mat-primary`,t._color===`primary`)(`mat-accent`,t._color===`accent`)(`mat-warn`,t._color===`warn`),Ap(`id`,t.id),bp(`aria-label`,t.ariaLabel||null)(`aria-labelledby`,t._getPanelAriaLabelledby(e))}}var Y=class{source;option;constructor(r,e){this.source=r,this.option=e}};var Ze=new S(`mat-autocomplete-default-options`,{providedIn:`root`,factory:()=>({autoActiveFirstOption:!1,autoSelectActiveOption:!1,hideSingleSelectionIndicator:!1,requireSelection:!1,hasBackdrop:!1})});var Qt=(()=>{class i{_changeDetectorRef=T(p0);_elementRef=T(Dr);_defaults=T(Ze);_animationsDisabled=tt$1();_activeOptionChanges=j.EMPTY;_keyManager;showPanel=!1;get isOpen(){return this._isOpen&&this.showPanel}_isOpen=!1;_latestOpeningTrigger;_setColor(e){this._color=e,this._changeDetectorRef.markForCheck()}_color;template;panel;options;optionGroups;ariaLabel;ariaLabelledby;displayWith=null;autoActiveFirstOption;autoSelectActiveOption;requireSelection;panelWidth;disableRipple=!1;optionSelected=new Be;opened=new Be;closed=new Be;optionActivated=new Be;set classList(e){this._classList=e,this._elementRef.nativeElement.className=``}_classList;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator;_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}id=T(qt).getId(`mat-autocomplete-`);inertGroups;constructor(){let e=T(_);this.inertGroups=e?.SAFARI||!1,this.autoActiveFirstOption=!!this._defaults.autoActiveFirstOption,this.autoSelectActiveOption=!!this._defaults.autoSelectActiveOption,this.requireSelection=!!this._defaults.requireSelection,this._hideSingleSelectionIndicator=this._defaults.hideSingleSelectionIndicator??!1}ngAfterContentInit(){this._keyManager=new Gt(this.options).withWrap().skipPredicate(this._skipPredicate),this._activeOptionChanges=this._keyManager.change.subscribe(e=>{this.isOpen&&this.optionActivated.emit({source:this,option:this.options.toArray()[e]||null})}),this._setVisibility()}ngOnDestroy(){this._keyManager?.destroy(),this._activeOptionChanges.unsubscribe()}_setScrollTop(e){this.panel&&(this.panel.nativeElement.scrollTop=e)}_getScrollTop(){return this.panel?this.panel.nativeElement.scrollTop:0}_setVisibility(){this.showPanel=!!this.options?.length,this._changeDetectorRef.markForCheck()}_emitSelectEvent(e){let t=new Y(this,e);this.optionSelected.emit(t)}_getPanelAriaLabelledby(e){if(this.ariaLabel)return null;let t=e?e+` `:``;return this.ariaLabelledby?t+this.ariaLabelledby:e}_skipPredicate(){return!1}static ɵfac=function(t){return new(t||i)};static ɵcmp=pE({type:i,selectors:[[`mat-autocomplete`]],contentQueries:function(t,n,o){if(t&1&&Pp(o,be,5)(o,ut,5),t&2){let a;iD(a=sD())&&(n.options=a),iD(a=sD())&&(n.optionGroups=a)}},viewQuery:function(t,n){if(t&1&&Fp(hr,7)(at,5),t&2){let o;iD(o=sD())&&(n.template=o.first),iD(o=sD())&&(n.panel=o.first)}},hostAttrs:[1,`mat-mdc-autocomplete`],inputs:{ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],displayWith:`displayWith`,autoActiveFirstOption:[2,`autoActiveFirstOption`,`autoActiveFirstOption`,g0],autoSelectActiveOption:[2,`autoSelectActiveOption`,`autoSelectActiveOption`,g0],requireSelection:[2,`requireSelection`,`requireSelection`,g0],panelWidth:`panelWidth`,disableRipple:[2,`disableRipple`,`disableRipple`,g0],classList:[0,`class`,`classList`],hideSingleSelectionIndicator:[2,`hideSingleSelectionIndicator`,`hideSingleSelectionIndicator`,g0]},outputs:{optionSelected:`optionSelected`,opened:`opened`,closed:`closed`,optionActivated:`optionActivated`},exportAs:[`matAutocomplete`],features:[$D([{provide:ht,useExisting:i}])],ngContentSelectors:st,decls:1,vars:0,consts:[[`panel`,``],[`role`,`listbox`,1,`mat-mdc-autocomplete-panel`,`mdc-menu-surface`,`mdc-menu-surface--open`,3,`id`]],template:function(t,n){t&1&&(nD(),Ep(0,lt,3,17,`ng-template`))},styles:[`div.mat-mdc-autocomplete-panel {
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
`],encapsulation:2})}return i})();var ct={provide:Q$1,useExisting:vo(()=>pt),multi:!0};var mt=new S(`mat-autocomplete-scroll-strategy`,{providedIn:`root`,factory:()=>{let i=T(Ie);return()=>q(i)}});var pt=(()=>{class i{_environmentInjector=T(ue);_element=T(Dr);_injector=T(Ie);_viewContainerRef=T(xi);_zone=T(Ne);_changeDetectorRef=T(p0);_dir=T(bo,{optional:!0});_formField=T(_t,{optional:!0,host:!0});_viewportRuler=T(z);_scrollStrategy=T(mt);_renderer=T(ja);_animationsDisabled=tt$1();_defaults=T(Ze,{optional:!0});_overlayRef=null;_portal;_componentDestroyed=!1;_initialized=new Q;_keydownSubscription;_outsideClickSubscription;_cleanupWindowBlur;_previousValue=null;_valueOnAttach=null;_valueOnLastKeydown=null;_positionStrategy;_manuallyFloatingLabel=!1;_closingActionsSubscription;_viewportSubscription=j.EMPTY;_breakpointObserver=T(Wt);_handsetLandscapeSubscription=j.EMPTY;_canOpenOnNextFocus=!0;_valueBeforeAutoSelection;_pendingAutoselectedOption=null;_closeKeyEventStream=new Q;_overlayPanelClass=Mt(this._defaults?.overlayPanelClass||[]);_windowBlurHandler=()=>{this._canOpenOnNextFocus=this.panelOpen||!this._hasFocus()};_onChange=()=>{};_onTouched=()=>{};autocomplete;position=`auto`;connectedTo;autocompleteAttribute=`off`;autocompleteDisabled=!1;_aboveClass=`mat-mdc-autocomplete-panel-above`;ngAfterViewInit(){this._initialized.next(),this._initialized.complete(),this._cleanupWindowBlur=this._renderer.listen(`window`,`blur`,this._windowBlurHandler)}ngOnChanges(e){e.position&&this._positionStrategy&&(this._setStrategyPositions(this._positionStrategy),this.panelOpen&&this._overlayRef.updatePosition())}ngOnDestroy(){this._cleanupWindowBlur?.(),this._handsetLandscapeSubscription.unsubscribe(),this._viewportSubscription.unsubscribe(),this._componentDestroyed=!0,this._destroyPanel(),this._closeKeyEventStream.complete()}get panelOpen(){return this._overlayAttached&&this.autocomplete.showPanel}_overlayAttached=!1;openPanel(){this._openPanelInternal()}closePanel(){this._resetLabel(),this._overlayAttached&&(this.panelOpen&&this._zone.run(()=>{this.autocomplete.closed.emit()}),this.autocomplete._latestOpeningTrigger===this&&(this.autocomplete._isOpen=!1,this.autocomplete._latestOpeningTrigger=null),this._overlayAttached=!1,this._pendingAutoselectedOption=null,this._overlayRef&&this._overlayRef.hasAttached()&&(this._overlayRef.detach(),this._closingActionsSubscription.unsubscribe()),this._updatePanelState(),this._componentDestroyed||this._changeDetectorRef.detectChanges())}updatePosition(){this._overlayAttached&&this._overlayRef.updatePosition()}get panelClosingActions(){return sg(this.optionSelections,this.autocomplete._keyManager.tabOut.pipe(Ln(()=>this._overlayAttached)),this._closeKeyEventStream,this._getOutsideClickStream(),this._overlayRef?this._overlayRef.detachments().pipe(Ln(()=>this._overlayAttached)):jh()).pipe(He(e=>e instanceof mt$1?e:null))}optionSelections=Jh(()=>{let e=this.autocomplete?this.autocomplete.options:null;return e?e.changes.pipe(Eg(e),Al(()=>sg(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(Al(()=>this.optionSelections))});get activeOption(){return this.autocomplete&&this.autocomplete._keyManager?this.autocomplete._keyManager.activeItem:null}_getOutsideClickStream(){return new b(e=>{let t=o=>{let a=M(o),l=this._formField?this._formField.getConnectedOverlayOrigin().nativeElement:null,u=this.connectedTo?this.connectedTo.elementRef.nativeElement:null;this._overlayAttached&&a!==this._element.nativeElement&&!this._hasFocus()&&(!l||!l.contains(a))&&(!u||!u.contains(a))&&this._overlayRef&&!this._overlayRef.overlayElement.contains(a)&&e.next(o)},n=[this._renderer.listen(`document`,`click`,t),this._renderer.listen(`document`,`auxclick`,t),this._renderer.listen(`document`,`touchend`,t)];return()=>{n.forEach(o=>o())}})}writeValue(e){Promise.resolve(null).then(()=>this._assignOptionValue(e))}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this._element.nativeElement.disabled=e}_handleKeydown(e){let t=e,n=t.keyCode,o=nn(t);if(n===27&&!o&&t.preventDefault(),this._valueOnLastKeydown=this._element.nativeElement.value,this.activeOption&&n===13&&this.panelOpen&&!o)this.activeOption._selectViaInteraction(),this._resetActiveItem(),t.preventDefault();else if(this.autocomplete){let a=this.autocomplete._keyManager.activeItem,l=n===38||n===40;n===9||l&&!o&&this.panelOpen?this.autocomplete._keyManager.onKeydown(t):l&&this._canOpen()&&this._openPanelInternal(this._valueOnLastKeydown),(l||this.autocomplete._keyManager.activeItem!==a)&&(this._scrollToOption(this.autocomplete._keyManager.activeItemIndex||0),this.autocomplete.autoSelectActiveOption&&this.activeOption&&(this._pendingAutoselectedOption||(this._valueBeforeAutoSelection=this._valueOnLastKeydown),this._pendingAutoselectedOption=this.activeOption,this._assignOptionValue(this.activeOption.value)))}}_handleInput(e){let t=e.target,n=t.value;if(t.type===`number`&&(n=n==``?null:parseFloat(n)),this._previousValue!==n){if(this._previousValue=n,this._pendingAutoselectedOption=null,(!this.autocomplete||!this.autocomplete.requireSelection)&&this._onChange(n),!n)this._clearPreviousSelectedOption(null,!1);else if(this.panelOpen&&!this.autocomplete.requireSelection){let o=this.autocomplete.options?.find(a=>a.selected);if(o){let a=this._getDisplayValue(o.value);n!==a&&o.deselect(!1)}}if(this._canOpen()&&this._hasFocus()){let o=this._valueOnLastKeydown??this._element.nativeElement.value;this._valueOnLastKeydown=null,this._openPanelInternal(o)}}}_handleFocus(){this._canOpenOnNextFocus?this._canOpen()&&(this._previousValue=this._element.nativeElement.value,this._attachOverlay(this._previousValue),this._floatLabel(!0)):this._canOpenOnNextFocus=!0}_handleClick(){this._canOpen()&&!this.panelOpen&&this._openPanelInternal()}_hasFocus(){return Tn()===this._element.nativeElement}_floatLabel(e=!1){this._formField&&this._formField.floatLabel===`auto`&&(e?this._formField._animateAndLockLabel():this._formField.floatLabel=`always`,this._manuallyFloatingLabel=!0)}_resetLabel(){this._manuallyFloatingLabel&&(this._formField&&(this._formField.floatLabel=`auto`),this._manuallyFloatingLabel=!1)}_subscribeToClosingActions(){return sg(new b(n=>{uv(()=>{n.next()},{injector:this._environmentInjector})}),this.autocomplete.options?.changes.pipe(wg(()=>this._positionStrategy.reapplyLastPosition()),ug(0))??jh()).pipe(Al(()=>this._zone.run(()=>{let n=this.panelOpen;return this._resetActiveItem(),this._updatePanelState(),this._changeDetectorRef.detectChanges(),this.panelOpen&&this._overlayRef.updatePosition(),n!==this.panelOpen&&(this.panelOpen?this._emitOpened():this.autocomplete.closed.emit()),this.panelClosingActions})),en(1)).subscribe(n=>this._setValueAndClose(n))}_emitOpened(){this.autocomplete.opened.emit()}_destroyPanel(){this._overlayRef&&(this.closePanel(),this._overlayRef.dispose(),this._overlayRef=null)}_getDisplayValue(e){let t=this.autocomplete;return t&&t.displayWith?t.displayWith(e):e}_assignOptionValue(e){let t=this._getDisplayValue(e);e??this._clearPreviousSelectedOption(null,!1),this._updateNativeInputValue(t??``)}_updateNativeInputValue(e){this._formField?this._formField._control.value=e:this._element.nativeElement.value=e,this._previousValue=e}_setValueAndClose(e){let t=this.autocomplete,n=e?e.source:this._pendingAutoselectedOption;n?(this._clearPreviousSelectedOption(n),this._assignOptionValue(n.value),this._onChange(n.value),t._emitSelectEvent(n),this._element.nativeElement.focus()):t.requireSelection&&this._element.nativeElement.value!==this._valueOnAttach&&(this._clearPreviousSelectedOption(null),this._assignOptionValue(null),this._onChange(null)),this.closePanel()}_clearPreviousSelectedOption(e,t){this.autocomplete?.options?.forEach(n=>{n!==e&&n.selected&&n.deselect(t)})}_openPanelInternal(e=this._element.nativeElement.value){this._attachOverlay(e),this._floatLabel()}_attachOverlay(e){if(!this.autocomplete)return;let t=this._overlayRef;t?(this._positionStrategy.setOrigin(this._getConnectedElement()),t.updateSize({width:this._getPanelWidth()})):(this._portal=new G$1(this.autocomplete.template,this._viewContainerRef,{id:this._formField?.getLabelId()}),t=J(this._injector,this._getOverlayConfig()),this._overlayRef=t,this._viewportSubscription=this._viewportRuler.change().subscribe(()=>{this.panelOpen&&t&&t.updateSize({width:this._getPanelWidth()})}),this._handsetLandscapeSubscription=this._breakpointObserver.observe(ka.HandsetLandscape).subscribe(o=>{o.matches?this._positionStrategy.withFlexibleDimensions(!0).withGrowAfterOpen(!0).withViewportMargin(8):this._positionStrategy.withFlexibleDimensions(!1).withGrowAfterOpen(!1).withViewportMargin(0)})),t&&!t.hasAttached()&&(t.attach(this._portal),this._valueOnAttach=e,this._valueOnLastKeydown=null,this._closingActionsSubscription=this._subscribeToClosingActions());let n=this.panelOpen;this.autocomplete._isOpen=this._overlayAttached=!0,this.autocomplete._latestOpeningTrigger=this,this.autocomplete._setColor(this._formField?.color),this._updatePanelState(),this.panelOpen&&n!==this.panelOpen&&this._emitOpened()}_handlePanelKeydown=e=>{(e.keyCode===27&&!nn(e)||e.keyCode===38&&nn(e,`altKey`))&&(this._pendingAutoselectedOption&&(this._updateNativeInputValue(this._valueBeforeAutoSelection??``),this._pendingAutoselectedOption=null),this._closeKeyEventStream.next(),this._resetActiveItem(),e.stopPropagation(),e.preventDefault())};_updatePanelState(){if(this.autocomplete._setVisibility(),this.panelOpen){let e=this._overlayRef;this._keydownSubscription||(this._keydownSubscription=e.keydownEvents().subscribe(this._handlePanelKeydown)),this._outsideClickSubscription||(this._outsideClickSubscription=e.outsidePointerEvents().subscribe())}else this._keydownSubscription?.unsubscribe(),this._outsideClickSubscription?.unsubscribe(),this._keydownSubscription=this._outsideClickSubscription=void 0}_getOverlayConfig(){return new K({positionStrategy:this._getOverlayPosition(),scrollStrategy:this._scrollStrategy(),width:this._getPanelWidth(),direction:this._dir??void 0,hasBackdrop:this._defaults?.hasBackdrop,backdropClass:this._defaults?.backdropClass||`cdk-overlay-transparent-backdrop`,panelClass:this._overlayPanelClass,disableAnimations:this._animationsDisabled})}_getOverlayPosition(){let e=Q$2(this._injector,this._getConnectedElement()).withFlexibleDimensions(!1).withPush(!1).withPopoverLocation(`inline`);return this._setStrategyPositions(e),this._positionStrategy=e,e}_setStrategyPositions(e){let t=[{originX:`start`,originY:`bottom`,overlayX:`start`,overlayY:`top`},{originX:`end`,originY:`bottom`,overlayX:`end`,overlayY:`top`}],n=this._aboveClass,o=[{originX:`start`,originY:`top`,overlayX:`start`,overlayY:`bottom`,panelClass:n},{originX:`end`,originY:`top`,overlayX:`end`,overlayY:`bottom`,panelClass:n}],a;this.position===`above`?a=o:this.position===`below`?a=t:a=[...t,...o],e.withPositions(a)}_getConnectedElement(){return this.connectedTo?this.connectedTo.elementRef:this._formField?this._formField.getConnectedOverlayOrigin():this._element}_getPanelWidth(){return this.autocomplete.panelWidth||this._getHostWidth()}_getHostWidth(){return this._getConnectedElement().nativeElement.getBoundingClientRect().width}_resetActiveItem(){let e=this.autocomplete;if(e.autoActiveFirstOption){let t=-1;for(let n=0;n<e.options.length;n++)if(!e.options.get(n).disabled){t=n;break}e._keyManager.setActiveItem(t)}else e._keyManager.setActiveItem(-1)}_canOpen(){let e=this._element.nativeElement;return!e.readOnly&&!e.disabled&&!this.autocompleteDisabled}_scrollToOption(e){let t=this.autocomplete,n=Di(e,t.options,t.optionGroups);if(e===0&&n===1)t._setScrollTop(0);else if(t.panel){let o=t.options.toArray()[e];if(o){let a=o._getHostElement(),l=ki(a.offsetTop,a.offsetHeight,t._getScrollTop(),t.panel.nativeElement.offsetHeight);t._setScrollTop(l)}}}static ɵfac=function(t){return new(t||i)};static ɵdir=vE({type:i,selectors:[[`input`,`matAutocomplete`,``],[`textarea`,`matAutocomplete`,``]],hostAttrs:[1,`mat-mdc-autocomplete-trigger`],hostVars:7,hostBindings:function(t,n){t&1&&Op(`focusin`,function(){return n._handleFocus()})(`blur`,function(){return n._onTouched()})(`input`,function(a){return n._handleInput(a)})(`keydown`,function(a){return n._handleKeydown(a)})(`click`,function(){return n._handleClick()}),t&2&&bp(`autocomplete`,n.autocompleteAttribute)(`role`,n.autocompleteDisabled?null:`combobox`)(`aria-autocomplete`,n.autocompleteDisabled?null:`list`)(`aria-activedescendant`,n.panelOpen&&n.activeOption?n.activeOption.id:null)(`aria-expanded`,n.autocompleteDisabled?null:n.panelOpen.toString())(`aria-controls`,n.autocompleteDisabled||!n.panelOpen?null:n.autocomplete?.id)(`aria-haspopup`,n.autocompleteDisabled?null:`listbox`)},inputs:{autocomplete:[0,`matAutocomplete`,`autocomplete`],position:[0,`matAutocompletePosition`,`position`],connectedTo:[0,`matAutocompleteConnectedTo`,`connectedTo`],autocompleteAttribute:[0,`autocomplete`,`autocompleteAttribute`],autocompleteDisabled:[2,`matAutocompleteDisabled`,`autocompleteDisabled`,g0]},exportAs:[`matAutocompleteTrigger`],features:[$D([ct]),Sm]})}return i})();var Zt=(()=>{class i{static ɵfac=function(t){return new(t||i)};static ɵmod=gE({type:i});static ɵinj=Ql({imports:[Ht,pt$1,j$1,pt$1,et]})}return i})();var $e=class i{location=T(Ie$1);privilegios(){return this.privilegiosDe(this.location.path())}metodos(){return this.privilegios().map(r=>r.metodo)}tiene(r){return this.tieneEn(this.location.path(),r)}privilegiosDe(r){let e=this.menuFirmado();return e?this.buscarPrivilegios(e,w(r)):[]}tieneEn(r,e){return this.privilegiosDe(r).some(t=>t.metodo===e)}menuFirmado(){let r=sessionStorage.getItem(`menu`),e=sessionStorage.getItem(`crypt`);if(!r||!e||D(r)!==e)return null;try{let t=JSON.parse(r);return Array.isArray(t)?t:null}catch{return null}}buscarPrivilegios(r,e){let t=n=>{for(let o of n??[]){if(w(o?.url)===e){let l=o?.Privilegios??o?.Privilegio;if(Array.isArray(l)&&l.length)return l;let u=(o?.SubMenu??[]).find(U=>(U?.Privilegios??U?.Privilegio)?.length);return u?.Privilegios??u?.Privilegio??[]}let a=t(o?.SubMenu??[]);if(a.length)return a}return[]};return t(r)}static ɵfac=function(e){return new(e||i)};static ɵprov=ae({token:i,factory:i.ɵfac,providedIn:`root`})};export{Ye as a,St as i,Ot as n,Zt as o,Qt as r,pt as s,$e as t};