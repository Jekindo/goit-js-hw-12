import{S as p,a as d,i as l}from"./assets/vendor-53a1b719.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();function u(){return{searchForm:document.querySelector(".js-search-form"),galleryContainer:document.querySelector(".js-gallery"),loading:document.querySelector(".js-loading")}}const y=new p(".js-gallery a",{captionsData:"alt",captionDelay:250}),b=u();function m(a){const t=a.map(({webformatURL:s,largeImageURL:o,tags:e,likes:r,views:c,comments:g,downloads:f})=>`
          <li class="gallery-item">
            <div class="thumb">
              <a href="${o}">
                <img class="gallery-img" src="${s}" alt="${e}" />
              </a>
            </div>
            <div class="meta">
              <div class="meta-column">
                <h3 class="meta-title">Likes</h3>
                <p class="meta-text">${r}</p>
              </div>
              <div class="meta-column">
                <h3 class="meta-title">Views</h3>
                <p class="meta-text">${c}</p>
              </div>
              <div class="meta-column">
                <h3 class="meta-title">Comments</h3>
                <p class="meta-text">${g}</p>
              </div>
              <div class="meta-column">
                <h3 class="meta-title">Downloads</h3>
                <p class="meta-text">${f}</p>
              </div>
            </div>
          </li>
        `).join("");b.galleryContainer.insertAdjacentHTML("beforeend",t),y.refresh()}d.defaults.baseURL="https://pixabay.com/api/";class v{constructor(){this.searchQuery="",this.page=1,this.perPage=15}async fetchImages(){const t=new URLSearchParams({key:"25232082-62f19a20a64b822fbbd43f9d6",q:this.searchQuery,page:this.page,per_page:this.perPage,image_type:"photo",orientation:"horizontal",safesearch:!0});try{return(await d.get(`?${t}`)).data}catch(s){throw console.error("Error fetching images:",s),s}}get query(){return this.searchQuery}set query(t){this.searchQuery=t}incrementPage(){this.page+=1}resetPage(){this.page=1}}class L{constructor({selector:t,hidden:s=!1}){this.refs=this.getRefs(t),s&&this.hide()}getRefs(t){const s={};return s.button=document.querySelector(t),s.label=s.button.querySelector(".btn__label"),s.spinner=s.button.querySelector(".spinner"),s}show(){this.refs.button.classList.remove("is-hidden")}hide(){this.refs.button.classList.add("is-hidden")}disable(){this.refs.button.disabled=!0,this.refs.label.textContent="Loading...",this.refs.spinner.classList.remove("is-hidden")}enable(){this.refs.button.disabled=!1,this.refs.label.textContent="Load more",this.refs.spinner.classList.add("is-hidden")}}const h=u(),i=new v,n=new L({selector:'[data-action="load-more"]',hidden:!0});h.searchForm.addEventListener("submit",w);n.refs.button.addEventListener("click",S);async function w(a){a.preventDefault();const t=a.currentTarget,o=t.elements.query.value.trim();if(o==="")return l.warning({position:"topRight",message:"Search query can not be an empty string !"});n.hide(),i.query=o,h.galleryContainer.innerHTML="",i.resetPage(),h.loading.classList.remove("hidden");try{const{hits:e,totalHits:r}=await i.fetchImages(o);if(e.length===0)return l.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});e.length<i.perPage?n.hide():n.show(),m(e),console.log("PixabayApiService.page",i.page)}catch{l.error({position:"topRight",message:"Sorry, something is wrong"})}finally{t.reset(),h.loading.classList.add("hidden")}}async function S(){n.disable();try{const{hits:a,totalHits:t}=await i.fetchImages(),s=Math.ceil(t/i.perPage);i.incrementPage(),i.page===s&&(n.hide(),l.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})),m(a),q()}catch{l.error({position:"topRight",message:"Sorry, something went wrong while loading more images."})}finally{n.enable()}}function q(){const t=document.querySelector(".gallery-img").getBoundingClientRect().height;window.scrollBy({left:0,top:t*4,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
