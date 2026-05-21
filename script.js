let works = JSON.parse(localStorage.getItem('alaa_works')) || [
  {
    type: "photos",
    title: "📸 الصور",
    desc: "لقطات من التخاريج والمناسبات",
    media: ["aa.png", "nn.png", "w.jpg"]
  },
  {
    type: "videos",
    title: "🎥 فيديوهات التخريج",
    desc: "مقاطع من الحفلات",
    media: ["takhrij.mp4", "takhrij.mp4"]
  },
  {
    type: "audios",
    title: "🎵 التسجيلات الصوتية", 
    desc: "المقاطع الصوتية للحفلات",
    media: ["sawt.mp3", "sawt.mp3"]  
  }
];

let news = JSON.parse(localStorage.getItem('alaa_news')) || [
  { title: "تغطية تخريج دفعة 2026", date: "16 مايو 2026", content: "قمنا بتغطية حفل تخريج كلية الهندسة جامعة الخرطوم. كان يوم مميز وفرح لا يوصف." }
];

let results = JSON.parse(localStorage.getItem('alaa_results')) || [
  { title: "نتائج المرحلة المتوسطة 2026", date: "17 مايو 2026", students: ["أحمد محمد - 98%", "فاطمة علي - 95%", "سارة حسن - 92%"] },
  { title: "نتائج رياض الأطفال 2026", date: "17 مايو 2026", students: ["محمد عمر - ممتاز", "نور أحمد - ممتاز", "خديجة علي - جيد جداً"] }
];

const ADMIN_PASSWORD = "Alaa2026";
let tapCount = 0;

function saveWorks() {
  localStorage.setItem('alaa_works', JSON.stringify(works));
}

function saveNews() {
  localStorage.setItem('alaa_news', JSON.stringify(news));
}

function saveResults() {
  localStorage.setItem('alaa_results', JSON.stringify(results));
}

function renderWorks() {
  const container = document.getElementById('works-container');
  container.innerHTML = '';
  works.forEach(item => {
    let mediaHTML = '';
    
    if (item.type === "photos") {
      mediaHTML = `<div class="media-grid">${item.media.map(src => `<img src="${src}" loading="lazy" alt="صورة">`).join('')}</div>`;
    }
    
    if (item.type === "videos") {
      mediaHTML = `<div class="media-grid">${item.media.map(src => `<video controls preload="none"><source src="${src}" type="video/mp4"></video>`).join('')}</div>`;
    }
    
    if (item.type === "audios") {
      mediaHTML = `<div class="media-grid">${item.media.map(src => `
        <div>
          <audio controls preload="none" class="limit-audio">
            <source src="${src}" type="audio/mpeg">
          </audio>
          <p class="audio-note">⏱️ أقصى مدة دقيقة</p>
        </div>
      `).join('')}</div>`;
    }
    
    container.innerHTML += `
      <div class="card">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        ${mediaHTML}
      </div>
    `;
  });
  
  document.querySelectorAll('.limit-audio').forEach(audio => {
    audio.addEventListener('timeupdate', function() {
      if (this.currentTime >= 60) {
        this.pause();
        this.currentTime = 0;
      }
    });
  });
}

function renderNews() {
  const container = document.getElementById('news-container');
  container.innerHTML = '';
  news.forEach(item => {
    container.innerHTML += `
      <div class="news-card">
        <h2>${item.title}</h2>
        <div class="date">${item.date}</div>
        <p>${item.content}</p>
      </div>
    `;
  });
}

function renderResults() {
  const container = document.getElementById('results-container');
  container.innerHTML = '';
  results.forEach(item => {
    let studentsList = item.students.map(s => `<li>${s}</li>`).join('');
    container.innerHTML += `
      <div class="result-card">
        <h2>${item.title}</h2>
        <div class="date">${item.date}</div>
        <ul class="result-list">${studentsList}</ul>
      </div>
    `;
  });
}

