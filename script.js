const grid = document.getElementById("semesterGrid");
const modal = document.getElementById("modal");
const subjectList = document.getElementById("subjectList");
const search = document.getElementById("search");
let selectedSemester = null;

document.getElementById("year").textContent = new Date().getFullYear();

function renderSemesters(filter = "") {
  const term = filter.trim().toLowerCase();
  const matches = studyData.map((item, index) => ({...item, index}))
    .filter(item => item.semester.toLowerCase().includes(term) ||
      item.subjects.some(subject => subject.name.toLowerCase().includes(term)));
  grid.innerHTML = "";
  if (!matches.length) {
    grid.innerHTML = '<div class="empty">No matching semester or subject found. Try another search.</div>';
    return;
  }
  matches.forEach(item => {
    const card = document.createElement("button");
    card.className = "semester-card";
    card.type = "button";
    card.innerHTML = `<div class="card-top"><span class="folder-icon">▰</span><span class="arrow">↗</span></div><h3>${escapeHtml(item.semester)}</h3><p>${item.subjects.length} subjects</p>`;
    card.addEventListener("click", () => openSemester(item.index));
    grid.appendChild(card);
  });
}

function openSemester(index) {
  selectedSemester = studyData[index];
  document.getElementById("modalEyebrow").textContent = "STUDY MATERIALS";
  document.getElementById("modalTitle").textContent = selectedSemester.semester;
  subjectList.innerHTML = "";
  selectedSemester.subjects.forEach(subject => {
    const row = document.createElement("div");
    row.className = "subject-item";
    const hasAssignments = validUrl(subject.assignmentsUrl);
    const hasNotes = validUrl(subject.notesUrl);
    row.innerHTML = `<span class="subject-symbol">▤</span><span class="subject-info"><b>${escapeHtml(subject.name)}</b><small>${hasAssignments ? "Assignments available" : "Assignments pending"} · ${hasNotes ? "Notes available" : "Notes pending"}</small></span>`;
    const actions = document.createElement("span");
    actions.className = "subject-arrow";
    actions.textContent = "›";
    row.appendChild(actions);
    row.style.cursor = "pointer";
    row.addEventListener("click", () => openSubject(subject));
    subjectList.appendChild(row);
  });
  modal.hidden = false;
  document.getElementById("closeModal").focus();
}

function openSubject(subject) {
  subjectList.innerHTML = "";
  const links = [
    {label:"Assignments", url:subject.assignmentsUrl, icon:"▤"},
    {label:"Class Notes", url:subject.notesUrl, icon:"▣"}
  ];
  links.forEach(item => {
    const row = document.createElement("a");
    row.className = "subject-item";
    row.href = validUrl(item.url) ? item.url : "#";
    row.target = "_blank";
    row.rel = "noopener noreferrer";
    row.innerHTML = `<span class="subject-symbol">${item.icon}</span><span class="subject-info"><b>${item.label}</b><small>${validUrl(item.url) ? "Open Google Drive folder" : "Folder link will be added by teacher"}</small></span><span class="subject-arrow">↗</span>`;
    if (!validUrl(item.url)) {
      row.removeAttribute("target");
      row.addEventListener("click", event => {
        event.preventDefault();
        alert("This folder link has not been added yet. Please check again later.");
      });
    }
    subjectList.appendChild(row);
  });
  const back = document.createElement("button");
  back.className = "subject-item";
  back.style.width = "100%";
  back.style.background = "#f8faff";
  back.style.cursor = "pointer";
  back.innerHTML = '<span class="subject-symbol">←</span><span class="subject-info"><b>Back to subjects</b></span>';
  back.addEventListener("click", () => openSemester(studyData.indexOf(selectedSemester)));
  subjectList.appendChild(back);
}

function validUrl(value) {
  if (!value) return false;
  try { const u = new URL(value); return u.protocol === "https:" || u.protocol === "http:"; }
  catch { return false; }
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
search.addEventListener("input", event => renderSemesters(event.target.value));
document.getElementById("closeModal").addEventListener("click", () => { modal.hidden = true; });
modal.addEventListener("click", event => { if (event.target === modal) modal.hidden = true; });
document.addEventListener("keydown", event => { if (event.key === "Escape") modal.hidden = true; });
renderSemesters();