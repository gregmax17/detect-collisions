!function(t){var e={};function s(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},s.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=11)}([function(t,e,s){const i=s(3);class o extends i{constructor(t=0,e=0,s=[],i=0,n=1,_=1,l=0){super(t,e,l),this.angle=i,this.scale_x=n,this.scale_y=_,this._polygon=!0,this._x=t,this._y=e,this._angle=i,this._scale_x=n,this._scale_y=_,this._min_x=0,this._min_y=0,this._max_x=0,this._max_y=0,this._points=null,this._coords=null,this._edges=null,this._normals=null,this._dirty_coords=!0,this._dirty_normals=!0,o.prototype.setPoints.call(this,s)}draw(t){(this._dirty_coords||this.x!==this._x||this.y!==this._y||this.angle!==this._angle||this.scale_x!==this._scale_x||this.scale_y!==this._scale_y)&&this._calculateCoords();const e=this._coords;if(2===e.length)t.moveTo(e[0],e[1]),t.arc(e[0],e[1],1,0,2*Math.PI);else{t.moveTo(e[0],e[1]);for(let s=2;s<e.length;s+=2)t.lineTo(e[s],e[s+1]);e.length>4&&t.lineTo(e[0],e[1])}}setPoints(t){const e=t.length;this._points=new Float64Array(2*e),this._coords=new Float64Array(2*e),this._edges=new Float64Array(2*e),this._normals=new Float64Array(2*e);const s=this._points;for(let i=0,o=0,n=1;i<e;++i,o+=2,n+=2){const e=t[i];s[o]=e[0],s[n]=e[1]}this._dirty_coords=!0}_calculateCoords(){const t=this.x,e=this.y,s=this.angle,i=this.scale_x,o=this.scale_y,n=this._points,_=this._coords,l=n.length;let r,h,a,c;for(let y=0,v=1;y<l;y+=2,v+=2){let l=n[y]*i,b=n[v]*o;if(s){const t=Math.cos(s),e=Math.sin(s),i=l;l=i*t-b*e,b=i*e+b*t}l+=t,b+=e,_[y]=l,_[v]=b,0===y?(r=h=l,a=c=b):(l<r?r=l:l>h&&(h=l),b<a?a=b:b>c&&(c=b))}this._x=t,this._y=e,this._angle=s,this._scale_x=i,this._scale_y=o,this._min_x=r,this._min_y=a,this._max_x=h,this._max_y=c,this._dirty_coords=!1,this._dirty_normals=!0}_calculateNormals(){const t=this._coords,e=this._edges,s=this._normals,i=t.length;for(let o=0,n=1;o<i;o+=2,n+=2){const _=o+2<i?o+2:0,l=t[_]-t[o],r=t[_+1]-t[n],h=l||r?Math.sqrt(l*l+r*r):0;e[o]=l,e[n]=r,s[o]=h?r/h:0,s[n]=h?-l/h:0}this._dirty_normals=!1}}t.exports=o,t.exports.default=t.exports},function(t,e){function s(t,e,s=null,i=!1){const o=t._coords,n=t._edges,_=t._normals,l=e.x,r=e.y,h=e.radius*e.scale,a=2*h,c=h*h,y=o.length;let v=!0,b=!0,x=null,u=0,d=0;if(2===y){const t=l-o[0],e=r-o[1],i=t*t+e*e;if(i>c)return!1;if(s){const s=Math.sqrt(i);x=h-s,u=t/s,d=e/s,b=!1}}else for(let t=0,e=1;t<y;t+=2,e+=2){const i=l-o[t],p=r-o[e],m=n[t],f=n[e],g=i*m+p*f,w=g<0?-1:g>m*m+f*f?1:0;let P=!1,C=0,F=0,k=0;if(s&&v&&i*i+p*p>c&&(v=!1),w){const e=-1===w,_=e?0===t?y-2:t-2:t===y-2?0:t+2,a=_+1,v=l-o[_],x=r-o[a],u=n[_],d=n[a],m=v*u+x*d;if((m<0?-1:m>u*u+d*d?1:0)===-w){const t=e?i:v,o=e?p:x,n=t*t+o*o;if(n>c)return!1;if(s){const e=Math.sqrt(n);P=!0,C=h-e,F=t/e,k=o/e,b=!1}}}else{const o=_[t],n=_[e],l=i*o+p*n;if(l>0&&(l<0?-l:l)>h)return!1;s&&(P=!0,C=h-l,F=o,k=n,(b&&l>=0||C<a)&&(b=!1))}P&&(null===x||x>C)&&(x=C,u=F,d=k)}return s&&(s.a_in_b=i?b:v,s.b_in_a=i?v:b,s.overlap=x,s.overlap_x=i?-u:u,s.overlap_y=i?-d:d),!0}function i(t,e,s,i,o=null){const n=t.length,_=e.length;if(!n||!_)return!0;let l=null,r=null,h=null,a=null;for(let e=0,o=1;e<n;e+=2,o+=2){const n=t[e]*s+t[o]*i;(null===l||l>n)&&(l=n),(null===r||r<n)&&(r=n)}for(let t=0,o=1;t<_;t+=2,o+=2){const n=e[t]*s+e[o]*i;(null===h||h>n)&&(h=n),(null===a||a<n)&&(a=n)}if(l>a||r<h)return!0;if(o){let t=0;if(l<h)if(o.a_in_b=!1,r<a)t=r-h,o.b_in_a=!1;else{const e=r-h,s=a-l;t=e<s?e:-s}else if(o.b_in_a=!1,r>a)t=l-a,o.a_in_b=!1;else{const e=r-h,s=a-l;t=e<s?e:-s}const e=o.overlap,n=t<0?-t:t;if(null===e||e>n){const e=t<0?-1:1;o.overlap=n,o.overlap_x=s*e,o.overlap_y=i*e}}return!1}t.exports=function(t,e,o=null,n=!0){const _=t._polygon,l=e._polygon;let r=!1;return o&&(o.a=t,o.b=e,o.a_in_b=!0,o.b_in_a=!0,o.overlap=null,o.overlap_x=0,o.overlap_y=0),_&&(t._dirty_coords||t.x!==t._x||t.y!==t._y||t.angle!==t._angle||t.scale_x!==t._scale_x||t.scale_y!==t._scale_y)&&t._calculateCoords(),l&&(e._dirty_coords||e.x!==e._x||e.y!==e._y||e.angle!==e._angle||e.scale_x!==e._scale_x||e.scale_y!==e._scale_y)&&e._calculateCoords(),n&&!function(t,e){const s=t._polygon,i=s?0:t.x,o=s?0:t.y,n=s?0:t.radius*t.scale,_=s?t._min_x:i-n,l=s?t._min_y:o-n,r=s?t._max_x:i+n,h=s?t._max_y:o+n,a=e._polygon,c=a?0:e.x,y=a?0:e.y,v=a?0:e.radius*e.scale,b=a?e._min_x:c-v,x=a?e._min_y:y-v,u=a?e._max_x:c+v,d=a?e._max_y:y+v;return _<u&&l<d&&r>b&&h>x}(t,e)||(_&&t._dirty_normals&&t._calculateNormals(),l&&e._dirty_normals&&e._calculateNormals(),r=_&&l?function(t,e,s=null){const o=t._coords.length,n=e._coords.length;if(2===o&&2===n){const i=t._coords,o=e._coords;return s&&(s.overlap=0),i[0]===o[0]&&i[1]===o[1]}const _=t._coords,l=e._coords,r=t._normals,h=e._normals;if(o>2)for(let t=0,e=1;t<o;t+=2,e+=2)if(i(_,l,r[t],r[e],s))return!1;if(n>2)for(let t=0,e=1;t<n;t+=2,e+=2)if(i(_,l,h[t],h[e],s))return!1;return!0}(t,e,o):_?s(t,e,o,!1):l?s(e,t,o,!0):function(t,e,s=null){const i=t.radius*t.scale,o=e.radius*e.scale,n=e.x-t.x,_=e.y-t.y,l=i+o,r=n*n+_*_;if(r>l*l)return!1;if(s){const t=Math.sqrt(r);s.a_in_b=i<=o&&t<=o-i,s.b_in_a=o<=i&&t<=i-o,s.overlap=l-t,s.overlap_x=n/t,s.overlap_y=_/t}return!0}(t,e,o)),o&&(o.collision=r),r},t.exports.default=t.exports},function(t,e){t.exports=class{constructor(){this.collision=!1,this.a=null,this.b=null,this.a_in_b=!1,this.b_in_a=!1,this.overlap=0,this.overlap_x=0,this.overlap_y=0}},t.exports.default=t.exports},function(t,e,s){const i=s(2),o=s(1);t.exports=class{constructor(t=0,e=0,s=0){this.x=t,this.y=e,this.padding=s,this._circle=!1,this._polygon=!1,this._point=!1,this._bvh=null,this._bvh_parent=null,this._bvh_branch=!1,this._bvh_padding=s,this._bvh_min_x=0,this._bvh_min_y=0,this._bvh_max_x=0,this._bvh_max_y=0}collides(t,e=null,s=!0){return o(this,t,e,s)}potentials(){const t=this._bvh;if(null===t)throw new Error("Body does not belong to a collision system");return t.potentials(this)}remove(){const t=this._bvh;t&&t.remove(this,!1)}createResult(){return new i}static createResult(){return new i}},t.exports.default=t.exports},function(t,e,s){const i=s(9),o=s(7),n=s(0),_=s(6),l=s(2),r=s(1);class h{constructor(){this._bvh=new i}createCircle(t=0,e=0,s=0,i=1,n=0){const _=new o(t,e,s,i,n);return this._bvh.insert(_),_}createPolygon(t=0,e=0,s=[[0,0]],i=0,o=1,_=1,l=0){const r=new n(t,e,s,i,o,_,l);return this._bvh.insert(r),r}createPoint(t=0,e=0,s=0){const i=new _(t,e,s);return this._bvh.insert(i),i}createResult(){return new l}static createResult(){return new l}insert(...t){for(const e of t)this._bvh.insert(e,!1);return this}remove(...t){for(const e of t)this._bvh.remove(e,!1);return this}update(){return this._bvh.update(),this}draw(t){return this._bvh.draw(t)}drawBVH(t){return this._bvh.drawBVH(t)}potentials(t){return this._bvh.potentials(t)}collides(t,e,s=null,i=!0){return r(t,e,s,i)}}t.exports={default:h,Collisions:h,Result:l,Circle:o,Polygon:n,Point:_}},function(t,e,s){"use strict";s.r(e),s.d(e,"default",function(){return y});const i=s(4),o=i.createResult(),n=800,_=600,l=500,r=1,h=5;let a=0,c=0;class y{constructor(){this.element=document.createElement("div"),this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.collisions=new i,this.bodies=[],this.polygons=0,this.circles=0,this.canvas.width=n,this.canvas.height=_,this.context.font="24px Arial",this.collisions.createPolygon(0,0,[[0,0],[n,0]]),this.collisions.createPolygon(0,0,[[n,0],[n,_]]),this.collisions.createPolygon(0,0,[[n,_],[0,_]]),this.collisions.createPolygon(0,0,[[0,_],[0,0]]);for(let t=0;t<l;++t)this.createShape(!v(0,49));this.element.innerHTML=`\n\t\t\t<div><b>Total:</b> ${l}</div>\n\t\t\t<div><b>Polygons:</b> ${this.polygons}</div>\n\t\t\t<div><b>Circles:</b> ${this.circles}</div>\n\t\t\t<div><label><input id="bvh" type="checkbox"> Show Bounding Volume Hierarchy</label></div>\n\t\t`,this.bvh_checkbox=this.element.querySelector("#bvh"),this.element.appendChild(this.canvas);const t=this;let e=performance.now();this.frame=requestAnimationFrame(function s(){const i=performance.now();t.update(1e3/(i-e)),t.frame=requestAnimationFrame(s),e=i})}update(t){this.collisions.update(),++a,c+=t;const e=Math.round(c/a);a>100&&(a=1,c=e);for(let t=0;t<this.bodies.length;++t){const e=this.bodies[t];e.x+=e.direction_x*r,e.y+=e.direction_y*r;const s=e.potentials();for(const t of s)if(e.collides(t,o)){e.x-=o.overlap*o.overlap_x,e.y-=o.overlap*o.overlap_y;let s=e.direction_x*o.overlap_y+e.direction_y*-o.overlap_x;e.direction_x=2*s*o.overlap_y-e.direction_x,e.direction_y=2*s*-o.overlap_x-e.direction_y,s=t.direction_x*o.overlap_y+t.direction_y*-o.overlap_x,t.direction_x=2*s*o.overlap_y-t.direction_x,t.direction_y=2*s*-o.overlap_x-t.direction_y}}this.context.fillStyle="#000000",this.context.fillRect(0,0,n,_),this.context.strokeStyle="#FFFFFF",this.context.beginPath(),this.collisions.draw(this.context),this.context.stroke(),this.bvh_checkbox.checked&&(this.context.strokeStyle="#00FF00",this.context.beginPath(),this.collisions.drawBVH(this.context),this.context.stroke()),this.context.fillStyle="#FFCC00",this.context.fillText(e,10,30)}createShape(t){const e=.75*h*(t?3:1),s=1.25*h*(t?5:1),i=v(0,n),o=v(0,_),l=v(0,360)*Math.PI/180;let r;v(0,2)?(r=this.collisions.createCircle(i,o,v(e,s)),++this.circles):(r=this.collisions.createPolygon(i,o,[[-v(e,s),-v(e,s)],[v(e,s),-v(e,s)],[v(e,s),v(e,s)],[-v(e,s),v(3,h)]],v(0,360)*Math.PI/180),++this.polygons),r.direction_x=Math.cos(l),r.direction_y=Math.sin(l),this.bodies.push(r)}}function v(t,e){return Math.floor(Math.random()*e)+t}},function(t,e,s){const i=s(0);class o extends i{constructor(t=0,e=0,s=0){super(t,e,[[0,0]],0,1,1,s),this._point=!0}}o.prototype.setPoints=void 0,t.exports=o,t.exports.default=t.exports},function(t,e,s){const i=s(3);t.exports=class extends i{constructor(t=0,e=0,s=0,i=1,o=0){super(t,e,o),this.radius=s,this.scale=i}draw(t){const e=this.x,s=this.y,i=this.radius*this.scale;t.moveTo(e+i,s),t.arc(e,s,i,0,2*Math.PI)}},t.exports.default=t.exports},function(t,e){const s=[];class i{constructor(){this._bvh_parent=null,this._bvh_branch=!0,this._bvh_left=null,this._bvh_right=null,this._bvh_sort=0,this._bvh_min_x=0,this._bvh_min_y=0,this._bvh_max_x=0,this._bvh_max_y=0}static getBranch(){return s.length?s.pop():new i}static releaseBranch(t){s.push(t)}static sortBranches(t,e){return t.sort>e.sort?-1:1}}t.exports=i,t.exports.default=t.exports},function(t,e,s){const i=s(8);t.exports=class{constructor(){this._hierarchy=null,this._bodies=[],this._dirty_branches=[]}insert(t,e=!1){if(!e){const e=t._bvh;if(e&&e!==this)throw new Error("Body belongs to another collision system");t._bvh=this,this._bodies.push(t)}const s=t._polygon,o=t.x,n=t.y;s&&(t._dirty_coords||t.x!==t._x||t.y!==t._y||t.angle!==t._angle||t.scale_x!==t._scale_x||t.scale_y!==t._scale_y)&&t._calculateCoords();const _=t._bvh_padding,l=s?0:t.radius*t.scale,r=(s?t._min_x:o-l)-_,h=(s?t._min_y:n-l)-_,a=(s?t._max_x:o+l)+_,c=(s?t._max_y:n+l)+_;t._bvh_min_x=r,t._bvh_min_y=h,t._bvh_max_x=a,t._bvh_max_y=c;let y=this._hierarchy,v=0;if(y)for(;;){if(!y._bvh_branch){const e=y._bvh_parent,s=y._bvh_min_x,o=y._bvh_min_y,n=y._bvh_max_x,_=y._bvh_max_y,l=y._bvh_parent=t._bvh_parent=i.getBranch();l._bvh_parent=e,l._bvh_left=y,l._bvh_right=t,l._bvh_sort=v++,l._bvh_min_x=r<s?r:s,l._bvh_min_y=h<o?h:o,l._bvh_max_x=a>n?a:n,l._bvh_max_y=c>_?c:_,e?e._bvh_left===y?e._bvh_left=l:e._bvh_right=l:this._hierarchy=l;break}{const t=y._bvh_left,e=t._bvh_min_y,s=t._bvh_max_x,i=t._bvh_max_y,o=r<t._bvh_min_x?r:t._bvh_min_x,n=h<e?h:e,_=a>s?a:s,l=c>i?c:i,b=(_-o)*(l-n)-(s-t._bvh_min_x)*(i-e),x=y._bvh_right,u=x._bvh_min_x,d=x._bvh_min_y,p=x._bvh_max_x,m=x._bvh_max_y,f=r<u?r:u,g=h<d?h:d,w=a>p?a:p,P=c>m?c:m,C=(w-f)*(P-g)-(p-u)*(m-d);y._bvh_sort=v++,y._bvh_min_x=o<f?o:f,y._bvh_min_y=n<g?n:g,y._bvh_max_x=_>w?_:w,y._bvh_max_y=l>P?l:P,y=b<=C?t:x}}else this._hierarchy=t}remove(t,e=!1){if(!e){const e=t._bvh;if(e&&e!==this)throw new Error("Body belongs to another collision system");t._bvh=null,this._bodies.splice(this._bodies.indexOf(t),1)}if(this._hierarchy===t)return void(this._hierarchy=null);const s=t._bvh_parent,o=s._bvh_parent,n=s._bvh_left,_=n===t?s._bvh_right:n;if(_._bvh_parent=o,_._bvh_branch&&(_._bvh_sort=s._bvh_sort),o){o._bvh_left===s?o._bvh_left=_:o._bvh_right=_;let t=o;for(;t;){const e=t._bvh_left,s=e._bvh_min_x,i=e._bvh_min_y,o=e._bvh_max_x,n=e._bvh_max_y,_=t._bvh_right,l=_._bvh_min_x,r=_._bvh_min_y,h=_._bvh_max_x,a=_._bvh_max_y;t._bvh_min_x=s<l?s:l,t._bvh_min_y=i<r?i:r,t._bvh_max_x=o>h?o:h,t._bvh_max_y=n>a?n:a,t=t._bvh_parent}}else this._hierarchy=_;i.releaseBranch(s)}update(){const t=this._bodies,e=t.length;for(let s=0;s<e;++s){const e=t[s];let i=!1;if(i||e.padding===e._bvh_padding||(e._bvh_padding=e.padding,i=!0),!i){const t=e._polygon;t&&(e._dirty_coords||e.x!==e._x||e.y!==e._y||e.angle!==e._angle||e.scale_x!==e._scale_x||e.scale_y!==e._scale_y)&&e._calculateCoords();const s=e.x,o=e.y,n=t?0:e.radius*e.scale,_=t?e._min_x:s-n,l=t?e._min_y:o-n,r=t?e._max_x:s+n,h=t?e._max_y:o+n;i=_<e._bvh_min_x||l<e._bvh_min_y||r>e._bvh_max_x||h>e._bvh_max_y}i&&(this.remove(e,!0),this.insert(e,!0))}}potentials(t){const e=[],s=t._bvh_min_x,i=t._bvh_min_y,o=t._bvh_max_x,n=t._bvh_max_y;let _=this._hierarchy,l=!0;if(!_||!_._bvh_branch)return e;for(;_;){if(l){l=!1;let t=_._bvh_branch?_._bvh_left:null;for(;t&&t._bvh_max_x>=s&&t._bvh_max_y>=i&&t._bvh_min_x<=o&&t._bvh_min_y<=n;)t=(_=t)._bvh_branch?_._bvh_left:null}const r=_._bvh_branch,h=r?_._bvh_right:null;if(h&&h._bvh_max_x>s&&h._bvh_max_y>i&&h._bvh_min_x<o&&h._bvh_min_y<n)_=h,l=!0;else{r||_===t||e.push(_);let s=_._bvh_parent;if(!s)break;for(;s&&s._bvh_right===_;)s=(_=s)._bvh_parent;_=s}}return e}draw(t){const e=this._bodies,s=e.length;for(let i=0;i<s;++i)e[i].draw(t)}drawBVH(t){let e=this._hierarchy,s=!0;for(;e;){if(s){s=!1;let t=e._bvh_branch?e._bvh_left:null;for(;t;)t=(e=t)._bvh_branch?e._bvh_left:null}const i=e._bvh_branch,o=e._bvh_min_x,n=e._bvh_min_y,_=e._bvh_max_x,l=e._bvh_max_y,r=i?e._bvh_right:null;if(t.moveTo(o,n),t.lineTo(_,n),t.lineTo(_,l),t.lineTo(o,l),t.lineTo(o,n),r)e=r,s=!0;else{let t=e._bvh_parent;if(!t)break;for(;t&&t._bvh_right===e;)t=(e=t)._bvh_parent;e=t}}}},t.exports.default=t.exports},function(t,e,s){"use strict";s.r(e),s.d(e,"default",function(){return l});const i=s(4),o=800,n=600,_=i.createResult();class l{constructor(){const t=new i;this.element=document.createElement("div"),this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.collisions=t,this.bodies=[],this.canvas.width=o,this.canvas.height=n,this.player=null,this.up=!1,this.down=!1,this.left=!1,this.right=!1,this.element.innerHTML='\n\t\t\t<div><b>W, S</b> - Accelerate/Decelerate</div>\n\t\t\t<div><b>A, D</b> - Turn</div>\n\t\t\t<div><label><input id="bvh" type="checkbox"> Show Bounding Volume Hierarchy</label></div>\n\t\t';const e=t=>{const e="keydown"===t.type,s=t.key.toLowerCase();"w"===s&&(this.up=e),"s"===s&&(this.down=e),"a"===s&&(this.left=e),"d"===s&&(this.right=e)};document.addEventListener("keydown",e),document.addEventListener("keyup",e),this.bvh_checkbox=this.element.querySelector("#bvh"),this.element.appendChild(this.canvas),this.createPlayer(400,300),this.createMap();const s=()=>{this.update(),requestAnimationFrame(s)};s()}update(){this.handleInput(),this.processGameLogic(),this.handleCollisions(),this.render()}handleInput(){this.up&&(this.player.velocity+=.1),this.down&&(this.player.velocity-=.1),this.left&&(this.player.angle-=.04),this.right&&(this.player.angle+=.04)}processGameLogic(){const t=Math.cos(this.player.angle),e=Math.sin(this.player.angle);this.player.velocity>0?(this.player.velocity-=.05,this.player.velocity>3&&(this.player.velocity=3)):this.player.velocity<0&&(this.player.velocity+=.05,this.player.velocity<-2&&(this.player.velocity=-2)),Math.round(100*this.player.velocity)||(this.player.velocity=0),this.player.velocity&&(this.player.x+=t*this.player.velocity,this.player.y+=e*this.player.velocity)}handleCollisions(){this.collisions.update();const t=this.player.potentials();for(const e of t)this.player.collides(e,_)&&(this.player.x-=_.overlap*_.overlap_x,this.player.y-=_.overlap*_.overlap_y,this.player.velocity*=.9)}render(){this.context.fillStyle="#000000",this.context.fillRect(0,0,800,600),this.context.strokeStyle="#FFFFFF",this.context.beginPath(),this.collisions.draw(this.context),this.context.stroke(),this.bvh_checkbox.checked&&(this.context.strokeStyle="#00FF00",this.context.beginPath(),this.collisions.drawBVH(this.context),this.context.stroke())}createPlayer(t,e){this.player=this.collisions.createPolygon(t,e,[[-20,-10],[20,-10],[20,10],[-20,10]],.2),this.player.velocity=0}createMap(){this.collisions.createPolygon(0,0,[[0,0],[o,0]]),this.collisions.createPolygon(0,0,[[o,0],[o,n]]),this.collisions.createPolygon(0,0,[[o,n],[0,n]]),this.collisions.createPolygon(0,0,[[0,n],[0,0]]),this.collisions.createPolygon(100,100,[[-50,-50],[50,-50],[50,50],[-50,50]],.4),this.collisions.createPolygon(190,105,[[-20,-20],[20,-20],[20,20],[-20,20]],.4),this.collisions.createCircle(170,140,8),this.collisions.createCircle(185,155,8),this.collisions.createCircle(165,165,8),this.collisions.createCircle(145,165,8),this.collisions.createPolygon(230,50,[[-150,-30],[150,-30],[150,30],[-150,30]],.4),this.collisions.createPolygon(100,500,[[-40,-50],[40,-50],[50,50],[-50,50]],.2),this.collisions.createCircle(180,490,20),this.collisions.createCircle(175,540,20),this.collisions.createPolygon(400,500,[[-60,-20],[60,-20],[60,20],[-60,20]],1.7),this.collisions.createPolygon(350,494,[[-60,-20],[60,-20],[60,20],[-60,20]],1.7),this.collisions.createPolygon(750,0,[[0,0],[-20,100]]),this.collisions.createPolygon(750,0,[[-20,100],[30,250]]),this.collisions.createPolygon(750,0,[[30,250],[20,300]]),this.collisions.createPolygon(750,0,[[20,300],[-50,320]]),this.collisions.createPolygon(750,0,[[-50,320],[-90,500]]),this.collisions.createPolygon(750,0,[[-90,500],[-200,600]]),this.collisions.createPolygon(550,100,[[-60,-20],[-20,-40],[30,-30],[60,20],[40,70],[10,100],[-30,110],[-80,90],[-110,50],[-100,20]])}}},function(t,e,s){const i=s(10),o=s(5);let n;switch(window.location.search){case"?stress":n=new o;break;default:n=new i}document.body.appendChild(n.element)}]);