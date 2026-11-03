import{a as v$1,n as s,t as r}from"./chunk-C9yOwMO6.js";import{An as hw,Bt as Ua,C as $c,Dn as fg,Dr as s$1,E as Ae,En as eu,Ft as T,Ht as Ue,L as Ee,Mt as S,O as Bp,Pt as Sp,Q as ID,R as Eg,Rn as k0,Rt as Tv,Tr as Ls,U as Fn,V as Er,Wt as Uo,X as Hn,Zt as Xp,_t as Og,ar as tg,b as Y,bn as cy,cn as _e,ct as Ll,et as Jh,fn as ae$1,fr as ur,ft as Mp,h as ms,hn as an,ht as NE,lt as Lp,m as me,mr as vD,nn as Z,or as ts,pt as Mr,s as Re,sn as _E,un as _r,ut as Me,wr as zp,x as k,xt as Pl,yr as xe,z as Ei}from"./main-CAKTF7WJ.js";import{C as is,E as m,M as ri,O as oe$1,S as ht$1,b as ct$1,c as Lt,m as Vt,o as Je$1,r as Ct,x as dt$1,y as bt}from"./chunk-C4kuPPzu.js";import{C as vi,D as z,S as se$1,T as xt,c as Qt,f as Xt,h as et,t as $,u as W$1,w as vt,x as re$1,y as me$1}from"./chunk-BrgxpeHh.js";import{t as v$2}from"./chunk-BWWKMKPF.js";var V=class o{_menuItems=Uo([]);menuItems=this._menuItems.asReadonly();constructor(){this.loadMenu()}loadMenu(){let i=sessionStorage.getItem(`menu`);if(i)try{let e=JSON.parse(i),t=this.mapMenu(e);this._menuItems.set(t)}catch(e){console.error(`[MenuService] Error parseando menú:`,e),this._menuItems.set([])}}mapMenu(i){return i.map(e=>{let t={id:e.nombre?.toLowerCase()||``,title:e.nombre||e.descripcion||``,type:e.clase||`item`,icon:e.icono||``,nombre:e.nombre,descripcion:e.descripcion,icono:e.icono,clase:e.clase,SubMenu:e.SubMenu};if(e.SubMenu&&e.SubMenu.length>0)switch(t.children=e.SubMenu.map(n=>({id:n.nombre?.toLowerCase()||``,title:n.descripcion||n.nombre||``,type:n.clase||`item`,icon:n.icono||``,url:this.normalizarRuta(n.url),nombre:n.nombre,descripcion:n.descripcion,icono:n.icono,clase:n.clase})),t.type){case`item`:t.url=this.normalizarRuta(e.url);break;case`collapsible`:t.url=``;break}else t.url=this.normalizarRuta(e.url);return t})}normalizarRuta(i){if(!i)return``;let e=String(i).trim();for(;e.startsWith(`/`);)e=e.slice(1);for(;e.endsWith(`/`);)e=e.slice(0,-1);return e}clearMenu(){this._menuItems.set([]),sessionStorage.removeItem(`menu`)}getRootItems(){return this._menuItems()}getSubItems(i){return i.children||[]}static ɵfac=function(e){return new(e||o)};static ɵprov=ae$1({token:o,factory:o.ɵfac,providedIn:`root`})};function nt(o,i){}var f=class{viewContainerRef;injector;id;role=`dialog`;panelClass=``;hasBackdrop=!0;backdropClass=``;disableClose=!1;closePredicate;width=``;height=``;minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus=`first-tabbable`;restoreFocus=!0;scrollStrategy;closeOnNavigation=!0;closeOnDestroy=!0;closeOnOverlayDetachments=!0;disableAnimations=!1;providers;container;templateContext;bindings};var oe=(()=>{class o extends ${_elementRef=T(Mr);_focusTrapFactory=T(Ct);_config;_interactivityChecker=T(bt);_ngZone=T(Ae);_focusMonitor=T(ht$1);_renderer=T(Ua);_changeDetectorRef=T(k0);_injector=T(Ee);_platform=T(m);_document=T(ur);_portalOutlet;_focusTrapped=new Z;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_isDestroyed=!1;constructor(){super(),this._config=T(f,{optional:!0})||new f,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(e){let t=this._ariaLabelledByQueue.indexOf(e);t>-1&&(this._ariaLabelledByQueue.splice(t,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._focusTrapped.complete(),this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),t}attachTemplatePortal(e){this._portalOutlet.hasAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),t}attachDomPortal=e=>{this._portalOutlet.hasAttached();let t=this._portalOutlet.attachDomPortal(e);return this._contentAttached(),t};_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(e,t){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let n=()=>{r(),l(),e.removeAttribute(`tabindex`)},r=this._renderer.listen(e,`blur`,n),l=this._renderer.listen(e,`mousedown`,n)})),e.focus(t)}_focusByCssSelector(e,t){let n=this._elementRef.nativeElement.querySelector(e);n&&this._forceFocus(n,t)}_trapFocus(e){this._isDestroyed||Tv(()=>{let t=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case`dialog`:this._containsFocus()||t.focus(e);break;case!0:case`first-tabbable`:this._focusTrap?.focusInitialElement(e)||this._focusDialogContainer(e);break;case`first-heading`:this._focusByCssSelector(`h1, h2, h3, h4, h5, h6, [role="heading"]`,e);break;default:this._focusByCssSelector(this._config.autoFocus,e);break}this._focusTrapped.next()},{injector:this._injector})}_restoreFocus(){let e=this._config.restoreFocus,t=null;if(typeof e==`string`?t=this._document.querySelector(e):typeof e==`boolean`?t=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(t=e),this._config.restoreFocus&&t&&typeof t.focus==`function`){let n=ri(),r=this._elementRef.nativeElement;(!n||n===this._document.body||n===r||r.contains(n))&&(this._focusMonitor?(this._focusMonitor.focusVia(t,this._closeInteractionType),this._closeInteractionType=null):t.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(e){this._elementRef.nativeElement.focus?.(e)}_containsFocus(){let e=this._elementRef.nativeElement,t=ri();return e===t||e.contains(t)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=ri()))}static ɵfac=function(t){return new(t||o)};static ɵcmp=_E({type:o,selectors:[[`cdk-dialog-container`]],viewQuery:function(t,n){if(t&1&&zp(vi,7),t&2){let r;vD(r=ID())&&(n._portalOutlet=r.first)}},hostAttrs:[`tabindex`,`-1`,1,`cdk-dialog-container`],hostVars:6,hostBindings:function(t,n){t&2&&Lp(`id`,n._config.id||null)(`role`,n._config.role)(`aria-modal`,n._config.ariaModal)(`aria-labelledby`,n._config.ariaLabel?null:n._ariaLabelledByQueue[0])(`aria-label`,n._config.ariaLabel)(`aria-describedby`,n._config.ariaDescribedBy||null)},features:[Mp],decls:1,vars:0,consts:[[`cdkPortalOutlet`,``]],template:function(t,n){t&1&&Sp(0,nt,0,0,`ng-template`,0)},dependencies:[vi],styles:[`.cdk-dialog-container {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
}
`],encapsulation:2,changeDetection:1})}return o})();var v=class{overlayRef;config;componentInstance=null;componentRef=null;containerInstance;disableClose;closed=new Z;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(i,e){this.overlayRef=i,this.config=e,this.disableClose=e.disableClose,this.backdropClick=i.backdropClick(),this.keydownEvents=i.keydownEvents(),this.outsidePointerEvents=i.outsidePointerEvents(),this.id=e.id,this.keydownEvents.subscribe(t=>{t.keyCode===27&&!this.disableClose&&!Je$1(t)&&(t.preventDefault(),this.close(void 0,{focusOrigin:`keyboard`}))}),this.backdropClick.subscribe(()=>{!this.disableClose&&this._canClose()?this.close(void 0,{focusOrigin:`mouse`}):this.containerInstance._recaptureFocus?.()}),this._detachSubscription=i.detachments().subscribe(()=>{e.closeOnOverlayDetachments!==!1&&this.close()})}close(i,e){if(this._canClose(i)){let t=this.closed;this.containerInstance._closeInteractionType=e?.focusOrigin||`program`,this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),t.next(i),t.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(i=``,e=``){return this.overlayRef.updateSize({width:i,height:e}),this}addPanelClass(i){return this.overlayRef.addPanelClass(i),this}removePanelClass(i){return this.overlayRef.removePanelClass(i),this}_canClose(i){let e=this.config;return!!this.containerInstance&&(!e.closePredicate||e.closePredicate(i,e,this.componentInstance))}};var ot=new S(`DialogScrollStrategy`,{providedIn:`root`,factory:()=>{let o=T(Ee);return()=>Qt(o)}});var at=new S(`DialogData`);var rt=new S(`DefaultDialogConfig`);function st(o){let i=Uo(o),e=new Ue;return{valueSignal:i,get value(){return i()},change:e,ngOnDestroy(){e.complete()}}}var ae=(()=>{class o{_injector=T(Ee);_defaultOptions=T(rt,{optional:!0});_parentDialog=T(o,{optional:!0,skipSelf:!0});_overlayContainer=T(se$1);_idGenerator=T(oe$1);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new Z;_afterOpenedAtThisLevel=new Z;_ariaHiddenElements=new Map;_scrollStrategy=T(ot);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=fg(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(Og(void 0)));open(e,t){t=r(r({},this._defaultOptions||new f),t),t.id=t.id||this._idGenerator.getId(`cdk-dialog-`),t.id&&this.getDialogById(t.id);let r$1=this._getOverlayConfig(t),l=xt(this._injector,r$1),a=new v(l,t),s=this._attachContainer(l,a,t);if(a.containerInstance=s,!this.openDialogs.length){let d=this._overlayContainer.getContainerElement();s._focusTrapped?s._focusTrapped.pipe(an(1)).subscribe(()=>{this._hideNonDialogContentFromAssistiveTechnology(d)}):this._hideNonDialogContentFromAssistiveTechnology(d)}return this._attachDialogContent(e,a,s,t),this.openDialogs.push(a),a.closed.subscribe(()=>this._removeOpenDialog(a,!0)),this.afterOpened.next(a),a}closeAll(){ne(this.openDialogs,e=>e.close())}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){ne(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===!1&&this._removeOpenDialog(e,!1)}),ne(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(e){let t=new W$1({positionStrategy:e.positionStrategy||re$1().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation,disableAnimations:e.disableAnimations});return e.backdropClass&&(t.backdropClass=e.backdropClass),t}_attachContainer(e,t,n){let r=n.injector||n.viewContainerRef?.injector,l=[{provide:f,useValue:n},{provide:v,useValue:t},{provide:et,useValue:e}],a;n.container?typeof n.container==`function`?a=n.container:(a=n.container.type,l.push(...n.container.providers(n))):a=oe;let s=new vt(a,n.viewContainerRef,Ee.create({parent:r||this._injector,providers:l}));return e.attach(s).instance}_attachDialogContent(e,t,n,r$2){if(e instanceof Er){let l=this._createInjector(r$2,t,n,void 0),a={$implicit:r$2.data,dialogRef:t};r$2.templateContext&&(a=r(r({},a),typeof r$2.templateContext==`function`?r$2.templateContext():r$2.templateContext)),n.attachTemplatePortal(new z(e,null,a,l))}else{let l=this._createInjector(r$2,t,n,this._injector),a=n.attachComponentPortal(new vt(e,r$2.viewContainerRef,l,null,r$2.bindings));t.componentRef=a,t.componentInstance=a.instance}}_createInjector(e,t,n,r){let l=e.injector||e.viewContainerRef?.injector,a=[{provide:at,useValue:e.data},{provide:v,useValue:t}];return e.providers&&(typeof e.providers==`function`?a.push(...e.providers(t,e,n)):a.push(...e.providers)),e.direction&&(!l||!l.get(ct$1,null,{optional:!0}))&&a.push({provide:ct$1,useValue:st(e.direction)}),Ee.create({parent:l||r,providers:a})}_removeOpenDialog(e,t){let n=this.openDialogs.indexOf(e);n>-1&&(this.openDialogs.splice(n,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((r,l)=>{r?l.setAttribute(`aria-hidden`,r):l.removeAttribute(`aria-hidden`)}),this._ariaHiddenElements.clear(),t&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(e){if(e.parentElement){let t=e.parentElement.children;for(let n=t.length-1;n>-1;n--){let r=t[n];r!==e&&r.nodeName!==`SCRIPT`&&r.nodeName!==`STYLE`&&!r.hasAttribute(`aria-live`)&&!r.hasAttribute(`popover`)&&(this._ariaHiddenElements.set(r,r.getAttribute(`aria-hidden`)),r.setAttribute(`aria-hidden`,`true`))}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}static ɵfac=function(t){return new(t||o)};static ɵprov=_r({token:o,factory:o.ɵfac})}return o})();function ne(o,i){let e=o.length;for(;e--;)i(o[e])}var Ye=(()=>{class o{static ɵfac=function(t){return new(t||o)};static ɵmod=NE({type:o});static ɵinj=eu({providers:[ae],imports:[me$1,Xt,Lt,Xt]})}return o})();function lt(o,i){}var W=class{viewContainerRef;injector;id;role=`dialog`;panelClass=``;hasBackdrop=!0;backdropClass=``;disableClose=!1;closePredicate;width=``;height=``;minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus=`first-tabbable`;restoreFocus=!0;delayFocusTrap=!0;scrollStrategy;closeOnNavigation=!0;enterAnimationDuration;exitAnimationDuration;bindings};var re=`mdc-dialog--open`;var $e=`mdc-dialog--opening`;var Je=`mdc-dialog--closing`;var ct=150;var dt=75;var ut=(()=>{class o extends oe{_animationStateChanged=new Ue;_animationsEnabled=!is();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?Ke(this._config.enterAnimationDuration)??ct:0;_exitAnimationDuration=this._animationsEnabled?Ke(this._config.exitAnimationDuration)??dt:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:`opening`,totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(Ze,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add($e,re)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(re),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:`closing`,totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(re),this._animationsEnabled?(this._hostElement.style.setProperty(Ze,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Je)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(e){this._actionSectionCount+=e,this._changeDetectorRef.markForCheck()}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:`closed`,totalTime:this._exitAnimationDuration})};_clearAnimationClasses(){this._hostElement.classList.remove($e,Je)}_waitForAnimationToComplete(e,t){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(t,e)}_requestAnimationFrame(e){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame==`function`?requestAnimationFrame(e):e()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(e){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:`opened`,totalTime:e})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(e){let t=super.attachComponentPortal(e);return t.location.nativeElement.classList.add(`mat-mdc-dialog-component-host`),t}static ɵfac=(()=>{let e;return function(n){return(e||(e=cy(o)))(n||o)}})();static ɵcmp=_E({type:o,selectors:[[`mat-dialog-container`]],hostAttrs:[`tabindex`,`-1`,1,`mat-mdc-dialog-container`,`mdc-dialog`],hostVars:10,hostBindings:function(t,n){t&2&&(Bp(`id`,n._config.id),Lp(`aria-modal`,n._config.ariaModal)(`role`,n._config.role)(`aria-labelledby`,n._config.ariaLabel?null:n._ariaLabelledByQueue[0])(`aria-label`,n._config.ariaLabel)(`aria-describedby`,n._config.ariaDescribedBy||null),Xp(`_mat-animation-noopable`,!n._animationsEnabled)(`mat-mdc-dialog-container-with-actions`,n._actionSectionCount>0))},features:[Mp],decls:3,vars:0,consts:[[1,`mat-mdc-dialog-inner-container`,`mdc-dialog__container`],[1,`mat-mdc-dialog-surface`,`mdc-dialog__surface`],[`cdkPortalOutlet`,``]],template:function(t,n){t&1&&(Ei(0,`div`,0)(1,`div`,1),Sp(2,lt,0,0,`ng-template`,2),$c()())},dependencies:[vi],styles:[`.mat-mdc-dialog-container {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  outline: 0;
}

.cdk-overlay-pane.mat-mdc-dialog-panel {
  max-width: var(--%NS%mat-dialog-container-max-width, 560px);
  min-width: var(--%NS%mat-dialog-container-min-width, 280px);
}
@media (max-width: 599px) {
  .cdk-overlay-pane.mat-mdc-dialog-panel {
    max-width: var(--%NS%mat-dialog-container-small-max-width, calc(100vw - 32px));
  }
}

.mat-mdc-dialog-inner-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  height: 100%;
  opacity: 0;
  transition: opacity linear var(--%NS%mat-dialog-transition-duration, 0ms);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
}
.mdc-dialog--closing .mat-mdc-dialog-inner-container {
  transition: opacity 75ms linear;
  transform: none;
}
.mdc-dialog--open .mat-mdc-dialog-inner-container {
  opacity: 1;
}
._mat-animation-noopable .mat-mdc-dialog-inner-container {
  transition: none;
}

.mat-mdc-dialog-surface {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  outline: 0;
  transform: scale(0.8);
  transition: transform var(--%NS%mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  box-shadow: var(--%NS%mat-dialog-container-elevation-shadow, none);
  border-radius: var(--%NS%mat-dialog-container-shape, var(--%NS%mat-sys-corner-extra-large, 4px));
  background-color: var(--%NS%mat-dialog-container-color, var(--%NS%mat-sys-surface, white));
}
[dir=rtl] .mat-mdc-dialog-surface {
  text-align: right;
}
.mdc-dialog--open .mat-mdc-dialog-surface, .mdc-dialog--closing .mat-mdc-dialog-surface {
  transform: none;
}
._mat-animation-noopable .mat-mdc-dialog-surface {
  transition: none;
}
.mat-mdc-dialog-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 2px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}

.mat-mdc-dialog-title {
  display: block;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0 0 1px;
  padding: var(--%NS%mat-dialog-headline-padding, 6px 24px 13px);
}
.mat-mdc-dialog-title::before {
  display: inline-block;
  width: 0;
  height: 40px;
  content: "";
  vertical-align: 0;
}
[dir=rtl] .mat-mdc-dialog-title {
  text-align: right;
}
.mat-mdc-dialog-container .mat-mdc-dialog-title {
  color: var(--%NS%mat-dialog-subhead-color, var(--%NS%mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--%NS%mat-dialog-subhead-font, var(--%NS%mat-sys-headline-small-font, inherit));
  line-height: var(--%NS%mat-dialog-subhead-line-height, var(--%NS%mat-sys-headline-small-line-height, 1.5rem));
  font-size: var(--%NS%mat-dialog-subhead-size, var(--%NS%mat-sys-headline-small-size, 1rem));
  font-weight: var(--%NS%mat-dialog-subhead-weight, var(--%NS%mat-sys-headline-small-weight, 400));
  letter-spacing: var(--%NS%mat-dialog-subhead-tracking, var(--%NS%mat-sys-headline-small-tracking, 0.03125em));
}

.mat-mdc-dialog-content {
  display: block;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  overflow: auto;
  max-height: 65vh;
}
.mat-mdc-dialog-content > :first-child {
  margin-top: 0;
}
.mat-mdc-dialog-content > :last-child {
  margin-bottom: 0;
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  color: var(--%NS%mat-dialog-supporting-text-color, var(--%NS%mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));
  font-family: var(--%NS%mat-dialog-supporting-text-font, var(--%NS%mat-sys-body-medium-font, inherit));
  line-height: var(--%NS%mat-dialog-supporting-text-line-height, var(--%NS%mat-sys-body-medium-line-height, 1.5rem));
  font-size: var(--%NS%mat-dialog-supporting-text-size, var(--%NS%mat-sys-body-medium-size, 1rem));
  font-weight: var(--%NS%mat-dialog-supporting-text-weight, var(--%NS%mat-sys-body-medium-weight, 400));
  letter-spacing: var(--%NS%mat-dialog-supporting-text-tracking, var(--%NS%mat-sys-body-medium-tracking, 0.03125em));
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  padding: var(--%NS%mat-dialog-content-padding, 20px 24px);
}
.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content {
  padding: var(--%NS%mat-dialog-with-actions-content-padding, 20px 24px 0);
}
.mat-mdc-dialog-container .mat-mdc-dialog-title + .mat-mdc-dialog-content {
  padding-top: 0;
}

.mat-mdc-dialog-actions {
  display: flex;
  position: relative;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  margin: 0;
  border-top: 1px solid transparent;
  padding: var(--%NS%mat-dialog-actions-padding, 16px 24px);
  justify-content: var(--%NS%mat-dialog-actions-alignment, flex-end);
}
@media (forced-colors: active) {
  .mat-mdc-dialog-actions {
    border-top-color: CanvasText;
  }
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start, .mat-mdc-dialog-actions[align=start] {
  justify-content: start;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center, .mat-mdc-dialog-actions[align=center] {
  justify-content: center;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end, .mat-mdc-dialog-actions[align=end] {
  justify-content: flex-end;
}
.mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
.mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}

.mat-mdc-dialog-component-host {
  display: contents;
}
`],encapsulation:2,changeDetection:1})}return o})();var Ze=`--mat-dialog-transition-duration`;function Ke(o){return o==null?null:typeof o==`number`?o:o.endsWith(`ms`)?dt$1(o.substring(0,o.length-2)):o.endsWith(`s`)?dt$1(o.substring(0,o.length-1))*1e3:o===`0`?0:null}var G=(function(o){return o[o.OPEN=0]=`OPEN`,o[o.CLOSING=1]=`CLOSING`,o[o.CLOSED=2]=`CLOSED`,o})(G||{});var se=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new Fn(1);_beforeClosed=new Fn(1);_result;_closeFallbackTimeout;_state=G.OPEN;_closeInteractionType;constructor(i,e,t){this._ref=i,this._config=e,this._containerInstance=t,this.disableClose=e.disableClose,this.id=i.id,i.addPanelClass(`mat-mdc-dialog-panel`),t._animationStateChanged.pipe(Hn(n=>n.state===`opened`),an(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),t._animationStateChanged.pipe(Hn(n=>n.state===`closed`),an(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),i.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),Eg(this.backdropClick(),this.keydownEvents().pipe(Hn(n=>n.keyCode===27&&!this.disableClose&&!Je$1(n)))).subscribe(n=>{this.disableClose||(n.preventDefault(),mt(this,n.type===`keydown`?`keyboard`:`mouse`))})}close(i){let e=this._config.closePredicate;e&&!e(i,this._config,this.componentInstance)||(this._result=i,this._containerInstance._animationStateChanged.pipe(Hn(t=>t.state===`closing`),an(1)).subscribe(t=>{this._beforeClosed.next(i),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),t.totalTime+100)}),this._state=G.CLOSING,this._containerInstance._startExitAnimation())}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(i){let e=this._ref.config.positionStrategy;return i&&(i.left||i.right)?i.left?e.left(i.left):e.right(i.right):e.centerHorizontally(),i&&(i.top||i.bottom)?i.top?e.top(i.top):e.bottom(i.bottom):e.centerVertically(),this._ref.updatePosition(),this}updateSize(i=``,e=``){return this._ref.updateSize(i,e),this}addPanelClass(i){return this._ref.addPanelClass(i),this}removePanelClass(i){return this._ref.removePanelClass(i),this}getState(){return this._state}_finishDialogClose(){this._state=G.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function mt(o,i,e){return o._closeInteractionType=i,o.close(e)}var ht=new S(`MatMdcDialogData`);var pt=new S(`mat-mdc-dialog-default-options`);var gt=new S(`mat-mdc-dialog-scroll-strategy`,{providedIn:`root`,factory:()=>{let o=T(Ee);return()=>Qt(o)}});var le=(()=>{class o{_defaultOptions=T(pt,{optional:!0});_scrollStrategy=T(gt);_parentDialog=T(o,{optional:!0,skipSelf:!0});_idGenerator=T(oe$1);_injector=T(Ee);_dialog=T(ae);_animationsDisabled=is();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new Z;_afterOpenedAtThisLevel=new Z;dialogConfigClass=W;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=fg(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(Og(void 0)));constructor(){this._dialogRefConstructor=se,this._dialogContainerType=ut,this._dialogDataToken=ht}open(e,t){let n;t=r(r({},this._defaultOptions||new W),t),t.id=t.id||this._idGenerator.getId(`mat-mdc-dialog-`),t.scrollStrategy=t.scrollStrategy||this._scrollStrategy();let r$3=this._dialog.open(e,s(r({},t),{positionStrategy:re$1(this._injector).centerHorizontally().centerVertically(),disableClose:!0,closePredicate:void 0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,disableAnimations:this._animationsDisabled||t.enterAnimationDuration?.toLocaleString()===`0`||t.exitAnimationDuration?.toString()===`0`,container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:t},{provide:f,useValue:t}]},templateContext:()=>({dialogRef:n}),providers:(l,a,s)=>(n=new this._dialogRefConstructor(l,t,s),n.updatePosition(t?.position),[{provide:this._dialogContainerType,useValue:s},{provide:this._dialogDataToken,useValue:a.data},{provide:this._dialogRefConstructor,useValue:n},{provide:v,useValue:null}])}));return n.componentRef=r$3.componentRef,n.componentInstance=r$3.componentInstance,this.openDialogs.push(n),this.afterOpened.next(n),n.afterClosed().subscribe(()=>{let l=this.openDialogs.indexOf(n);l>-1&&(this.openDialogs.splice(l,1),this.openDialogs.length||this._getAfterAllClosed().next())}),n}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(e){return this.openDialogs.find(t=>t.id===e)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(e){let t=e.length;for(;t--;)e[t].close()}static ɵfac=function(t){return new(t||o)};static ɵprov=_r({token:o,factory:o.ɵfac})}return o})();var li=(()=>{class o{static ɵfac=function(t){return new(t||o)};static ɵmod=NE({type:o});static ɵinj=eu({providers:[le],imports:[Ye,me$1,Xt,Vt]})}return o})();var _=v$1(Ls());var Xe=class o{constructor(i,e,t,n,r,l){this.router=i;this.apiService=e;this.sha256=t;this.menuService=n;this.http=r;this.dialog=l;let a=sessionStorage.getItem(`token`);if(a){let s=this.getUserDecrypt(a);s?.Usuario&&(this.currentUser.set({id:s.Usuario.cedula,nombre:s.Usuario.nombre,email:s.Usuario.correo,rol:s.Usuario.Perfil?.descripcion||`Usuario`,cedula:s.Usuario.cedula,sistema:s.Usuario.sistema}),this.menuService.loadMenu())}}router;apiService;sha256;menuService;http;dialog;currentUser=Uo(null);user=this.currentUser.asReadonly();isAuthenticated=hw(()=>this.currentUser()!==null);tempAuthToken=``;getLogin(i,e,t){let n=sessionStorage.getItem(`net_info`),r=``;if(n)try{let a=JSON.parse(n),s={os_info:a.system?.os_info||`unknown`,mac_address:a.system?.mac_address||`unknown`,network:a.network||`unknown`};r=btoa(JSON.stringify(s))}catch(a){console.warn(`[AuthService] Error parseando net_info:`,a)}return _e(this.sha256.EncryptDeviceContext(r,Y.Hash.slice(-32)).catch(a=>(console.warn(`[AuthService] crypto.subtle falló:`,a),``))).pipe(Pl(a=>this.apiService.login(i,e,a||void 0,t)))}getUserDecrypt(i){if(!i||i===`undefined`||i===`null`)return null;try{let e=i.split(`.`);return e.length!==3?null:JSON.parse(atob(e[1]))}catch(e){return console.error(`[AuthService] Error decodificando token:`,e),null}}hasTotpActive(i){return!!this.getUserDecrypt(i)?.Usuario?.token}setTempAuthToken(i){this.tempAuthToken=i}getTempAuthToken(){return this.tempAuthToken}validarTotp(i){return this.apiService.Validar_TOTP(i,this.tempAuthToken)}multiplesesionCache=new Map;verificarSesion(i){let e=i||this.tempAuthToken;if(!e)return this.apiService.MultipleSesion(e);if(this.multiplesesionCache.has(e))return this.multiplesesionCache.get(e);let t=this.apiService.MultipleSesion(e).pipe(Ll(1));return this.multiplesesionCache.set(e,t),t}async iniciarSesion(i){let e=this.getUserDecrypt(i);if(!e?.Usuario)throw new Error(`Token inválido`);if(!this.tieneAccesoAplicacion(e))throw this.clearSession(),new Error(`SIN_ACCESO_APP`);sessionStorage.setItem(`token`,i),sessionStorage.removeItem(`totp`),this.currentUser.set({id:e.Usuario.cedula,nombre:e.Usuario.nombre,email:e.Usuario.correo,rol:e.Usuario.Perfil?.descripcion||`Usuario`,cedula:e.Usuario.cedula,sistema:e.Usuario.sistema}),await this.obtenerPerfil(i)}tieneAccesoAplicacion(i){let e=i?.Usuario?.Aplicacion??[],t=String(Y.ID).toLowerCase();return e.some(n=>String(n?.id??``).toLowerCase()===t)}async obtenerPerfil(i){let e=this.getUserDecrypt(i);if(!e?.Usuario)return;let t=e.Usuario.cedula+`,`+e.Usuario.sistema+`,`+e.Usuario.correo,n={funcion:Y.functions.CONSULTAR_USUARIO_PERFIL,parametros:t};return new Promise((r,l)=>{this.apiService.Ejecutar(n).subscribe({next:a=>{try{if(!a||a.length===0||!a[0].Aplicacion||a[0].Aplicacion.length===0||!a[0].Aplicacion[0].Rol)throw new Error(`Perfil de usuario no válido`);let s=JSON.stringify(a[0].Aplicacion[0].Rol.Menu);sessionStorage.setItem(`menu`,s),this.getUserId();let d=s$1(s);sessionStorage.setItem(`crypt`,d),this.menuService.loadMenu(),r()}catch(s){console.error(`[AuthService] Error al procesar perfil:`,s),_.default.fire({title:`Error de Perfil`,text:`No se pudo cargar la configuración de su perfil.`,icon:`error`}),sessionStorage.clear(),localStorage.clear(),l(s)}},error:a=>{console.error(`[AuthService] Fallo conectando al perfil:`,a),sessionStorage.clear(),localStorage.clear(),l(a)}})})}async cambiarContrasena(i,e,t){let n=await this.sha256.hash(e),r=await this.sha256.hash(t),l={funcion:Y.functions.ACTUALIZAR_CLAVE_USUARIO,parametros:`${i},${n},${r}`};return new Promise(a=>{this.apiService.Ejecutar(l).subscribe({next:s=>{console.log(`[AuthService] Respuesta cambiarContrasena:`,s);let d=s?.ModifiedCount??s?.modifiedCount??s?.n??s?.matchedCount;if(typeof d==`number`&&d>0?!0:s?.resultado===!0||s?.ok===!0||s?.modificado===!0)_.default.fire({icon:`success`,title:`Contraseña actualizada`,timer:2e3,showConfirmButton:!1}),this.clearSession(),this.router.navigate([`/login`]),a(!0);else{let Q=s?.msj||s?.msg||s?.mensaje||s?.error;_.default.fire({icon:`error`,title:`Error`,text:typeof Q==`string`&&Q?Q:`No se pudo actualizar la contraseña. Verifique que la contraseña actual sea correcta.`}),a(!1)}},error:s=>{console.error(`[AuthService] Error cambiando contraseña:`,s);let d=s?.error?.msj||s?.error?.msg||s?.error?.mensaje;_.default.fire({icon:`error`,title:`Error`,text:typeof d==`string`&&d?d:`Error al cambiar la contraseña`}),a(!1)}})})}generarTotpQr(){return this.apiService.GenerarQR_TOTP(`base64`)}getImagenQr(i){return this.apiService.GetImageQR(i)}actualizarTotp(i){let e={funcion:Y.functions.ACTUALIZAR_TOTP,parametros:i};return this.apiService.Ejecutar(e).pipe(Me(t=>{let n=this.getUserDecrypt(sessionStorage.getItem(`token`)||``)?.Usuario?.token;console.log(`[TOTP] _SYS_UUserTOTP enviado →`,{parametro:i,jwt_token:n??`(vacío)`}),console.log(`[TOTP] _SYS_UUserTOTP respuesta →`,t);let r=this.mensajeErrorFuncion(t);if(r)throw new Error(r);return t}))}mensajeErrorFuncion(i){if(!i||typeof i!=`object`||Array.isArray(i))return``;let e=typeof i.msj==`string`?i.msj:``,t=typeof i.tipo==`number`?i.tipo:null;return e&&/error|no exite|verifique|excedida/i.test(e)?e:t!==null&&t!==1?e||`El servidor report\xF3 el c\xF3digo ${t}`:``}consultarSecretoTotp(){let e=this.getUserDecrypt(sessionStorage.getItem(`token`)||``)?.Usuario;if(!e)return Jh(null);let t=(l,a)=>{let s=Array.isArray(l)?l[0]:l;return!s||typeof s!=`object`?(console.warn(`[TOTP] ${a} sin registro:`,l),null):`token`in s?typeof s.token==`string`?s.token:null:(console.warn(`[TOTP] ${a} no expone "token". Campos:`,Object.keys(s)),null)},n=()=>{let l=[e.cedula,e.sistema,e.correo].join(`,`);return this.apiService.Ejecutar({funcion:Y.functions.CONSULTAR_USUARIO_PERFIL,parametros:l}).pipe(Me(a=>t(a,`_SYS_CUsuarioPerfil`)),ts(a=>(console.warn(`[TOTP] _SYS_CUsuarioPerfil falló:`,a),Jh(null))))},r=e.usuario||e.login||``;return r?this.apiService.Ejecutar({funcion:Y.functions.CONSULTAR_LOGIN_USUARIO,parametros:r}).pipe(Pl(l=>{let a=t(l,`_SYS_CUserPanelLogin`);return a!==null?Jh(a):n()}),ts(l=>(console.warn(`[TOTP] _SYS_CUserPanelLogin falló:`,l),n()))):n()}async performLogoutProcess(i){this.cerrarCapasSuperpuestas();try{i(`Cerrando conexiones en tiempo real...`),await this.delay(300),i(`Finalizando sesión en el servidor...`),await this.delay(800),await this.serverLogout()}catch(e){console.error(`Error al contactar servidor para logout:`,e),i(`No se pudo contactar al servidor, limpiando localmente...`),await this.delay(1e3)}finally{i(`Limpiando datos de la sesión...`),await this.delay(800),this.clearSession(),i(`¡Hasta pronto!`),await this.delay(1200),this.cerrarCapasSuperpuestas(),this.router.navigate([`/login`])}}async serverLogout(){let i=sessionStorage.getItem(`token`);if(!i)return;let e=this.getUserId(),t={headers:new Re({"Content-Type":`application/json`,Authorization:`Bearer `+i})},n=Y.API+`wusuario/logout:`+e;await tg(this.http.post(n,{},t))}getUserId(){let i=localStorage.getItem(`userId`);return i||(i=`xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g,e=>{let t=Math.random()*16|0;return(e===`x`?t:t&3|8).toString(16)}),localStorage.setItem(`userId`,i)),i}logout(){this.confirmLogout()}confirmLogout(){_.default.fire({title:`¿Desea cerrar sesión?`,text:`Gracias por su tiempo`,icon:`warning`,showCancelButton:!0,confirmButtonColor:`#3085d6`,cancelButtonColor:`#d33`,confirmButtonText:`Si, cerrar`,cancelButtonText:`Cancelar`}).then(i=>{i.isConfirmed&&this.router.navigate([`/logout`])})}clearSession(){this.cerrarDialogos(),this.currentUser.set(null),this.tempAuthToken=``,this.menuService.clearMenu(),sessionStorage.clear(),localStorage.clear()}cerrarCapasSuperpuestas(){this.cerrarDialogos();try{_.default.isVisible()&&_.default.close()}catch(i){console.warn(`[AuthService] No se pudo cerrar SweetAlert2:`,i)}}cerrarDialogos(){try{this.dialog.closeAll()}catch(i){console.warn(`[AuthService] No se pudieron cerrar los diálogos:`,i)}document.body.classList.remove(`cdk-global-scrollblock`)}delay(i){return new Promise(e=>setTimeout(e,i))}static ɵfac=function(e){return new(e||o)(xe(me),xe(v$2),xe(k),xe(V),xe(ms),xe(le))};static ɵprov=ae$1({token:o,factory:o.ɵfac,providedIn:`root`})};export{li as a,le as i,Xe as n,se as o,ht as r,V as t};