function addPhoto() {
  const title = prompt("عنوان ألبوم الصور:");
  if (!title) return;
  const desc = prompt("وصف بسيط:");
  if (!desc) return;
  
  const mediaText = prompt("اكتبي روابط الصور، كل صورة في سطر جديد:\nالحد الأقصى 4 صور");
  if (!mediaText) return;
  
  const media = mediaText.split('\n').filter(s => s.trim() !== '').slice(0, 4);
  works.unshift({ type: "photos", title, desc, media });
  saveWorks();
  renderWorks();
}

function addVideo() {
  const title = prompt("عنوان ألبوم الفيديو:");
  if (!title) return;
  const desc = prompt("وصف بسيط:");
  if (!desc) return;
  
  const mediaText = prompt("اكتبي روابط الفيديو، كل فيديو في سطر جديد:\nالحد الأقصى 4 فيديوهات");
  if (!mediaText) return;
  
  const media = mediaText.split('\n').filter(s => s.trim() !== '').slice(0, 4);
  works.unshift({ type: "videos", title, desc, media });
  saveWorks();
  renderWorks();
}

function addAudio() {
  const title = prompt("عنوان ألبوم الصوت:");
  if (!title) return;
  const desc = prompt("وصف بسيط:");
  if (!desc) return;
  
  const mediaText = prompt("اكتبي روابط الصوت، كل ملف في سطر جديد:\nالحد الأقصى 4 ملفات");
  if (!mediaText) return;
  
  const media = mediaText.split('\n').filter(s => s.trim() !== '').slice(0, 4);
  works.unshift({ type: "audios", title, desc, media });
  saveWorks();
  renderWorks();
}

function addNews() {
  const title = prompt("اكتبي عنوان الخبر:");
  if (!title) return;
  const content = prompt("اكتبي محتوى الخبر:");
  if (!content) return;
  const today = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  news.unshift({ title, date: today, content });
  saveNews();
  renderNews();
}

function addResult() {
  const title = prompt("اكتبي عنوان النتيجة:");
  if (!title) return;
  
  const studentsText = prompt("اكتبي أسماء الطلاب والنسبة، كل طالب في سطر جديد:");
  if (!studentsText) return;
  
  const students = studentsText.split('\n').filter(s => s.trim() !== '');
  const today = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
  
  results.unshift({ title, date: today, students });
  saveResults();
  renderResults();
}

function sendMessage(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  if (!phone.match(/^[0-9]{10,}$/)) {
    alert("رقم التلفون غلط! لازم يكون 10 أرقام على الأقل");
    return;
  }
  
  const text = `السلام عليكم أستاذة الاء 👋\n\n*الاسم:* ${name}\n*رقم التلفون:* ${phone}\n*الموضوع:* ${subject}\n\n*الرسالة:*\n${message}`;
  
  const whatsappNumber = "249916155806";
  
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
  
  document.getElementById('successMsg').style.display = 'block';
  setTimeout(() => {
    document.getElementById('successMsg').style.display = 'none';
    document.querySelector('.contact-form').reset();
  }, 2000);
}

function openModal() {
  document.getElementById('aboutModal').classList.add('active');
}

function closeModal() {
  document.getElementById('aboutModal').classList.remove('active');
}

function toggleFAQ(element) {
  const item = element.parentElement;
  item.classList.toggle('active');
}

window.onclick = function(event) {
  const modal = document.getElementById('aboutModal');
  if (event.target == modal) {
    closeModal();
  }
}

function adminLogin() {
  tapCount++;
  if (tapCount === 3) {
    const pass = prompt("دخلي كلمة السر:");
    if (pass === ADMIN_PASSWORD) {
      document.getElementById('addPhotoBtn').classList.add('show');
      document.getElementById('addVideoBtn').classList.add('show');
      document.getElementById('addAudioBtn').classList.add('show');
      document.getElementById('addNewsBtn').classList.add('show');
      document.getElementById('addResultBtn').classList.add('show');
      alert("تم تفعيل وضع المدير ✓");
    } else {
      alert("كلمة السر غلط!");
    }
    tapCount = 0;
  }
  setTimeout(() => { tapCount = 0; }, 2000);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', function() {
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

renderWorks();
renderNews();
renderResults();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered'))
      .catch(err => console.log('Service Worker failed:', err));
  });
}
