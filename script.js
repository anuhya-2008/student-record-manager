// =======================================
// Student Record Management System
// Full Working Script
// =======================================

// ---------- Sample Students ----------
const sampleStudents = [
  {roll:"25B11CS001",name:"A. Anuradha",age:19,gender:"Female",branch:"CSE",contact:"9876543201"},
  {roll:"25B11CS002",name:"B. Bhargav",age:18,gender:"Male",branch:"ECE",contact:"9876543202"},
  {roll:"25B11CS003",name:"C. Charan",age:19,gender:"Male",branch:"CSE-DS",contact:"9876543203"},
  {roll:"25B11CS004",name:"D. Deepika",age:18,gender:"Female",branch:"AI",contact:"9876543204"},
  {roll:"25B11CS005",name:"E. Eswar",age:19,gender:"Male",branch:"IT",contact:"9876543205"},
  {roll:"25B11CS006",name:"F. Fathima",age:18,gender:"Female",branch:"CSE",contact:"9876543206"},
  {roll:"25B11CS007",name:"G. Gopi",age:19,gender:"Male",branch:"ECE",contact:"9876543207"},
  {roll:"25B11CS008",name:"H. Harika",age:18,gender:"Female",branch:"AI",contact:"9876543208"},
  {roll:"25B11CS009",name:"I. Imran",age:19,gender:"Male",branch:"IT",contact:"9876543209"},
  {roll:"25B11CS010",name:"J. Jyothi",age:18,gender:"Female",branch:"CSE-DS",contact:"9876543210"},
  {roll:"25B11CS011",name:"K. Kiran",age:19,gender:"Male",branch:"CSE",contact:"9876543211"},
  {roll:"25B11CS012",name:"L. Lavanya",age:18,gender:"Female",branch:"ECE",contact:"9876543212"},
  {roll:"25B11CS013",name:"M. Mahesh",age:19,gender:"Male",branch:"AI",contact:"9876543213"},
  {roll:"25B11CS014",name:"N. Nandini",age:18,gender:"Female",branch:"IT",contact:"9876543214"},
  {roll:"25B11CS015",name:"O. Omkar",age:19,gender:"Male",branch:"CSE",contact:"9876543215"},
  {roll:"25B11CS016",name:"P. Preethi",age:18,gender:"Female",branch:"CSE-DS",contact:"9876543216"},
  {roll:"25B11CS017",name:"Q. Qasim",age:19,gender:"Male",branch:"ECE",contact:"9876543217"},
  {roll:"25B11CS018",name:"R. Riya",age:18,gender:"Female",branch:"AI",contact:"9876543218"},
  {roll:"25B11CS019",name:"S. Sravani",age:19,gender:"Female",branch:"CSE",contact:"9876543219"},
  {roll:"25B11CS020",name:"T. Tarun",age:18,gender:"Male",branch:"IT",contact:"9876543220"},
  {roll:"25B11CS021",name:"U. Uday",age:19,gender:"Male",branch:"ECE",contact:"9876543221"},
  {roll:"25B11CS022",name:"V. Varsha",age:18,gender:"Female",branch:"CSE-DS",contact:"9876543222"},
  {roll:"25B11CS023",name:"W. Wasim",age:19,gender:"Male",branch:"AI",contact:"9876543223"},
  {roll:"25B11CS024",name:"X. Xavier",age:18,gender:"Male",branch:"IT",contact:"9876543224"},
  {roll:"25B11CS025",name:"Y. Yamini",age:18,gender:"Female",branch:"CSE",contact:"9876543225"}
];

// ---------- Load Data ----------
let students = JSON.parse(localStorage.getItem("students"));

if (!students) {
  students = sampleStudents;
  localStorage.setItem("students", JSON.stringify(students));
}

// ---------- Navigation ----------
const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav");

function openPage(pageName, btn = null) {
  pages.forEach(page => page.classList.remove("activePage"));

  const page = document.getElementById(pageName);
  if (page) page.classList.add("activePage");

  navButtons.forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
}

