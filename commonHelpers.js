import{S as d,i as c}from"./assets/vendor-8c59ed88.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();function l(){return{searchForm:document.querySelector(".js-search-form"),galleryContainer:document.querySelector(".js-gallery"),loading:document.querySelector(".js-loading")}}const f=l();function h(o){const s=o.map(({webformatURL:a,largeImageURL:r,tags:e,likes:t,views:i,comments:m,downloads:u})=>`
          <li class="gallery-item">
            <div class="thumb">
              <a href="${r}">
                <img class="gallery-img" src="${a}" alt="${e}" />
              </a>
            </div>
            <div class="meta">
              <div class="meta-column">
                <h3 class="meta-title">Likes</h3>
                <p class="meta-text">${t}</p>
              </div>
              <div class="meta-column">
                <h3 class="meta-title">Views</h3>
                <p class="meta-text">${i}</p>
              </div>
              <div class="meta-column">
                <h3 class="meta-title">Comments</h3>
                <p class="meta-text">${m}</p>
              </div>
              <div class="meta-column">
                <h3 class="meta-title">Downloads</h3>
                <p class="meta-text">${u}</p>
              </div>
            </div>
          </li>
        `).join("");f.galleryContainer.innerHTML=s}const p="https://pixabay.com/api/";function g(o){const s=new URLSearchParams({key:"25232082-62f19a20a64b822fbbd43f9d6",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}),a=`${p}?${s}`;return fetch(a).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()})}const n=l(),y=new d(".js-gallery a",{captionsData:"alt",captionDelay:250});n.searchForm.addEventListener("submit",v);function v(o){o.preventDefault();const s=o.currentTarget,r=s.elements.query.value.trim();if(r==="")return c.warning({position:"topRight",message:"Search query can not be an empty string !"});n.galleryContainer.innerHTML="",n.loading.classList.remove("hidden"),g(r).then(({hits:e})=>{e.length===0&&c.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),h(e),y.refresh()}).catch(e=>{c.error({position:"topRight",message:"Sorry, something is wrong"})}).finally(()=>{s.reset(),n.loading.classList.add("hidden")})}
//# sourceMappingURL=commonHelpers.js.map
