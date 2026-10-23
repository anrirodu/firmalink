import{Ft as T,Wn as ng,Xt as Xh,b as Y,cn as _e,et as Jh,fn as ae,or as ts,ut as Me,x as k,xt as Pl,y as e}from"./main-MFM6IOBJ.js";import{t as v}from"./chunk-C6hLvLiC.js";import{n as t,t as h}from"./chunk-_0aD1xWr.js";var d=15;function b(i,e){let r=t(e);return r?`
              <tr>
                <td style="padding:5px 14px 5px 0;color:#6B7280;font:600 12px Arial,sans-serif;white-space:nowrap;vertical-align:top">${t(i)}</td>
                <td style="padding:5px 0;color:#111827;font:400 13px Arial,sans-serif">${r}</td>
              </tr>`:``}function F(i){return`${i.toLocaleDateString(`es-VE`,{day:`2-digit`,month:`2-digit`,year:`numeric`})}, ${i.toLocaleTimeString(`es-VE`,{hour:`2-digit`,minute:`2-digit`})}`}function O(i,e$1,r=new Date){let o=`
              <!-- Datos de la solicitud -->
              <table cellpadding="0" cellspacing="0" role="presentation"
                     style="border-collapse:collapse;width:100%;margin:0 0 4px 0">
                <tr>
                  <td style="padding:0 0 10px 0;border-bottom:1px solid #F3F4F6">
                    <span style="font:400 12px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase">Seguridad de la cuenta</span>
                    <div style="font:700 18px Arial,sans-serif;color:#111827;margin-top:2px">Restablecer contrase\xF1a</div>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;width:100%;margin:14px 0 0 0">
                ${b(`Usuario`,i)}
                ${b(`Solicitud`,F(r))}
                ${b(`Vigencia`,`${15} minutos`)}
                ${b(`Uso`,`Un solo uso`)}
              </table>

              <p style="margin:22px 0 0 0;font:400 14px Arial,sans-serif;color:#374151;line-height:1.6">
                Hola <strong style="color:#111827">${t(i)}</strong>, recibimos una solicitud para
                restablecer la contrase\xF1a de su cuenta. Pulse el bot\xF3n para elegir una clave nueva.
              </p>

              <!-- Acci\xF3n principal -->
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin:24px auto 0 auto">
                <tr>
                  <td align="center" bgcolor="#059669" style="border-radius:10px">
                    <a class="btn-cta mobile-button" href="${t(e$1)}"
                       style="display:inline-block;padding:14px 32px;font:600 15px Arial,sans-serif;color:#FFFFFF;text-decoration:none;border-radius:10px">Restablecer contrase\xF1a</a>
                  </td>
                </tr>
              </table>

              <!-- Aviso de vigencia (mismo bloque destacado de los presupuestos) -->
              <div style="margin:24px 0 0 0;background-color:#FFFBEB;border:1px solid #FDE68A;border-left:4px solid #D97706;border-radius:8px;padding:14px 16px;font:400 13px Arial,sans-serif;color:#78350F;line-height:1.6">
                <strong style="letter-spacing:.04em">ENLACE DE UN SOLO USO \u2014 VENCE EN ${15} MINUTOS.</strong>
                Si no solicit\xF3 este correo, ign\xF3relo: su contrase\xF1a actual sigue vigente y no se
                realizar\xE1 ning\xFAn cambio.
              </div>

              <!-- Enlace copiable -->
              <div style="margin:24px 0 0 0;padding:18px 0 0 0;border-top:1px solid #F3F4F6">
                <div style="font:700 11px Arial,sans-serif;color:#6B7280;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">
                  Si el bot\xF3n no funciona
                </div>
                <div style="font:400 12px 'Courier New',Courier,monospace;color:#047857;word-break:break-all">
                  ${t(e$1)}
                </div>
              </div>

              <!-- Nota de seguridad -->
              <div style="margin:20px 0 0 0;border-left:3px solid #059669;background-color:#F0FDF7;padding:12px 16px;font:400 13px Arial,sans-serif;color:#37474F;line-height:1.6">
                Nadie de ${e.identidad.nombre} le pedir\xE1 su contrase\xF1a por correo ni por tel\xE9fono. Si no reconoce
                esta solicitud, no pulse el enlace y comun\xEDquelo al administrador del sistema.
              </div>`;return h({titulo:`Recuperaci\xF3n de contrase\xF1a \u2014 ${e.identidad.nombre}`,encabezado:e.identidad.nombre.toUpperCase(),preheader:`Restablezca su contrase\xF1a: el enlace vence en ${15} minutos y solo se puede usar una vez.`,cuerpoHtml:o,logoAlt:e.correo.logoAlt})}function C(i,e,r=new Date){return[`FIRMALINK`,`Seguridad de la cuenta — Restablecer contraseña`,``,`Usuario: ${i}`,`Solicitud: ${F(r)}`,`Vigencia: ${15} minutos`,`Uso: un solo uso`,``,`Recibimos una solicitud para restablecer la contraseña de su cuenta.`,`Abra este enlace para elegir una clave nueva:`,e,``,`Si no solicitó este correo, ignore este mensaje: su contraseña no cambia.`].join(`
`)}var I=/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;var $=class i{api=T(v);sha256=T(k);get coleccionResets(){return Y.colecciones.PASSWORD_RESET}solicitar(e){return this.validarCorreoRegistrado(e).pipe(Pl(r=>_e(this.emitirEnlace(r))))}validarCorreoRegistrado(e){let r=e.trim().toLowerCase();return r?I.test(r)?this.api.EjecutarAnonimo({funcion:Y.functions.CONSULTAR_USUARIO_POR_CORREO,parametros:r}).pipe(ts(o=>(console.error(`[PasswordReset] Fallo al consultar el usuario:`,o),Xh(()=>new Error(this.msjHttp(o))))),Me(o=>{let n=this.extraerFilas(o),t=h=>String(h??``).trim().toLowerCase(),a=n.find(h=>t(h.correo)===r),p=String(a?.login??a?.Login??``).trim();if(!a||!p)throw new Error(`El correo no está registrado en el sistema.`);return{login:p,correo:r}})):Xh(()=>new Error(`Ingrese un correo electrónico válido.`)):Xh(()=>new Error(`Ingrese un correo electrónico válido.`))}validarToken(e){let r=this.loginDelToken(e);return!r||!e.includes(`.`)?Jh({valido:!1,login:``}):this.api.ColeccionAnonima({coleccion:this.coleccionResets,donde:JSON.stringify({token:e,usado:{$ne:!0},expiracion:{$gt:new Date().toISOString()}}),objeto:{ultimo_visto:new Date().toISOString()},upsert:!0,driver:``}).pipe(ts(o=>(console.error(`[PasswordReset] Fallo al validar el token:`,o),Xh(()=>new Error(this.msjHttp(o))))),Me(o=>({valido:this.matched(o)>0,login:r})))}restablecer(e,r){let o=this.loginDelToken(e);return o?_e(this.sha256.hash(r)).pipe(Pl(n=>this.api.ColeccionAnonima({coleccion:this.coleccionResets,donde:JSON.stringify({token:e,usado:{$ne:!0},expiracion:{$gt:new Date().toISOString()}}),objeto:{usado:!0,usado_en:new Date().toISOString()},upsert:!0,driver:``}).pipe(ts(t=>(console.error(`[PasswordReset] Fallo al consumir el token:`,t),Xh(()=>new Error(this.msjHttp(t))))),Me(t=>{if(this.matched(t)<1)throw new Error(`El enlace de recuperación es inválido o ha expirado.`);return n}))),Pl(n=>this.api.ColeccionAnonima({coleccion:Y.colecciones.USUARIO,donde:JSON.stringify({login:o}),objeto:{clave:n},upsert:!0,driver:``}).pipe(ts(t=>(console.error(`[PasswordReset] Fallo al actualizar la clave:`,t),Xh(()=>new Error(this.msjHttp(t))))),Me(t=>{if(this.matched(t)<1)throw new Error(`No se pudo actualizar la contraseña: el usuario ya no existe.`)})))):Xh(()=>new Error(`El enlace de recuperación es inválido.`))}async emitirEnlace(e){let r=new Date,o=new Date(r.getTime()+15*6e4),n=this.generarToken(e.login),t;try{t=await ng(this.api.ColeccionAnonima({coleccion:this.coleccionResets,donde:JSON.stringify({login:e.login}),objeto:{token:n,login:e.login,correo:e.correo,expiracion:o.toISOString(),usado:!1,creado_en:r.toISOString(),tipo:`password_reset`},upsert:!0,driver:``}))}catch(p){throw console.error(`[PasswordReset] Fallo al registrar el token:`,p),new Error(this.msjHttp(p))}if(this.matched(t)<1&&!t?.upsertedCount)throw new Error(`No se pudo registrar el enlace de recuperación.`);let a=`${document.baseURI}#/recover-password/${n}`;await this.enviarCorreoRecuperacion(e.correo,e.login,a)}async enviarCorreoRecuperacion(e$2,r,o){let n;try{n=await ng(this.api.FnxAnonima({funcion:Y.functions.ENVIAR_CORREO_FNX,para:e$2,asunto:`Recuperaci\xF3n de contrase\xF1a \u2014 ${e.identidad.nombre}`,html:O(r,o),texto:C(r,o),idempotencia:`reset-${r}-${Date.now()}`}))}catch{throw new Error(`No se pudo enviar el correo de recuperación. Intente de nuevo.`)}let t=String(n?.contenido?.salidas??``),a=/fallo|error|invalid|denied|not enabled|fail|unauthorized|forbidden|disabled/i.test(t);if(n?.tipo!==1||a)throw new Error(t||`No se pudo enviar el correo de recuperación. Intente de nuevo.`)}generarToken(e){let r=crypto.getRandomValues(new Uint8Array(24)),o=Array.from(r).map(n=>n.toString(16).padStart(2,`0`)).join(``);return`${this.b64urlEncode(e)}.${o}`}loginDelToken(e){let r=String(e??``).split(`.`)[0];if(!r)return``;try{return this.b64urlDecode(r)}catch{return``}}b64urlEncode(e){let r=new TextEncoder().encode(e),o=``;return r.forEach(n=>o+=String.fromCharCode(n)),btoa(o).replace(/\+/g,`-`).replace(/\//g,`_`).replace(/=+$/,``)}b64urlDecode(e){let r=e.replace(/-/g,`+`).replace(/_/g,`/`),o=`=`.repeat((4-r.length%4)%4),n=atob(r+o),t=Uint8Array.from(n,a=>a.charCodeAt(0));return new TextDecoder().decode(t)}matched(e){return Number(e?.matchedCount??e?.MatchedCount??0)||0}msjHttp(e){let r=e?.status,o=e?.error?.msj||e?.error?.msg||e?.error?.mensaje;return o?String(o):r===0?`No hay conexión con el servidor. Verifique que Sandra esté en línea.`:r===404?`Ruta de API no encontrada (404). Verifique el proxy de desarrollo.`:r===403?`Acceso denegado (403) en la superficie anónima.`:`Error del servidor (${r??`sin respuesta`}).`}extraerFilas(e){if(Array.isArray(e))return e;let o=e?.contenido;return Array.isArray(o)?o:o&&typeof o==`object`?[o]:[]}static ɵfac=function(r){return new(r||i)};static ɵprov=ae({token:i,factory:i.ɵfac,providedIn:`root`})};export{$ as t};