navButtons.forEach(btn => {
  btn.onclick = () => openPage(btn.dataset.page, btn);
});

// ---------- Dashboard ----------
function updateDashboard() {
  document.getElementById("totalStudents").textContent = students.length;

  const branches = [...new Set(students.map(s => s.branch))];
  document.getElementById("totalBranches").textContent = branches.length;
  document.getElementById("todayEntries").textContent = students.length;

  const recent = document.getElementById("recentStudents");
  recent.innerHTML = "";

  students.slice(-5).reverse().forEach(s => {
    recent.innerHTML += `
      <div class="recent-item">
        <div class="avatar">${s.name.charAt(0)}</div>
        <div>
          <b>${s.name}</b><br>
          <small>${s.branch}</small>
        </div>
      </div>`;
  });

  const stats = document.getElementById("branchStats");
  stats.innerHTML = "";

  branches.forEach(b => {
    stats.innerHTML += `
      <div class="branch-box">
        <div>${b}</div>
        <h3>${students.filter(x=>x.branch===b).length}</h3>
      </div>`;
  });
}

// ---------- View Table ----------
function loadTable(list = students) {
  const body = document.getElementById("tableBody");
  body.innerHTML = "";

  list.forEach((s,index)=>{
    body.innerHTML += `
    <tr>
      <td>${s.roll}</td>
      <td>${s.name}</td>
      <td>${s.age}</td>
      <td>${s.gender}</td>
      <td>${s.branch}</td>
      <td>${s.total || "-"}</td>
      <td>${s.percentage ? s.percentage+"%" : "-"}</td>
      <td>${s.grade || "-"}</td>
      <td>
        <button class="action edit" onclick="editStudent(${index})">✏️</button>
        <button class="action deleteBtn" onclick="removeStudent(${index})">🗑️</button>
      </td>
    </tr>`;
  });

  updateDashboard();
}

// ---------- Add Student ----------
const form = document.getElementById("studentForm");

form.addEventListener("submit", function(e){
  e.preventDefault();

  const roll = document.getElementById("roll").value.trim();

  if (students.some(s=>s.roll===roll)){
    alert("Roll Number already exists!");
    return;
  }

  students.push({
    roll:roll,
    name:document.getElementById("name").value.trim(),
    age:document.getElementById("age").value,
    gender:document.getElementById("gender").value,
    branch:document.getElementById("branch").value.trim(),
    contact:document.getElementById("contact").value.trim()
  });

  localStorage.setItem("students",JSON.stringify(students));

  form.reset();
  loadTable();
  loadBranches();

  alert("Student Added Successfully!");
  openPage("view",document.querySelector('[data-page="view"]'));
});

// ---------- Grade ----------
function grade(p){
  if(p>=90) return "A+";
  if(p>=80) return "A";
  if(p>=70) return "B";
  if(p>=60) return "C";
  if(p>=50) return "D";
  return "F";
}

// ---------- Marks ----------
function loadStudentForMarks(){
  const s=students.find(x=>x.roll===marksRoll.value.trim());

  marksName.value=s?s.name:"";
  marksGender.value=s?s.gender:"";
  marksBranch.value=s?s.branch:"";
}

function saveMarks(){
  const s=students.find(x=>x.roll===marksRoll.value.trim());

  if(!s){
    alert("Student Not Found");
    return;
  }

  const arr=[
    +m1.value,
    +m2.value,
    +m3.value,
    +m4.value,
    +m5.value
  ];

  const total=arr.reduce((a,b)=>a+b,0);
  const per=(total/5).toFixed(1);

  s.total=total;
  s.percentage=per;
  s.grade=grade(+per);

  localStorage.setItem("students",JSON.stringify(students));

  loadTable();

  alert("Marks Saved Successfully");
}

