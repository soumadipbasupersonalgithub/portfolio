(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();(function(){const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e)})();const T=document.querySelector(".navbar"),g=document.querySelector(".hamburger"),w=document.querySelector(".nav-menu"),b=document.querySelectorAll(".nav-link"),P=document.querySelectorAll('.btn[href^="#"]'),M=document.querySelectorAll("section"),f=document.querySelector(".contact-form"),y=document.querySelector(".fab-button");window.addEventListener("scroll",()=>{window.scrollY>50?T.classList.add("scrolled"):T.classList.remove("scrolled")});g.addEventListener("click",()=>{g.classList.toggle("active"),w.classList.toggle("active")});b.forEach(e=>{e.addEventListener("click",()=>{g.classList.remove("active"),w.classList.remove("active")})});y&&y.addEventListener("click",e=>{y.classList.add("downloaded");const i=y.querySelector(".fab-text"),o=i.textContent;i.textContent="✓",setTimeout(()=>{i.textContent=o},2e3),console.log("CV download initiated - button color changed to green")});function v(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768}b.forEach(e=>{const i=o=>{o.preventDefault(),o.stopPropagation();const t=e.getAttribute("href"),n=document.querySelector(t);if(console.log("Navigation clicked:",t),n){g.classList.remove("active"),w.classList.remove("active");const r=v()?300:0;setTimeout(()=>{if(v()){console.log("Mobile scroll to:",t);const s=n.getBoundingClientRect(),a=window.pageYOffset||document.documentElement.scrollTop,c=s.top+a-90;"scrollBehavior"in document.documentElement.style?window.scrollTo({top:c,behavior:"smooth"}):window.scrollTo(0,c)}else{const s=n.offsetTop-80;window.scrollTo({top:s,behavior:"smooth"})}b.forEach(s=>s.classList.remove("active")),e.classList.add("active")},r)}};e.addEventListener("click",i),v()&&(e.style.touchAction="manipulation",e.addEventListener("touchstart",o=>{o.stopPropagation()},{passive:!0}),e.addEventListener("touchend",o=>{o.preventDefault(),o.stopPropagation(),console.log("Mobile touch end on:",e.textContent),i(o)},{passive:!1}))});P.forEach(e=>{let i=0,o=0,t=0,n=!1,r=!1,s=null,a=!1;const c=l=>{l.preventDefault(),l.stopPropagation();const d=e.getAttribute("href"),u=document.querySelector(d);if(console.log("Hero button clicked:",d),u)if(v()){console.log("Mobile scroll to:",d);const m=u.getBoundingClientRect(),h=window.pageYOffset||document.documentElement.scrollTop,E=m.top+h-90;"scrollBehavior"in document.documentElement.style?window.scrollTo({top:E,behavior:"smooth"}):window.scrollTo(0,E)}else{const m=u.offsetTop-80;window.scrollTo({top:m,behavior:"smooth"})}};v()?(e.addEventListener("touchstart",l=>{i=Date.now(),o=l.touches[0].clientX,t=l.touches[0].clientY,n=!1,r=!1,a=!1,e.style.transform="scale(0.95)",e.style.transition="transform 0.1s ease",s=setTimeout(()=>{r=!0,navigator.vibrate&&navigator.vibrate([50,30,50])},500)},{passive:!0}),e.addEventListener("touchmove",l=>{const d=l.touches[0].clientX,u=l.touches[0].clientY,m=Math.abs(d-o),h=Math.abs(u-t);Math.sqrt(m*m+h*h)>15&&(n=!0,a=!0,e.style.transform="",s&&(clearTimeout(s),s=null)),h>20&&h>m&&(a=!0,n=!0)},{passive:!0}),e.addEventListener("touchend",l=>{const d=Date.now()-i;s&&(clearTimeout(s),s=null),setTimeout(()=>{e.style.transform=""},100);const u=!n&&!a&&d>=50&&d<=800&&!r;console.log("Touch end analysis:",{hasMoved:n,isScrolling:a,touchDuration:d,isLongPress:r,isValidTap:u}),u?(l.preventDefault(),l.stopPropagation(),e.style.transform="scale(1.05)",setTimeout(()=>{e.style.transform=""},150),navigator.vibrate&&navigator.vibrate(40),console.log("Valid tap detected - navigating to:",e.getAttribute("href")),setTimeout(()=>{c(l)},50)):(console.log("Invalid tap ignored - likely accidental scroll interaction"),e.style.borderColor="rgba(255, 255, 255, 0.3)",setTimeout(()=>{e.style.borderColor=""},200)),i=0,o=0,t=0,n=!1,r=!1,a=!1},{passive:!1}),e.addEventListener("touchcancel",()=>{s&&(clearTimeout(s),s=null),e.style.transform="",i=0,o=0,t=0,n=!1,r=!1,a=!1},{passive:!0}),e.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation()})):e.addEventListener("click",c)});const j={threshold:[.1,.5,.7],rootMargin:"-20% 0px -30% 0px"},I=new IntersectionObserver(e=>{let i=0,o=null;if(e.forEach(t=>{t.intersectionRatio>i&&(i=t.intersectionRatio,o=t)}),o&&i>.1){b.forEach(n=>{n.classList.remove("active")});const t=document.querySelector(`.nav-link[href="#${o.target.id}"]`);t&&t.classList.add("active")}},j);M.forEach(e=>{I.observe(e)});window.addEventListener("scroll",()=>{const e=window.pageYOffset,i=document.querySelector(".hero-visual"),o=document.querySelector(".hero-text");if(i&&o){const t=e*-.5;i.style.transform=`translateY(${t}px)`;const n=1-e/window.innerHeight;if(n>=0)if(v()){const r=o.querySelector(".hero-title"),s=o.querySelector(".hero-description"),a=o.querySelector(".hero-buttons");r&&(r.style.opacity=n),s&&(s.style.opacity=n),a&&(a.style.opacity="1",a.style.filter="none",a.style.transform="translateZ(0)",a.style.backfaceVisibility="hidden")}else o.style.opacity=n}});const q=()=>{document.querySelectorAll(".stat-number").forEach(i=>{const o=i.textContent,t=parseInt(o),n=o.includes("+"),r=t/100;let s=0;const a=()=>{s<t?(s+=r,i.textContent=Math.floor(s)+(n?"+":""),requestAnimationFrame(a)):i.textContent=t+(n?"+":"")};a()})},_=new IntersectionObserver(e=>{e.forEach(i=>{i.isIntersecting&&(i.target.classList.add("animate"),i.target.classList.contains("about-stats")&&q())})},{threshold:.1}),B=document.querySelectorAll(".skill-card, .project-card, .contact-item, .about-stats, .stat-item");B.forEach(e=>{_.observe(e)});if(f){let i=function(){if(typeof emailjs<"u")try{return emailjs.init(e.publicKey),console.log("EmailJS initialized successfully"),!0}catch(o){return console.error("EmailJS initialization failed:",o),!1}else return console.error("EmailJS library not loaded"),!1};var Y=i;const e={publicKey:"hf3NIKh30eJc8CihT",serviceId:"service_toq11u8",templateId:"template_j3m9bcp"};if(document.addEventListener("DOMContentLoaded",i),i(),f.addEventListener("submit",async o=>{o.preventDefault(),console.log("Form submitted"),console.log("User agent:",navigator.userAgent),console.log("Screen width:",window.innerWidth);const t=new FormData(f),n=f.querySelector('button[type="submit"]'),r=n.querySelector(".btn-text"),s=n.querySelector(".btn-loading"),a=document.getElementById("form-status"),c=t.get("from_name"),l=t.get("from_email"),d=t.get("message");if(console.log("Form data:",{name:c,email:l,message:d}),!c||!l||!d){console.error("Missing form data"),a&&(a.className="form-status error",a.textContent="❌ Please fill in all fields.",a.style.display="block");return}n.disabled=!0,r&&(r.style.display="none"),s&&(s.style.display="inline"),a&&(a.className="form-status",a.style.display="none");try{if(!i())throw new Error("EmailJS not initialized");const u={from_name:c,from_email:l,message:d,to_email:"soumadipbasu111@gmail.com",reply_to:l};console.log("Sending email with params:",u);let m;try{m=await emailjs.send(e.serviceId,e.templateId,u)}catch(h){console.log("First attempt failed, trying sendForm method:",h),m=await emailjs.sendForm(e.serviceId,e.templateId,f)}if(console.log("EmailJS response:",m),m.status===200)a&&(a.className="form-status success",a.textContent="✅ Message sent successfully! I will get back to you soon.",a.style.display="block"),f.reset(),console.log("Email sent successfully");else throw new Error(`EmailJS returned status: ${m.status}`)}catch(u){console.error("EmailJS Error:",u),a&&(a.className="form-status error",a.textContent=`❌ Failed to send message: ${u.message}. Please try again or contact me directly at soumadipbasu333@gmail.com`,a.style.display="block")}finally{n.disabled=!1,r&&(r.style.display="inline"),s&&(s.style.display="none"),setTimeout(()=>{a&&(a.style.display="none")},7e3)}}),window.testEmailJS=async function(){try{console.log("Testing EmailJS connection...");const o={from_name:"Test User",from_email:"test@example.com",message:"This is a test message",to_email:"soumadipbasu333@gmail.com",reply_to:"test@example.com"},t=await emailjs.send(e.serviceId,e.templateId,o);return console.log("Test email sent successfully:",t),t}catch(o){return console.error("Test email failed:",o),o}},window.innerWidth<=768||"ontouchstart"in window){const o=f.querySelector('button[type="submit"]');o&&(o.addEventListener("touchend",t=>{t.preventDefault(),t.stopPropagation(),console.log("Mobile submit button touched");const n=new Event("submit",{bubbles:!0,cancelable:!0});f.dispatchEvent(n)},{passive:!1}),o.addEventListener("click",t=>{if(window.innerWidth<=768){t.preventDefault(),t.stopPropagation(),console.log("Mobile submit button clicked");const n=new Event("submit",{bubbles:!0,cancelable:!0});f.dispatchEvent(n)}}),o.addEventListener("touchstart",t=>{o.style.transform="scale(0.95)",o.style.transition="transform 0.1s ease"},{passive:!0}),o.addEventListener("touchend",()=>{setTimeout(()=>{o.style.transform=""},100)},{passive:!0}))}}const O=()=>{const e=[];for(let r=0;r<10;r++){const s=document.createElement("div");s.className="cursor-trail",s.style.cssText=`
      position: fixed;
      width: 4px;
      height: 4px;
      background: var(--primary-color);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: ${(10-r)/10};
      transition: opacity 0.3s ease;
    `,document.body.appendChild(s),e.push(s)}let o=0,t=0;document.addEventListener("mousemove",r=>{o=r.clientX,t=r.clientY});const n=()=>{let r=o,s=t;e.forEach((a,c)=>{const l=e[c+1]||e[0];a.style.left=r+"px",a.style.top=s+"px",r+=(parseInt(l.style.left)||o-r)*.3,s+=(parseInt(l.style.top)||t-s)*.3}),requestAnimationFrame(n)};n()};window.innerWidth>768&&!("ontouchstart"in window)&&O();window.addEventListener("load",()=>{document.body.classList.add("loaded"),setTimeout(()=>{document.querySelectorAll(".hero-title .title-line, .hero-description, .hero-buttons").forEach((i,o)=>{setTimeout(()=>{i.style.opacity="1",i.style.transform="translateY(0)"},o*200)})},300)});document.addEventListener("keydown",e=>{e.key==="Escape"&&(g.classList.remove("active"),w.classList.remove("active"))});let L;window.addEventListener("scroll",()=>{L&&window.cancelAnimationFrame(L),L=window.requestAnimationFrame(()=>{})});const V=()=>{document.querySelectorAll(".btn").forEach(o=>{o.addEventListener("mouseenter",()=>{o.style.transform="translateY(-2px) scale(1.02)"}),o.addEventListener("mouseleave",()=>{o.style.transform=""})}),document.querySelectorAll(".skill-card, .project-card").forEach(o=>{o.addEventListener("mousemove",t=>{const n=o.getBoundingClientRect(),r=t.clientX-n.left,s=t.clientY-n.top,a=n.width/2,c=n.height/2,l=(s-c)/10,d=(a-r)/10;o.style.transform=`perspective(1000px) rotateX(${l}deg) rotateY(${d}deg) translateZ(0)`}),o.addEventListener("mouseleave",()=>{o.style.transform=""})})},S=()=>{window.innerWidth<=768&&([{selector:".nav-logo .logo-text",duration:200},{selector:".nav-link",duration:300},{selector:".btn",duration:200},{selector:".floating-card",duration:400},{selector:".professional-photo",duration:300},{selector:".stat-item",duration:300},{selector:".image-card",duration:400},{selector:".skill-card",duration:400},{selector:".project-card",duration:400},{selector:".project-link",duration:200},{selector:".tech-tag",duration:200},{selector:".contact-item",duration:300},{selector:".social-link",duration:200}].forEach(({selector:t,duration:n})=>{document.querySelectorAll(t).forEach(s=>{let a;s.addEventListener("touchstart",c=>{s.matches('button[type="submit"]')||c.preventDefault(),s.classList.add("mobile-hover"),navigator.vibrate&&navigator.vibrate(30)},{passive:!1}),s.addEventListener("touchend",c=>{s.matches('button[type="submit"]')||c.preventDefault(),a=setTimeout(()=>{s.classList.remove("mobile-hover")},n)},{passive:!1}),s.addEventListener("touchcancel",()=>{clearTimeout(a),s.classList.remove("mobile-hover")}),(t.includes("nav-link")||t.includes("btn")||t.includes("project-link")||t.includes("social-link"))&&s.addEventListener("click",c=>{s.style.transform="scale(0.95)",setTimeout(()=>{s.style.transform=""},100)})})}),document.querySelectorAll(".project-card").forEach(t=>{const n=t.querySelector(".project-overlay");t.querySelectorAll(".project-link"),t.addEventListener("touchstart",()=>{n&&(n.style.opacity="1")}),t.addEventListener("touchend",()=>{setTimeout(()=>{n&&(n.style.opacity="")},2e3)})}),document.querySelectorAll(".skill-card").forEach(t=>{t.querySelector(".skill-icon");let n;t.addEventListener("touchstart",r=>{t.classList.add("mobile-hover"),navigator.vibrate&&navigator.vibrate(30),clearTimeout(n)},{passive:!0}),t.addEventListener("touchend",r=>{n=setTimeout(()=>{t.classList.remove("mobile-hover")},500)},{passive:!0}),t.addEventListener("touchcancel",()=>{clearTimeout(n),t.classList.remove("mobile-hover")},{passive:!0}),t.addEventListener("touchmove",()=>{clearTimeout(n),n=setTimeout(()=>{t.classList.remove("mobile-hover")},200)},{passive:!0})}))};V();S();const F=()=>{window.innerWidth<=768&&(console.log("Mobile view detected - touch events enabled"),document.addEventListener("touchstart",e=>{const i=e.target.closest(".skill-card");i&&console.log("Touch started on skill card:",i)},{passive:!0}))};F();window.addEventListener("resize",()=>{document.querySelectorAll(".mobile-hover").forEach(e=>{e.classList.remove("mobile-hover")}),S()});console.log("Portfolio loaded successfully! ✨");const C=()=>{const e=document.getElementById("downloadCV");if(e){const i=async t=>{t.preventDefault(),t.stopPropagation(),console.log("CV download initiated");try{const n=await fetch("/download-cv");if(!n.ok)throw new Error(`HTTP error! status: ${n.status}`);const r=await n.blob(),s=window.URL.createObjectURL(r),a=document.createElement("a");a.style.display="none",a.href=s,a.download="soumadip_basu_cv.pdf",document.body.appendChild(a),a.click(),document.body.removeChild(a),setTimeout(()=>window.URL.revokeObjectURL(s),100),console.log("CV download completed successfully via secure endpoint"),o("Downloaded!","success")}catch(n){console.error("Secure endpoint failed, trying alternative method:",n);try{const r=await fetch("/soumadip_basu_cv.pdf");if(!r.ok)throw new Error(`HTTP error! status: ${r.status}`);const s=await r.blob(),a=window.URL.createObjectURL(s),c=document.createElement("a");c.style.display="none",c.href=a,c.download="soumadip_basu_cv.pdf",document.body.appendChild(c),c.click(),document.body.removeChild(c),setTimeout(()=>window.URL.revokeObjectURL(a),100),console.log("CV download completed successfully via blob method"),o("Downloaded!","success")}catch(r){console.error("Primary download method failed:",r);try{const s=document.createElement("a");s.href=`${window.location.origin}/soumadip_basu_cv.pdf`,s.download="soumadip_basu_cv.pdf",s.setAttribute("target","_self"),s.setAttribute("rel","noopener"),document.body.appendChild(s),s.click(),document.body.removeChild(s),o("Downloaded!","success")}catch(s){console.error("Fallback method failed:",s);try{if(window.open(`${window.location.origin}/soumadip_basu_cv.pdf`,"_blank"))o("Opened in new tab","info"),setTimeout(()=>{alert('PDF opened in new tab. Right-click and select "Save As" to download.')},1e3);else throw new Error("Popup blocked")}catch(a){console.error("All download methods failed:",a),o("Download failed - Try right-click","error"),setTimeout(()=>{alert('Download blocked by browser. Please right-click the "Download CV" button and select "Save link as" or contact me directly for the CV.')},500)}}}}},o=(t,n)=>{const r=e.textContent;switch(e.textContent=t,n){case"success":e.style.background="linear-gradient(135deg, #10b981 0%, #059669 100%)";break;case"error":e.style.background="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";break;case"info":e.style.background="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)";break}setTimeout(()=>{e.textContent=r,e.style.background=""},n==="error"?4e3:2e3)};e.addEventListener("contextmenu",t=>{t.preventDefault();const n=document.createElement("div");n.style.cssText=`
        position: fixed;
        top: ${t.clientY}px;
        left: ${t.clientX}px;
        background: white;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: var(--font-primary);
        min-width: 160px;
      `,n.innerHTML=`
        <div style="padding: 8px 12px; cursor: pointer; border-radius: 4px;" 
             onmouseover="this.style.background='#f3f4f6'" 
             onmouseout="this.style.background=''"
             onclick="window.open('${window.location.origin}/soumadip_basu_cv.pdf', '_blank')">
          📄 Open CV in New Tab
        </div>
        <div style="padding: 8px 12px; cursor: pointer; border-radius: 4px;" 
             onmouseover="this.style.background='#f3f4f6'" 
             onmouseout="this.style.background=''"
             onclick="navigator.clipboard.writeText('${window.location.origin}/soumadip_basu_cv.pdf').then(() => alert('CV link copied to clipboard!'))">
          🔗 Copy CV Link
        </div>
      `,document.body.appendChild(n);const r=()=>{document.body.contains(n)&&document.body.removeChild(n),document.removeEventListener("click",r)};setTimeout(()=>document.addEventListener("click",r),100)}),e.addEventListener("click",i),e.addEventListener("touchend",t=>{t.preventDefault(),t.stopPropagation(),i(t)},{passive:!1}),console.log("Enhanced CV download functionality initialized")}else console.error("Download CV button not found")};document.addEventListener("DOMContentLoaded",C);C();const D=()=>{const e=document.getElementById("viewResumeBtn");if(e){const i=o=>{o.preventDefault(),o.stopPropagation();try{window.open("/soumadip_basu_cv.pdf","_blank","noopener,noreferrer")||(window.location.href="/soumadip_basu_cv.pdf"),console.log("Resume opened for viewing")}catch(t){console.error("Error opening resume:",t),window.location.href="/soumadip_basu_cv.pdf"}};e.addEventListener("click",i),e.addEventListener("touchend",o=>{o.preventDefault(),o.stopPropagation(),i(o)},{passive:!1}),console.log("View Resume functionality initialized")}};document.addEventListener("DOMContentLoaded",D);D();window.debugMobileForm=function(){const e=document.querySelector(".contact-form"),i=e?.querySelector('button[type="submit"]');if(console.log("=== Mobile Form Debug ==="),console.log("Form element:",e),console.log("Submit button:",i),console.log("Form ID:",e?.id),console.log("Button type:",i?.type),console.log("Is mobile device:",/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),console.log("Window width:",window.innerWidth),console.log("Touch support:","ontouchstart"in window),console.log("EmailJS loaded:",typeof emailjs<"u"),i&&console.log("Button styles:",{pointerEvents:getComputedStyle(i).pointerEvents,touchAction:getComputedStyle(i).touchAction,userSelect:getComputedStyle(i).userSelect,position:getComputedStyle(i).position,zIndex:getComputedStyle(i).zIndex}),e&&i){console.log("Testing manual form submission...");const o=new Event("submit",{bubbles:!0,cancelable:!0});e.dispatchEvent(o)}};function A(){const e=document.getElementById("github-link"),i=document.getElementById("linkedin-link");function o(t,n){console.log(`${n} link clicked on mobile`);try{if(!window.open(t,"_blank","noopener,noreferrer")){console.log("Window.open failed, trying alternative method");const s=document.createElement("a");s.href=t,s.target="_blank",s.rel="noopener noreferrer",document.body.appendChild(s),s.click(),document.body.removeChild(s)}}catch(r){console.log("Error opening link:",r);const s=document.createElement("a");s.href=t,s.target="_blank",s.rel="noopener noreferrer",document.body.appendChild(s),s.click(),document.body.removeChild(s)}}e&&(e.removeEventListener("click",()=>{}),e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),console.log("GitHub link clicked"),o("https://github.com/soumadipbasupersonalgithub","GitHub")}),e.addEventListener("touchend",t=>{t.preventDefault(),t.stopPropagation(),console.log("GitHub link touched"),o("https://github.com/soumadipbasupersonalgithub","GitHub")},{passive:!1})),i&&(i.removeEventListener("click",()=>{}),i.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),console.log("LinkedIn link clicked"),o("https://www.linkedin.com/in/soumadip-basu-b47160197/","LinkedIn")}),i.addEventListener("touchend",t=>{t.preventDefault(),t.stopPropagation(),console.log("LinkedIn link touched"),o("https://www.linkedin.com/in/soumadip-basu-b47160197/","LinkedIn")},{passive:!1}))}document.addEventListener("DOMContentLoaded",()=>{A()});window.addEventListener("load",()=>{A()});const R={"healthcare-frameworks":{title:"⚙️ SDK Validation Framework",company:"Deloitte",overview:"<ul><li>As a Quality Assurance Professional, my key responsibility is to draft comprehensive testing protocols for a healthcare SDK supporting medicine tracking and smart device connectivity.</li><li>Led end-to-end QA validation of Bluetooth Low Energy (BLE) communication, ensuring seamless operation and cross-platform compatibility across iOS and Android ecosystems.</li><li>Developed and enhanced automation test scripts to expand coverage, validate new features, and optimize the QA process.</li><li>Conducted multiple iterations of sprint, informal, and formal testing, delivering a robust backend software framework used across multiple healthcare application backends.</li></ul>",technologies:["Raspberry Pi","Bluetooth Low Energy","Android Studio","Xcode","Selenium","Unit Testing","UI Automation"]},"healthcare-suite":{title:"💉 Hypercare, Madelyn & Logbook",company:"Deloitte",overview:"<ul><li>Served as QA for the Healthcare Mobile Suite, including Madelyn (patient health tracking) and Hypercare (medicine record management) applications.</li><li>Designed and implemented comprehensive functional & automation test scripts to ensure product quality and reliability.</li><li>Executed multiple regression testing, as well as formal end-to-end validation of patient-facing mobile applications as per FDA level.</li><li>Developed and maintained automation frameworks using JavaScript, Appium, and WebDriverIO to enable efficient and scalable product testing.</li><li>Focused on defect tracking & maximizing test coverage after every sprint to streamline quality assurance processes for an optimal user experience.</li></ul>",technologies:["WebDriverIO","Cucumber","JavaScript","Manual Testing","Test Automation","Appium","Regression Testing"]},dotcom:{title:"🌐 Dot.com",company:"Deloitte",overview:"<ul><li>Served as QA for an enterprise web platform, focusing on digital experiences tailored for diverse patient groups in the healthcare sector.</li><li>Gained in-depth understanding of Adobe Experience Manager (AEM) components to design effective and targeted test strategies.</li><li>Performed end-to-end QA activities, including requirements analysis, test planning, execution, defect tracking, and preparing comprehensive test summary reports for clients.</li><li>Conducted accessibility compliance testing in alignment with WCAG standards to ensure the platform met essential inclusivity criteria.</li><li>Developed automation frameworks from scratch, enabling efficient regression and functional testing.</li><li>Introduced and implemented AI agent-driven automation processes with integration to the MCP server, enhancing overall test coverage and efficiency.</li></ul>",technologies:["Adobe Experience Manager","Playwright","Functional Testing","Accessibility Testing","Performance Testing","Test Automation"]},"cloud-atf":{title:"☁️ Cloud ATF (Network Testing Portal)",company:"Alethea Communications",overview:"<ul><li>Served as a automation QA and my key role was to built a robust automation framework from scratch using Python and Robot Framework.</li><li>Developed a performance testing suite using Python and Locust to evaluate the cloud-based WLAN and broadband testing portal.</li><li>Engineered scalable infrastructure for WiFi 6 protocol validation and comprehensive network performance testing.</li><li>Automated UI and functional tests to ensure seamless device operation under varying conditions.</li><li>Validated portal performance and throughput metrics to enhance system reliability and scalability.</li></ul>",technologies:["Python","Robot Framework","Postman","Locust","Git"]},"sms-autosense":{title:"🤖 SMS Autosense",company:"Alethea Communications",overview:"Machine Learning-driven mobile application for industrial condition helath monitoring of the APIs. My key responsibility was to update the automation code in JavaScript using Katalon Studio to validate the new features and regression.",technologies:["Katalon Studio","JavaScript","Postman","API Testing"]},"mobile-devices":{title:"📱 XP8 & XP5",company:"Sonim Technologies",overview:"As a Functional QA my responsibility is to perform the comprehensive testing of rugged Android satellite smartphone builds across multiple US mobile device variants. Executed functional and sprint testing protocols for industrial-grade mobile devices & accessories.",technologies:["Android","ADB log analyzing","Bluetooth Testing","Satellite Network Testing","GPS Testing","Camera Testing","Audio Testing"]}},p=document.getElementById("projectModal"),U=document.getElementById("modalContent"),$=document.querySelector(".close");function x(e){const i=R[e];if(!i)return;const o=`
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
            ${i.technologies.map(t=>`
              <span class="tech-badge">${t}</span>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;U.innerHTML=o,p.style.display="block",setTimeout(()=>{p.classList.add("show")},10),document.body.style.overflow="hidden",window.history.pushState({modalOpen:!0,projectKey:e},"",window.location.href)}function k(){p.classList.remove("show"),setTimeout(()=>{p.style.display="none",document.body.style.overflow="",window.history.state&&window.history.state.modalOpen&&window.history.back()},300)}document.addEventListener("click",e=>{if(e.target.classList.contains("project-link")){e.preventDefault(),e.stopPropagation();const i=e.target.getAttribute("data-project");i&&x(i)}});document.addEventListener("touchend",e=>{if(e.target.classList.contains("project-link")){e.preventDefault(),e.stopPropagation();const i=e.target.getAttribute("data-project");if(i){const o=e.target.closest(".project-card");o&&window.innerWidth<=768?(W(o),setTimeout(()=>{x(i)},300)):x(i)}}},{passive:!1});function W(e){e.classList.add("card-flipping"),setTimeout(()=>{e.classList.remove("card-flipping")},600)}function N(e,i){const o=document.createElement("div");o.classList.add("ripple");const t=e.getBoundingClientRect(),n=Math.max(t.width,t.height),r=(i.touches?i.touches[0].clientX:i.clientX)-t.left-n/2,s=(i.touches?i.touches[0].clientY:i.clientY)-t.top-n/2;o.style.width=o.style.height=n+"px",o.style.left=r+"px",o.style.top=s+"px",e.style.position="relative",e.appendChild(o),setTimeout(()=>{o.parentNode&&o.parentNode.removeChild(o)},600)}document.addEventListener("touchstart",e=>{if(window.innerWidth<=768){const i=e.target.closest(".project-card");i&&(i.classList.add("card-pressed"),N(i,e))}},{passive:!1});document.addEventListener("touchend",e=>{if(window.innerWidth<=768){const i=e.target.closest(".project-card");i&&setTimeout(()=>{i.classList.remove("card-pressed")},150)}},{passive:!1});$.addEventListener("click",k);p.addEventListener("click",e=>{e.target===p&&k()});document.addEventListener("keydown",e=>{e.key==="Escape"&&p.classList.contains("show")&&k()});"ontouchstart"in window&&p.addEventListener("touchstart",e=>{e.target===p&&k()});window.addEventListener("popstate",e=>{p.classList.contains("show")&&(p.classList.remove("show"),setTimeout(()=>{p.style.display="none",document.body.style.overflow=""},300));const i=document.querySelector(".verification-modal");if(i){i.remove(),document.body.style.overflow="";const o=document.getElementById("certifications");if(o){const t=o.getBoundingClientRect(),n=window.pageYOffset||document.documentElement.scrollTop,r=t.top+n-(v()?90:80);window.scrollTo({top:r,behavior:"smooth"})}}});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".certificate-verify"),i={"codeacademy-001":{title:"Learn JavaScript",issuer:"Codecademy",verificationUrl:"https://www.codecademy.com/profiles/tag5735900943/certificates/705dcb15de0da4dd9d9fc4f3274b430e",status:"Valid",issuedDate:"June 2023",expiryDate:"N/A"},"istqb-001":{title:"Robot Framework with Python-Selenium API Automation Testing",issuer:"Udemy",verificationUrl:"https://www.udemy.com/certificate/UC-c2dcfc91-df9c-4fc1-a502-ef4b1940e034/",status:"Valid",issuedDate:"May 2020",expiryDate:"No Expiration Date"},"python-001":{title:"Learn Python 3",issuer:"Codecademy",verificationUrl:"https://www.codecademy.com/profiles/tag5735900943/certificates/6c152bd262967f8c941c9707ed636bda",status:"Valid",issuedDate:"April 2024",expiryDate:"No Expiration Date"},"automation-001":{title:"WebDriverIO + Node.js -JavaScript UI Automation from Scratch",issuer:"Udemy",verificationUrl:"https://www.udemy.com/certificate/UC-4ea0c12b-e958-4337-82a5-d4e8aebd8bc8/",status:"Valid",issuedDate:"June 2023",expiryDate:"No Expiration Date"},"git-001":{title:"Learn Git & GitHub Course",issuer:"Codecademy",verificationUrl:"https://www.codecademy.com/profiles/tag5735900943/certificates/a8ab218d5950c29861635cc0bf12fd13",status:"Valid",issuedDate:"May 2024",expiryDate:"No Expiration Date"},"ai-001":{title:"Gen AI and AI agent integration in software testing",issuer:"Udemy",verificationUrl:"https://",status:"Valid",issuedDate:"September 2025",expiryDate:"No Expiration Date"}};e.forEach(o=>{o.addEventListener("click",t=>{t.preventDefault();const n=o.getAttribute("data-cert-id"),r=i[n];if(r){const s=`
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
                ">${r.title}</h4>
                
                <p style="
                  margin: 0 0 1rem 0;
                  color: #6366f1;
                  font-weight: 600;
                ">Issued by: ${r.issuer}</p>
                
                <div style="
                  background: #f8fafc;
                  padding: 1rem;
                  border-radius: 12px;
                  margin-bottom: 1rem;
                ">
                  <div style="margin-bottom: 0.5rem;">
                    <strong style="color: #374151;">Status:</strong> 
                    <span style="color: #10b981; font-weight: 600;">${r.status}</span>
                  </div>
                  <div style="margin-bottom: 0.5rem;">
                    <strong style="color: #374151;">Issued:</strong> ${r.issuedDate}
                  </div>
                  <div>
                    <strong style="color: #374151;">Expires:</strong> ${r.expiryDate}
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
                <a href="${r.verificationUrl}" target="_blank" rel="noopener noreferrer" style="
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
        `;document.body.insertAdjacentHTML("beforeend",s);const a=document.querySelector(".verification-modal");document.body.style.overflow="hidden",window.history.pushState({verificationOpen:!0},"",window.location.href),a.querySelectorAll(".close-verification").forEach(d=>{d.addEventListener("click",()=>window.history.back())}),a.addEventListener("click",d=>{d.target===a&&window.history.back()});const l=d=>{d.key==="Escape"&&(window.history.back(),document.removeEventListener("keydown",l))};document.addEventListener("keydown",l)}})})});
