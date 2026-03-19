(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();const C=()=>{const e=document.getElementById("themeToggle");if(!e)return;const i=()=>localStorage.getItem("portfolio-theme")||"light",t=o=>{document.documentElement.setAttribute("data-theme",o),localStorage.setItem("portfolio-theme",o)};t(i()),e.addEventListener("click",()=>{const o=i()==="light"?"dark":"light";t(o)})};C();const D=()=>{const e=document.getElementById("scrollTop");e&&(window.addEventListener("scroll",()=>{window.scrollY>400?e.classList.add("visible"):e.classList.remove("visible")},{passive:!0}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))};D();const I=()=>{const e=document.getElementById("heroCanvas");if(!e)return;const i=e.getContext("2d");let t=[],o={x:null,y:null};const n=()=>{const c=e.parentElement;e.width=c.offsetWidth,e.height=c.offsetHeight};n(),window.addEventListener("resize",n);const s=()=>document.documentElement.getAttribute("data-theme")==="dark";class r{constructor(){this.x=Math.random()*e.width,this.y=Math.random()*e.height,this.vx=(Math.random()-.5)*.5,this.vy=(Math.random()-.5)*.5,this.r=Math.random()*2+1}update(){if(this.x+=this.vx,this.y+=this.vy,(this.x<0||this.x>e.width)&&(this.vx*=-1),(this.y<0||this.y>e.height)&&(this.vy*=-1),o.x!==null){const l=this.x-o.x,d=this.y-o.y,m=Math.sqrt(l*l+d*d);m<120&&(this.x+=l/m*1.5,this.y+=d/m*1.5)}}draw(){const l=s();i.beginPath(),i.arc(this.x,this.y,this.r,0,Math.PI*2),i.fillStyle=l?`rgba(129, 140, 248, ${.3+this.r*.15})`:`rgba(99, 102, 241, ${.25+this.r*.1})`,i.fill()}}const a=Math.min(80,Math.floor(e.width*e.height/12e3));for(let c=0;c<a;c++)t.push(new r);const u=()=>{i.clearRect(0,0,e.width,e.height);const c=s();t.forEach(l=>{l.update(),l.draw()});for(let l=0;l<t.length;l++)for(let d=l+1;d<t.length;d++){const m=t[l].x-t[d].x,g=t[l].y-t[d].y,w=Math.sqrt(m*m+g*g);w<150&&(i.beginPath(),i.moveTo(t[l].x,t[l].y),i.lineTo(t[d].x,t[d].y),i.strokeStyle=c?`rgba(129, 140, 248, ${.08*(1-w/150)})`:`rgba(99, 102, 241, ${.06*(1-w/150)})`,i.lineWidth=.5,i.stroke())}requestAnimationFrame(u)};u(),e.parentElement.addEventListener("mousemove",c=>{const l=e.getBoundingClientRect();o.x=c.clientX-l.left,o.y=c.clientY-l.top}),e.parentElement.addEventListener("mouseleave",()=>{o.x=null,o.y=null})};window.innerWidth>768&&!("ontouchstart"in window)&&I();const M=()=>{const e=document.querySelectorAll(".section-header, .about-text, .about-image, .skill-card, .certificate-card, .project-card, .contact-info, .form-section"),i=new IntersectionObserver(t=>{t.forEach(o=>{o.isIntersecting&&(o.target.classList.add("animate"),i.unobserve(o.target))})},{threshold:.1,rootMargin:"0px 0px -50px 0px"});e.forEach(t=>i.observe(t))};M();(function(){const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e)})();const v=document.querySelector(".navbar"),y=document.querySelector(".hamburger"),x=document.querySelector(".nav-menu"),k=document.querySelectorAll(".nav-link"),j=document.querySelectorAll('.btn[href^="#"]'),P=document.querySelectorAll("section"),f=document.querySelector(".contact-form"),h=document.querySelector(".fab-button");window.addEventListener("scroll",()=>{window.scrollY>50?v.classList.add("scrolled"):v.classList.remove("scrolled")});y.addEventListener("click",()=>{y.classList.toggle("active"),x.classList.toggle("active")});k.forEach(e=>{e.addEventListener("click",i=>{i.preventDefault();const t=e.getAttribute("href"),o=document.querySelector(t);y.classList.remove("active"),x.classList.remove("active"),o&&setTimeout(()=>{const n=v.offsetHeight,s=o.offsetTop-n;window.scrollTo({top:s,behavior:"smooth"}),k.forEach(r=>r.classList.remove("active")),e.classList.add("active")},150)})});h&&h.addEventListener("click",()=>{h.classList.add("launched");const e=h.querySelector(".fab-text"),i=e.textContent;e.textContent="✓ Done";const t=h.querySelector(".fab-icon");t&&(t.style.animation="iconBounceDown 0.5s ease"),setTimeout(()=>{e.textContent=i,h.classList.remove("launched"),t&&(t.style.animation="")},2500)});function S(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768}j.forEach(e=>{e.addEventListener("click",i=>{i.preventDefault();const t=e.getAttribute("href"),o=document.querySelector(t);if(o){const n=v.offsetHeight,s=o.offsetTop-n;window.scrollTo({top:s,behavior:"smooth"})}})});const q={threshold:[.1,.5,.7],rootMargin:"-20% 0px -30% 0px"},B=new IntersectionObserver(e=>{let i=0,t=null;if(e.forEach(o=>{o.intersectionRatio>i&&(i=o.intersectionRatio,t=o)}),t&&i>.1){k.forEach(n=>{n.classList.remove("active")});const o=document.querySelector(`.nav-link[href="#${t.target.id}"]`);o&&o.classList.add("active")}},q);P.forEach(e=>{B.observe(e)});window.addEventListener("scroll",()=>{const e=window.pageYOffset,i=document.querySelector(".hero-visual"),t=document.querySelector(".hero-text");if(i&&t){const o=e*-.5;i.style.transform=`translateY(${o}px)`;const n=1-e/window.innerHeight;if(n>=0)if(S()){const s=t.querySelector(".hero-title"),r=t.querySelector(".hero-description"),a=t.querySelector(".hero-buttons");s&&(s.style.opacity=n),r&&(r.style.opacity=n),a&&(a.style.opacity="1",a.style.filter="none",a.style.transform="translateZ(0)",a.style.backfaceVisibility="hidden")}else t.style.opacity=n}});const F=()=>{document.querySelectorAll(".stat-number").forEach(i=>{const t=i.textContent,o=parseInt(t),n=t.includes("+"),s=o/100;let r=0;const a=()=>{r<o?(r+=s,i.textContent=Math.floor(r)+(n?"+":""),requestAnimationFrame(a)):i.textContent=o+(n?"+":"")};a()})},O=new IntersectionObserver(e=>{e.forEach(i=>{i.isIntersecting&&(i.target.classList.add("animate"),i.target.classList.contains("about-stats")&&F())})},{threshold:.1}),W=document.querySelectorAll(".skill-card, .project-card, .contact-item, .about-stats, .stat-item");W.forEach(e=>{O.observe(e)});if(f){let i=function(){if(typeof emailjs<"u")try{return emailjs.init(e.publicKey),console.log("EmailJS initialized successfully"),!0}catch(t){return console.error("EmailJS initialization failed:",t),!1}else return console.error("EmailJS library not loaded"),!1};var _=i;const e={publicKey:"hf3NIKh30eJc8CihT",serviceId:"service_toq11u8",templateId:"template_j3m9bcp"};if(document.addEventListener("DOMContentLoaded",i),i(),f.addEventListener("submit",async t=>{t.preventDefault(),console.log("Form submitted"),console.log("User agent:",navigator.userAgent),console.log("Screen width:",window.innerWidth);const o=new FormData(f),n=f.querySelector('button[type="submit"]'),s=n.querySelector(".btn-text"),r=n.querySelector(".btn-loading"),a=document.getElementById("form-status"),u=o.get("from_name"),c=o.get("from_email"),l=o.get("message");if(console.log("Form data:",{name:u,email:c,message:l}),!u||!c||!l){console.error("Missing form data"),a&&(a.className="form-status error",a.textContent="❌ Please fill in all fields.",a.style.display="block");return}n.disabled=!0,s&&(s.style.display="none"),r&&(r.style.display="inline"),a&&(a.className="form-status",a.style.display="none");try{if(!i())throw new Error("EmailJS not initialized");const d={from_name:u,from_email:c,message:l,to_email:"soumadipbasu111@gmail.com",reply_to:c};console.log("Sending email with params:",d);let m;try{m=await emailjs.send(e.serviceId,e.templateId,d)}catch(g){console.log("First attempt failed, trying sendForm method:",g),m=await emailjs.sendForm(e.serviceId,e.templateId,f)}if(console.log("EmailJS response:",m),m.status===200)a&&(a.className="form-status success",a.textContent="✅ Message sent successfully! I will get back to you soon.",a.style.display="block"),f.reset(),console.log("Email sent successfully");else throw new Error(`EmailJS returned status: ${m.status}`)}catch(d){console.error("EmailJS Error:",d),a&&(a.className="form-status error",a.textContent=`❌ Failed to send message: ${d.message}. Please try again or contact me directly at soumadipbasu333@gmail.com`,a.style.display="block")}finally{n.disabled=!1,s&&(s.style.display="inline"),r&&(r.style.display="none"),setTimeout(()=>{a&&(a.style.display="none")},7e3)}}),window.testEmailJS=async function(){try{console.log("Testing EmailJS connection...");const t={from_name:"Test User",from_email:"test@example.com",message:"This is a test message",to_email:"soumadipbasu333@gmail.com",reply_to:"test@example.com"},o=await emailjs.send(e.serviceId,e.templateId,t);return console.log("Test email sent successfully:",o),o}catch(t){return console.error("Test email failed:",t),t}},window.innerWidth<=768||"ontouchstart"in window){const t=f.querySelector('button[type="submit"]');t&&(t.addEventListener("touchend",o=>{o.preventDefault(),o.stopPropagation(),console.log("Mobile submit button touched");const n=new Event("submit",{bubbles:!0,cancelable:!0});f.dispatchEvent(n)},{passive:!1}),t.addEventListener("click",o=>{if(window.innerWidth<=768){o.preventDefault(),o.stopPropagation(),console.log("Mobile submit button clicked");const n=new Event("submit",{bubbles:!0,cancelable:!0});f.dispatchEvent(n)}}),t.addEventListener("touchstart",o=>{t.style.transform="scale(0.95)",t.style.transition="transform 0.1s ease"},{passive:!0}),t.addEventListener("touchend",()=>{setTimeout(()=>{t.style.transform=""},100)},{passive:!0}))}}const $=()=>{const e=[];for(let s=0;s<10;s++){const r=document.createElement("div");r.className="cursor-trail",r.style.cssText=`
      position: fixed;
      width: 4px;
      height: 4px;
      background: var(--primary-color);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: ${(10-s)/10};
      transition: opacity 0.3s ease;
    `,document.body.appendChild(r),e.push(r)}let t=0,o=0;document.addEventListener("mousemove",s=>{t=s.clientX,o=s.clientY});const n=()=>{let s=t,r=o;e.forEach((a,u)=>{const c=e[u+1]||e[0];a.style.left=s+"px",a.style.top=r+"px",s+=(parseInt(c.style.left)||t-s)*.3,r+=(parseInt(c.style.top)||o-r)*.3}),requestAnimationFrame(n)};n()};window.innerWidth>768&&!("ontouchstart"in window)&&$();window.addEventListener("load",()=>{document.body.classList.add("loaded"),setTimeout(()=>{document.querySelectorAll(".hero-title .title-line, .hero-description, .hero-buttons").forEach((i,t)=>{setTimeout(()=>{i.style.opacity="1",i.style.transform="translateY(0)"},t*200)})},300)});document.addEventListener("keydown",e=>{e.key==="Escape"&&(y.classList.remove("active"),x.classList.remove("active"))});let E;window.addEventListener("scroll",()=>{E&&window.cancelAnimationFrame(E),E=window.requestAnimationFrame(()=>{})});const H=()=>{document.querySelectorAll(".btn").forEach(t=>{t.addEventListener("mouseenter",()=>{t.style.transform="translateY(-2px) scale(1.02)"}),t.addEventListener("mouseleave",()=>{t.style.transform=""})}),document.querySelectorAll(".skill-card, .project-card").forEach(t=>{t.addEventListener("mousemove",o=>{const n=t.getBoundingClientRect(),s=o.clientX-n.left,r=o.clientY-n.top,a=n.width/2,u=n.height/2,c=(r-u)/10,l=(a-s)/10;t.style.transform=`perspective(1000px) rotateX(${c}deg) rotateY(${l}deg) translateZ(0)`}),t.addEventListener("mouseleave",()=>{t.style.transform=""})})},T=()=>{window.innerWidth<=768&&([{selector:".nav-logo .logo-text",duration:200},{selector:".nav-link",duration:300},{selector:".btn",duration:200},{selector:".floating-card",duration:400},{selector:".professional-photo",duration:300},{selector:".stat-item",duration:300},{selector:".image-card",duration:400},{selector:".skill-card",duration:400},{selector:".project-card",duration:400},{selector:".project-link",duration:200},{selector:".tech-tag",duration:200},{selector:".contact-item",duration:300},{selector:".social-link",duration:200}].forEach(({selector:o,duration:n})=>{document.querySelectorAll(o).forEach(r=>{let a;r.addEventListener("touchstart",()=>{r.classList.add("mobile-hover"),navigator.vibrate&&navigator.vibrate(30)},{passive:!0}),r.addEventListener("touchend",()=>{a=setTimeout(()=>{r.classList.remove("mobile-hover")},n)},{passive:!0}),r.addEventListener("touchcancel",()=>{clearTimeout(a),r.classList.remove("mobile-hover")}),(o.includes("nav-link")||o.includes("btn")||o.includes("project-link")||o.includes("social-link"))&&r.addEventListener("click",u=>{r.style.transform="scale(0.95)",setTimeout(()=>{r.style.transform=""},100)})})}),document.querySelectorAll(".project-card").forEach(o=>{const n=o.querySelector(".project-overlay");o.querySelectorAll(".project-link"),o.addEventListener("touchstart",()=>{n&&(n.style.opacity="1")}),o.addEventListener("touchend",()=>{setTimeout(()=>{n&&(n.style.opacity="")},2e3)})}),document.querySelectorAll(".skill-card").forEach(o=>{o.querySelector(".skill-icon");let n;o.addEventListener("touchstart",s=>{o.classList.add("mobile-hover"),navigator.vibrate&&navigator.vibrate(30),clearTimeout(n)},{passive:!0}),o.addEventListener("touchend",s=>{n=setTimeout(()=>{o.classList.remove("mobile-hover")},500)},{passive:!0}),o.addEventListener("touchcancel",()=>{clearTimeout(n),o.classList.remove("mobile-hover")},{passive:!0}),o.addEventListener("touchmove",()=>{clearTimeout(n),n=setTimeout(()=>{o.classList.remove("mobile-hover")},200)},{passive:!0})}))};H();T();const N=()=>{window.innerWidth<=768&&(console.log("Mobile view detected - touch events enabled"),document.addEventListener("touchstart",e=>{const i=e.target.closest(".skill-card");i&&console.log("Touch started on skill card:",i)},{passive:!0}))};N();window.addEventListener("resize",()=>{document.querySelectorAll(".mobile-hover").forEach(e=>{e.classList.remove("mobile-hover")}),T()});console.log("Portfolio loaded successfully! ✨");window.debugMobileForm=function(){const e=document.querySelector(".contact-form"),i=e?.querySelector('button[type="submit"]');if(console.log("=== Mobile Form Debug ==="),console.log("Form element:",e),console.log("Submit button:",i),console.log("Form ID:",e?.id),console.log("Button type:",i?.type),console.log("Is mobile device:",/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),console.log("Window width:",window.innerWidth),console.log("Touch support:","ontouchstart"in window),console.log("EmailJS loaded:",typeof emailjs<"u"),i&&console.log("Button styles:",{pointerEvents:getComputedStyle(i).pointerEvents,touchAction:getComputedStyle(i).touchAction,userSelect:getComputedStyle(i).userSelect,position:getComputedStyle(i).position,zIndex:getComputedStyle(i).zIndex}),e&&i){console.log("Testing manual form submission...");const t=new Event("submit",{bubbles:!0,cancelable:!0});e.dispatchEvent(t)}};function A(){const e=document.getElementById("github-link"),i=document.getElementById("linkedin-link");function t(o,n){console.log(`${n} link clicked on mobile`);try{if(!window.open(o,"_blank","noopener,noreferrer")){console.log("Window.open failed, trying alternative method");const r=document.createElement("a");r.href=o,r.target="_blank",r.rel="noopener noreferrer",document.body.appendChild(r),r.click(),document.body.removeChild(r)}}catch(s){console.log("Error opening link:",s);const r=document.createElement("a");r.href=o,r.target="_blank",r.rel="noopener noreferrer",document.body.appendChild(r),r.click(),document.body.removeChild(r)}}e&&(e.removeEventListener("click",()=>{}),e.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),console.log("GitHub link clicked"),t("https://github.com/soumadipbasupersonalgithub","GitHub")}),e.addEventListener("touchend",o=>{o.preventDefault(),o.stopPropagation(),console.log("GitHub link touched"),t("https://github.com/soumadipbasupersonalgithub","GitHub")},{passive:!1})),i&&(i.removeEventListener("click",()=>{}),i.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),console.log("LinkedIn link clicked"),t("https://www.linkedin.com/in/soumadip-basu-b47160197/","LinkedIn")}),i.addEventListener("touchend",o=>{o.preventDefault(),o.stopPropagation(),console.log("LinkedIn link touched"),t("https://www.linkedin.com/in/soumadip-basu-b47160197/","LinkedIn")},{passive:!1}))}document.addEventListener("DOMContentLoaded",()=>{A()});window.addEventListener("load",()=>{A()});const z={"healthcare-frameworks":{title:"⚙️ SDK Validation Framework",company:"Deloitte",overview:"<ul><li>As a Quality Assurance Professional, my key responsibility is to draft comprehensive testing protocols for a healthcare SDK supporting medicine tracking and smart device connectivity.</li><li>Led end-to-end QA validation of Bluetooth Low Energy (BLE) communication, ensuring seamless operation and cross-platform compatibility across iOS and Android ecosystems.</li><li>Developed and enhanced automation test scripts to expand coverage, validate new features, and optimize the QA process.</li><li>Conducted multiple iterations of sprint, informal, and formal testing, delivering a robust backend software framework used across multiple healthcare application backends.</li></ul>",technologies:["Raspberry Pi","Bluetooth Low Energy","Android Studio","Xcode","Selenium","Unit Testing","UI Automation"]},"healthcare-suite":{title:"💉 Hypercare, Madelyn & Logbook",company:"Deloitte",overview:"<ul><li>Served as QA for the Healthcare Mobile Suite, including Madelyn (patient health tracking) and Hypercare (medicine record management) applications.</li><li>Designed and implemented comprehensive functional & automation test scripts to ensure product quality and reliability.</li><li>Executed multiple regression testing, as well as formal end-to-end validation of patient-facing mobile applications as per FDA level.</li><li>Developed and maintained automation frameworks using JavaScript, Appium, and WebDriverIO to enable efficient and scalable product testing.</li><li>Focused on defect tracking & maximizing test coverage after every sprint to streamline quality assurance processes for an optimal user experience.</li></ul>",technologies:["WebDriverIO","Cucumber","JavaScript","Manual Testing","Test Automation","Appium","Regression Testing"]},dotcom:{title:"🌐 Dot.com",company:"Deloitte",overview:"<ul><li>Served as QA for an enterprise web platform, focusing on digital experiences tailored for diverse patient groups in the healthcare sector.</li><li>Gained in-depth understanding of Adobe Experience Manager (AEM) components to design effective and targeted test strategies.</li><li>Performed end-to-end QA activities, including requirements analysis, test planning, execution, defect tracking, and preparing comprehensive test summary reports for clients.</li><li>Conducted accessibility compliance testing in alignment with WCAG standards to ensure the platform met essential inclusivity criteria.</li><li>Developed automation frameworks from scratch, enabling efficient regression and functional testing.</li><li>Introduced and implemented AI agent-driven automation processes with integration to the MCP server, enhancing overall test coverage and efficiency.</li></ul>",technologies:["Adobe Experience Manager","Playwright","Functional Testing","Accessibility Testing","Performance Testing","Test Automation"]},"cloud-atf":{title:"☁️ Cloud ATF (Network Testing Portal)",company:"Alethea Communications",overview:"<ul><li>Served as a automation QA and my key role was to built a robust automation framework from scratch using Python and Robot Framework.</li><li>Developed a performance testing suite using Python and Locust to evaluate the cloud-based WLAN and broadband testing portal.</li><li>Engineered scalable infrastructure for WiFi 6 protocol validation and comprehensive network performance testing.</li><li>Automated UI and functional tests to ensure seamless device operation under varying conditions.</li><li>Validated portal performance and throughput metrics to enhance system reliability and scalability.</li></ul>",technologies:["Python","Robot Framework","Postman","Locust","Git"]},"sms-autosense":{title:"🤖 SMS Autosense",company:"Alethea Communications",overview:"Machine Learning-driven mobile application for industrial condition helath monitoring of the APIs. My key responsibility was to update the automation code in JavaScript using Katalon Studio to validate the new features and regression.",technologies:["Katalon Studio","JavaScript","Postman","API Testing"]},"mobile-devices":{title:"📱 XP8 & XP5",company:"Sonim Technologies",overview:"As a Functional QA my responsibility is to perform the comprehensive testing of rugged Android satellite smartphone builds across multiple US mobile device variants. Executed functional and sprint testing protocols for industrial-grade mobile devices & accessories.",technologies:["Android","ADB log analyzing","Bluetooth Testing","Satellite Network Testing","GPS Testing","Camera Testing","Audio Testing"]}},p=document.getElementById("projectModal"),J=document.getElementById("modalContent"),U=document.querySelector(".close");function L(e){const i=z[e];if(!i)return;const t=`
    <div class="project-detail">
      <div class="project-detail-header">
        <h2 class="project-detail-title">${i.title}</h2>
        <div class="project-detail-client">
          <span class="parent-company-tag">${i.company}</span>
        </div>
        <h3 class="project-detail-subtitle">Roles & Responsibilities</h3>
        <div class="project-detail-overview">
          ${i.overview}
        </div>
      </div>

      <div class="project-sections">
        <div class="project-section">
          <h3 class="project-section-title">🛠️ Tools & Technologies</h3>
          <div class="project-tech-grid">
            ${i.technologies.map(o=>`
              <span class="tech-badge">${o}</span>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;J.innerHTML=t,p.style.display="block",setTimeout(()=>{p.classList.add("show")},10),document.body.style.overflow="hidden",window.history.pushState({modalOpen:!0,projectKey:e},"",window.location.href)}function b(){p.classList.remove("show"),setTimeout(()=>{p.style.display="none",document.body.style.overflow="",window.history.state&&window.history.state.modalOpen&&window.history.back()},300)}document.addEventListener("click",e=>{if(e.target.classList.contains("project-link")){e.preventDefault(),e.stopPropagation();const i=e.target.getAttribute("data-project");i&&L(i)}});document.addEventListener("touchend",e=>{if(e.target.classList.contains("project-link")){e.preventDefault(),e.stopPropagation();const i=e.target.getAttribute("data-project");if(i){const t=e.target.closest(".project-card");t&&window.innerWidth<=768?(Y(t),setTimeout(()=>{L(i)},300)):L(i)}}},{passive:!1});function Y(e){e.classList.add("card-flipping"),setTimeout(()=>{e.classList.remove("card-flipping")},600)}function R(e,i){const t=document.createElement("div");t.classList.add("ripple");const o=e.getBoundingClientRect(),n=Math.max(o.width,o.height),s=(i.touches?i.touches[0].clientX:i.clientX)-o.left-n/2,r=(i.touches?i.touches[0].clientY:i.clientY)-o.top-n/2;t.style.width=t.style.height=n+"px",t.style.left=s+"px",t.style.top=r+"px",e.style.position="relative",e.appendChild(t),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},600)}document.addEventListener("touchstart",e=>{if(window.innerWidth<=768){const i=e.target.closest(".project-card");i&&(i.classList.add("card-pressed"),R(i,e))}},{passive:!1});document.addEventListener("touchend",e=>{if(window.innerWidth<=768){const i=e.target.closest(".project-card");i&&setTimeout(()=>{i.classList.remove("card-pressed")},150)}},{passive:!1});U.addEventListener("click",b);p.addEventListener("click",e=>{e.target===p&&b()});document.addEventListener("keydown",e=>{e.key==="Escape"&&p.classList.contains("show")&&b()});"ontouchstart"in window&&p.addEventListener("touchstart",e=>{e.target===p&&b()});window.addEventListener("popstate",e=>{p.classList.contains("show")&&(p.classList.remove("show"),setTimeout(()=>{p.style.display="none",document.body.style.overflow=""},300));const i=document.querySelector(".verification-modal");if(i){i.remove(),document.body.style.overflow="";const t=document.getElementById("certifications");if(t){const o=t.getBoundingClientRect(),n=window.pageYOffset||document.documentElement.scrollTop,s=o.top+n-(S()?90:80);window.scrollTo({top:s,behavior:"smooth"})}}});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".certificate-verify"),i={"codeacademy-001":{title:"Learn JavaScript",issuer:"Codecademy",verificationUrl:"https://www.codecademy.com/profiles/tag5735900943/certificates/705dcb15de0da4dd9d9fc4f3274b430e",status:"Valid",issuedDate:"June 2023",expiryDate:"N/A"},"istqb-001":{title:"Robot Framework with Python-Selenium API Automation Testing",issuer:"Udemy",verificationUrl:"https://www.udemy.com/certificate/UC-c2dcfc91-df9c-4fc1-a502-ef4b1940e034/",status:"Valid",issuedDate:"May 2020",expiryDate:"No Expiration Date"},"python-001":{title:"Learn Python 3",issuer:"Codecademy",verificationUrl:"https://www.codecademy.com/profiles/tag5735900943/certificates/6c152bd262967f8c941c9707ed636bda",status:"Valid",issuedDate:"April 2024",expiryDate:"No Expiration Date"},"automation-001":{title:"WebDriverIO + Node.js -JavaScript UI Automation from Scratch",issuer:"Udemy",verificationUrl:"https://www.udemy.com/certificate/UC-4ea0c12b-e958-4337-82a5-d4e8aebd8bc8/",status:"Valid",issuedDate:"June 2023",expiryDate:"No Expiration Date"},"git-001":{title:"Learn Git & GitHub Course",issuer:"Codecademy",verificationUrl:"https://www.codecademy.com/profiles/tag5735900943/certificates/a8ab218d5950c29861635cc0bf12fd13",status:"Valid",issuedDate:"May 2024",expiryDate:"No Expiration Date"},"ai-001":{title:"Gen AI and AI agent integration in software testing",issuer:"Udemy",verificationUrl:"https://",status:"Valid",issuedDate:"September 2025",expiryDate:"No Expiration Date"},"playwright-001":{title:"Playwright 101 Certification",issuer:"TestMu AI",verificationUrl:"https://www.testmuai.com/certified/P101-3593BG/",status:"Valid",issuedDate:"March 2026",expiryDate:"March 2028"}};e.forEach(t=>{t.addEventListener("click",o=>{o.preventDefault();const n=t.getAttribute("data-cert-id"),s=i[n];if(s){const r=`
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
                ">${s.title}</h4>

                <p style="
                  margin: 0 0 1rem 0;
                  color: #6366f1;
                  font-weight: 600;
                ">Issued by: ${s.issuer}</p>

                <div style="
                  background: #f8fafc;
                  padding: 1rem;
                  border-radius: 12px;
                  margin-bottom: 1rem;
                ">
                  <div style="margin-bottom: 0.5rem;">
                    <strong style="color: #374151;">Status:</strong>
                    <span style="color: #10b981; font-weight: 600;">${s.status}</span>
                  </div>
                  <div style="margin-bottom: 0.5rem;">
                    <strong style="color: #374151;">Issued:</strong> ${s.issuedDate}
                  </div>
                  <div>
                    <strong style="color: #374151;">Expires:</strong> ${s.expiryDate}
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
                <a href="${s.verificationUrl}" target="_blank" rel="noopener noreferrer" style="
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
        `;document.body.insertAdjacentHTML("beforeend",r);const a=document.querySelector(".verification-modal");document.body.style.overflow="hidden",window.history.pushState({verificationOpen:!0},"",window.location.href),a.querySelectorAll(".close-verification").forEach(l=>{l.addEventListener("click",()=>window.history.back())}),a.addEventListener("click",l=>{l.target===a&&window.history.back()});const c=l=>{l.key==="Escape"&&(window.history.back(),document.removeEventListener("keydown",c))};document.addEventListener("keydown",c)}})})});
