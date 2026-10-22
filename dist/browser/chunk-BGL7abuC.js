import{$ as Jh,$n as sD,$t as Yh,At as Rr,B as Er,Bn as kp,Bt as Uc,Cn as eg,Cr as zp,D as Bp,Dn as gD,En as fg,Et as Qv,Fn as jp,G as Gh,H as Fn,Hn as mD,Ht as Um,I as Ee,In as ju,Jt as XE,K as Go,Kn as pD,Kt as Vu,L as Eg,Ln as k0,Lt as Tv,M as Dg,Nt as Sp,Ot as RD,Pt as T,Q as JE,Qt as YE,R as Ei,Rt as UD,S as $c,Sn as eD,St as Pp,Tn as eu,U as Fp,Ut as Uo,V as F0,Vt as Ue$1,Wt as Up,X as Hp,Xn as qc,Xt as Xp,Y as Hn,Z as ID,_t as P0,bt as Pl,ct as Lp,dr as ur,dt as Mp,er as sh,ft as Mr,gn as bw,gt as Og,hr as wh,j as DD,jt as S,ln as _r$1,lr as ug,lt as Me$1,mn as an$1,mt as NE,on as _E,pr as vD,pt as Mu,q as Gp,rn as ZE,rt as Kh,sr as tw,tn as Z,un as _u,w as AE,xr as zc,xt as Pn,yn as cy,zn as ki$1,zt as Ua}from"./main-2TW4EHUZ.js";import{A as fa,B as tt$1,D as bo,F as qt,N as mo,P as nn,T as _n$1,W as zr,c as Gn,d as Kt,f as M,g as R,j as hn$1,k as et,l as Gt,r as At,w as _,y as Ue$2,z as tr}from"./chunk-De3ZEI8P.js";import{D as bt,E as _e,I as xt,L as yt,M as pt$1,_ as Qn,g as Qe$1,i as Ct,k as gt,w as Yn,x as V}from"./chunk-DCiPT60f.js";import{D as qe,E as q,O as z,T as nn$1,a as Ht,h as Yt,l as Je,m as Ye,n as Ft,o as Ii,p as W,s as It,w as j,x as de,y as ce}from"./chunk-DZOOkwPh.js";var Ve=class{applyChanges(o,e,t,i,a){o.forEachOperation((r,l,c)=>{let h,g;if(r.previousIndex==null){let _=t(r,l,c);h=e.createEmbeddedView(_.templateRef,_.context,_.index),g=W.INSERTED}else c==null?(e.remove(l),g=W.REMOVED):(h=e.get(l),e.move(h,c),g=W.MOVED);a&&a({context:h?.context,operation:g,record:r})})}detach(){}};var Ai=[[[`caption`]],[[`colgroup`],[`col`]],`*`];var Pi=[`caption`,`colgroup, col`,`*`];function zi(n,o){n&1&&mD(0,2)}function Bi(n,o){n&1&&(Ei(0,`thead`,0),Hp(1,1),$c(),Ei(2,`tbody`,0),Hp(3,2)(4,3),$c(),Ei(5,`tfoot`,0),Hp(6,4),$c())}function Li(n,o){n&1&&Hp(0,1)(1,2)(2,3)(3,4)}var K=new S(`CDK_TABLE`);var We=(()=>{class n{template=T(Er);static ɵfac=function(t){return new(t||n)};static ɵdir=AE({type:n,selectors:[[``,`cdkCellDef`,``]]})}return n})();var Ue=(()=>{class n{template=T(Er);static ɵfac=function(t){return new(t||n)};static ɵdir=AE({type:n,selectors:[[``,`cdkHeaderCellDef`,``]]})}return n})();var yi=(()=>{class n{template=T(Er);static ɵfac=function(t){return new(t||n)};static ɵdir=AE({type:n,selectors:[[``,`cdkFooterCellDef`,``]]})}return n})();var ne=(()=>{class n{_table=T(K,{optional:!0});_hasStickyChanged=!1;get name(){return this._name}set name(e){this._setNameInput(e)}_name;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;get stickyEnd(){return this._stickyEnd}set stickyEnd(e){e!==this._stickyEnd&&(this._stickyEnd=e,this._hasStickyChanged=!0)}_stickyEnd=!1;cell;headerCell;footerCell;cssClassFriendlyName;_columnCssClassName;hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}_updateColumnCssClassName(){this._columnCssClassName=[`cdk-column-${this.cssClassFriendlyName}`]}_setNameInput(e){e&&(this._name=e,this.cssClassFriendlyName=e.replace(/[^a-z0-9_-]/gi,`-`),this._updateColumnCssClassName())}static ɵfac=function(t){return new(t||n)};static ɵdir=AE({type:n,selectors:[[``,`cdkColumnDef`,``]],contentQueries:function(t,i,a){if(t&1&&Gp(a,We,5)(a,Ue,5)(a,yi,5),t&2){let r;vD(r=ID())&&(i.cell=r.first),vD(r=ID())&&(i.headerCell=r.first),vD(r=ID())&&(i.footerCell=r.first)}},inputs:{name:[0,`cdkColumnDef`,`name`],sticky:[2,`sticky`,`sticky`,P0],stickyEnd:[2,`stickyEnd`,`stickyEnd`,P0]}})}return n})();var je=class{constructor(o,e){e.nativeElement.classList.add(...o._columnCssClassName)}};var bi=(()=>{class n extends je{constructor(){super(T(ne),T(Mr))}static ɵfac=function(t){return new(t||n)};static ɵdir=AE({type:n,selectors:[[`cdk-header-cell`],[`th`,`cdk-header-cell`,``]],hostAttrs:[`role`,`columnheader`,1,`cdk-header-cell`],features:[Mp]})}return n})();var vi=(()=>{class n extends je{constructor(){let e=T(ne),t=T(Mr);super(e,t);let i=e._table?._getCellRole();i&&t.nativeElement.setAttribute(`role`,i)}static ɵfac=function(t){return new(t||n)};static ɵdir=AE({type:n,selectors:[[`cdk-cell`],[`td`,`cdk-cell`,``]],hostAttrs:[1,`cdk-cell`],features:[Mp]})}return n})();var it=(()=>{class n{template=T(Er);_differs=T(bw);columns;_columnsDiffer;ngOnChanges(e){if(!this._columnsDiffer){let t=e.columns&&e.columns.currentValue||[];this._columnsDiffer=this._differs.find(t).create(),this._columnsDiffer.diff(t)}}getColumnsDiff(){return this._columnsDiffer.diff(this.columns)}extractCellTemplate(e){return this instanceof Re?e.headerCell.template:this instanceof nt?e.footerCell.template:e.cell.template}static ɵfac=function(t){return new(t||n)};static ɵdir=AE({type:n,features:[Um]})}return n})();var Re=(()=>{class n extends it{_table=T(K,{optional:!0});_hasStickyChanged=!1;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;ngOnChanges(e){super.ngOnChanges(e)}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}static ɵfac=(()=>{let e;return function(i){return(e||(e=cy(n)))(i||n)}})();static ɵdir=AE({type:n,selectors:[[``,`cdkHeaderRowDef`,``]],inputs:{columns:[0,`cdkHeaderRowDef`,`columns`],sticky:[2,`cdkHeaderRowDefSticky`,`sticky`,P0]},features:[Mp,Um]})}return n})();var nt=(()=>{class n extends it{_table=T(K,{optional:!0});_hasStickyChanged=!1;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;ngOnChanges(e){super.ngOnChanges(e)}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}static ɵfac=(()=>{let e;return function(i){return(e||(e=cy(n)))(i||n)}})();static ɵdir=AE({type:n,selectors:[[``,`cdkFooterRowDef`,``]],inputs:{columns:[0,`cdkFooterRowDef`,`columns`],sticky:[2,`cdkFooterRowDefSticky`,`sticky`,P0]},features:[Mp,Um]})}return n})();var Qe=(()=>{class n extends it{_table=T(K,{optional:!0});when;static ɵfac=(()=>{let e;return function(i){return(e||(e=cy(n)))(i||n)}})();static ɵdir=AE({type:n,selectors:[[``,`cdkRowDef`,``]],inputs:{columns:[0,`cdkRowDefColumns`,`columns`],when:[0,`cdkRowDefWhen`,`when`]},features:[Mp]})}return n})();var se=(()=>{class n{_viewContainer=T(ki$1);cells;context;static mostRecentCellOutlet=null;constructor(){n.mostRecentCellOutlet=this}ngOnDestroy(){n.mostRecentCellOutlet===this&&(n.mostRecentCellOutlet=null)}static ɵfac=function(t){return new(t||n)};static ɵdir=AE({type:n,selectors:[[``,`cdkCellOutlet`,``]]})}return n})();var ot=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵcmp=_E({type:n,selectors:[[`cdk-header-row`],[`tr`,`cdk-header-row`,``]],hostAttrs:[`role`,`row`,1,`cdk-header-row`],decls:1,vars:0,consts:[[`cdkCellOutlet`,``]],template:function(t,i){t&1&&Hp(0,0)},dependencies:[se],encapsulation:2,changeDetection:1})}return n})();var at=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵcmp=_E({type:n,selectors:[[`cdk-row`],[`tr`,`cdk-row`,``]],hostAttrs:[`role`,`row`,1,`cdk-row`],decls:1,vars:0,consts:[[`cdkCellOutlet`,``]],template:function(t,i){t&1&&Hp(0,0)},dependencies:[se],encapsulation:2,changeDetection:1})}return n})();var Ke=(()=>{class n{templateRef=T(Er);_contentClassNames=[`cdk-no-data-row`,`cdk-row`];_cellClassNames=[`cdk-cell`,`cdk-no-data-cell`];_cellSelector=`td, cdk-cell, [cdk-cell], .cdk-cell`;static ɵfac=function(t){return new(t||n)};static ɵdir=AE({type:n,selectors:[[`ng-template`,`cdkNoDataRow`,``]]})}return n})();var fi=[`top`,`bottom`,`left`,`right`];var tt=class{_isNativeHtmlTable;_stickCellCss;_isBrowser;_needsPositionStickyOnElement;direction;_positionListener;_tableInjector;_elemSizeCache=new WeakMap;_resizeObserver=globalThis?.ResizeObserver?new globalThis.ResizeObserver(o=>this._updateCachedSizes(o)):null;_updatedStickyColumnsParamsToReplay=[];_stickyColumnsReplayTimeout=null;_cachedCellWidths=[];_borderCellCss;_destroyed=!1;constructor(o,e,t=!0,i=!0,a,r,l){this._isNativeHtmlTable=o,this._stickCellCss=e,this._isBrowser=t,this._needsPositionStickyOnElement=i,this.direction=a,this._positionListener=r,this._tableInjector=l,this._borderCellCss={top:`${e}-border-elem-top`,bottom:`${e}-border-elem-bottom`,left:`${e}-border-elem-left`,right:`${e}-border-elem-right`}}clearStickyPositioning(o,e){(e.includes(`left`)||e.includes(`right`))&&this._removeFromStickyColumnReplayQueue(o);let t=[];for(let i of o)i.nodeType===i.ELEMENT_NODE&&t.push(i,...Array.from(i.children));Tv({write:()=>{for(let i of t)this._removeStickyStyle(i,e)}},{injector:this._tableInjector})}updateStickyColumns(o,e,t,i=!0,a=!0){if(!o.length||!this._isBrowser||!(e.some(U=>U)||t.some(U=>U))){this._positionListener?.stickyColumnsUpdated({sizes:[]}),this._positionListener?.stickyEndColumnsUpdated({sizes:[]});return}let r=o[0],l=r.children.length,c=this.direction===`rtl`,h=c?`right`:`left`,g=c?`left`:`right`,_=e.lastIndexOf(!0),x=t.indexOf(!0),R,gt,_t;a&&this._updateStickyColumnReplayQueue({rows:[...o],stickyStartStates:[...e],stickyEndStates:[...t]}),Tv({earlyRead:()=>{R=this._getCellWidths(r,i),gt=this._getStickyStartColumnPositions(R,e),_t=this._getStickyEndColumnPositions(R,t)},write:()=>{for(let U of o)for(let V=0;V<l;V++){let yt=U.children[V];e[V]&&this._addStickyStyle(yt,h,gt[V],V===_),t[V]&&this._addStickyStyle(yt,g,_t[V],V===x)}this._positionListener&&R.some(U=>!!U)&&(this._positionListener.stickyColumnsUpdated({sizes:_===-1?[]:R.slice(0,_+1).map((U,V)=>e[V]?U:null)}),this._positionListener.stickyEndColumnsUpdated({sizes:x===-1?[]:R.slice(x).map((U,V)=>t[V+x]?U:null).reverse()}))}},{injector:this._tableInjector})}stickRows(o,e,t){if(!this._isBrowser)return;let i=t===`bottom`?o.slice().reverse():o,a=t===`bottom`?e.slice().reverse():e,r=[],l=[],c=[];Tv({earlyRead:()=>{for(let h=0,g=0;h<i.length;h++){if(!a[h])continue;r[h]=g;let _=i[h];c[h]=this._isNativeHtmlTable?Array.from(_.children):[_];let x=this._retrieveElementSize(_).height;g+=x,l[h]=x}},write:()=>{let h=a.lastIndexOf(!0);for(let g=0;g<i.length;g++){if(!a[g])continue;let _=r[g],x=g===h;for(let R of c[g])this._addStickyStyle(R,t,_,x)}t===`top`?this._positionListener?.stickyHeaderRowsUpdated({sizes:l,offsets:r,elements:c}):this._positionListener?.stickyFooterRowsUpdated({sizes:l,offsets:r,elements:c})}},{injector:this._tableInjector})}updateStickyFooterContainer(o,e){this._isNativeHtmlTable&&Tv({write:()=>{let t=o.querySelector(`tfoot`);t&&(e.some(i=>!i)?this._removeStickyStyle(t,[`bottom`]):this._addStickyStyle(t,`bottom`,0,!1))}},{injector:this._tableInjector})}destroy(){this._stickyColumnsReplayTimeout&&clearTimeout(this._stickyColumnsReplayTimeout),this._resizeObserver?.disconnect(),this._destroyed=!0}_removeStickyStyle(o,e){if(!o.classList.contains(this._stickCellCss))return;for(let i of e)o.style[i]=``,o.classList.remove(this._borderCellCss[i]);fi.some(i=>e.indexOf(i)===-1&&o.style[i])?o.style.zIndex=this._getCalculatedZIndex(o):(o.style.zIndex=``,this._needsPositionStickyOnElement&&(o.style.position=``),o.classList.remove(this._stickCellCss))}_addStickyStyle(o,e,t,i){o.classList.add(this._stickCellCss),i&&o.classList.add(this._borderCellCss[e]),o.style[e]=`${t}px`,o.style.zIndex=this._getCalculatedZIndex(o),this._needsPositionStickyOnElement&&(o.style.cssText+=`position: -webkit-sticky; position: sticky; `)}_getCalculatedZIndex(o){let e={top:100,bottom:10,left:1,right:1},t=0;for(let i of fi)o.style[i]&&(t+=e[i]);return t?`${t}`:``}_getCellWidths(o,e=!0){if(!e&&this._cachedCellWidths.length)return this._cachedCellWidths;let t=[],i=o.children;for(let a=0;a<i.length;a++){let r=i[a];t.push(this._retrieveElementSize(r).width)}return this._cachedCellWidths=t,t}_getStickyStartColumnPositions(o,e){let t=[],i=0;for(let a=0;a<o.length;a++)e[a]&&(t[a]=i,i+=o[a]);return t}_getStickyEndColumnPositions(o,e){let t=[],i=0;for(let a=o.length;a>0;a--)e[a]&&(t[a]=i,i+=o[a]);return t}_retrieveElementSize(o){let e=this._elemSizeCache.get(o);if(e)return e;let t=o.getBoundingClientRect(),i={width:t.width,height:t.height};return this._resizeObserver&&(this._elemSizeCache.set(o,i),this._resizeObserver.observe(o,{box:`border-box`})),i}_updateStickyColumnReplayQueue(o){this._removeFromStickyColumnReplayQueue(o.rows),this._stickyColumnsReplayTimeout||this._updatedStickyColumnsParamsToReplay.push(o)}_removeFromStickyColumnReplayQueue(o){let e=new Set(o);for(let t of this._updatedStickyColumnsParamsToReplay)t.rows=t.rows.filter(i=>!e.has(i));this._updatedStickyColumnsParamsToReplay=this._updatedStickyColumnsParamsToReplay.filter(t=>!!t.rows.length)}_updateCachedSizes(o){let e=!1;for(let t of o){let i=t.borderBoxSize?.length?{width:t.borderBoxSize[0].inlineSize,height:t.borderBoxSize[0].blockSize}:{width:t.contentRect.width,height:t.contentRect.height};i.width!==this._elemSizeCache.get(t.target)?.width&&Vi(t.target)&&(e=!0),this._elemSizeCache.set(t.target,i)}e&&this._updatedStickyColumnsParamsToReplay.length&&(this._stickyColumnsReplayTimeout&&clearTimeout(this._stickyColumnsReplayTimeout),this._stickyColumnsReplayTimeout=setTimeout(()=>{if(!this._destroyed){for(let t of this._updatedStickyColumnsParamsToReplay)this.updateStickyColumns(t.rows,t.stickyStartStates,t.stickyEndStates,!0,!1);this._updatedStickyColumnsParamsToReplay=[],this._stickyColumnsReplayTimeout=null}},0))}};function Vi(n){return[`cdk-cell`,`cdk-header-cell`,`cdk-footer-cell`].some(o=>n.classList.contains(o))}function gi(n){return Error(`Could not find column with id "${n}".`)}var xe=new S(`STICKY_POSITIONING_LISTENER`);var rt=(()=>{class n{viewContainer=T(ki$1);elementRef=T(Mr);constructor(){let e=T(K);e._rowOutlet=this,e._outletAssigned()}static ɵfac=function(t){return new(t||n)};static ɵdir=AE({type:n,selectors:[[``,`rowOutlet`,``]]})}return n})();var st=(()=>{class n{viewContainer=T(ki$1);elementRef=T(Mr);constructor(){let e=T(K);e._headerRowOutlet=this,e._outletAssigned()}static ɵfac=function(t){return new(t||n)};static ɵdir=AE({type:n,selectors:[[``,`headerRowOutlet`,``]]})}return n})();var lt=(()=>{class n{viewContainer=T(ki$1);elementRef=T(Mr);constructor(){let e=T(K);e._footerRowOutlet=this,e._outletAssigned()}static ɵfac=function(t){return new(t||n)};static ɵdir=AE({type:n,selectors:[[``,`footerRowOutlet`,``]]})}return n})();var ct=(()=>{class n{viewContainer=T(ki$1);elementRef=T(Mr);constructor(){let e=T(K);e._noDataRowOutlet=this,e._outletAssigned()}static ɵfac=function(t){return new(t||n)};static ɵdir=AE({type:n,selectors:[[``,`noDataRowOutlet`,``]]})}return n})();var dt=(()=>{class n{_differs=T(bw);_changeDetectorRef=T(k0);_elementRef=T(Mr);_dir=T(bo,{optional:!0});_platform=T(_);_viewRepeater;_viewportRuler=T(z);_injector=T(Ee);_virtualScrollViewport=T(Ii,{optional:!0,host:!0});_positionListener=T(xe,{optional:!0})||T(xe,{optional:!0,skipSelf:!0});_document=T(ur);_data;_renderedRange;_onDestroy=new Z;_renderRows;_renderChangeSubscription=null;_columnDefsByName=new Map;_rowDefs;_headerRowDefs;_footerRowDefs;_dataDiffer;_defaultRowDef=null;_customColumnDefs=new Set;_customRowDefs=new Set;_customHeaderRowDefs=new Set;_customFooterRowDefs=new Set;_customNoDataRow=null;_headerRowDefChanged=!0;_footerRowDefChanged=!0;_stickyColumnStylesNeedReset=!0;_forceRecalculateCellWidths=!0;_cachedRenderRowsMap=new Map;_isNativeHtmlTable;_stickyStyler;stickyCssClass=`cdk-table-sticky`;needsPositionStickyOnElement=!0;_isServer;_isShowingNoDataRow=!1;_hasAllOutlets=!1;_hasInitialized=!1;_headerRowStickyUpdates=new Z;_footerRowStickyUpdates=new Z;_disableVirtualScrolling=!1;_getCellRole(){if(this._cellRoleInternal===void 0){let e=this._elementRef.nativeElement.getAttribute(`role`);return e===`grid`||e===`treegrid`?`gridcell`:`cell`}return this._cellRoleInternal}_cellRoleInternal=void 0;get trackBy(){return this._trackByFn}set trackBy(e){this._trackByFn=e}_trackByFn;get dataSource(){return this._dataSource}set dataSource(e){this._dataSource!==e&&(this._switchDataSource(e),this._changeDetectorRef.markForCheck())}_dataSource;_dataSourceChanges=new Z;_dataStream=new Z;get multiTemplateDataRows(){return this._multiTemplateDataRows}set multiTemplateDataRows(e){this._multiTemplateDataRows=e,this._rowOutlet&&this._rowOutlet.viewContainer.length&&(this._forceRenderDataRows(),this.updateStickyColumnStyles())}_multiTemplateDataRows=!1;get fixedLayout(){return this._virtualScrollEnabled()?!0:this._fixedLayout}set fixedLayout(e){this._fixedLayout=e,this._forceRecalculateCellWidths=!0,this._stickyColumnStylesNeedReset=!0}_fixedLayout=!1;recycleRows=!1;contentChanged=new Ue$1;viewChange=new Pn({start:0,end:Number.MAX_VALUE});_rowOutlet;_headerRowOutlet;_footerRowOutlet;_noDataRowOutlet;_contentColumnDefs;_contentRowDefs;_contentHeaderRowDefs;_contentFooterRowDefs;_noDataRow;get renderedRows(){return this._renderRows}constructor(){T(new wh(`role`),{optional:!0})||this._elementRef.nativeElement.setAttribute(`role`,`table`),this._isServer=!this._platform.isBrowser,this._isNativeHtmlTable=this._elementRef.nativeElement.nodeName===`TABLE`,this._dataDiffer=this._differs.find([]).create((t,i)=>this.trackBy?this.trackBy(i.dataIndex,i.data):i)}ngOnInit(){this._setupStickyStyler(),this._viewportRuler.change().pipe(Gh(this._onDestroy)).subscribe(()=>{this._forceRecalculateCellWidths=!0})}ngAfterContentInit(){this._viewRepeater=this.recycleRows||this._virtualScrollEnabled()?new de:new Ve,this._virtualScrollEnabled()&&this._setupVirtualScrolling(this._virtualScrollViewport),this._hasInitialized=!0}ngAfterContentChecked(){this._canRender()&&this._render()}ngOnDestroy(){this._stickyStyler?.destroy(),[this._rowOutlet?.viewContainer,this._headerRowOutlet?.viewContainer,this._footerRowOutlet?.viewContainer,this._cachedRenderRowsMap,this._customColumnDefs,this._customRowDefs,this._customHeaderRowDefs,this._customFooterRowDefs,this._columnDefsByName].forEach(e=>{e?.clear()}),this._headerRowDefs=[],this._footerRowDefs=[],this._defaultRowDef=null,this._headerRowStickyUpdates.complete(),this._footerRowStickyUpdates.complete(),this._onDestroy.next(),this._onDestroy.complete(),Je(this.dataSource)&&this.dataSource.disconnect(this)}renderRows(){this._renderRows=this._getAllRenderRows();let e=this._dataDiffer.diff(this._renderRows);if(!e){this._updateNoDataRow(),this.contentChanged.next();return}let t=this._rowOutlet.viewContainer;this._viewRepeater.applyChanges(e,t,(i,a,r)=>this._getEmbeddedViewArgs(i.item,r),i=>i.item.data,i=>{i.operation===W.INSERTED&&i.context&&this._renderCellTemplateForItem(i.record.item.rowDef,i.context)}),this._updateRowIndexContext(),e.forEachIdentityChange(i=>{let a=t.get(i.currentIndex);a.context.$implicit=i.item.data}),this._updateNoDataRow(),this.contentChanged.next(),this.updateStickyColumnStyles()}addColumnDef(e){this._customColumnDefs.add(e)}removeColumnDef(e){this._customColumnDefs.delete(e)}addRowDef(e){this._customRowDefs.add(e)}removeRowDef(e){this._customRowDefs.delete(e)}addHeaderRowDef(e){this._customHeaderRowDefs.add(e),this._headerRowDefChanged=!0}removeHeaderRowDef(e){this._customHeaderRowDefs.delete(e),this._headerRowDefChanged=!0}addFooterRowDef(e){this._customFooterRowDefs.add(e),this._footerRowDefChanged=!0}removeFooterRowDef(e){this._customFooterRowDefs.delete(e),this._footerRowDefChanged=!0}setNoDataRow(e){this._customNoDataRow=e}updateStickyHeaderRowStyles(){let e=this._getRenderedRows(this._headerRowOutlet);if(this._isNativeHtmlTable){let i=_i(this._headerRowOutlet,`thead`);i&&(i.style.display=e.length?``:`none`)}let t=this._headerRowDefs.map(i=>i.sticky);this._stickyStyler.clearStickyPositioning(e,[`top`]),this._stickyStyler.stickRows(e,t,`top`),this._headerRowDefs.forEach(i=>i.resetStickyChanged())}updateStickyFooterRowStyles(){let e=this._getRenderedRows(this._footerRowOutlet);if(this._isNativeHtmlTable){let i=_i(this._footerRowOutlet,`tfoot`);i&&(i.style.display=e.length?``:`none`)}let t=this._footerRowDefs.map(i=>i.sticky);this._stickyStyler.clearStickyPositioning(e,[`bottom`]),this._stickyStyler.stickRows(e,t,`bottom`),this._stickyStyler.updateStickyFooterContainer(this._elementRef.nativeElement,t),this._footerRowDefs.forEach(i=>i.resetStickyChanged())}updateStickyColumnStyles(){let e=this._getRenderedRows(this._headerRowOutlet),t=this._getRenderedRows(this._rowOutlet),i=this._getRenderedRows(this._footerRowOutlet);(this._isNativeHtmlTable&&!this.fixedLayout||this._stickyColumnStylesNeedReset)&&(this._stickyStyler.clearStickyPositioning([...e,...t,...i],[`left`,`right`]),this._stickyColumnStylesNeedReset=!1),e.forEach((a,r)=>{this._addStickyColumnStyles([a],this._headerRowDefs[r])}),this._rowDefs.forEach(a=>{let r=[];for(let l=0;l<t.length;l++)this._renderRows[l].rowDef===a&&r.push(t[l]);this._addStickyColumnStyles(r,a)}),i.forEach((a,r)=>{this._addStickyColumnStyles([a],this._footerRowDefs[r])}),Array.from(this._columnDefsByName.values()).forEach(a=>a.resetStickyChanged())}stickyColumnsUpdated(e){this._positionListener?.stickyColumnsUpdated(e)}stickyEndColumnsUpdated(e){this._positionListener?.stickyEndColumnsUpdated(e)}stickyHeaderRowsUpdated(e){this._headerRowStickyUpdates.next(e),this._positionListener?.stickyHeaderRowsUpdated(e)}stickyFooterRowsUpdated(e){this._footerRowStickyUpdates.next(e),this._positionListener?.stickyFooterRowsUpdated(e)}_outletAssigned(){!this._hasAllOutlets&&this._rowOutlet&&this._headerRowOutlet&&this._footerRowOutlet&&this._noDataRowOutlet&&(this._hasAllOutlets=!0,this._canRender()&&this._render())}_canRender(){return this._hasAllOutlets&&this._hasInitialized}_render(){this._cacheRowDefs(),this._cacheColumnDefs(),!this._headerRowDefs.length&&!this._footerRowDefs.length&&this._rowDefs.length;let t=this._renderUpdatedColumns()||this._headerRowDefChanged||this._footerRowDefChanged;this._stickyColumnStylesNeedReset=this._stickyColumnStylesNeedReset||t,this._forceRecalculateCellWidths=t,this._headerRowDefChanged&&(this._forceRenderHeaderRows(),this._headerRowDefChanged=!1),this._footerRowDefChanged&&(this._forceRenderFooterRows(),this._footerRowDefChanged=!1),this.dataSource&&this._rowDefs.length>0&&!this._renderChangeSubscription?this._observeRenderChanges():this._stickyColumnStylesNeedReset&&this.updateStickyColumnStyles(),this._checkStickyStates()}_getAllRenderRows(){if(!Array.isArray(this._data)||!this._renderedRange)return[];let e=[],t=Math.min(this._data.length,this._renderedRange.end),i=this._cachedRenderRowsMap;this._cachedRenderRowsMap=new Map;for(let a=this._renderedRange.start;a<t;a++){let r=this._data[a],l=this._getRenderRowsForData(r,a,i.get(r));this._cachedRenderRowsMap.has(r)||this._cachedRenderRowsMap.set(r,new WeakMap);for(let c=0;c<l.length;c++){let h=l[c],g=this._cachedRenderRowsMap.get(h.data);g.has(h.rowDef)?g.get(h.rowDef).push(h):g.set(h.rowDef,[h]),e.push(h)}}return e}_getRenderRowsForData(e,t,i){return this._getRowDefs(e,t).map(r=>{let l=i&&i.has(r)?i.get(r):[];if(l.length){let c=l.shift();return c.dataIndex=t,c}else return{data:e,rowDef:r,dataIndex:t}})}_cacheColumnDefs(){this._columnDefsByName.clear(),He(this._getOwnDefs(this._contentColumnDefs),this._customColumnDefs).forEach(t=>{this._columnDefsByName.has(t.name),this._columnDefsByName.set(t.name,t)})}_cacheRowDefs(){this._headerRowDefs=He(this._getOwnDefs(this._contentHeaderRowDefs),this._customHeaderRowDefs),this._footerRowDefs=He(this._getOwnDefs(this._contentFooterRowDefs),this._customFooterRowDefs),this._rowDefs=He(this._getOwnDefs(this._contentRowDefs),this._customRowDefs);let e=this._rowDefs.filter(t=>!t.when);this._defaultRowDef=e[0]}_renderUpdatedColumns(){let e=(r,l)=>{let c=!!l.getColumnsDiff();return r||c},t=this._rowDefs.reduce(e,!1);t&&this._forceRenderDataRows();let i=this._headerRowDefs.reduce(e,!1);i&&this._forceRenderHeaderRows();let a=this._footerRowDefs.reduce(e,!1);return a&&this._forceRenderFooterRows(),t||i||a}_switchDataSource(e){this._data=[],Je(this.dataSource)&&this.dataSource.disconnect(this),this._renderChangeSubscription&&(this._renderChangeSubscription.unsubscribe(),this._renderChangeSubscription=null),e||(this._dataDiffer&&this._dataDiffer.diff([]),this._rowOutlet&&this._rowOutlet.viewContainer.clear()),this._dataSource=e}_observeRenderChanges(){if(!this.dataSource)return;let e;Je(this.dataSource)?e=this.dataSource.connect(this):eg(this.dataSource)?e=this.dataSource:Array.isArray(this.dataSource)&&(e=Jh(this.dataSource)),this._renderChangeSubscription=ug([e,this.viewChange]).pipe(Gh(this._onDestroy)).subscribe(([t,i])=>{this._data=t||[],this._renderedRange=i,this._dataStream.next(t),this.renderRows()})}_forceRenderHeaderRows(){this._headerRowOutlet.viewContainer.length>0&&this._headerRowOutlet.viewContainer.clear(),this._headerRowDefs.forEach((e,t)=>this._renderRow(this._headerRowOutlet,e,t)),this.updateStickyHeaderRowStyles()}_forceRenderFooterRows(){this._footerRowOutlet.viewContainer.length>0&&this._footerRowOutlet.viewContainer.clear(),this._footerRowDefs.forEach((e,t)=>this._renderRow(this._footerRowOutlet,e,t)),this.updateStickyFooterRowStyles()}_addStickyColumnStyles(e,t){let i=Array.from(t?.columns||[]).map(l=>{let c=this._columnDefsByName.get(l);if(!c)throw gi(l);return c}),a=i.map(l=>l.sticky),r=i.map(l=>l.stickyEnd);this._stickyStyler.updateStickyColumns(e,a,r,!this.fixedLayout||this._forceRecalculateCellWidths)}_getRenderedRows(e){let t=[];for(let i=0;i<e.viewContainer.length;i++){let a=e.viewContainer.get(i);t.push(a.rootNodes[0])}return t}_getRowDefs(e,t){if(this._rowDefs.length===1)return[this._rowDefs[0]];let i=[];if(this.multiTemplateDataRows)i=this._rowDefs.filter(a=>!a.when||a.when(t,e));else{let a=this._rowDefs.find(r=>r.when&&r.when(t,e))||this._defaultRowDef;a&&i.push(a)}return i.length,i}_getEmbeddedViewArgs(e,t){let i=e.rowDef,a={$implicit:e.data};return{templateRef:i.template,context:a,index:t}}_renderRow(e,t,i,a={}){let r=e.viewContainer.createEmbeddedView(t.template,a,i);return this._renderCellTemplateForItem(t,a),r}_renderCellTemplateForItem(e,t){for(let i of this._getCellTemplates(e))se.mostRecentCellOutlet&&se.mostRecentCellOutlet._viewContainer.createEmbeddedView(i,t);this._changeDetectorRef.markForCheck()}_updateRowIndexContext(){let e=this._rowOutlet.viewContainer;for(let t=0,i=e.length;t<i;t++){let r=e.get(t).context;r.count=i,r.first=t===0,r.last=t===i-1,r.even=t%2===0,r.odd=!r.even,this.multiTemplateDataRows?(r.dataIndex=this._renderRows[t].dataIndex,r.renderIndex=t):r.index=this._renderRows[t].dataIndex}}_getCellTemplates(e){return!e||!e.columns?[]:Array.from(e.columns,t=>{let i=this._columnDefsByName.get(t);if(!i)throw gi(t);return e.extractCellTemplate(i)})}_forceRenderDataRows(){this._dataDiffer.diff([]),this._rowOutlet.viewContainer.clear(),this.renderRows()}_checkStickyStates(){let e=(t,i)=>t||i.hasStickyChanged();this._headerRowDefs.reduce(e,!1)&&this.updateStickyHeaderRowStyles(),this._footerRowDefs.reduce(e,!1)&&this.updateStickyFooterRowStyles(),Array.from(this._columnDefsByName.values()).reduce(e,!1)&&(this._stickyColumnStylesNeedReset=!0,this.updateStickyColumnStyles())}_setupStickyStyler(){let e=this._dir?this._dir.value:`ltr`,t=this._injector;this._stickyStyler=new tt(this._isNativeHtmlTable,this.stickyCssClass,this._platform.isBrowser,this.needsPositionStickyOnElement,e,this,t),(this._dir?this._dir.change:Jh()).pipe(Gh(this._onDestroy)).subscribe(i=>{this._stickyStyler.direction=i,this.updateStickyColumnStyles()})}_setupVirtualScrolling(e){let t=typeof requestAnimationFrame<`u`?Kh:Yh;this.viewChange.next({start:0,end:0}),e.renderedRangeStream.pipe(Dg(0,t),Gh(this._onDestroy)).subscribe(this.viewChange),e.attach({dataStream:this._dataStream,measureRangeSize:(i,a)=>this._measureRangeSize(i,a)}),ug([e.renderedContentOffset,this._headerRowStickyUpdates]).pipe(Gh(this._onDestroy)).subscribe(([i,a])=>{if(!(!a.sizes||!a.offsets||!a.elements))for(let r=0;r<a.elements.length;r++){let l=a.elements[r];if(l){let c=a.offsets[r],h=i!==0?Math.max(i-c,c):-c;for(let g of l)g.style.top=`${-h}px`}}}),ug([e.renderedContentOffset,this._footerRowStickyUpdates]).pipe(Gh(this._onDestroy)).subscribe(([i,a])=>{if(!(!a.sizes||!a.offsets||!a.elements))for(let r=0;r<a.elements.length;r++){let l=a.elements[r];if(l)for(let c of l)c.style.bottom=`${i+a.offsets[r]}px`}})}_getOwnDefs(e){return e.filter(t=>!t._table||t._table===this)}_updateNoDataRow(){let e=this._customNoDataRow||this._noDataRow;if(!e)return;let t=this._rowOutlet.viewContainer.length===0;if(t===this._isShowingNoDataRow)return;let i=this._noDataRowOutlet.viewContainer;if(t){let a=i.createEmbeddedView(e.templateRef),r=a.rootNodes[0];if(a.rootNodes.length===1&&r?.nodeType===this._document.ELEMENT_NODE){r.setAttribute(`role`,`row`),r.classList.add(...e._contentClassNames);let l=r.querySelectorAll(e._cellSelector);for(let c=0;c<l.length;c++)l[c].classList.add(...e._cellClassNames)}}else i.clear();this._isShowingNoDataRow=t,this._changeDetectorRef.markForCheck()}_measureRangeSize(e,t){if(e.start>=e.end||t!==`vertical`)return 0;let i=this.viewChange.value,a=this._rowOutlet.viewContainer;e.start<i.start||(e.end,i.end);let r=e.start-i.start,l=e.end-e.start,c,h;for(let x=0;x<l;x++){let R=a.get(x+r);if(R&&R.rootNodes.length){c=h=R.rootNodes[0];break}}for(let x=l-1;x>-1;x--){let R=a.get(x+r);if(R&&R.rootNodes.length){h=R.rootNodes[R.rootNodes.length-1];break}}let g=c?.getBoundingClientRect?.(),_=h?.getBoundingClientRect?.();return g&&_?_.bottom-g.top:0}_virtualScrollEnabled(){return!this._disableVirtualScrolling&&this._virtualScrollViewport!=null}static ɵfac=function(t){return new(t||n)};static ɵcmp=_E({type:n,selectors:[[`cdk-table`],[`table`,`cdk-table`,``]],contentQueries:function(t,i,a){if(t&1&&Gp(a,Ke,5)(a,ne,5)(a,Qe,5)(a,Re,5)(a,nt,5),t&2){let r;vD(r=ID())&&(i._noDataRow=r.first),vD(r=ID())&&(i._contentColumnDefs=r),vD(r=ID())&&(i._contentRowDefs=r),vD(r=ID())&&(i._contentHeaderRowDefs=r),vD(r=ID())&&(i._contentFooterRowDefs=r)}},hostAttrs:[1,`cdk-table`],hostVars:2,hostBindings:function(t,i){t&2&&Xp(`cdk-table-fixed-layout`,i.fixedLayout)},inputs:{trackBy:`trackBy`,dataSource:`dataSource`,multiTemplateDataRows:[2,`multiTemplateDataRows`,`multiTemplateDataRows`,P0],fixedLayout:[2,`fixedLayout`,`fixedLayout`,P0],recycleRows:[2,`recycleRows`,`recycleRows`,P0]},outputs:{contentChanged:`contentChanged`},exportAs:[`cdkTable`],features:[tw([{provide:K,useExisting:n},{provide:xe,useValue:null}])],ngContentSelectors:Pi,decls:5,vars:2,consts:[[`role`,`rowgroup`],[`headerRowOutlet`,``],[`rowOutlet`,``],[`noDataRowOutlet`,``],[`footerRowOutlet`,``]],template:function(t,i){t&1&&(gD(Ai),mD(0),mD(1,1),ZE(2,zi,1,0),ZE(3,Bi,7,0)(4,Li,4,0)),t&2&&(Qv(2),YE(i._isServer?2:-1),Qv(),YE(i._isNativeHtmlTable?3:4))},dependencies:[st,rt,ct,lt],styles:[`.cdk-table-fixed-layout {
  table-layout: fixed;
}
`],encapsulation:2,changeDetection:1})}return n})();function He(n,o){return n.concat(Array.from(o))}function _i(n,o){let e=o.toUpperCase(),t=n.viewContainer.element.nativeElement;for(;t;){let i=t.nodeType===1?t.nodeName:null;if(i===e)return t;if(i===`TABLE`)break;t=t.parentNode}return null}var wi=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=NE({type:n});static ɵinj=eu({imports:[It]})}return n})();var Me=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new Z;bulk={select:o=>this._select(o),deselect:o=>this._deselect(o),setSelection:o=>this._setSelection(o)};constructor(o=!1,e,t=!0,i){this._multiple=o,this._emitChanges=t,this.compareWith=i,e&&e.length&&(o?e.forEach(a=>this._markSelected(a)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...o){return this._select(o)}deselect(...o){return this._deselect(o)}setSelection(...o){return this._setSelection(o)}toggle(o){return this.isSelected(o)?this.deselect(o):this.select(o)}clear(o=!0){this._unmarkAll();let e=this._hasQueuedChanges();return o&&this._emitChangeEvent(),e}isSelected(o){return this._selection.has(this._getConcreteValue(o))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(o){this._multiple&&this.selected&&this._selected.sort(o)}isMultipleSelection(){return this._multiple}_select(o){this._verifyValueAssignment(o),o.forEach(t=>this._markSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}_deselect(o){this._verifyValueAssignment(o),o.forEach(t=>this._unmarkSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}_setSelection(o){this._verifyValueAssignment(o);let e=this.selected,t=new Set(o.map(a=>this._getConcreteValue(a)));o.forEach(a=>this._markSelected(a)),e.filter(a=>!t.has(this._getConcreteValue(a,t))).forEach(a=>this._unmarkSelected(a));let i=this._hasQueuedChanges();return this._emitChangeEvent(),i}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(o){o=this._getConcreteValue(o),this.isSelected(o)||(this._multiple||this._unmarkAll(),this.isSelected(o)||this._selection.add(o),this._emitChanges&&this._selectedToEmit.push(o))}_unmarkSelected(o){o=this._getConcreteValue(o),this.isSelected(o)&&(this._selection.delete(o),this._emitChanges&&this._deselectedToEmit.push(o))}_unmarkAll(){this.isEmpty()||this._selection.forEach(o=>this._unmarkSelected(o))}_verifyValueAssignment(o){o.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(o,e){if(this.compareWith){e=e??this._selection;for(let t of e)if(this.compareWith(o,t))return t;return o}else return o}};var Hi=[[[`caption`]],[[`colgroup`],[`col`]],`*`];var ji=[`caption`,`colgroup, col`,`*`];function Wi(n,o){n&1&&mD(0,2)}function Ui(n,o){n&1&&(Ei(0,`thead`,0),Hp(1,1),$c(),Ei(2,`tbody`,2),Hp(3,3)(4,4),$c(),Ei(5,`tfoot`,0),Hp(6,5),$c())}function Qi(n,o){n&1&&Hp(0,1)(1,3)(2,4)(3,5)}var So=(()=>{class n extends dt{stickyCssClass=`mat-mdc-table-sticky`;needsPositionStickyOnElement=!1;static ɵfac=(()=>{let e;return function(i){return(e||(e=cy(n)))(i||n)}})();static ɵcmp=_E({type:n,selectors:[[`mat-table`],[`table`,`mat-table`,``]],hostAttrs:[1,`mat-mdc-table`,`mdc-data-table__table`],hostVars:2,hostBindings:function(t,i){t&2&&Xp(`mat-table-fixed-layout`,i.fixedLayout)},exportAs:[`matTable`],features:[tw([{provide:dt,useExisting:n},{provide:K,useExisting:n},{provide:xe,useValue:null}]),Mp],ngContentSelectors:ji,decls:5,vars:2,consts:[[`role`,`rowgroup`],[`headerRowOutlet`,``],[`role`,`rowgroup`,1,`mdc-data-table__content`],[`rowOutlet`,``],[`noDataRowOutlet`,``],[`footerRowOutlet`,``]],template:function(t,i){t&1&&(gD(Hi),mD(0),mD(1,1),ZE(2,Wi,1,0),ZE(3,Ui,7,0)(4,Qi,4,0)),t&2&&(Qv(2),YE(i._isServer?2:-1),Qv(),YE(i._isNativeHtmlTable?3:4))},dependencies:[st,rt,ct,lt],styles:[`.mat-mdc-table-sticky {
  position: sticky !important;
}

mat-table {
  display: block;
}

mat-header-row {
  min-height: var(--%NS%mat-table-header-container-height, 56px);
}

mat-row {
  min-height: var(--%NS%mat-table-row-item-container-height, 52px);
}

mat-footer-row {
  min-height: var(--%NS%mat-table-footer-container-height, 52px);
}

mat-row, mat-header-row, mat-footer-row {
  display: flex;
  border-width: 0;
  border-bottom-width: 1px;
  border-style: solid;
  align-items: center;
  box-sizing: border-box;
}

mat-cell:first-of-type, mat-header-cell:first-of-type, mat-footer-cell:first-of-type {
  padding-left: 24px;
}
[dir=rtl] mat-cell:first-of-type:not(:only-of-type), [dir=rtl] mat-header-cell:first-of-type:not(:only-of-type), [dir=rtl] mat-footer-cell:first-of-type:not(:only-of-type) {
  padding-left: 0;
  padding-right: 24px;
}
mat-cell:last-of-type, mat-header-cell:last-of-type, mat-footer-cell:last-of-type {
  padding-right: 24px;
}
[dir=rtl] mat-cell:last-of-type:not(:only-of-type), [dir=rtl] mat-header-cell:last-of-type:not(:only-of-type), [dir=rtl] mat-footer-cell:last-of-type:not(:only-of-type) {
  padding-right: 0;
  padding-left: 24px;
}

mat-cell, mat-header-cell, mat-footer-cell {
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  word-wrap: break-word;
  min-height: inherit;
}

.mat-mdc-table {
  min-width: 100%;
  border: 0;
  border-spacing: 0;
  table-layout: auto;
  white-space: normal;
  background-color: var(--%NS%mat-table-background-color, var(--%NS%mat-sys-surface));
}

.mat-table-fixed-layout {
  table-layout: fixed;
}

.mdc-data-table__cell {
  box-sizing: border-box;
  overflow: hidden;
  text-align: start;
  text-overflow: ellipsis;
}

.mdc-data-table__cell,
.mdc-data-table__header-cell {
  padding: 0 16px;
}

.mat-mdc-header-row {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  height: var(--%NS%mat-table-header-container-height, 56px);
  color: var(--%NS%mat-table-header-headline-color, var(--%NS%mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--%NS%mat-table-header-headline-font, var(--%NS%mat-sys-title-small-font, Roboto, sans-serif));
  line-height: var(--%NS%mat-table-header-headline-line-height, var(--%NS%mat-sys-title-small-line-height));
  font-size: var(--%NS%mat-table-header-headline-size, var(--%NS%mat-sys-title-small-size, 14px));
  font-weight: var(--%NS%mat-table-header-headline-weight, var(--%NS%mat-sys-title-small-weight, 500));
}

.mat-mdc-row {
  height: var(--%NS%mat-table-row-item-container-height, 52px);
  color: var(--%NS%mat-table-row-item-label-text-color, var(--%NS%mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
}

.mat-mdc-row,
.mdc-data-table__content {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--%NS%mat-table-row-item-label-text-font, var(--%NS%mat-sys-body-medium-font, Roboto, sans-serif));
  line-height: var(--%NS%mat-table-row-item-label-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-table-row-item-label-text-size, var(--%NS%mat-sys-body-medium-size, 14px));
  font-weight: var(--%NS%mat-table-row-item-label-text-weight, var(--%NS%mat-sys-body-medium-weight));
}

.mat-mdc-footer-row {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  height: var(--%NS%mat-table-footer-container-height, 52px);
  color: var(--%NS%mat-table-row-item-label-text-color, var(--%NS%mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--%NS%mat-table-footer-supporting-text-font, var(--%NS%mat-sys-body-medium-font, Roboto, sans-serif));
  line-height: var(--%NS%mat-table-footer-supporting-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-table-footer-supporting-text-size, var(--%NS%mat-sys-body-medium-size, 14px));
  font-weight: var(--%NS%mat-table-footer-supporting-text-weight, var(--%NS%mat-sys-body-medium-weight));
  letter-spacing: var(--%NS%mat-table-footer-supporting-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
}

.mat-mdc-header-cell {
  border-bottom-color: var(--%NS%mat-table-row-item-outline-color, var(--%NS%mat-sys-outline, rgba(0, 0, 0, 0.12)));
  border-bottom-width: var(--%NS%mat-table-row-item-outline-width, 1px);
  border-bottom-style: solid;
  letter-spacing: var(--%NS%mat-table-header-headline-tracking, var(--%NS%mat-sys-title-small-tracking));
  font-weight: inherit;
  line-height: inherit;
  box-sizing: border-box;
  text-overflow: ellipsis;
  overflow: hidden;
  outline: none;
  text-align: start;
}
.mdc-data-table__row:last-child > .mat-mdc-header-cell {
  border-bottom: none;
}

.mat-mdc-cell {
  border-bottom-color: var(--%NS%mat-table-row-item-outline-color, var(--%NS%mat-sys-outline, rgba(0, 0, 0, 0.12)));
  border-bottom-width: var(--%NS%mat-table-row-item-outline-width, 1px);
  border-bottom-style: solid;
  letter-spacing: var(--%NS%mat-table-row-item-label-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
  line-height: inherit;
}
.mdc-data-table__row:last-child > .mat-mdc-cell {
  border-bottom: none;
}

.mat-mdc-footer-cell {
  letter-spacing: var(--%NS%mat-table-row-item-label-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
}

mat-row.mat-mdc-row,
mat-header-row.mat-mdc-header-row,
mat-footer-row.mat-mdc-footer-row {
  border-bottom: none;
}

.mat-mdc-table tbody,
.mat-mdc-table tfoot,
.mat-mdc-table thead,
.mat-mdc-cell,
.mat-mdc-footer-cell,
.mat-mdc-header-row,
.mat-mdc-row,
.mat-mdc-footer-row,
.mat-mdc-table .mat-mdc-header-cell {
  background: inherit;
}

.mat-mdc-table mat-header-row.mat-mdc-header-row,
.mat-mdc-table mat-row.mat-mdc-row,
.mat-mdc-table mat-footer-row.mat-mdc-footer-cell {
  height: unset;
}

mat-header-cell.mat-mdc-header-cell,
mat-cell.mat-mdc-cell,
mat-footer-cell.mat-mdc-footer-cell {
  align-self: stretch;
}
`],encapsulation:2,changeDetection:1})}return n})();var Do=(()=>{class n extends We{static ɵfac=(()=>{let e;return function(i){return(e||(e=cy(n)))(i||n)}})();static ɵdir=AE({type:n,selectors:[[``,`matCellDef`,``]],features:[tw([{provide:We,useExisting:n}]),Mp]})}return n})();var ko=(()=>{class n extends Ue{static ɵfac=(()=>{let e;return function(i){return(e||(e=cy(n)))(i||n)}})();static ɵdir=AE({type:n,selectors:[[``,`matHeaderCellDef`,``]],features:[tw([{provide:Ue,useExisting:n}]),Mp]})}return n})();var xo=(()=>{class n extends ne{get name(){return this._name}set name(e){this._setNameInput(e)}_updateColumnCssClassName(){super._updateColumnCssClassName(),this._columnCssClassName.push(`mat-column-${this.cssClassFriendlyName}`)}static ɵfac=(()=>{let e;return function(i){return(e||(e=cy(n)))(i||n)}})();static ɵdir=AE({type:n,selectors:[[``,`matColumnDef`,``]],inputs:{name:[0,`matColumnDef`,`name`]},features:[tw([{provide:ne,useExisting:n}]),Mp]})}return n})();var Ro=(()=>{class n extends bi{static ɵfac=(()=>{let e;return function(i){return(e||(e=cy(n)))(i||n)}})();static ɵdir=AE({type:n,selectors:[[`mat-header-cell`],[`th`,`mat-header-cell`,``]],hostAttrs:[`role`,`columnheader`,1,`mat-mdc-header-cell`,`mdc-data-table__header-cell`],features:[Mp]})}return n})();var Mo=(()=>{class n extends vi{static ɵfac=(()=>{let e;return function(i){return(e||(e=cy(n)))(i||n)}})();static ɵdir=AE({type:n,selectors:[[`mat-cell`],[`td`,`mat-cell`,``]],hostAttrs:[1,`mat-mdc-cell`,`mdc-data-table__cell`],features:[Mp]})}return n})();var Oo=(()=>{class n extends Re{static ɵfac=(()=>{let e;return function(i){return(e||(e=cy(n)))(i||n)}})();static ɵdir=AE({type:n,selectors:[[``,`matHeaderRowDef`,``]],inputs:{columns:[0,`matHeaderRowDef`,`columns`],sticky:[2,`matHeaderRowDefSticky`,`sticky`,P0]},features:[tw([{provide:Re,useExisting:n}]),Mp]})}return n})();var No=(()=>{class n extends Qe{static ɵfac=(()=>{let e;return function(i){return(e||(e=cy(n)))(i||n)}})();static ɵdir=AE({type:n,selectors:[[``,`matRowDef`,``]],inputs:{columns:[0,`matRowDefColumns`,`columns`],when:[0,`matRowDefWhen`,`when`]},features:[tw([{provide:Qe,useExisting:n}]),Mp]})}return n})();var To=(()=>{class n extends ot{static ɵfac=(()=>{let e;return function(i){return(e||(e=cy(n)))(i||n)}})();static ɵcmp=_E({type:n,selectors:[[`mat-header-row`],[`tr`,`mat-header-row`,``]],hostAttrs:[`role`,`row`,1,`mat-mdc-header-row`,`mdc-data-table__header-row`],exportAs:[`matHeaderRow`],features:[tw([{provide:ot,useExisting:n}]),Mp],decls:1,vars:0,consts:[[`cdkCellOutlet`,``]],template:function(t,i){t&1&&Hp(0,0)},dependencies:[se],encapsulation:2,changeDetection:1})}return n})();var Eo=(()=>{class n extends at{static ɵfac=(()=>{let e;return function(i){return(e||(e=cy(n)))(i||n)}})();static ɵcmp=_E({type:n,selectors:[[`mat-row`],[`tr`,`mat-row`,``]],hostAttrs:[`role`,`row`,1,`mat-mdc-row`,`mdc-data-table__row`],exportAs:[`matRow`],features:[tw([{provide:at,useExisting:n}]),Mp],decls:1,vars:0,consts:[[`cdkCellOutlet`,``]],template:function(t,i){t&1&&Hp(0,0)},dependencies:[se],encapsulation:2,changeDetection:1})}return n})();var Io=(()=>{class n extends Ke{_cellSelector=`td, mat-cell, [mat-cell], .mat-cell`;constructor(){super(),this._contentClassNames.push(`mat-mdc-no-data-row`,`mat-mdc-row`,`mdc-data-table__row`),this._cellClassNames.push(`mat-mdc-cell`,`mdc-data-table__cell`,`mat-no-data-cell`)}static ɵfac=function(t){return new(t||n)};static ɵdir=AE({type:n,selectors:[[`ng-template`,`matNoDataRow`,``]],features:[tw([{provide:Ke,useExisting:n}]),Mp]})}return n})();var Fo=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=NE({type:n});static ɵinj=eu({imports:[wi,et]})}return n})();var Ki=9007199254740991;var Ci=class extends ce{_data;_renderData=new Pn([]);_filter=new Pn(``);_internalPageChanges=new Z;_renderChangesSubscription=null;filteredData;get data(){return this._data.value}set data(o){o=Array.isArray(o)?o:[],this._data.next(o),this._renderChangesSubscription||this._filterData(o)}get filter(){return this._filter.value}set filter(o){this._filter.next(o),this._renderChangesSubscription||this._filterData(this.data)}get sort(){return this._sort}set sort(o){this._sort=o,this._updateChangeSubscription()}_sort;get paginator(){return this._paginator}set paginator(o){this._paginator=o,this._updateChangeSubscription()}_paginator;sortingDataAccessor=(o,e)=>{let t=o[e];if(Ue$2(t)){let i=Number(t);return i<Ki?i:t}return t};sortData=(o,e)=>{let t=e.active,i=e.direction;return!t||i==``?o:o.sort((a,r)=>{let l=this.sortingDataAccessor(a,t),c=this.sortingDataAccessor(r,t),h=typeof l,g=typeof c;h!==g&&(h===`number`&&(l+=``),g===`number`&&(c+=``));let _=0;return l!=null&&c!=null?l>c?_=1:l<c&&(_=-1):l!=null?_=1:c!=null&&(_=-1),_*(i==`asc`?1:-1)})};filterPredicate=(o,e)=>{let t=e.trim().toLowerCase();return Object.values(o).some(i=>`${i}`.toLowerCase().includes(t))};constructor(o=[]){super(),this._data=new Pn(o),this._updateChangeSubscription()}_updateChangeSubscription(){let o=this._sort?Eg(this._sort.sortChange,this._sort.initialized):Jh(null),e=this._paginator?Eg(this._paginator.page,this._internalPageChanges,this._paginator.initialized):Jh(null),t=this._data,r=ug([ug([ug([t,this._filter]).pipe(Me$1(([l])=>this._filterData(l))),o]).pipe(Me$1(([l])=>this._orderData(l))),e]).pipe(Me$1(([l])=>this._pageData(l)));this._renderChangesSubscription?.unsubscribe(),this._renderChangesSubscription=r.subscribe(l=>this._renderData.next(l))}_filterData(o){return this.filteredData=this.filter==null||this.filter===``?o:o.filter(e=>this.filterPredicate(e,this.filter)),this.paginator&&this._updatePaginator(this.filteredData.length),this.filteredData}_orderData(o){return this.sort?this.sortData(o.slice(),this.sort):o}_pageData(o){if(!this.paginator)return o;let e=this.paginator.pageIndex*this.paginator.pageSize;return o.slice(e,e+this.paginator.pageSize)}_updatePaginator(o){Promise.resolve().then(()=>{let e=this.paginator;if(e&&(e.length=o,e.pageIndex>0)){let t=Math.ceil(e.length/e.pageSize)-1||0,i=Math.min(e.pageIndex,t);i!==e.pageIndex&&(e.pageIndex=i,this._internalPageChanges.next())}})}connect(){return this._renderChangesSubscription||this._updateChangeSubscription(),this._renderData}disconnect(){this._renderChangesSubscription?.unsubscribe(),this._renderChangesSubscription=null}};var Si=(()=>{class n{_animationsDisabled=tt$1();state=`unchecked`;disabled=!1;appearance=`full`;static ɵfac=function(t){return new(t||n)};static ɵcmp=_E({type:n,selectors:[[`mat-pseudo-checkbox`]],hostAttrs:[1,`mat-pseudo-checkbox`],hostVars:12,hostBindings:function(t,i){t&2&&Xp(`mat-pseudo-checkbox-indeterminate`,i.state===`indeterminate`)(`mat-pseudo-checkbox-checked`,i.state===`checked`)(`mat-pseudo-checkbox-disabled`,i.disabled)(`mat-pseudo-checkbox-minimal`,i.appearance===`minimal`)(`mat-pseudo-checkbox-full`,i.appearance===`full`)(`_mat-animation-noopable`,i._animationsDisabled)},inputs:{state:`state`,disabled:`disabled`,appearance:`appearance`},decls:0,vars:0,template:function(t,i){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--%NS%mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--%NS%mat-pseudo-checkbox-full-unselected-icon-color, var(--%NS%mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--%NS%mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--%NS%mat-pseudo-checkbox-full-selected-icon-color, var(--%NS%mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-full-selected-checkmark-color, var(--%NS%mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--%NS%mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2})}return n})();var qi=[`text`];var Gi=[[[`mat-icon`]],`*`];var $i=[`mat-icon`,`*`];function Yi(n,o){if(n&1&&Fp(0,`mat-pseudo-checkbox`,1),n&2){let e=pD();Pp(`disabled`,e.disabled)(`state`,e.selected?`checked`:`unchecked`)}}function Xi(n,o){if(n&1&&Fp(0,`mat-pseudo-checkbox`,3),n&2)Pp(`disabled`,pD().disabled)}function Zi(n,o){if(n&1&&(Ei(0,`span`,4),UD(1),$c()),n&2){let e=pD();Qv(),zc(`(`,e.group.label,`)`)}}var ht=new S(`MAT_OPTION_PARENT_COMPONENT`);var ut=new S(`MatOptgroup`);var mt=class{source;isUserInput;constructor(o,e=!1){this.source=o,this.isUserInput=e}};var be=(()=>{class n{_element=T(Mr);_changeDetectorRef=T(k0);_parent=T(ht,{optional:!0});group=T(ut,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue=``;get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=T(qt).getId(`mat-option-`);get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=Uo(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new Ue$1;_text;_stateChanges=new Z;constructor(){let e=T(R);e.load(hn$1),e.load(At),this._signalDisableRipple=!!this._parent&&Go(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||``).trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,t){let i=this._getHostElement();typeof i.focus==`function`&&i.focus(t)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!nn(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?`-1`:`0`}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new mt(this,e))}static ɵfac=function(t){return new(t||n)};static ɵcmp=_E({type:n,selectors:[[`mat-option`]],viewQuery:function(t,i){if(t&1&&zp(qi,7),t&2){let a;vD(a=ID())&&(i._text=a.first)}},hostAttrs:[`role`,`option`,1,`mat-mdc-option`,`mdc-list-item`],hostVars:11,hostBindings:function(t,i){t&1&&Up(`click`,function(){return i._selectViaInteraction()})(`keydown`,function(r){return i._handleKeydown(r)}),t&2&&(Bp(`id`,i.id),Lp(`aria-selected`,i.selected)(`aria-disabled`,i.disabled.toString()),Xp(`mdc-list-item--selected`,i.selected)(`mat-mdc-option-multiple`,i.multiple)(`mat-mdc-option-active`,i.active)(`mdc-list-item--disabled`,i.disabled))},inputs:{value:`value`,id:`id`,disabled:[2,`disabled`,`disabled`,P0]},outputs:{onSelectionChange:`onSelectionChange`},exportAs:[`matOption`],ngContentSelectors:$i,decls:8,vars:5,consts:[[`text`,``],[`aria-hidden`,`true`,1,`mat-mdc-option-pseudo-checkbox`,3,`disabled`,`state`],[1,`mdc-list-item__primary-text`],[`state`,`checked`,`aria-hidden`,`true`,`appearance`,`minimal`,1,`mat-mdc-option-pseudo-checkbox`,3,`disabled`],[1,`cdk-visually-hidden`],[`aria-hidden`,`true`,`mat-ripple`,``,1,`mat-mdc-option-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`]],template:function(t,i){t&1&&(gD(Gi),ZE(0,Yi,1,2,`mat-pseudo-checkbox`,1),mD(1),Ei(2,`span`,2,0),mD(4,1),$c(),ZE(5,Xi,1,1,`mat-pseudo-checkbox`,3),ZE(6,Zi,2,1,`span`,4),Fp(7,`div`,5)),t&2&&(YE(i.multiple?0:-1),Qv(5),YE(!i.multiple&&i.selected&&!i.hideSingleSelectionIndicator?5:-1),Qv(),YE(i.group&&i.group._inert?6:-1),Qv(),Pp(`matRippleTrigger`,i._getHostElement())(`matRippleDisabled`,i.disabled||i.disableRipple))},dependencies:[Si,tr],styles:[`.mat-mdc-option {
  -webkit-user-select: none;
  user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 48px;
  padding: 0 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: var(--%NS%mat-option-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-option-label-text-font, var(--%NS%mat-sys-label-large-font));
  line-height: var(--%NS%mat-option-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-size: var(--%NS%mat-option-label-text-size, var(--%NS%mat-sys-body-large-size));
  letter-spacing: var(--%NS%mat-option-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  font-weight: var(--%NS%mat-option-label-text-weight, var(--%NS%mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--%NS%mat-option-hover-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--%NS%mat-option-focus-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--%NS%selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--%NS%mat-option-selected-state-layer-color, var(--%NS%mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--%NS%selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--%NS%mat-option-selected-state-label-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--%NS%mat-option-selected-state-label-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-option.mdc-list-item {
  align-items: center;
  background: transparent;
}
.mat-mdc-option.mdc-list-item--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {
  opacity: 0.38;
}
.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 32px;
}
[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 16px;
  padding-right: 32px;
}
.mat-mdc-option .mat-icon,
.mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-icon,
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 0;
  margin-left: 16px;
}
.mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-left: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-right: 16px;
  margin-left: 0;
}
.mat-mdc-option .mat-mdc-option-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-family: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  margin-right: auto;
}
[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {
  margin-right: 0;
  margin-left: auto;
}
@media (forced-colors: active) {
  .mat-mdc-option.mdc-list-item--%NS%selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  [dir=rtl] .mat-mdc-option.mdc-list-item--%NS%selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --%NS%mat-list-list-item-selected-container-color: var(--%NS%mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2})}return n})();function Di(n,o,e){if(e.length){let t=o.toArray(),i=e.toArray(),a=0;for(let r=0;r<n+1;r++)t[r].group&&t[r].group===i[a]&&a++;return a}return 0}function ki(n,o,e,t){return n<e?n:n+o>e+t?Math.max(0,n-t+o):e}var xi=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=NE({type:n});static ɵinj=eu({imports:[et]})}return n})();var pt=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=NE({type:n});static ɵinj=eu({imports:[_n$1,xi,be,et]})}return n})();var on=[`trigger`];var an=[`panel`];var rn=[[[`mat-select-trigger`]],`*`];var sn=[`mat-select-trigger`,`*`];function ln(n,o){if(n&1&&(Ei(0,`span`,4),UD(1),$c()),n&2){let e=pD();Qv(),sh(e.placeholder)}}function cn(n,o){n&1&&mD(0)}function dn(n,o){if(n&1&&(Ei(0,`span`,11),UD(1),$c()),n&2){let e=pD(2);Qv(),sh(e.triggerValue)}}function mn(n,o){if(n&1&&(Ei(0,`span`,5),ZE(1,cn,1,0)(2,dn,2,1,`span`,11),$c()),n&2){let e=pD();Qv(),YE(e.customTrigger?1:2)}}function hn(n,o){if(n&1){let e=sD();Ei(0,`div`,12,1),Up(`keydown`,function(i){_u(e);return Mu(pD()._handleKeydown(i))}),mD(2,1),$c()}if(n&2){let e=pD();RD(e.panelClass),Xp(`mat-select-panel-animations-enabled`,!e._animationsDisabled)(`mat-primary`,e._parentFormField?.color===`primary`)(`mat-accent`,e._parentFormField?.color===`accent`)(`mat-warn`,e._parentFormField?.color===`warn`)(`mat-undefined`,!e._parentFormField?.color),Lp(`id`,e.id+`-panel`)(`aria-multiselectable`,e.multiple)(`aria-label`,e.ariaLabel||null)(`aria-labelledby`,e._getPanelAriaLabelledby())}}var un=new S(`mat-select-scroll-strategy`,{providedIn:`root`,factory:()=>{let n=T(Ee);return()=>q(n)}});var pn=new S(`MAT_SELECT_CONFIG`);var fn=new S(`MatSelectTrigger`);var ft=class{source;value;constructor(o,e){this.source=o,this.value=e}};var Oi=(()=>{class n{_viewportRuler=T(z);_changeDetectorRef=T(k0);_elementRef=T(Mr);_dir=T(bo,{optional:!0});_idGenerator=T(qt);_renderer=T(Ua);_parentFormField=T(yt,{optional:!0});ngControl=T(V,{self:!0,optional:!0});_liveAnnouncer=T(Gn);_defaultOptions=T(pn,{optional:!0});_animationsDisabled=tt$1();_popoverLocation;_initialized=new Z;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:`start`,originY:`bottom`,overlayX:`start`,overlayY:`top`},{originX:`end`,originY:`bottom`,overlayX:`end`,overlayY:`top`},{originX:`start`,originY:`top`,overlayX:`start`,overlayY:`bottom`,panelClass:`mat-mdc-select-panel-above`},{originX:`end`,originY:`top`,overlayX:`end`,overlayY:`bottom`,panelClass:`mat-mdc-select-panel-above`}];_scrollOptionIntoView(e){let t=this.options.toArray()[e];if(t){let i=this.panel.nativeElement,a=Di(e,this.options,this.optionGroups),r=t._getHostElement();e===0&&a===1?i.scrollTop=0:i.scrollTop=ki(r.offsetTop,r.offsetHeight,i.scrollTop,i.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new ft(this,e)}_scrollStrategyFactory=T(un);_panelOpen=!1;_compareWith=(e,t)=>e===t;_uid=this._idGenerator.getId(`mat-select-`);_triggerAriaLabelledBy=null;_previousControl;_destroy=new Z;_errorStateTracker;stateChanges=new Z;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId(`mat-select-value-`);_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||``;get focused(){return this._focused||this._panelOpen}_focused=!1;controlType=`mat-select`;trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=Uo(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(_e.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel=``;ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<`u`?this._defaultOptions.panelWidth:`auto`;canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=fg(()=>{let e=this.options;return e?e.changes.pipe(Og(e),Pl(()=>Eg(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(Pl(()=>this.optionSelectionChanges))});openedChange=new Ue$1;_openedStream=this.openedChange.pipe(Hn(e=>e),Me$1(()=>{}));_closedStream=this.openedChange.pipe(Hn(e=>!e),Me$1(()=>{}));selectionChange=new Ue$1;valueChange=new Ue$1;constructor(){let e=T(Yn),t=T(pt$1,{optional:!0}),i=T(gt,{optional:!0}),a=T(new wh(`tabindex`),{optional:!0}),r=T(Yt,{optional:!0}),l=T(Qn,{optional:!0,self:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new Qe$1(e,l||this.ngControl,i,t,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=a==null?0:parseInt(a)||0,this._popoverLocation=r?.usePopover===!1?null:`inline`,this.id=this.id}ngOnInit(){this._selectionModel=new Me(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(Gh(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(Gh(this._destroy)).subscribe(e=>{e.added.forEach(t=>t.select()),e.removed.forEach(t=>t.deselect())}),this.options.changes.pipe(Og(null),Gh(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),t=this.ngControl;if(e!==this._triggerAriaLabelledBy){let i=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?i.setAttribute(`aria-labelledby`,e):i.removeAttribute(`aria-labelledby`)}t&&(this._previousControl!==t.control&&(this._previousControl!==void 0&&t.disabled!==null&&t.disabled!==this.disabled&&(this.disabled=t.disabled),this._previousControl=t.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._panelOpen=!0,this._overlayDir.positionChange.pipe(an$1(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?`rtl`:`ltr`),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{t(),clearTimeout(i),this._cleanupDetach=void 0};let e=this.panel.nativeElement,t=this._renderer.listen(e,`animationend`,a=>{a.animationName===`_mat-select-exit`&&(this._cleanupDetach?.(),this._detachOverlay())}),i=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add(`mat-select-panel-exit`)}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return``;if(this._multiple){let e=this._selectionModel.selected.map(t=>t.viewValue);return this._isRtl()&&e.reverse(),e.join(`, `)}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value===`rtl`:!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let t=e.keyCode,i=t===40||t===38||t===37||t===39,a=t===13||t===32,r=this._keyManager;if(!r.isTyping()&&a&&!nn(e)||(this.multiple||e.altKey)&&i)e.preventDefault(),this.open();else if(!this.multiple){let l=this.selected;r.onKeydown(e);let c=this.selected;c&&l!==c&&this._liveAnnouncer.announce(c.viewValue,1e4)}}_handleOpenKeydown(e){let t=this._keyManager,i=e.keyCode,a=i===40||i===38,r=t.isTyping();if(a&&e.altKey)e.preventDefault(),this.close();else if(!r&&(i===13||i===32)&&t.activeItem&&!nn(e))e.preventDefault(),t.activeItem._selectViaInteraction();else if(!r&&this._multiple&&i===65&&e.ctrlKey){e.preventDefault();let l=this.options.some(c=>!c.disabled&&!c.selected);this.options.forEach(c=>{c.disabled||(l?c.select():c.deselect())})}else{let l=t.activeItemIndex;t.onKeydown(e),this._multiple&&a&&e.shiftKey&&t.activeItem&&t.activeItemIndex!==l&&t.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!nn(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(t=>t.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)e.forEach(t=>this._selectOptionByValue(t)),this._sortValues();else{let t=this._selectOptionByValue(e);t?this._keyManager.updateActiveItem(t):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let t=this.options.find(i=>{if(this._selectionModel.isSelected(i))return!1;try{return(i.value!=null||this.canSelectNullableOptions)&&this._compareWith(i.value,e)}catch{return!1}});return t&&this._selectionModel.select(t),t}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth===`auto`?(e instanceof Ft?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?``:this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new Gt(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?`rtl`:`ltr`).withHomeAndEnd().withPageUpDown().withAllowedModifierKeys([`shiftKey`]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=Eg(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(Gh(e)).subscribe(t=>{this._onSelect(t.source,t.isUserInput),t.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),Eg(...this.options.map(t=>t._stateChanges)).pipe(Gh(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,t){let i=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(i!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),t&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),t&&this.focus())),i!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((t,i)=>this.sortComparator?this.sortComparator(t,i,e):e.indexOf(t)-e.indexOf(i)),this.stateChanges.next()}}_propagateChanges(e){let t;this.multiple?t=this.selected.map(i=>i.value):t=this.selected?this.selected.value:e,this._value=t,this.valueChange.emit(t),this._onChange(t),this.selectionChange.emit(this._getChangeEvent(t)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let t=0;t<this.options.length;t++)if(!this.options.get(t).disabled){e=t;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,t=e?e+` `:``;return this.ariaLabelledby?t+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||``;return this.ariaLabelledby&&(e+=` `+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute(`aria-describedby`)?.split(` `)||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute(`aria-describedby`,e.join(` `)):t.removeAttribute(`aria-describedby`)}onContainerClick(e){let t=M(e);t&&(t.tagName===`MAT-OPTION`||t.classList.contains(`cdk-overlay-backdrop`)||t.closest(`.mat-mdc-select-panel`))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static ɵfac=function(t){return new(t||n)};static ɵcmp=_E({type:n,selectors:[[`mat-select`]],contentQueries:function(t,i,a){if(t&1&&Gp(a,fn,5)(a,be,5)(a,ut,5),t&2){let r;vD(r=ID())&&(i.customTrigger=r.first),vD(r=ID())&&(i.options=r),vD(r=ID())&&(i.optionGroups=r)}},viewQuery:function(t,i){if(t&1&&zp(on,5)(an,5)(Ye,5),t&2){let a;vD(a=ID())&&(i.trigger=a.first),vD(a=ID())&&(i.panel=a.first),vD(a=ID())&&(i._overlayDir=a.first)}},hostAttrs:[`role`,`combobox`,`aria-haspopup`,`listbox`,1,`mat-mdc-select`],hostVars:21,hostBindings:function(t,i){t&1&&Up(`keydown`,function(r){return i._handleKeydown(r)})(`focus`,function(){return i._onFocus()})(`blur`,function(){return i._onBlur()}),t&2&&(Lp(`id`,i.id)(`tabindex`,i.disabled?-1:i.tabIndex)(`aria-controls`,i.panelOpen?i.id+`-panel`:null)(`aria-expanded`,i.panelOpen)(`aria-label`,i.ariaLabel||null)(`aria-required`,i.required.toString())(`aria-disabled`,i.disabled.toString())(`aria-invalid`,i.errorState)(`aria-activedescendant`,i._getAriaActiveDescendant()),Xp(`mat-mdc-select-disabled`,i.disabled)(`mat-mdc-select-invalid`,i.errorState)(`mat-mdc-select-required`,i.required)(`mat-mdc-select-empty`,i.empty)(`mat-mdc-select-multiple`,i.multiple)(`mat-select-open`,i.panelOpen))},inputs:{userAriaDescribedBy:[0,`aria-describedby`,`userAriaDescribedBy`],panelClass:`panelClass`,disabled:[2,`disabled`,`disabled`,P0],disableRipple:[2,`disableRipple`,`disableRipple`,P0],tabIndex:[2,`tabIndex`,`tabIndex`,e=>e==null?0:F0(e)],hideSingleSelectionIndicator:[2,`hideSingleSelectionIndicator`,`hideSingleSelectionIndicator`,P0],placeholder:`placeholder`,required:[2,`required`,`required`,P0],multiple:[2,`multiple`,`multiple`,P0],disableOptionCentering:[2,`disableOptionCentering`,`disableOptionCentering`,P0],compareWith:`compareWith`,value:`value`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],errorStateMatcher:`errorStateMatcher`,typeaheadDebounceInterval:[2,`typeaheadDebounceInterval`,`typeaheadDebounceInterval`,F0],sortComparator:`sortComparator`,id:`id`,panelWidth:`panelWidth`,canSelectNullableOptions:[2,`canSelectNullableOptions`,`canSelectNullableOptions`,P0]},outputs:{openedChange:`openedChange`,_openedStream:`opened`,_closedStream:`closed`,selectionChange:`selectionChange`,valueChange:`valueChange`},exportAs:[`matSelect`],features:[tw([{provide:bt,useExisting:n},{provide:ht,useExisting:n}]),Um],ngContentSelectors:sn,decls:11,vars:10,consts:[[`fallbackOverlayOrigin`,`cdkOverlayOrigin`,`trigger`,``],[`panel`,``],[`cdk-overlay-origin`,``,1,`mat-mdc-select-trigger`,3,`click`],[1,`mat-mdc-select-value`],[1,`mat-mdc-select-placeholder`,`mat-mdc-select-min-line`],[1,`mat-mdc-select-value-text`],[1,`mat-mdc-select-arrow-wrapper`],[1,`mat-mdc-select-arrow`],[`viewBox`,`0 0 24 24`,`width`,`24px`,`height`,`24px`,`focusable`,`false`,`aria-hidden`,`true`],[`d`,`M7 10l5 5 5-5z`],[`cdk-connected-overlay`,``,`cdkConnectedOverlayHasBackdrop`,``,`cdkConnectedOverlayBackdropClass`,`cdk-overlay-transparent-backdrop`,3,`detach`,`backdropClick`,`overlayKeydown`,`cdkConnectedOverlayDisableClose`,`cdkConnectedOverlayPanelClass`,`cdkConnectedOverlayScrollStrategy`,`cdkConnectedOverlayOrigin`,`cdkConnectedOverlayPositions`,`cdkConnectedOverlayWidth`,`cdkConnectedOverlayFlexibleDimensions`,`cdkConnectedOverlayUsePopover`],[1,`mat-mdc-select-min-line`],[`role`,`listbox`,`tabindex`,`-1`,1,`mat-mdc-select-panel`,`mdc-menu-surface`,`mdc-menu-surface--open`,3,`keydown`]],template:function(t,i){if(t&1&&(gD(rn),Ei(0,`div`,2,0),Up(`click`,function(){return i.open()}),Ei(3,`div`,3),ZE(4,ln,2,1,`span`,4)(5,mn,3,1,`span`,5),$c(),Ei(6,`div`,6)(7,`div`,7),ju(),Ei(8,`svg`,8),Fp(9,`path`,9),$c()()()(),Sp(10,hn,3,16,`ng-template`,10),Up(`detach`,function(){return i.close()})(`backdropClick`,function(){return i.close()})(`overlayKeydown`,function(r){return i._handleOverlayKeydown(r)})),t&2){let a=DD(1);Qv(3),Lp(`id`,i._valueId),Qv(),YE(i.empty?4:5),Qv(6),Pp(`cdkConnectedOverlayDisableClose`,!0)(`cdkConnectedOverlayPanelClass`,i._overlayPanelClass)(`cdkConnectedOverlayScrollStrategy`,i._scrollStrategy)(`cdkConnectedOverlayOrigin`,i._preferredOverlayOrigin||a)(`cdkConnectedOverlayPositions`,i._positions)(`cdkConnectedOverlayWidth`,i._overlayWidth)(`cdkConnectedOverlayFlexibleDimensions`,!0)(`cdkConnectedOverlayUsePopover`,i._popoverLocation)}},dependencies:[Ft,Ye],styles:[`@keyframes _mat-select-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-select-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-select {
  display: inline-block;
  width: 100%;
  outline: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--%NS%mat-select-enabled-trigger-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-select-trigger-text-font, var(--%NS%mat-sys-body-large-font));
  line-height: var(--%NS%mat-select-trigger-text-line-height, var(--%NS%mat-sys-body-large-line-height));
  font-size: var(--%NS%mat-select-trigger-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-select-trigger-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-select-trigger-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}

div.mat-mdc-select-panel {
  box-shadow: var(--%NS%mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}

.mat-mdc-select-disabled {
  color: var(--%NS%mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-select-disabled .mat-mdc-select-placeholder {
  color: var(--%NS%mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-select-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.mat-mdc-select-disabled .mat-mdc-select-trigger {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

.mat-mdc-select-value {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-mdc-select-value-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mat-mdc-select-arrow-wrapper {
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}
.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {
  transform: none;
}

.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,
.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-select-invalid-arrow-color, var(--%NS%mat-sys-error));
}

.mat-mdc-select-arrow {
  width: 10px;
  height: 5px;
  position: relative;
  color: var(--%NS%mat-select-enabled-arrow-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
  color: var(--%NS%mat-select-focused-arrow-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {
  color: var(--%NS%mat-select-disabled-arrow-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-select-open .mat-mdc-select-arrow {
  transform: rotate(180deg);
}
.mat-form-field-animations-enabled .mat-mdc-select-arrow {
  transition: transform 80ms linear;
}
.mat-mdc-select-arrow svg {
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (forced-colors: active) {
  .mat-mdc-select-arrow svg {
    fill: CanvasText;
  }
  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {
    fill: GrayText;
  }
}

div.mat-mdc-select-panel {
  width: 100%;
  max-height: 275px;
  outline: 0;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  transform-origin: top center;
  border-radius: 0 0 4px 4px;
  position: relative;
  background-color: var(--%NS%mat-select-panel-background-color, var(--%NS%mat-sys-surface-container));
}
.mat-mdc-select-panel-above div.mat-mdc-select-panel {
  border-radius: 4px 4px 0 0;
  transform-origin: bottom center;
}
@media (forced-colors: active) {
  div.mat-mdc-select-panel {
    outline: solid 1px;
  }
}

.mat-select-panel-animations-enabled {
  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-select-panel-animations-enabled.mat-select-panel-exit {
  animation: _mat-select-exit 100ms linear;
}

.mat-mdc-select-placeholder {
  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--%NS%mat-select-placeholder-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {
  transition: none;
}
.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: none;
  display: block;
}

.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {
  cursor: pointer;
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {
  max-width: calc(100% - 18px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {
  max-width: calc(100% / 0.75 - 24px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {
  max-width: calc(100% - 60px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {
  max-width: calc(100% - 24px);
}

.mat-mdc-select-min-line:empty::before {
  content: " ";
  white-space: pre;
  width: 1px;
  display: inline-block;
  visibility: hidden;
}

.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {
  transform: var(--%NS%mat-select-arrow-transform, translateY(-8px));
}
`],encapsulation:2})}return n})();var Ni=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=NE({type:n});static ɵinj=eu({imports:[Ht,pt,et,j,Ct,pt]})}return n})();function gn(n,o){if(n&1&&(Ei(0,`mat-option`,17),UD(1),$c()),n&2){let e=o.$implicit;Pp(`value`,e),Qv(),zc(` `,e,` `)}}function _n(n,o){if(n&1){let e=sD();Ei(0,`mat-form-field`,14)(1,`mat-select`,16,0),Up(`selectionChange`,function(i){_u(e);return Mu(pD(2)._changePageSize(i.value))}),XE(3,gn,2,2,`mat-option`,17,JE),$c(),Ei(5,`div`,18),Up(`click`,function(){_u(e);return Mu(DD(2).open())}),$c()()}if(n&2){let e=pD(2);Pp(`appearance`,e._formFieldAppearance)(`color`,e.color),Qv(),Pp(`value`,e.pageSize)(`disabled`,e.disabled),kp(`aria-labelledby`,e._pageSizeLabelId),Pp(`panelClass`,e.selectConfig.panelClass||``)(`disableOptionCentering`,e.selectConfig.disableOptionCentering),Qv(2),eD(e._displayedPageSizeOptions)}}function yn(n,o){if(n&1&&(Ei(0,`div`,15),UD(1),$c()),n&2){let e=pD(2);Qv(),sh(e.pageSize)}}function bn(n,o){if(n&1&&(Ei(0,`div`,3)(1,`div`,13),UD(2),$c(),ZE(3,_n,6,7,`mat-form-field`,14),ZE(4,yn,2,1,`div`,15),$c()),n&2){let e=pD();Qv(),Lp(`id`,e._pageSizeLabelId),Qv(),zc(` `,e._intl.itemsPerPageLabel,` `),Qv(),YE(e._displayedPageSizeOptions.length>1?3:-1),Qv(),YE(e._displayedPageSizeOptions.length<=1?4:-1)}}function vn(n,o){if(n&1){let e=sD();Ei(0,`button`,19),Up(`click`,function(){_u(e);let i=pD();return Mu(i._buttonClicked(0,i._previousButtonsDisabled()))}),ju(),Ei(1,`svg`,8),Fp(2,`path`,20),$c()()}if(n&2){let e=pD();Pp(`matTooltip`,e._intl.firstPageLabel)(`matTooltipDisabled`,e._previousButtonsDisabled())(`disabled`,e._previousButtonsDisabled())(`tabindex`,e._previousButtonsDisabled()?-1:null),Lp(`aria-label`,e._intl.firstPageLabel)}}function wn(n,o){if(n&1){let e=sD();Ei(0,`button`,21),Up(`click`,function(){_u(e);let i=pD();return Mu(i._buttonClicked(i.getNumberOfPages()-1,i._nextButtonsDisabled()))}),ju(),Ei(1,`svg`,8),Fp(2,`path`,22),$c()()}if(n&2){let e=pD();Pp(`matTooltip`,e._intl.lastPageLabel)(`matTooltipDisabled`,e._nextButtonsDisabled())(`disabled`,e._nextButtonsDisabled())(`tabindex`,e._nextButtonsDisabled()?-1:null),Lp(`aria-label`,e._intl.lastPageLabel)}}var Cn=(()=>{class n{changes=new Z;itemsPerPageLabel=`Items per page:`;nextPageLabel=`Next page`;previousPageLabel=`Previous page`;firstPageLabel=`First page`;lastPageLabel=`Last page`;getRangeLabel=(e,t,i)=>{if(i==0||t==0)return`0 of ${i}`;i=Math.max(i,0);let a=e*t,r=a<i?Math.min(a+t,i):a+t;return`${a+1} \u2013 ${r} of ${i}`};static ɵfac=function(t){return new(t||n)};static ɵprov=_r$1({token:n,factory:n.ɵfac})}return n})();var Sn=50;var Dn=new S(`MAT_PAGINATOR_DEFAULT_OPTIONS`);var kn=(()=>{class n{_intl=T(Cn);_changeDetectorRef=T(k0);_formFieldAppearance;_pageSizeLabelId=T(qt).getId(`mat-paginator-page-size-label-`);_intlChanges;_isInitialized=!1;_initializedStream=new Fn(1);color;get pageIndex(){return this._pageIndex}set pageIndex(e){this._pageIndex=Math.max(e||0,0),this._changeDetectorRef.markForCheck()}_pageIndex=0;get length(){return this._length}set length(e){this._length=e||0,this._changeDetectorRef.markForCheck()}_length=0;get pageSize(){return this._pageSize}set pageSize(e){this._pageSize=Math.max(e||0,0),this._updateDisplayedPageSizeOptions()}_pageSize;get pageSizeOptions(){return this._pageSizeOptions}set pageSizeOptions(e){this._pageSizeOptions=(e||[]).map(t=>F0(t,0)),this._updateDisplayedPageSizeOptions()}_pageSizeOptions=[];hidePageSize=!1;showFirstLastButtons=!1;selectConfig={};disabled=!1;page=new Ue$1;_displayedPageSizeOptions;initialized=this._initializedStream;constructor(){let e=this._intl,t=T(Dn,{optional:!0});if(this._intlChanges=e.changes.subscribe(()=>this._changeDetectorRef.markForCheck()),t){let{pageSize:i,pageSizeOptions:a,hidePageSize:r,showFirstLastButtons:l}=t;i!=null&&(this._pageSize=i),a!=null&&(this._pageSizeOptions=a),r!=null&&(this.hidePageSize=r),l!=null&&(this.showFirstLastButtons=l)}this._formFieldAppearance=t?.formFieldAppearance||`outline`}ngOnInit(){this._isInitialized=!0,this._updateDisplayedPageSizeOptions(),this._initializedStream.next()}ngOnDestroy(){this._initializedStream.complete(),this._intlChanges.unsubscribe()}nextPage(){this.hasNextPage()&&this._navigate(this.pageIndex+1)}previousPage(){this.hasPreviousPage()&&this._navigate(this.pageIndex-1)}firstPage(){this.hasPreviousPage()&&this._navigate(0)}lastPage(){this.hasNextPage()&&this._navigate(this.getNumberOfPages()-1)}hasPreviousPage(){return this.pageIndex>=1&&this.pageSize!=0}hasNextPage(){let e=this.getNumberOfPages()-1;return this.pageIndex<e&&this.pageSize!=0}getNumberOfPages(){return this.pageSize?Math.ceil(this.length/this.pageSize):0}_changePageSize(e){let t=this.pageIndex*this.pageSize,i=this.pageIndex;this.pageIndex=Math.floor(t/e)||0,this.pageSize=e,this._emitPageEvent(i)}_nextButtonsDisabled(){return this.disabled||!this.hasNextPage()}_previousButtonsDisabled(){return this.disabled||!this.hasPreviousPage()}_updateDisplayedPageSizeOptions(){this._isInitialized&&(this.pageSize||(this._pageSize=this.pageSizeOptions.length!=0?this.pageSizeOptions[0]:Sn),this._displayedPageSizeOptions=this.pageSizeOptions.slice(),this._displayedPageSizeOptions.indexOf(this.pageSize)===-1&&this._displayedPageSizeOptions.push(this.pageSize),this._displayedPageSizeOptions.sort((e,t)=>e-t),this._changeDetectorRef.markForCheck())}_emitPageEvent(e){this.page.emit({previousPageIndex:e,pageIndex:this.pageIndex,pageSize:this.pageSize,length:this.length})}_navigate(e){let t=this.pageIndex;e!==t&&(this.pageIndex=e,this._emitPageEvent(t))}_buttonClicked(e,t){t||this._navigate(e)}static ɵfac=function(t){return new(t||n)};static ɵcmp=_E({type:n,selectors:[[`mat-paginator`]],hostAttrs:[`role`,`group`,1,`mat-mdc-paginator`],inputs:{color:`color`,pageIndex:[2,`pageIndex`,`pageIndex`,F0],length:[2,`length`,`length`,F0],pageSize:[2,`pageSize`,`pageSize`,F0],pageSizeOptions:`pageSizeOptions`,hidePageSize:[2,`hidePageSize`,`hidePageSize`,P0],showFirstLastButtons:[2,`showFirstLastButtons`,`showFirstLastButtons`,P0],selectConfig:`selectConfig`,disabled:[2,`disabled`,`disabled`,P0]},outputs:{page:`page`},exportAs:[`matPaginator`],decls:14,vars:14,consts:[[`selectRef`,``],[1,`mat-mdc-paginator-outer-container`],[1,`mat-mdc-paginator-container`],[1,`mat-mdc-paginator-page-size`],[1,`mat-mdc-paginator-range-actions`],[`aria-atomic`,`true`,`aria-live`,`polite`,`role`,`status`,1,`mat-mdc-paginator-range-label`],[`matIconButton`,``,`type`,`button`,`matTooltipPosition`,`above`,`disabledInteractive`,``,1,`mat-mdc-paginator-navigation-first`,3,`matTooltip`,`matTooltipDisabled`,`disabled`,`tabindex`],[`matIconButton`,``,`type`,`button`,`matTooltipPosition`,`above`,`disabledInteractive`,``,1,`mat-mdc-paginator-navigation-previous`,3,`click`,`matTooltip`,`matTooltipDisabled`,`disabled`,`tabindex`],[`viewBox`,`0 0 24 24`,`focusable`,`false`,`aria-hidden`,`true`,1,`mat-mdc-paginator-icon`],[`d`,`M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z`],[`matIconButton`,``,`type`,`button`,`matTooltipPosition`,`above`,`disabledInteractive`,``,1,`mat-mdc-paginator-navigation-next`,3,`click`,`matTooltip`,`matTooltipDisabled`,`disabled`,`tabindex`],[`d`,`M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z`],[`matIconButton`,``,`type`,`button`,`matTooltipPosition`,`above`,`disabledInteractive`,``,1,`mat-mdc-paginator-navigation-last`,3,`matTooltip`,`matTooltipDisabled`,`disabled`,`tabindex`],[`aria-hidden`,`true`,1,`mat-mdc-paginator-page-size-label`],[1,`mat-mdc-paginator-page-size-select`,3,`appearance`,`color`],[1,`mat-mdc-paginator-page-size-value`],[`hideSingleSelectionIndicator`,``,3,`selectionChange`,`value`,`disabled`,`aria-labelledby`,`panelClass`,`disableOptionCentering`],[3,`value`],[1,`mat-mdc-paginator-touch-target`,3,`click`],[`matIconButton`,``,`type`,`button`,`matTooltipPosition`,`above`,`disabledInteractive`,``,1,`mat-mdc-paginator-navigation-first`,3,`click`,`matTooltip`,`matTooltipDisabled`,`disabled`,`tabindex`],[`d`,`M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z`],[`matIconButton`,``,`type`,`button`,`matTooltipPosition`,`above`,`disabledInteractive`,``,1,`mat-mdc-paginator-navigation-last`,3,`click`,`matTooltip`,`matTooltipDisabled`,`disabled`,`tabindex`],[`d`,`M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z`]],template:function(t,i){t&1&&(Ei(0,`div`,1)(1,`div`,2),ZE(2,bn,5,4,`div`,3),Ei(3,`div`,4)(4,`div`,5),UD(5),$c(),ZE(6,vn,3,5,`button`,6),Ei(7,`button`,7),Up(`click`,function(){return i._buttonClicked(i.pageIndex-1,i._previousButtonsDisabled())}),ju(),Ei(8,`svg`,8),Fp(9,`path`,9),$c()(),Vu(),Ei(10,`button`,10),Up(`click`,function(){return i._buttonClicked(i.pageIndex+1,i._nextButtonsDisabled())}),ju(),Ei(11,`svg`,8),Fp(12,`path`,11),$c()(),ZE(13,wn,3,5,`button`,12),$c()()()),t&2&&(Qv(2),YE(i.hidePageSize?-1:2),Qv(3),zc(` `,i._intl.getRangeLabel(i.pageIndex,i.pageSize,i.length),` `),Qv(),YE(i.showFirstLastButtons?6:-1),Qv(),Pp(`matTooltip`,i._intl.previousPageLabel)(`matTooltipDisabled`,i._previousButtonsDisabled())(`disabled`,i._previousButtonsDisabled())(`tabindex`,i._previousButtonsDisabled()?-1:null),Lp(`aria-label`,i._intl.previousPageLabel),Qv(3),Pp(`matTooltip`,i._intl.nextPageLabel)(`matTooltipDisabled`,i._nextButtonsDisabled())(`disabled`,i._nextButtonsDisabled())(`tabindex`,i._nextButtonsDisabled()?-1:null),Lp(`aria-label`,i._intl.nextPageLabel),Qv(3),YE(i.showFirstLastButtons?13:-1))},dependencies:[xt,Oi,be,mo,qe],styles:[`.mat-mdc-paginator {
  display: block;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--%NS%mat-paginator-container-text-color, var(--%NS%mat-sys-on-surface));
  background-color: var(--%NS%mat-paginator-container-background-color, var(--%NS%mat-sys-surface));
  font-family: var(--%NS%mat-paginator-container-text-font, var(--%NS%mat-sys-body-small-font));
  line-height: var(--%NS%mat-paginator-container-text-line-height, var(--%NS%mat-sys-body-small-line-height));
  font-size: var(--%NS%mat-paginator-container-text-size, var(--%NS%mat-sys-body-small-size));
  font-weight: var(--%NS%mat-paginator-container-text-weight, var(--%NS%mat-sys-body-small-weight));
  letter-spacing: var(--%NS%mat-paginator-container-text-tracking, var(--%NS%mat-sys-body-small-tracking));
  --%NS%mat-form-field-container-height: var(--%NS%mat-paginator-form-field-container-height, 40px);
  --%NS%mat-form-field-container-vertical-padding: var(--%NS%mat-paginator-form-field-container-vertical-padding, 8px);
}
.mat-mdc-paginator .mat-mdc-select-value {
  font-size: var(--%NS%mat-paginator-select-trigger-text-size, var(--%NS%mat-sys-body-small-size));
}
.mat-mdc-paginator .mat-mdc-form-field-subscript-wrapper {
  display: none;
}
.mat-mdc-paginator .mat-mdc-select {
  line-height: 1.5;
}

.mat-mdc-paginator-outer-container {
  display: flex;
}

.mat-mdc-paginator-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
  flex-wrap: wrap;
  width: 100%;
  min-height: var(--%NS%mat-paginator-container-size, 56px);
}

.mat-mdc-paginator-page-size {
  display: flex;
  align-items: baseline;
  margin-right: 8px;
}
[dir=rtl] .mat-mdc-paginator-page-size {
  margin-right: 0;
  margin-left: 8px;
}

.mat-mdc-paginator-page-size-label {
  margin: 0 4px;
}

.mat-mdc-paginator-page-size-select {
  margin: 0 4px;
  width: var(--%NS%mat-paginator-page-size-select-width, 84px);
}

.mat-mdc-paginator-range-label {
  margin: 0 32px 0 24px;
}

.mat-mdc-paginator-range-actions {
  display: flex;
  align-items: center;
}

.mat-mdc-paginator-icon {
  display: inline-block;
  width: 28px;
  fill: var(--%NS%mat-paginator-enabled-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon {
  fill: var(--%NS%mat-paginator-disabled-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
[dir=rtl] .mat-mdc-paginator-icon {
  transform: rotate(180deg);
}

@media (forced-colors: active) {
  .mat-mdc-icon-button[aria-disabled] .mat-mdc-paginator-icon,
  .mat-mdc-paginator-icon {
    fill: currentColor;
  }
  .mat-mdc-paginator-range-actions .mat-mdc-icon-button {
    outline: solid 1px;
  }
  .mat-mdc-paginator-range-actions .mat-mdc-icon-button[aria-disabled] {
    color: GrayText;
  }
}
.mat-mdc-paginator-touch-target {
  display: var(--%NS%mat-paginator-touch-target-display, block);
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--%NS%mat-paginator-page-size-select-width, 84px);
  height: var(--%NS%mat-paginator-page-size-select-touch-target-height, 48px);
  background-color: transparent;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
`],encapsulation:2})}return n})();var Xa=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=NE({type:n});static ɵinj=eu({imports:[zr,Ni,nn$1,kn]})}return n})();var xn=[`*`,[[``,`matSortHeaderIcon`,``]]];var Rn=[`*`,`[matSortHeaderIcon]`];function Mn(n,o){n&1&&(ju(),Uc(0,`svg`,3),jp(1,`path`,4),qc())}function On(n,o){n&1&&(Uc(0,`div`,2),mD(1,1,null,Mn,2,0),qc())}var Ti=new S(`MAT_SORT_DEFAULT_OPTIONS`);var Nn=(()=>{class n{_defaultOptions;_initializedStream=new Fn(1);sortables=new Map;_stateChanges=new Z;active;start=`asc`;get direction(){return this._direction}set direction(e){this._direction=e}_direction=``;disableClear;disabled=!1;sortChange=new Ue$1;initialized=this._initializedStream;constructor(e){this._defaultOptions=e}register(e){this.sortables.set(e.id,e)}deregister(e){this.sortables.delete(e.id)}sort(e){this.active!=e.id?(this.active=e.id,this.direction=e.start?e.start:this.start):this.direction=this.getNextSortDirection(e),this.sortChange.emit({active:this.active,direction:this.direction})}getNextSortDirection(e){if(!e)return``;let t=e?.disableClear??this.disableClear??!!this._defaultOptions?.disableClear,i=Tn(e.start||this.start,t),a=i.indexOf(this.direction)+1;return a>=i.length&&(a=0),i[a]}ngOnInit(){this._initializedStream.next()}ngOnChanges(){this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete(),this._initializedStream.complete()}static ɵfac=function(t){return new(t||n)(Rr(Ti,8))};static ɵdir=AE({type:n,selectors:[[``,`matSort`,``]],hostAttrs:[1,`mat-sort`],inputs:{active:[0,`matSortActive`,`active`],start:[0,`matSortStart`,`start`],direction:[0,`matSortDirection`,`direction`],disableClear:[2,`matSortDisableClear`,`disableClear`,P0],disabled:[2,`matSortDisabled`,`disabled`,P0]},outputs:{sortChange:`matSortChange`},exportAs:[`matSort`],features:[Um]})}return n})();function Tn(n,o){let e=[`asc`,`desc`];return n==`desc`&&e.reverse(),o||e.push(``),e}var gr=(()=>{class n{_sort=T(Nn,{optional:!0});_columnDef=T(ne,{optional:!0});_changeDetectorRef=T(k0);_focusMonitor=T(Kt);_elementRef=T(Mr);_ariaDescriber=T(fa,{optional:!0});_renderChanges;_animationsDisabled=tt$1();_recentlyCleared=Uo(null);_sortButton;id;arrowPosition=`after`;start;disabled=!1;get sortActionDescription(){return this._sortActionDescription}set sortActionDescription(e){this._updateSortActionDescription(e)}_sortActionDescription=`Sort`;disableClear;constructor(){T(R).load(hn$1);let e=T(Ti,{optional:!0});this._sort,e?.arrowPosition&&(this.arrowPosition=e?.arrowPosition)}ngOnInit(){!this.id&&this._columnDef&&(this.id=this._columnDef.name),this._sort.register(this),this._renderChanges=Eg(this._sort._stateChanges,this._sort.sortChange).subscribe(()=>this._changeDetectorRef.markForCheck()),this._sortButton=this._elementRef.nativeElement.querySelector(`.mat-sort-header-container`),this._updateSortActionDescription(this._sortActionDescription)}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(()=>{Promise.resolve().then(()=>this._recentlyCleared.set(null))})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._sort.deregister(this),this._renderChanges?.unsubscribe(),this._sortButton&&this._ariaDescriber?.removeDescription(this._sortButton,this._sortActionDescription)}_toggleOnInteraction(){if(!this._isDisabled()){let e=this._isSorted(),t=this._sort.direction;this._sort.sort(this),this._recentlyCleared.set(e&&!this._isSorted()?t:null)}}_handleKeydown(e){(e.keyCode===32||e.keyCode===13)&&(e.preventDefault(),this._toggleOnInteraction())}_isSorted(){return this._sort.active==this.id&&(this._sort.direction===`asc`||this._sort.direction===`desc`)}_isDisabled(){return this._sort.disabled||this.disabled}_getAriaSortAttribute(){return this._isSorted()?this._sort.direction==`asc`?`ascending`:`descending`:`none`}_renderArrow(){return!this._isDisabled()||this._isSorted()}_updateSortActionDescription(e){this._sortButton&&(this._ariaDescriber?.removeDescription(this._sortButton,this._sortActionDescription),this._ariaDescriber?.describe(this._sortButton,e)),this._sortActionDescription=e}static ɵfac=function(t){return new(t||n)};static ɵcmp=_E({type:n,selectors:[[``,`mat-sort-header`,``]],hostAttrs:[1,`mat-sort-header`],hostVars:3,hostBindings:function(t,i){t&1&&Up(`click`,function(){return i._toggleOnInteraction()})(`keydown`,function(r){return i._handleKeydown(r)})(`mouseleave`,function(){return i._recentlyCleared.set(null)}),t&2&&(Lp(`aria-sort`,i._getAriaSortAttribute()),Xp(`mat-sort-header-disabled`,i._isDisabled()))},inputs:{id:[0,`mat-sort-header`,`id`],arrowPosition:`arrowPosition`,start:`start`,disabled:[2,`disabled`,`disabled`,P0],sortActionDescription:`sortActionDescription`,disableClear:[2,`disableClear`,`disableClear`,P0]},exportAs:[`matSortHeader`],ngContentSelectors:Rn,decls:4,vars:17,consts:[[1,`mat-sort-header-container`,`mat-focus-indicator`],[1,`mat-sort-header-content`],[1,`mat-sort-header-arrow`],[`viewBox`,`0 -960 960 960`,`focusable`,`false`,`aria-hidden`,`true`],[`d`,`M440-240v-368L296-464l-56-56 240-240 240 240-56 56-144-144v368h-80Z`]],template:function(t,i){t&1&&(gD(xn),Uc(0,`div`,0)(1,`div`,1),mD(2),qc(),ZE(3,On,3,0,`div`,2),qc()),t&2&&(Xp(`mat-sort-header-sorted`,i._isSorted())(`mat-sort-header-position-before`,i.arrowPosition===`before`)(`mat-sort-header-descending`,i._sort.direction===`desc`)(`mat-sort-header-ascending`,i._sort.direction===`asc`)(`mat-sort-header-recently-cleared-ascending`,i._recentlyCleared()===`asc`)(`mat-sort-header-recently-cleared-descending`,i._recentlyCleared()===`desc`)(`mat-sort-header-animations-disabled`,i._animationsDisabled),Lp(`tabindex`,i._isDisabled()?null:0)(`role`,i._isDisabled()?null:`button`),Qv(3),YE(i._renderArrow()?3:-1))},styles:[`.mat-sort-header {
  cursor: pointer;
}

.mat-sort-header-disabled {
  cursor: default;
}

.mat-sort-header-container {
  display: flex;
  align-items: center;
  letter-spacing: normal;
  outline: 0;
}
[mat-sort-header].cdk-keyboard-focused .mat-sort-header-container, [mat-sort-header].cdk-program-focused .mat-sort-header-container {
  border-bottom: var(--%NS%mat-focus-indicator-fallback-border-style, solid) 1px currentColor;
}
.mat-sort-header-container::before {
  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 4px) * -1);
}

.mat-sort-header-content {
  display: flex;
  align-items: center;
}

.mat-sort-header-position-before {
  flex-direction: row-reverse;
}

@keyframes _mat-sort-header-recently-cleared-ascending {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-25%);
    opacity: 0;
  }
}
@keyframes _mat-sort-header-recently-cleared-descending {
  from {
    transform: translateY(0) rotate(180deg);
    opacity: 1;
  }
  to {
    transform: translateY(25%) rotate(180deg);
    opacity: 0;
  }
}
.mat-sort-header-arrow {
  height: 12px;
  width: 12px;
  position: relative;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1), opacity 225ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  overflow: visible;
  color: var(--%NS%mat-sort-arrow-color, var(--%NS%mat-sys-on-surface));
}
.mat-sort-header.cdk-keyboard-focused .mat-sort-header-arrow, .mat-sort-header.cdk-program-focused .mat-sort-header-arrow, .mat-sort-header:hover .mat-sort-header-arrow {
  opacity: 0.54;
}
.mat-sort-header .mat-sort-header-sorted .mat-sort-header-arrow {
  opacity: 1;
}
.mat-sort-header-descending .mat-sort-header-arrow {
  transform: rotate(180deg);
}
.mat-sort-header-recently-cleared-ascending .mat-sort-header-arrow {
  transform: translateY(-25%);
}
.mat-sort-header-recently-cleared-ascending .mat-sort-header-arrow {
  transition: none;
  animation: _mat-sort-header-recently-cleared-ascending 225ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.mat-sort-header-recently-cleared-descending .mat-sort-header-arrow {
  transition: none;
  animation: _mat-sort-header-recently-cleared-descending 225ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.mat-sort-header-animations-disabled .mat-sort-header-arrow {
  transition-duration: 0ms;
  animation-duration: 0ms;
}
.mat-sort-header-arrow > svg, .mat-sort-header-arrow [matSortHeaderIcon] {
  width: 24px;
  height: 24px;
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -12px 0 0 -12px;
  transform: translateZ(0);
}
.mat-sort-header-arrow, [dir=rtl] .mat-sort-header-position-before .mat-sort-header-arrow {
  margin: 0 0 0 6px;
}
.mat-sort-header-position-before .mat-sort-header-arrow, [dir=rtl] .mat-sort-header-arrow {
  margin: 0 6px 0 0;
}
`],encapsulation:2})}return n})();var _r=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=NE({type:n});static ɵinj=eu({imports:[et]})}return n})();export{ko as C,xo as D,ut as E,kn as S,pt as T,_r as _,Fo as a,ht as b,Ni as c,Oi as d,Oo as f,Xa as g,To as h,Eo as i,Nn as l,So as m,Di as n,Io as o,Ro as p,Do as r,Mo as s,Ci as t,No as u,be as v,mt as w,ki as x,gr as y};