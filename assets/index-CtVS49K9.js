(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function i(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=i(s);fetch(s.href,n)}})();const C=()=>{const e=document.getElementById("themeToggle");if(!e)return;const t=()=>localStorage.getItem("portfolio-theme")||"light",i=o=>{document.documentElement.setAttribute("data-theme",o),localStorage.setItem("portfolio-theme",o)};i(t()),e.addEventListener("click",()=>{const o=t()==="light"?"dark":"light";i(o)})};C();const D=()=>{const e=document.getElementById("scrollTop");e&&(window.addEventListener("scroll",()=>{window.scrollY>400?e.classList.add("visible"):e.classList.remove("visible")},{passive:!0}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))};D();const M=()=>{const e=document.getElementById("heroCanvas");if(!e)return;const t=e.getContext("2d");let i=[],o={x:null,y:null};const s=()=>{const l=e.parentElement;e.width=l.offsetWidth,e.height=l.offsetHeight};s(),window.addEventListener("resize",s);const n=()=>document.documentElement.getAttribute("data-theme")==="dark";class r{constructor(){this.x=Math.random()*e.width,this.y=Math.random()*e.height,this.vx=(Math.random()-.5)*.5,this.vy=(Math.random()-.5)*.5,this.r=Math.random()*2+1}update(){if(this.x+=this.vx,this.y+=this.vy,(this.x<0||this.x>e.width)&&(this.vx*=-1),(this.y<0||this.y>e.height)&&(this.vy*=-1),o.x!==null){const a=this.x-o.x,m=this.y-o.y,h=Math.sqrt(a*a+m*m);h<120&&(this.x+=a/h*1.5,this.y+=m/h*1.5)}}draw(){const a=n();t.beginPath(),t.arc(this.x,this.y,this.r,0,Math.PI*2),t.fillStyle=a?`rgba(129, 140, 248, ${.3+this.r*.15})`:`rgba(99, 102, 241, ${.25+this.r*.1})`,t.fill()}}const c=Math.min(80,Math.floor(e.width*e.height/12e3));for(let l=0;l<c;l++)i.push(new r);const u=()=>{t.clearRect(0,0,e.width,e.height);const l=n();i.forEach(a=>{a.update(),a.draw()});for(let a=0;a<i.length;a++)for(let m=a+1;m<i.length;m++){const h=i[a].x-i[m].x,L=i[a].y-i[m].y,b=Math.sqrt(h*h+L*L);b<150&&(t.beginPath(),t.moveTo(i[a].x,i[a].y),t.lineTo(i[m].x,i[m].y),t.strokeStyle=l?`rgba(129, 140, 248, ${.08*(1-b/150)})`:`rgba(99, 102, 241, ${.06*(1-b/150)})`,t.lineWidth=.5,t.stroke())}requestAnimationFrame(u)};u(),e.parentElement.addEventListener("mousemove",l=>{const a=e.getBoundingClientRect();o.x=l.clientX-a.left,o.y=l.clientY-a.top}),e.parentElement.addEventListener("mouseleave",()=>{o.x=null,o.y=null})};window.innerWidth>768&&!("ontouchstart"in window)&&M();const q=()=>{const e=document.querySelectorAll(".section-header, .about-text, .about-image, .skill-card, .certificate-card, .project-card, .contact-info, .form-section"),t=new IntersectionObserver(i=>{i.forEach(o=>{o.isIntersecting&&(o.target.classList.add("animate"),t.unobserve(o.target))})},{threshold:.1,rootMargin:"0px 0px -50px 0px"});e.forEach(i=>t.observe(i))};q();(function(){const e=document.createElement("style");e.textContent=`
    .image-card {
      overflow: hidden !important;
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    .image-card::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }
    .career-timeline {
      overflow: hidden !important;
    }
  `,document.head.appendChild(e)})();const g=document.querySelector(".navbar"),v=document.querySelector(".hamburger"),x=document.querySelector(".nav-menu"),k=document.querySelectorAll(".nav-link"),j=document.querySelectorAll('.btn[href^="#"]'),P=document.querySelectorAll("section"),p=document.querySelector(".contact-form"),f=document.querySelector(".fab-button");window.addEventListener("scroll",()=>{window.scrollY>50?g.classList.add("scrolled"):g.classList.remove("scrolled")});v.addEventListener("click",()=>{v.classList.toggle("active"),x.classList.toggle("active")});k.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const i=e.getAttribute("href"),o=document.querySelector(i);v.classList.remove("active"),x.classList.remove("active"),o&&setTimeout(()=>{const s=g.offsetHeight,n=o.offsetTop-s;window.scrollTo({top:n,behavior:"smooth"}),k.forEach(r=>r.classList.remove("active")),e.classList.add("active")},150)})});f&&f.addEventListener("click",()=>{f.classList.add("launched");const e=f.querySelector(".fab-text"),t=e.textContent;e.textContent="✓ Done";const i=f.querySelector(".fab-icon");i&&(i.style.animation="iconBounceDown 0.5s ease"),setTimeout(()=>{e.textContent=t,f.classList.remove("launched"),i&&(i.style.animation="")},2500)});function S(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768}j.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const i=e.getAttribute("href"),o=document.querySelector(i);if(o){const s=g.offsetHeight,n=o.offsetTop-s;window.scrollTo({top:n,behavior:"smooth"})}})});const I={threshold:[.1,.5,.7],rootMargin:"-20% 0px -30% 0px"},B=new IntersectionObserver(e=>{let t=0,i=null;if(e.forEach(o=>{o.intersectionRatio>t&&(t=o.intersectionRatio,i=o)}),i&&t>.1){k.forEach(s=>{s.classList.remove("active")});const o=document.querySelector(`.nav-link[href="#${i.target.id}"]`);o&&o.classList.add("active")}},I);P.forEach(e=>{B.observe(e)});window.addEventListener("scroll",()=>{const e=window.pageYOffset,t=document.querySelector(".hero-visual"),i=document.querySelector(".hero-text");if(t&&i){const o=e*-.5;t.style.transform=`translateY(${o}px)`;const s=1-e/window.innerHeight;if(s>=0)if(S()){const n=i.querySelector(".hero-title"),r=i.querySelector(".hero-description"),c=i.querySelector(".hero-buttons");n&&(n.style.opacity=s),r&&(r.style.opacity=s),c&&(c.style.opacity="1",c.style.filter="none",c.style.transform="translateZ(0)",c.style.backfaceVisibility="hidden")}else i.style.opacity=s}});const O=()=>{document.querySelectorAll(".stat-number").forEach(t=>{const i=t.textContent,o=parseInt(i),s=i.includes("+"),n=o/100;let r=0;const c=()=>{r<o?(r+=n,t.textContent=Math.floor(r)+(s?"+":""),requestAnimationFrame(c)):t.textContent=o+(s?"+":"")};c()})},F=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("animate"),t.target.classList.contains("about-stats")&&O())})},{threshold:.1}),H=document.querySelectorAll(".skill-card, .project-card, .contact-item, .about-stats, .stat-item");H.forEach(e=>{F.observe(e)});if(p){const e="cb382b6c-8698-4bd2-b664-25db5bb22cfb";p.addEventListener("submit",async t=>{t.preventDefault();const i=p.querySelector('button[type="submit"]'),o=i.querySelector(".btn-text"),s=i.querySelector(".btn-loading"),n=document.getElementById("form-status"),r=p.querySelector("#name").value.trim(),c=p.querySelector("#email").value.trim(),u=p.querySelector("#message").value.trim();if(!r||!c||!u){n&&(n.className="form-status error",n.textContent="❌ Please fill in all fields.",n.style.display="block");return}i.disabled=!0,o&&(o.style.display="none"),s&&(s.style.display="inline"),n&&(n.style.display="none");try{const a=await(await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({access_key:e,subject:`Portfolio Contact: ${r}`,from_name:r,email:c,message:u})})).json();if(a.success)n&&(n.className="form-status success",n.textContent="✅ Message sent successfully! I will get back to you soon.",n.style.display="block"),p.reset();else throw new Error(a.message||"Submission failed")}catch(l){console.error("Form submission error:",l),n&&(n.className="form-status error",n.textContent="❌ Failed to send message. Please try again or contact me directly at soumadipbasu333@gmail.com",n.style.display="block")}finally{i.disabled=!1,o&&(o.style.display="inline"),s&&(s.style.display="none"),setTimeout(()=>{n&&(n.style.display="none")},7e3)}})}const W=()=>{const e=[];for(let n=0;n<10;n++){const r=document.createElement("div");r.className="cursor-trail",r.style.cssText=`
      position: fixed;
      width: 4px;
      height: 4px;
      background: var(--primary-color);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: ${(10-n)/10};
      transition: opacity 0.3s ease;
    `,document.body.appendChild(r),e.push(r)}let i=0,o=0;document.addEventListener("mousemove",n=>{i=n.clientX,o=n.clientY});const s=()=>{let n=i,r=o;e.forEach((c,u)=>{const l=e[u+1]||e[0];c.style.left=n+"px",c.style.top=r+"px",n+=(parseInt(l.style.left)||i-n)*.3,r+=(parseInt(l.style.top)||o-r)*.3}),requestAnimationFrame(s)};s()};window.innerWidth>768&&!("ontouchstart"in window)&&W();window.addEventListener("load",()=>{document.body.classList.add("loaded"),setTimeout(()=>{document.querySelectorAll(".hero-title .title-line, .hero-description, .hero-buttons").forEach((t,i)=>{setTimeout(()=>{t.style.opacity="1",t.style.transform="translateY(0)"},i*200)})},300)});document.addEventListener("keydown",e=>{e.key==="Escape"&&(v.classList.remove("active"),x.classList.remove("active"))});let w;window.addEventListener("scroll",()=>{w&&window.cancelAnimationFrame(w),w=window.requestAnimationFrame(()=>{})});const $=()=>{document.querySelectorAll(".btn").forEach(i=>{i.addEventListener("mouseenter",()=>{i.style.transform="translateY(-2px) scale(1.02)"}),i.addEventListener("mouseleave",()=>{i.style.transform=""})}),document.querySelectorAll(".skill-card, .project-card").forEach(i=>{i.addEventListener("mousemove",o=>{const s=i.getBoundingClientRect(),n=o.clientX-s.left,r=o.clientY-s.top,c=s.width/2,u=s.height/2,l=(r-u)/10,a=(c-n)/10;i.style.transform=`perspective(1000px) rotateX(${l}deg) rotateY(${a}deg) translateZ(0)`}),i.addEventListener("mouseleave",()=>{i.style.transform=""})})},A=()=>{window.innerWidth<=768&&([{selector:".nav-logo .logo-text",duration:200},{selector:".nav-link",duration:300},{selector:".btn",duration:200},{selector:".floating-card",duration:400},{selector:".professional-photo",duration:300},{selector:".stat-item",duration:300},{selector:".image-card",duration:400},{selector:".skill-card",duration:400},{selector:".project-card",duration:400},{selector:".project-link",duration:200},{selector:".tech-tag",duration:200},{selector:".contact-item",duration:300},{selector:".social-link",duration:200}].forEach(({selector:o,duration:s})=>{document.querySelectorAll(o).forEach(r=>{let c;r.addEventListener("touchstart",()=>{r.classList.add("mobile-hover"),navigator.vibrate&&navigator.vibrate(30)},{passive:!0}),r.addEventListener("touchend",()=>{c=setTimeout(()=>{r.classList.remove("mobile-hover")},s)},{passive:!0}),r.addEventListener("touchcancel",()=>{clearTimeout(c),r.classList.remove("mobile-hover")}),(o.includes("nav-link")||o.includes("btn")||o.includes("project-link")||o.includes("social-link"))&&r.addEventListener("click",u=>{r.style.transform="scale(0.95)",setTimeout(()=>{r.style.transform=""},100)})})}),document.querySelectorAll(".project-card").forEach(o=>{const s=o.querySelector(".project-overlay");o.querySelectorAll(".project-link"),o.addEventListener("touchstart",()=>{s&&(s.style.opacity="1")}),o.addEventListener("touchend",()=>{setTimeout(()=>{s&&(s.style.opacity="")},2e3)})}),document.querySelectorAll(".skill-card").forEach(o=>{o.querySelector(".skill-icon");let s;o.addEventListener("touchstart",n=>{o.classList.add("mobile-hover"),navigator.vibrate&&navigator.vibrate(30),clearTimeout(s)},{passive:!0}),o.addEventListener("touchend",n=>{s=setTimeout(()=>{o.classList.remove("mobile-hover")},500)},{passive:!0}),o.addEventListener("touchcancel",()=>{clearTimeout(s),o.classList.remove("mobile-hover")},{passive:!0}),o.addEventListener("touchmove",()=>{clearTimeout(s),s=setTimeout(()=>{o.classList.remove("mobile-hover")},200)},{passive:!0})}))};$();A();const N=()=>{window.innerWidth<=768&&(console.log("Mobile view detected - touch events enabled"),document.addEventListener("touchstart",e=>{const t=e.target.closest(".skill-card");t&&console.log("Touch started on skill card:",t)},{passive:!0}))};N();window.addEventListener("resize",()=>{document.querySelectorAll(".mobile-hover").forEach(e=>{e.classList.remove("mobile-hover")}),A()});console.log("Portfolio loaded successfully! ✨");window.debugMobileForm=function(){const e=document.querySelector(".contact-form"),t=e?.querySelector('button[type="submit"]');if(console.log("=== Mobile Form Debug ==="),console.log("Form element:",e),console.log("Submit button:",t),console.log("Form ID:",e?.id),console.log("Button type:",t?.type),console.log("Is mobile device:",/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),console.log("Window width:",window.innerWidth),console.log("Touch support:","ontouchstart"in window),console.log("EmailJS loaded:",typeof emailjs<"u"),t&&console.log("Button styles:",{pointerEvents:getComputedStyle(t).pointerEvents,touchAction:getComputedStyle(t).touchAction,userSelect:getComputedStyle(t).userSelect,position:getComputedStyle(t).position,zIndex:getComputedStyle(t).zIndex}),e&&t){console.log("Testing manual form submission...");const i=new Event("submit",{bubbles:!0,cancelable:!0});e.dispatchEvent(i)}};function T(){const e=document.getElementById("github-link"),t=document.getElementById("linkedin-link");function i(o,s){console.log(`${s} link clicked on mobile`);try{if(!window.open(o,"_blank","noopener,noreferrer")){console.log("Window.open failed, trying alternative method");const r=document.createElement("a");r.href=o,r.target="_blank",r.rel="noopener noreferrer",document.body.appendChild(r),r.click(),document.body.removeChild(r)}}catch(n){console.log("Error opening link:",n);const r=document.createElement("a");r.href=o,r.target="_blank",r.rel="noopener noreferrer",document.body.appendChild(r),r.click(),document.body.removeChild(r)}}e&&(e.removeEventListener("click",()=>{}),e.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),console.log("GitHub link clicked"),i("https://github.com/soumadipbasupersonalgithub","GitHub")}),e.addEventListener("touchend",o=>{o.preventDefault(),o.stopPropagation(),console.log("GitHub link touched"),i("https://github.com/soumadipbasupersonalgithub","GitHub")},{passive:!1})),t&&(t.removeEventListener("click",()=>{}),t.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),console.log("LinkedIn link clicked"),i("https://www.linkedin.com/in/soumadip-basu-b47160197/","LinkedIn")}),t.addEventListener("touchend",o=>{o.preventDefault(),o.stopPropagation(),console.log("LinkedIn link touched"),i("https://www.linkedin.com/in/soumadip-basu-b47160197/","LinkedIn")},{passive:!1}))}document.addEventListener("DOMContentLoaded",()=>{T()});window.addEventListener("load",()=>{T()});const Y={"healthcare-frameworks":{title:"⚙️ SDK Validation Framework",company:"Deloitte",overview:"<ul><li>As a Quality Assurance Professional, my key responsibility is to draft comprehensive testing protocols for a healthcare SDK supporting medicine tracking and smart device connectivity.</li><li>Led end-to-end QA validation of Bluetooth Low Energy (BLE) communication, ensuring seamless operation and cross-platform compatibility across iOS and Android ecosystems.</li><li>Developed and enhanced automation test scripts to expand coverage, validate new features, and optimize the QA process.</li><li>Conducted multiple iterations of sprint, informal, and formal testing, delivering a robust backend software framework used across multiple healthcare application backends.</li></ul>",technologies:["Raspberry Pi","Bluetooth Low Energy","Android Studio","Xcode","Selenium","Unit Testing","UI Automation"]},"healthcare-suite":{title:"💉 Hypercare, Madelyn & Logbook",company:"Deloitte",overview:"<ul><li>Served as QA for the Healthcare Mobile Suite, including Madelyn (patient health tracking) and Hypercare (medicine record management) applications.</li><li>Designed and implemented comprehensive functional & automation test scripts to ensure product quality and reliability.</li><li>Executed multiple regression testing, as well as formal end-to-end validation of patient-facing mobile applications as per FDA level.</li><li>Developed and maintained automation frameworks using JavaScript, Appium, and WebDriverIO to enable efficient and scalable product testing.</li><li>Focused on defect tracking & maximizing test coverage after every sprint to streamline quality assurance processes for an optimal user experience.</li></ul>",technologies:["WebDriverIO","Cucumber","JavaScript","Manual Testing","Test Automation","Appium","Regression Testing"]},dotcom:{title:"🌐 Dot.com",company:"Deloitte",overview:"<ul><li>Served as QA for an enterprise web platform, focusing on digital experiences tailored for diverse patient groups in the healthcare sector.</li><li>Gained in-depth understanding of Adobe Experience Manager (AEM) components to design effective and targeted test strategies.</li><li>Performed end-to-end QA activities, including requirements analysis, test planning, execution, defect tracking, and preparing comprehensive test summary reports for clients.</li><li>Conducted accessibility compliance testing in alignment with WCAG standards to ensure the platform met essential inclusivity criteria.</li><li>Developed automation frameworks from scratch, enabling efficient regression and functional testing.</li><li>Introduced and implemented AI agent-driven automation processes with integration to the MCP server, enhancing overall test coverage and efficiency.</li></ul>",technologies:["Adobe Experience Manager","Playwright","Functional Testing","Accessibility Testing","Performance Testing","Test Automation"]},"cloud-atf":{title:"☁️ Cloud ATF (Network Testing Portal)",company:"Alethea Communications",overview:"<ul><li>Served as a automation QA and my key role was to built a robust automation framework from scratch using Python and Robot Framework.</li><li>Developed a performance testing suite using Python and Locust to evaluate the cloud-based WLAN and broadband testing portal.</li><li>Engineered scalable infrastructure for WiFi 6 protocol validation and comprehensive network performance testing.</li><li>Automated UI and functional tests to ensure seamless device operation under varying conditions.</li><li>Validated portal performance and throughput metrics to enhance system reliability and scalability.</li></ul>",technologies:["Python","Robot Framework","Postman","Locust","Git"]},"sms-autosense":{title:"🤖 SMS Autosense",company:"Alethea Communications",overview:"Machine Learning-driven mobile application for industrial condition helath monitoring of the APIs. My key responsibility was to update the automation code in JavaScript using Katalon Studio to validate the new features and regression.",technologies:["Katalon Studio","JavaScript","Postman","API Testing"]},"mobile-devices":{title:"📱 XP8 & XP5",company:"Sonim Technologies",overview:"As a Functional QA my responsibility is to perform the comprehensive testing of rugged Android satellite smartphone builds across multiple US mobile device variants. Executed functional and sprint testing protocols for industrial-grade mobile devices & accessories.",technologies:["Android","ADB log analyzing","Bluetooth Testing","Satellite Network Testing","GPS Testing","Camera Testing","Audio Testing"]}},d=document.getElementById("projectModal"),R=document.getElementById("modalContent"),U=document.querySelector(".close");function E(e){const t=Y[e];if(!t)return;const i=`
    <div class="project-detail">
      <div class="project-detail-header">
        <h2 class="project-detail-title">${t.title}</h2>
        <div class="project-detail-client">
          <span class="parent-company-tag">${t.company}</span>
        </div>
        <h3 class="project-detail-subtitle">Roles & Responsibilities</h3>
        <div class="project-detail-overview">
          ${t.overview}
        </div>
      </div>

      <div class="project-sections">
        <div class="project-section">
          <h3 class="project-section-title">🛠️ Tools & Technologies</h3>
          <div class="project-tech-grid">
            ${t.technologies.map(o=>`
              <span class="tech-badge">${o}</span>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;R.innerHTML=i,d.style.display="block",setTimeout(()=>{d.classList.add("show")},10),document.body.style.overflow="hidden",window.history.pushState({modalOpen:!0,projectKey:e},"",window.location.href)}function y(){d.classList.remove("show"),setTimeout(()=>{d.style.display="none",document.body.style.overflow="",window.history.state&&window.history.state.modalOpen&&window.history.back()},300)}document.addEventListener("click",e=>{if(e.target.classList.contains("project-link")){e.preventDefault(),e.stopPropagation();const t=e.target.getAttribute("data-project");t&&E(t)}});document.addEventListener("touchend",e=>{if(e.target.classList.contains("project-link")){e.preventDefault(),e.stopPropagation();const t=e.target.getAttribute("data-project");if(t){const i=e.target.closest(".project-card");i&&window.innerWidth<=768?(z(i),setTimeout(()=>{E(t)},300)):E(t)}}},{passive:!1});function z(e){e.classList.add("card-flipping"),setTimeout(()=>{e.classList.remove("card-flipping")},600)}function V(e,t){const i=document.createElement("div");i.classList.add("ripple");const o=e.getBoundingClientRect(),s=Math.max(o.width,o.height),n=(t.touches?t.touches[0].clientX:t.clientX)-o.left-s/2,r=(t.touches?t.touches[0].clientY:t.clientY)-o.top-s/2;i.style.width=i.style.height=s+"px",i.style.left=n+"px",i.style.top=r+"px",e.style.position="relative",e.appendChild(i),setTimeout(()=>{i.parentNode&&i.parentNode.removeChild(i)},600)}document.addEventListener("touchstart",e=>{if(window.innerWidth<=768){const t=e.target.closest(".project-card");t&&(t.classList.add("card-pressed"),V(t,e))}},{passive:!1});document.addEventListener("touchend",e=>{if(window.innerWidth<=768){const t=e.target.closest(".project-card");t&&setTimeout(()=>{t.classList.remove("card-pressed")},150)}},{passive:!1});U.addEventListener("click",y);d.addEventListener("click",e=>{e.target===d&&y()});document.addEventListener("keydown",e=>{e.key==="Escape"&&d.classList.contains("show")&&y()});"ontouchstart"in window&&d.addEventListener("touchstart",e=>{e.target===d&&y()});window.addEventListener("popstate",e=>{d.classList.contains("show")&&(d.classList.remove("show"),setTimeout(()=>{d.style.display="none",document.body.style.overflow=""},300));const t=document.querySelector(".verification-modal");if(t){t.remove(),document.body.style.overflow="";const i=document.getElementById("certifications");if(i){const o=i.getBoundingClientRect(),s=window.pageYOffset||document.documentElement.scrollTop,n=o.top+s-(S()?90:80);window.scrollTo({top:n,behavior:"smooth"})}}});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".certificate-verify"),t={"codeacademy-001":{title:"Learn JavaScript",issuer:"Codecademy",verificationUrl:"https://www.codecademy.com/profiles/tag5735900943/certificates/705dcb15de0da4dd9d9fc4f3274b430e",status:"Valid",issuedDate:"June 2023",expiryDate:"N/A"},"istqb-001":{title:"Robot Framework with Python-Selenium API Automation Testing",issuer:"Udemy",verificationUrl:"https://www.udemy.com/certificate/UC-c2dcfc91-df9c-4fc1-a502-ef4b1940e034/",status:"Valid",issuedDate:"May 2020",expiryDate:"No Expiration Date"},"python-001":{title:"Learn Python 3",issuer:"Codecademy",verificationUrl:"https://www.codecademy.com/profiles/tag5735900943/certificates/6c152bd262967f8c941c9707ed636bda",status:"Valid",issuedDate:"April 2024",expiryDate:"No Expiration Date"},"automation-001":{title:"WebDriverIO + Node.js -JavaScript UI Automation from Scratch",issuer:"Udemy",verificationUrl:"https://www.udemy.com/certificate/UC-4ea0c12b-e958-4337-82a5-d4e8aebd8bc8/",status:"Valid",issuedDate:"June 2023",expiryDate:"No Expiration Date"},"git-001":{title:"Learn Git & GitHub Course",issuer:"Codecademy",verificationUrl:"https://www.codecademy.com/profiles/tag5735900943/certificates/a8ab218d5950c29861635cc0bf12fd13",status:"Valid",issuedDate:"May 2024",expiryDate:"No Expiration Date"},"ai-001":{title:"Gen AI and AI agent integration in software testing",issuer:"Udemy",verificationUrl:"https://",status:"Valid",issuedDate:"September 2025",expiryDate:"No Expiration Date"},"playwright-001":{title:"Playwright 101 Certification",issuer:"TestMu AI",verificationUrl:"https://www.testmuai.com/certified/P101-3593BG/",status:"Valid",issuedDate:"March 2026",expiryDate:"March 2028"}};e.forEach(i=>{i.addEventListener("click",o=>{o.preventDefault();const s=i.getAttribute("data-cert-id"),n=t[s];if(n){const r=`
          <div class="verification-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
          ">
            <div style="
              background: white;
              padding: 2rem;
              border-radius: 20px;
              max-width: 500px;
              width: 90%;
              max-height: 80vh;
              overflow-y: auto;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            ">
              <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid #eee;
                padding-bottom: 1rem;
              ">
                <h3 style="
                  margin: 0;
                  color: #1f2937;
                  font-size: 1.5rem;
                  font-weight: 700;
                ">Certificate Verification</h3>
                <button class="close-verification" style="
                  background: none;
                  border: none;
                  font-size: 1.5rem;
                  cursor: pointer;
                  color: #6b7280;
                  padding: 0;
                  width: 30px;
                  height: 30px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 50%;
                  transition: all 0.2s ease;
                " onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">×</button>
              </div>

              <div style="margin-bottom: 1.5rem;">
                <div style="
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                  margin-bottom: 1rem;
                ">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: #10b981;">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span style="
                    color: #10b981;
                    font-weight: 600;
                    font-size: 1.1rem;
                  ">Certificate Verified ✓</span>
                </div>

                <h4 style="
                  margin: 0 0 0.5rem 0;
                  color: #1f2937;
                  font-size: 1.25rem;
                  font-weight: 600;
                ">${n.title}</h4>

                <p style="
                  margin: 0 0 1rem 0;
                  color: #6366f1;
                  font-weight: 600;
                ">Issued by: ${n.issuer}</p>

                <div style="
                  background: #f8fafc;
                  padding: 1rem;
                  border-radius: 12px;
                  margin-bottom: 1rem;
                ">
                  <div style="margin-bottom: 0.5rem;">
                    <strong style="color: #374151;">Status:</strong>
                    <span style="color: #10b981; font-weight: 600;">${n.status}</span>
                  </div>
                  <div style="margin-bottom: 0.5rem;">
                    <strong style="color: #374151;">Issued:</strong> ${n.issuedDate}
                  </div>
                  <div>
                    <strong style="color: #374151;">Expires:</strong> ${n.expiryDate}
                  </div>
                </div>

                <p style="
                  color: #6b7280;
                  font-size: 0.9rem;
                  line-height: 1.5;
                  margin: 0;
                ">This course completion certificate has been verified against the issuer's database. The credential is authentic and current.</p>
              </div>

              <div style="
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
              ">
                <a href="${n.verificationUrl}" target="_blank" rel="noopener noreferrer" style="
                  background: linear-gradient(135deg, #6366f1, #8b5cf6);
                  color: white;
                  text-decoration: none;
                  padding: 0.75rem 1.5rem;
                  border-radius: 12px;
                  font-weight: 600;
                  flex: 1;
                  text-align: center;
                  transition: all 0.3s ease;
                  min-width: 140px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 0.5rem;
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(99, 102, 241, 0.3)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                  <span>View Certificate</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0;">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="15,3 21,3 21,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
                <button class="close-verification" style="
                  background: #f3f4f6;
                  color: #374151;
                  border: 1px solid #d1d5db;
                  padding: 0.75rem 1.5rem;
                  border-radius: 12px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  min-width: 100px;
                " onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">
                  Close
                </button>
              </div>
            </div>
          </div>
        `;document.body.insertAdjacentHTML("beforeend",r);const c=document.querySelector(".verification-modal");document.body.style.overflow="hidden",window.history.pushState({verificationOpen:!0},"",window.location.href),c.querySelectorAll(".close-verification").forEach(a=>{a.addEventListener("click",()=>window.history.back())}),c.addEventListener("click",a=>{a.target===c&&window.history.back()});const l=a=>{a.key==="Escape"&&(window.history.back(),document.removeEventListener("keydown",l))};document.addEventListener("keydown",l)}})})});
