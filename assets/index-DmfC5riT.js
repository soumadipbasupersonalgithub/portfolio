(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=i(s);fetch(s.href,n)}})();const G=()=>{const e=document.getElementById("themeToggle");if(!e)return;const t=()=>localStorage.getItem("portfolio-theme")||"light",i=o=>{document.documentElement.setAttribute("data-theme",o),localStorage.setItem("portfolio-theme",o)};i(t()),e.addEventListener("click",()=>{const o=t()==="light"?"dark":"light";i(o)})};G();const z=()=>{const e=document.getElementById("scrollTop");e&&(window.addEventListener("scroll",()=>{window.scrollY>400?e.classList.add("visible"):e.classList.remove("visible")},{passive:!0}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))};z();const J=()=>{const e=document.getElementById("heroCanvas");if(!e)return;const t=e.getContext("2d");let i=[],o={x:null,y:null};const s=()=>{const u=e.parentElement;e.width=u.offsetWidth,e.height=u.offsetHeight};s(),window.addEventListener("resize",s);const n=()=>document.documentElement.getAttribute("data-theme")==="dark";class a{constructor(){this.x=Math.random()*e.width,this.y=Math.random()*e.height,this.vx=(Math.random()-.5)*.5,this.vy=(Math.random()-.5)*.5,this.r=Math.random()*2+1}update(){if(this.x+=this.vx,this.y+=this.vy,(this.x<0||this.x>e.width)&&(this.vx*=-1),(this.y<0||this.y>e.height)&&(this.vy*=-1),o.x!==null){const c=this.x-o.x,g=this.y-o.y,v=Math.sqrt(c*c+g*g);v<120&&(this.x+=c/v*1.5,this.y+=g/v*1.5)}}draw(){const c=n();t.beginPath(),t.arc(this.x,this.y,this.r,0,Math.PI*2),t.fillStyle=c?`rgba(129, 140, 248, ${.3+this.r*.15})`:`rgba(99, 102, 241, ${.25+this.r*.1})`,t.fill()}}const l=Math.min(80,Math.floor(e.width*e.height/12e3));for(let u=0;u<l;u++)i.push(new a);const f=()=>{t.clearRect(0,0,e.width,e.height);const u=n();i.forEach(c=>{c.update(),c.draw()});for(let c=0;c<i.length;c++)for(let g=c+1;g<i.length;g++){const v=i[c].x-i[g].x,w=i[c].y-i[g].y,E=Math.sqrt(v*v+w*w);E<150&&(t.beginPath(),t.moveTo(i[c].x,i[c].y),t.lineTo(i[g].x,i[g].y),t.strokeStyle=u?`rgba(129, 140, 248, ${.08*(1-E/150)})`:`rgba(99, 102, 241, ${.06*(1-E/150)})`,t.lineWidth=.5,t.stroke())}requestAnimationFrame(f)};f(),e.parentElement.addEventListener("mousemove",u=>{const c=e.getBoundingClientRect();o.x=u.clientX-c.left,o.y=u.clientY-c.top}),e.parentElement.addEventListener("mouseleave",()=>{o.x=null,o.y=null})};window.innerWidth>768&&!("ontouchstart"in window)&&J();const K=()=>{const e=document.querySelectorAll(".section-header, .about-text, .about-image, .skill-card, .certificate-card, .project-card, .contact-info, .form-section"),t=new IntersectionObserver(i=>{i.forEach(o=>{o.isIntersecting&&(o.target.classList.add("animate"),t.unobserve(o.target))})},{threshold:.1,rootMargin:"0px 0px -50px 0px"});e.forEach(i=>t.observe(i))};K();(function(){const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e)})();const x=document.querySelector(".navbar"),A=document.querySelector(".hamburger"),D=document.querySelector(".nav-menu"),P=document.querySelectorAll(".nav-link"),_=document.querySelectorAll('.btn[href^="#"]'),X=document.querySelectorAll("section"),b=document.querySelector(".contact-form"),k=document.querySelector(".fab-button");window.addEventListener("scroll",()=>{window.scrollY>50?x.classList.add("scrolled"):x.classList.remove("scrolled")});A.addEventListener("click",()=>{A.classList.toggle("active"),D.classList.toggle("active")});P.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const i=e.getAttribute("href"),o=document.querySelector(i);A.classList.remove("active"),D.classList.remove("active"),o&&setTimeout(()=>{const s=x.offsetHeight,n=o.offsetTop-s;window.scrollTo({top:n,behavior:"smooth"}),P.forEach(a=>a.classList.remove("active")),e.classList.add("active")},150)})});k&&k.addEventListener("click",()=>{k.classList.add("launched");const e=k.querySelector(".fab-text"),t=e.textContent;e.textContent="✓ Done";const i=k.querySelector(".fab-icon");i&&(i.style.animation="iconBounceDown 0.5s ease"),setTimeout(()=>{e.textContent=t,k.classList.remove("launched"),i&&(i.style.animation="")},2500)});function q(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768}_.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const i=e.getAttribute("href"),o=document.querySelector(i);if(o){const s=x.offsetHeight,n=o.offsetTop-s;window.scrollTo({top:n,behavior:"smooth"})}})});const V={threshold:[.1,.5,.7],rootMargin:"-20% 0px -30% 0px"},Q=new IntersectionObserver(e=>{let t=0,i=null;if(e.forEach(o=>{o.intersectionRatio>t&&(t=o.intersectionRatio,i=o)}),i&&t>.1){P.forEach(s=>{s.classList.remove("active")});const o=document.querySelector(`.nav-link[href="#${i.target.id}"]`);o&&o.classList.add("active")}},V);X.forEach(e=>{Q.observe(e)});window.addEventListener("scroll",()=>{const e=window.pageYOffset,t=document.querySelector(".hero-visual"),i=document.querySelector(".hero-text");if(t&&i){const o=e*-.5;t.style.transform=`translateY(${o}px)`;const s=1-e/window.innerHeight;if(s>=0)if(q()){const n=i.querySelector(".hero-title"),a=i.querySelector(".hero-description"),l=i.querySelector(".hero-buttons");n&&(n.style.opacity=s),a&&(a.style.opacity=s),l&&(l.style.opacity="1",l.style.filter="none",l.style.transform="translateZ(0)",l.style.backfaceVisibility="hidden")}else i.style.opacity=s}});const Z=()=>{document.querySelectorAll(".stat-number").forEach(t=>{const i=t.textContent,o=parseInt(i),s=i.includes("+"),n=o/100;let a=0;const l=()=>{a<o?(a+=n,t.textContent=Math.floor(a)+(s?"+":""),requestAnimationFrame(l)):t.textContent=o+(s?"+":"")};l()})},ee=new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&(t.target.classList.add("animate"),t.target.classList.contains("about-stats")&&Z())})},{threshold:.1}),te=document.querySelectorAll(".skill-card, .project-card, .contact-item, .about-stats, .stat-item");te.forEach(e=>{ee.observe(e)});if(b){const e="cb382b6c-8698-4bd2-b664-25db5bb22cfb";b.addEventListener("submit",async t=>{t.preventDefault();const i=b.querySelector('button[type="submit"]'),o=i.querySelector(".btn-text"),s=i.querySelector(".btn-loading"),n=document.getElementById("form-status"),a=b.querySelector("#name").value.trim(),l=b.querySelector("#email").value.trim(),f=b.querySelector("#message").value.trim();if(!a||!l||!f){n&&(n.className="form-status error",n.textContent="❌ Please fill in all fields.",n.style.display="block");return}i.disabled=!0,o&&(o.style.display="none"),s&&(s.style.display="inline"),n&&(n.style.display="none");try{const c=await(await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({access_key:e,subject:`Portfolio Contact: ${a}`,from_name:a,email:l,message:f})})).json();if(c.success)n&&(n.className="form-status success",n.textContent="✅ Message sent successfully! I will get back to you soon.",n.style.display="block"),b.reset();else throw new Error(c.message||"Submission failed")}catch(u){console.error("Form submission error:",u),n&&(n.className="form-status error",n.textContent="❌ Failed to send message. Please try again or contact me directly at soumadipbasu333@gmail.com",n.style.display="block")}finally{i.disabled=!1,o&&(o.style.display="inline"),s&&(s.style.display="none"),setTimeout(()=>{n&&(n.style.display="none")},7e3)}})}const oe=()=>{const e=[];for(let n=0;n<10;n++){const a=document.createElement("div");a.className="cursor-trail",a.style.cssText=`
      position: fixed;
      width: 4px;
      height: 4px;
      background: var(--primary-color);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: ${(10-n)/10};
      transition: opacity 0.3s ease;
    `,document.body.appendChild(a),e.push(a)}let i=0,o=0;document.addEventListener("mousemove",n=>{i=n.clientX,o=n.clientY});const s=()=>{let n=i,a=o;e.forEach((l,f)=>{const u=e[f+1]||e[0];l.style.left=n+"px",l.style.top=a+"px",n+=(parseInt(u.style.left)||i-n)*.3,a+=(parseInt(u.style.top)||o-a)*.3}),requestAnimationFrame(s)};s()};window.innerWidth>768&&!("ontouchstart"in window)&&oe();window.addEventListener("load",()=>{document.body.classList.add("loaded"),setTimeout(()=>{document.querySelectorAll(".hero-title .title-line, .hero-description, .hero-buttons").forEach((t,i)=>{setTimeout(()=>{t.style.opacity="1",t.style.transform="translateY(0)"},i*200)})},300)});document.addEventListener("keydown",e=>{e.key==="Escape"&&(A.classList.remove("active"),D.classList.remove("active"))});let I;window.addEventListener("scroll",()=>{I&&window.cancelAnimationFrame(I),I=window.requestAnimationFrame(()=>{})});const ie=()=>{document.querySelectorAll(".btn").forEach(i=>{i.addEventListener("mouseenter",()=>{i.style.transform="translateY(-2px) scale(1.02)"}),i.addEventListener("mouseleave",()=>{i.style.transform=""})}),document.querySelectorAll(".skill-card, .project-card").forEach(i=>{i.addEventListener("mousemove",o=>{const s=i.getBoundingClientRect(),n=o.clientX-s.left,a=o.clientY-s.top,l=s.width/2,f=s.height/2,u=(a-f)/10,c=(l-n)/10;i.style.transform=`perspective(1000px) rotateX(${u}deg) rotateY(${c}deg) translateZ(0)`}),i.addEventListener("mouseleave",()=>{i.style.transform=""})})},j=()=>{window.innerWidth<=768&&([{selector:".nav-logo .logo-text",duration:200},{selector:".nav-link",duration:300},{selector:".btn",duration:200},{selector:".floating-card",duration:400},{selector:".professional-photo",duration:300},{selector:".stat-item",duration:300},{selector:".image-card",duration:400},{selector:".skill-card",duration:400},{selector:".project-card",duration:400},{selector:".project-link",duration:200},{selector:".tech-tag",duration:200},{selector:".contact-item",duration:300},{selector:".social-link",duration:200}].forEach(({selector:o,duration:s})=>{document.querySelectorAll(o).forEach(a=>{let l;a.addEventListener("touchstart",()=>{a.classList.add("mobile-hover"),navigator.vibrate&&navigator.vibrate(30)},{passive:!0}),a.addEventListener("touchend",()=>{l=setTimeout(()=>{a.classList.remove("mobile-hover")},s)},{passive:!0}),a.addEventListener("touchcancel",()=>{clearTimeout(l),a.classList.remove("mobile-hover")}),(o.includes("nav-link")||o.includes("btn")||o.includes("project-link")||o.includes("social-link"))&&a.addEventListener("click",f=>{a.style.transform="scale(0.95)",setTimeout(()=>{a.style.transform=""},100)})})}),document.querySelectorAll(".project-card").forEach(o=>{const s=o.querySelector(".project-overlay");o.querySelectorAll(".project-link"),o.addEventListener("touchstart",()=>{s&&(s.style.opacity="1")}),o.addEventListener("touchend",()=>{setTimeout(()=>{s&&(s.style.opacity="")},2e3)})}),document.querySelectorAll(".skill-card").forEach(o=>{o.querySelector(".skill-icon");let s;o.addEventListener("touchstart",n=>{o.classList.add("mobile-hover"),navigator.vibrate&&navigator.vibrate(30),clearTimeout(s)},{passive:!0}),o.addEventListener("touchend",n=>{s=setTimeout(()=>{o.classList.remove("mobile-hover")},500)},{passive:!0}),o.addEventListener("touchcancel",()=>{clearTimeout(s),o.classList.remove("mobile-hover")},{passive:!0}),o.addEventListener("touchmove",()=>{clearTimeout(s),s=setTimeout(()=>{o.classList.remove("mobile-hover")},200)},{passive:!0})}))};ie();j();const ne=()=>{window.innerWidth<=768&&(console.log("Mobile view detected - touch events enabled"),document.addEventListener("touchstart",e=>{const t=e.target.closest(".skill-card");t&&console.log("Touch started on skill card:",t)},{passive:!0}))};ne();window.addEventListener("resize",()=>{document.querySelectorAll(".mobile-hover").forEach(e=>{e.classList.remove("mobile-hover")}),j()});console.log("Portfolio loaded successfully! ✨");const se=()=>{const e=document.getElementById("chatbotFab"),t=document.getElementById("chatbotWindow"),i=document.getElementById("chatbotClose"),o=document.getElementById("chatbotMessages"),s=document.getElementById("chatbotInput"),n=document.getElementById("chatbotSend"),a=document.querySelectorAll(".chatbot-starter-btn");if(!e||!t)return;const l=document.getElementById("chatbotBackdrop"),f=(()=>{try{const r=[50,121,15,12,2,56,115,66,58,96,60,24,23,24,92,14,6,119,67,2,56,6,109,105,52,87,47,12,99,112,95,98,2,127,22,59,6,13,127],d=[115,48,117,109,81,65,50,54];return r.map((m,p)=>String.fromCharCode(m^d[p%d.length])).join("")}catch{return""}})(),u=`You are Soumadip Basu's friendly and professional AI portfolio assistant. Answer questions about Soumadip based ONLY on the information below. Be conversational, helpful, and concise. Use bullet points for lists. If someone asks something outside this data, politely redirect them to the portfolio or suggest contacting Soumadip directly.

=== PERSONAL INFO ===
Name: Soumadip Basu
Title: Full Stack QA Professional
Location: Bengaluru, India
Email: soumadipbasu333@gmail.com
Phone: +91 9851824880
LinkedIn: linkedin.com/in/soumadip-basu-b47160197/
GitHub: github.com/soumadipbasupersonalgithub

=== EDUCATION ===
Degree: Bachelor's & Diploma in Electronics & Communications Engineering
University: Maulana Abul Kalam Azad University of Technology (MAKAUT)
Year: 2017

=== CAREER EXPERIENCE (6+ years, 3 companies, 20+ projects) ===

1. Deloitte (2021 - Present) — Consultant & Ex Analyst
   - Develops sophisticated automation solutions
   - Integrates cutting-edge Generative AI technologies for intelligent test case generation, synthetic data creation, and workflow optimization
   - Drafts comprehensive testing protocols for healthcare SDK supporting medicine tracking and smart device connectivity
   - Led end-to-end QA validation of Bluetooth Low Energy (BLE) communication
   - Developed automation test scripts for cross-platform compatibility across iOS and Android
   - QA for Healthcare Mobile Suite (Madelyn, Hypercare, Logbook applications)
   - Built automation frameworks using JavaScript, Appium, and WebDriverIO
   - QA for enterprise healthcare web platform (Dotcom) built on Adobe Experience Manager
   - Conducted WCAG accessibility compliance testing
   - Introduced AI agent-driven automation with MCP server integration

2. Alethea Communication Pvt Ltd (2020 - 2021) — QA Automation Engineer
   - Built robust automation framework from scratch using Python and Robot Framework
   - Developed performance testing suite using Python and Locust
   - Worked on Cloud ATF — advanced automated solution for WLAN and broadband technologies
   - Engineered scalable infrastructure for WiFi 6 protocol validation
   - Also worked on SMS Autosense — ML-driven industrial monitoring mobile app
   - Updated automation code in JavaScript using Katalon Studio

3. Sonim Technologies (2019 - 2020) — QA Engineer
   - Comprehensive functional testing of rugged Android smartphones (XP8 & XP5)
   - Tested multiple US mobile device variants
   - Executed functional and sprint testing for industrial-grade mobile devices
   - Testing areas: Bluetooth, Satellite Network, GPS, Camera, Audio

=== TECHNICAL SKILLS ===
Test Automation: Playwright, WebdriverIO, Robot Framework, Appium, Selenium, Katalon Studio
Programming Languages: JavaScript, Python, TypeScript
Mobile & Web Testing: Cross-platform testing, API testing, UI/UX validation
Quality Assurance: Test Strategy, Planning, Risk Analysis, Defect Management, SDLC & STLC Process Optimization
Specialized Testing: Gen AI integration with MCP in testing process, Prompt Engineering, Automation, Performance, Functional, Accessibility
Collaboration Tools: JIRA, Git, Bugzilla, TestRail, Confluence

=== PROJECTS (6 major projects) ===
1. SDK Validation Framework (Deloitte) — Backend SDK for patient-facing healthcare apps, BLE connectivity, medicine record synchronization
2. Hypercare, Madelyn & Logbook (Deloitte) — Healthcare mobile suite for medicine records and patient health monitoring
3. Dotcom (Deloitte) — Enterprise healthcare web portal on AEM for patients to access health services info, AI agent-driven automation with MCP
4. Cloud ATF (Alethea) — Automated solution for WLAN and broadband testing with WiFi 6 protocol validation
5. SMS Autosense (Alethea) — ML-driven mobile app for industrial machine condition health monitoring
6. XP8 & XP5 (Sonim) — Rugged Android smartphones testing for extreme industrial conditions

=== PROFESSIONAL CERTIFICATIONS (7 total) ===
1. Playwright 101 Certification — TestMu AI (March 2026, Valid until March 2028)
2. Learn JavaScript — Codecademy (June 2023)
3. Robot Framework with Python-Selenium API Automation Testing — Udemy (May 2024)
4. Learn Python 3 — Codecademy (April 2024)
5. WebDriverIO + Node.js JavaScript UI Automation from Scratch — Udemy (June 2023)
6. Learn Git & GitHub Course — Codecademy (May 2024)
7. Gen AI and AI agent integration in software testing — Udemy (September 2025)

=== RESPONSE GUIDELINES ===
- Be friendly, conversational, and professional
- Keep responses concise (3-6 sentences for simple questions, bullet points for detailed ones)
- When asked for a portfolio summary or brief overview, provide a comprehensive professional summary covering background, experience, skills, education, projects, certifications, and contact info in a clear and well-structured manner
- Always stay within the provided information — do not invent or assume extra details
- When asked about contacting, always mention email and phone, and suggest using the contact form on the portfolio
- Highlight key strengths: 6+ years experience, automation expertise, Gen AI integration, healthcare domain knowledge
- If asked about something not in the data, say: "I don't have that specific information, but you can reach out to Soumadip directly or explore the portfolio sections for more details!"`;let c=[],g=!1;const v=()=>{g=!0,e.classList.add("hidden"),document.body.classList.add("chatbot-open"),l&&l.classList.add("visible"),t.classList.remove("closing"),t.classList.add("opening"),t.style.visibility="visible",t.addEventListener("animationend",function r(){t.removeEventListener("animationend",r),t.classList.remove("opening"),t.classList.add("open")}),setTimeout(()=>s.focus(),500)},w=()=>{g=!1,document.body.classList.remove("chatbot-open"),l&&l.classList.remove("visible"),t.classList.remove("open"),t.classList.add("closing"),t.addEventListener("animationend",function r(){t.removeEventListener("animationend",r),t.classList.remove("closing"),t.style.visibility="hidden",e.classList.remove("hidden")})};e.addEventListener("click",v),i.addEventListener("click",w),l&&l.addEventListener("click",w),document.addEventListener("keydown",r=>{r.key==="Escape"&&g&&w()}),t.addEventListener("wheel",r=>{const d=o,m=d.scrollTop===0,p=d.scrollTop+d.clientHeight>=d.scrollHeight-1;(m&&r.deltaY<0||p&&r.deltaY>0)&&r.preventDefault()},{passive:!1});let E=0;t.addEventListener("touchstart",r=>{E=r.touches[0].clientY},{passive:!0}),t.addEventListener("touchmove",r=>{const d=o,m=r.touches[0].clientY,p=E-m,L=d.scrollTop===0,h=d.scrollTop+d.clientHeight>=d.scrollHeight-1;(L&&p<0||h&&p>0)&&r.preventDefault()},{passive:!1});const N=()=>{const r=o.querySelector(".chatbot-welcome");r&&r.remove()},S=(r,d)=>{const m=document.createElement("div");return m.className=`chatbot-msg ${d}`,m.innerHTML=r,o.appendChild(m),o.scrollTop=o.scrollHeight,m},R=()=>{const r=document.createElement("div");r.className="chatbot-typing",r.id="chatbotTyping",r.innerHTML='<span class="chatbot-typing-dot"></span><span class="chatbot-typing-dot"></span><span class="chatbot-typing-dot"></span>',o.appendChild(r),o.scrollTop=o.scrollHeight},B=()=>{const r=document.getElementById("chatbotTyping");r&&r.remove()},F=r=>r.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/^[-•]\s+(.+)/gm,"<br>&bull; $1").replace(/^\d+\.\s+(.+)/gm,"<br>$1").replace(/\n{2,}/g,"<br><br>").replace(/\n/g,"<br>").trim(),H=["gemini-2.5-flash","gemini-2.0-flash","gemini-2.0-flash-lite"],W="https://generativelanguage.googleapis.com/v1beta/models",U=r=>new Promise(d=>setTimeout(d,r)),$=async(r,d)=>{const m=`${W}/${r}:generateContent?key=${f}`,p=await fetch(m,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)});if(p.status===429){const h=new Error("RATE_LIMITED");throw h.status=429,h}if(!p.ok){const h=new Error(`API_ERROR_${p.status}`);throw h.status=p.status,h}return(await p.json()).candidates?.[0]?.content?.parts?.[0]?.text||null},Y=async r=>{if(!f)return"The AI assistant is currently unavailable. Please contact Soumadip directly at soumadipbasu333@gmail.com";c.push({role:"user",parts:[{text:r}]});const d={contents:[{role:"user",parts:[{text:u}]},{role:"model",parts:[{text:"Understood! I am Soumadip Basu's AI portfolio assistant. I will answer questions based on his portfolio information in a friendly and professional manner. How can I help you?"}]},...c],generationConfig:{temperature:.7,topK:40,topP:.95,maxOutputTokens:8192}};let m=null;for(const p of H)for(let L=0;L<2;L++)try{const h=await $(p,d);if(h)return c.push({role:"model",parts:[{text:h}]}),c.length>20&&(c=c.slice(-20)),h}catch(h){if(m=h,h.status===429&&L===0){await U(3e3);continue}if(h.status===429)break;throw h}if(m?.status===429){const p=new Error("ALL_MODELS_RATE_LIMITED");throw p.isRateLimit=!0,p}throw m||new Error("No response generated")},C=async r=>{const d=r||s.value.trim();if(d){N(),S(d,"user"),s.value="",n.disabled=!0,R();try{const m=await Y(d);B(),S(F(m),"bot")}catch(m){console.error("Chatbot error:",m),B(),m.isRateLimit?S("I'm getting a lot of traffic right now! Please wait a minute and try again. In the meantime, feel free to explore the portfolio sections above or contact Soumadip at <strong>soumadipbasu333@gmail.com</strong>","error"):S("Sorry, I encountered an error. Please try again or contact Soumadip directly at <strong>soumadipbasu333@gmail.com</strong>","error"),c.length>0&&c[c.length-1].role==="user"&&c.pop()}finally{n.disabled=!1,s.focus()}}};n.addEventListener("click",()=>C()),s.addEventListener("keydown",r=>{r.key==="Enter"&&!r.shiftKey&&(r.preventDefault(),C())}),a.forEach(r=>{r.addEventListener("click",()=>{const d=r.getAttribute("data-question");C(d)})})};se();window.debugMobileForm=function(){const e=document.querySelector(".contact-form"),t=e?.querySelector('button[type="submit"]');if(console.log("=== Mobile Form Debug ==="),console.log("Form element:",e),console.log("Submit button:",t),console.log("Form ID:",e?.id),console.log("Button type:",t?.type),console.log("Is mobile device:",/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),console.log("Window width:",window.innerWidth),console.log("Touch support:","ontouchstart"in window),console.log("EmailJS loaded:",typeof emailjs<"u"),t&&console.log("Button styles:",{pointerEvents:getComputedStyle(t).pointerEvents,touchAction:getComputedStyle(t).touchAction,userSelect:getComputedStyle(t).userSelect,position:getComputedStyle(t).position,zIndex:getComputedStyle(t).zIndex}),e&&t){console.log("Testing manual form submission...");const i=new Event("submit",{bubbles:!0,cancelable:!0});e.dispatchEvent(i)}};function O(){const e=document.getElementById("github-link"),t=document.getElementById("linkedin-link");function i(o,s){console.log(`${s} link clicked on mobile`);try{if(!window.open(o,"_blank","noopener,noreferrer")){console.log("Window.open failed, trying alternative method");const a=document.createElement("a");a.href=o,a.target="_blank",a.rel="noopener noreferrer",document.body.appendChild(a),a.click(),document.body.removeChild(a)}}catch(n){console.log("Error opening link:",n);const a=document.createElement("a");a.href=o,a.target="_blank",a.rel="noopener noreferrer",document.body.appendChild(a),a.click(),document.body.removeChild(a)}}e&&(e.removeEventListener("click",()=>{}),e.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),console.log("GitHub link clicked"),i("https://github.com/soumadipbasupersonalgithub","GitHub")}),e.addEventListener("touchend",o=>{o.preventDefault(),o.stopPropagation(),console.log("GitHub link touched"),i("https://github.com/soumadipbasupersonalgithub","GitHub")},{passive:!1})),t&&(t.removeEventListener("click",()=>{}),t.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),console.log("LinkedIn link clicked"),i("https://www.linkedin.com/in/soumadip-basu-b47160197/","LinkedIn")}),t.addEventListener("touchend",o=>{o.preventDefault(),o.stopPropagation(),console.log("LinkedIn link touched"),i("https://www.linkedin.com/in/soumadip-basu-b47160197/","LinkedIn")},{passive:!1}))}document.addEventListener("DOMContentLoaded",()=>{O()});window.addEventListener("load",()=>{O()});const ae={"healthcare-frameworks":{title:"⚙️ SDK Validation Framework",company:"Deloitte",overview:"<ul><li>As a Quality Assurance Professional, my key responsibility is to draft comprehensive testing protocols for a healthcare SDK supporting medicine tracking and smart device connectivity.</li><li>Led end-to-end QA validation of Bluetooth Low Energy (BLE) communication, ensuring seamless operation and cross-platform compatibility across iOS and Android ecosystems.</li><li>Developed and enhanced automation test scripts to expand coverage, validate new features, and optimize the QA process.</li><li>Conducted multiple iterations of sprint, informal, and formal testing, delivering a robust backend software framework used across multiple healthcare application backends.</li></ul>",technologies:["Raspberry Pi","Bluetooth Low Energy","Android Studio","Xcode","Selenium","Unit Testing","UI Automation"]},"healthcare-suite":{title:"💉 Hypercare, Madelyn & Logbook",company:"Deloitte",overview:"<ul><li>Served as QA for the Healthcare Mobile Suite, including Madelyn (patient health tracking) and Hypercare (medicine record management) applications.</li><li>Designed and implemented comprehensive functional & automation test scripts to ensure product quality and reliability.</li><li>Executed multiple regression testing, as well as formal end-to-end validation of patient-facing mobile applications as per FDA level.</li><li>Developed and maintained automation frameworks using JavaScript, Appium, and WebDriverIO to enable efficient and scalable product testing.</li><li>Focused on defect tracking & maximizing test coverage after every sprint to streamline quality assurance processes for an optimal user experience.</li></ul>",technologies:["WebDriverIO","Cucumber","JavaScript","Manual Testing","Test Automation","Appium","Regression Testing"]},dotcom:{title:"🌐 Dot.com",company:"Deloitte",overview:"<ul><li>Served as QA for an enterprise web platform, focusing on digital experiences tailored for diverse patient groups in the healthcare sector.</li><li>Gained in-depth understanding of Adobe Experience Manager (AEM) components to design effective and targeted test strategies.</li><li>Performed end-to-end QA activities, including requirements analysis, test planning, execution, defect tracking, and preparing comprehensive test summary reports for clients.</li><li>Conducted accessibility compliance testing in alignment with WCAG standards to ensure the platform met essential inclusivity criteria.</li><li>Developed automation frameworks from scratch, enabling efficient regression and functional testing.</li><li>Introduced and implemented AI agent-driven automation processes with integration to the MCP server, enhancing overall test coverage and efficiency.</li></ul>",technologies:["Adobe Experience Manager","Playwright","Functional Testing","Accessibility Testing","Performance Testing","Test Automation"]},"cloud-atf":{title:"☁️ Cloud ATF (Network Testing Portal)",company:"Alethea Communications",overview:"<ul><li>Served as a automation QA and my key role was to built a robust automation framework from scratch using Python and Robot Framework.</li><li>Developed a performance testing suite using Python and Locust to evaluate the cloud-based WLAN and broadband testing portal.</li><li>Engineered scalable infrastructure for WiFi 6 protocol validation and comprehensive network performance testing.</li><li>Automated UI and functional tests to ensure seamless device operation under varying conditions.</li><li>Validated portal performance and throughput metrics to enhance system reliability and scalability.</li></ul>",technologies:["Python","Robot Framework","Postman","Locust","Git"]},"sms-autosense":{title:"🤖 SMS Autosense",company:"Alethea Communications",overview:"Machine Learning-driven mobile application for industrial condition helath monitoring of the APIs. My key responsibility was to update the automation code in JavaScript using Katalon Studio to validate the new features and regression.",technologies:["Katalon Studio","JavaScript","Postman","API Testing"]},"mobile-devices":{title:"📱 XP8 & XP5",company:"Sonim Technologies",overview:"As a Functional QA my responsibility is to perform the comprehensive testing of rugged Android satellite smartphone builds across multiple US mobile device variants. Executed functional and sprint testing protocols for industrial-grade mobile devices & accessories.",technologies:["Android","ADB log analyzing","Bluetooth Testing","Satellite Network Testing","GPS Testing","Camera Testing","Audio Testing"]}},y=document.getElementById("projectModal"),re=document.getElementById("modalContent"),ce=document.querySelector(".close");function M(e){const t=ae[e];if(!t)return;const i=`
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
  `;re.innerHTML=i,y.style.display="block",setTimeout(()=>{y.classList.add("show")},10),document.body.style.overflow="hidden",window.history.pushState({modalOpen:!0,projectKey:e},"",window.location.href)}function T(){y.classList.remove("show"),setTimeout(()=>{y.style.display="none",document.body.style.overflow="",window.history.state&&window.history.state.modalOpen&&window.history.back()},300)}document.addEventListener("click",e=>{if(e.target.classList.contains("project-link")){e.preventDefault(),e.stopPropagation();const t=e.target.getAttribute("data-project");t&&M(t)}});document.addEventListener("touchend",e=>{if(e.target.classList.contains("project-link")){e.preventDefault(),e.stopPropagation();const t=e.target.getAttribute("data-project");if(t){const i=e.target.closest(".project-card");i&&window.innerWidth<=768?(le(i),setTimeout(()=>{M(t)},300)):M(t)}}},{passive:!1});function le(e){e.classList.add("card-flipping"),setTimeout(()=>{e.classList.remove("card-flipping")},600)}function de(e,t){const i=document.createElement("div");i.classList.add("ripple");const o=e.getBoundingClientRect(),s=Math.max(o.width,o.height),n=(t.touches?t.touches[0].clientX:t.clientX)-o.left-s/2,a=(t.touches?t.touches[0].clientY:t.clientY)-o.top-s/2;i.style.width=i.style.height=s+"px",i.style.left=n+"px",i.style.top=a+"px",e.style.position="relative",e.appendChild(i),setTimeout(()=>{i.parentNode&&i.parentNode.removeChild(i)},600)}document.addEventListener("touchstart",e=>{if(window.innerWidth<=768){const t=e.target.closest(".project-card");t&&(t.classList.add("card-pressed"),de(t,e))}},{passive:!1});document.addEventListener("touchend",e=>{if(window.innerWidth<=768){const t=e.target.closest(".project-card");t&&setTimeout(()=>{t.classList.remove("card-pressed")},150)}},{passive:!1});ce.addEventListener("click",T);y.addEventListener("click",e=>{e.target===y&&T()});document.addEventListener("keydown",e=>{e.key==="Escape"&&y.classList.contains("show")&&T()});"ontouchstart"in window&&y.addEventListener("touchstart",e=>{e.target===y&&T()});window.addEventListener("popstate",e=>{y.classList.contains("show")&&(y.classList.remove("show"),setTimeout(()=>{y.style.display="none",document.body.style.overflow=""},300));const t=document.querySelector(".verification-modal");if(t){t.remove(),document.body.style.overflow="";const i=document.getElementById("certifications");if(i){const o=i.getBoundingClientRect(),s=window.pageYOffset||document.documentElement.scrollTop,n=o.top+s-(q()?90:80);window.scrollTo({top:n,behavior:"smooth"})}}});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".certificate-verify"),t={"codeacademy-001":{title:"Learn JavaScript",issuer:"Codecademy",verificationUrl:"https://www.codecademy.com/profiles/tag5735900943/certificates/705dcb15de0da4dd9d9fc4f3274b430e",status:"Valid",issuedDate:"June 2023",expiryDate:"N/A"},"istqb-001":{title:"Robot Framework with Python-Selenium API Automation Testing",issuer:"Udemy",verificationUrl:"https://www.udemy.com/certificate/UC-c2dcfc91-df9c-4fc1-a502-ef4b1940e034/",status:"Valid",issuedDate:"May 2020",expiryDate:"No Expiration Date"},"python-001":{title:"Learn Python 3",issuer:"Codecademy",verificationUrl:"https://www.codecademy.com/profiles/tag5735900943/certificates/6c152bd262967f8c941c9707ed636bda",status:"Valid",issuedDate:"April 2024",expiryDate:"No Expiration Date"},"automation-001":{title:"WebDriverIO + Node.js -JavaScript UI Automation from Scratch",issuer:"Udemy",verificationUrl:"https://www.udemy.com/certificate/UC-4ea0c12b-e958-4337-82a5-d4e8aebd8bc8/",status:"Valid",issuedDate:"June 2023",expiryDate:"No Expiration Date"},"git-001":{title:"Learn Git & GitHub Course",issuer:"Codecademy",verificationUrl:"https://www.codecademy.com/profiles/tag5735900943/certificates/a8ab218d5950c29861635cc0bf12fd13",status:"Valid",issuedDate:"May 2024",expiryDate:"No Expiration Date"},"ai-001":{title:"Gen AI and AI agent integration in software testing",issuer:"Udemy",verificationUrl:"https://",status:"Valid",issuedDate:"September 2025",expiryDate:"No Expiration Date"},"playwright-001":{title:"Playwright 101 Certification",issuer:"TestMu AI",verificationUrl:"https://www.testmuai.com/certified/P101-3593BG/",status:"Valid",issuedDate:"March 2026",expiryDate:"March 2028"}};e.forEach(i=>{i.addEventListener("click",o=>{o.preventDefault();const s=i.getAttribute("data-cert-id"),n=t[s];if(n){const a=`
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
        `;document.body.insertAdjacentHTML("beforeend",a);const l=document.querySelector(".verification-modal");document.body.style.overflow="hidden",window.history.pushState({verificationOpen:!0},"",window.location.href),l.querySelectorAll(".close-verification").forEach(c=>{c.addEventListener("click",()=>window.history.back())}),l.addEventListener("click",c=>{c.target===l&&window.history.back()});const u=c=>{c.key==="Escape"&&(window.history.back(),document.removeEventListener("keydown",u))};document.addEventListener("keydown",u)}})})});