// ---------- Search ----------
function searchStudent(){
  const key=searchBox.value.toLowerCase();

  const s=students.find(x=>
    x.roll.toLowerCase()==key ||
    x.name.toLowerCase().includes(key)
  );

  if(s){
    searchResult.innerHTML=`
      <div class="panel">
        <h3>${s.name}</h3>
        <p><b>Roll:</b> ${s.roll}</p>
        <p><b>Branch:</b> ${s.branch}</p>
        <p><b>Percentage:</b> ${s.percentage || "-"}</p>
      </div>`;
  }else{
    searchResult.innerHTML="<p style='color:red'>Student Not Found</p>";
  }
}

// ---------- Edit ----------
function editStudent(index){
  const s=students[index];

  roll.value=s.roll;
  name.value=s.name;
  age.value=s.age;
  gender.value=s.gender;
  branch.value=s.branch;
  contact.value=s.contact;

  students.splice(index,1);

  localStorage.setItem("students",JSON.stringify(students));

  loadTable();

  openPage("add",document.querySelector('[data-page="add"]'));
}

// ---------- Delete ----------
function removeStudent(index){
  if(confirm("Delete Student?")){
    students.splice(index,1);
    localStorage.setItem("students",JSON.stringify(students));
    loadTable();
    loadBranches();
  }
}

// ---------- Update ----------
function loadStudentForUpdate(){
  const s=students.find(x=>x.roll===updateRoll.value.trim());

  if(!s){
    updateArea.innerHTML="Student Not Found";
    return;
  }

  updateArea.innerHTML=`
    <div class="grid">
      <input id="uName" value="${s.name}">
      <input id="uAge" value="${s.age}">
      <select id="uGender">
        <option ${s.gender=="Male"?"selected":""}>Male</option>
        <option ${s.gender=="Female"?"selected":""}>Female</option>
        <option ${s.gender=="Other"?"selected":""}>Other</option>
      </select>
      <input id="uBranch" value="${s.branch}">
      <input id="uContact" value="${s.contact}">
    </div>
    <br>
    <button class="primary" onclick="saveUpdate('${s.roll}')">
      Save Changes
    </button>`;
}

function saveUpdate(rollNo){
  const s=students.find(x=>x.roll===rollNo);

  s.name=uName.value;
  s.age=uAge.value;
  s.gender=uGender.value;
  s.branch=uBranch.value;
  s.contact=uContact.value;

  localStorage.setItem("students",JSON.stringify(students));

  loadTable();

  alert("Updated Successfully");
}

// ---------- Delete by Roll ----------
function deleteByRoll(){
  const rollNo=deleteRoll.value.trim();

  students=students.filter(s=>s.roll!==rollNo);

  localStorage.setItem("students",JSON.stringify(students));

  deleteRoll.value="";

  loadTable();
  loadBranches();

  alert("Student Deleted");
}

// ---------- Live Search ----------
searchInput.onkeyup=function(){
  const key=this.value.toLowerCase();

  loadTable(
    students.filter(s=>
      s.roll.toLowerCase().includes(key) ||
      s.name.toLowerCase().includes(key) ||
      s.branch.toLowerCase().includes(key)
    )
  );
};

// ---------- Branch Section ----------
function loadBranches(){
  branchButtons.innerHTML="";

  const branches=[...new Set(students.map(s=>s.branch))];

  branchButtons.innerHTML+=`
    <button class="branchBtn" onclick="showAllStudents()">
      All Students
    </button>`;

  branches.forEach(b=>{
    branchButtons.innerHTML+=`
      <button class="branchBtn" onclick="filterBranch('${b}')">
        ${b}
      </button>`;
  });
}

function filterBranch(branch){
  loadTable(students.filter(s=>s.branch===branch));
  openPage("view",document.querySelector('[data-page="view"]'));
}

function showAllStudents(){
  loadTable();
  openPage("view",document.querySelector('[data-page="view"]'));
}

// Branch Card Click
document.getElementById("branchCard").onclick=function(){
  loadBranches();
  openPage("branchPanel");
};

// ---------- Logout ----------
logout.onclick=function(){
  if(confirm("Logout?")){
    openPage("dashboard",document.querySelector('[data-page="dashboard"]'));
  }
};

// ---------- Start ----------
loadBranches();
loadTable();
openPage("dashboard",document.querySelector('[data-page="dashboard"]'));
