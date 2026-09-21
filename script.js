// ===================== SAMPLE STUDENTS =====================
const sampleStudents = [
{roll:"101",name:"K. Anuhya Keerthi",age:18,gender:"Female",branch:"CSE",contact:"9876543201"},
{roll:"102",name:"K. Parimala",age:19,gender:"Female",branch:"CSE-DS",contact:"9876543202"},
{roll:"103",name:"A. Sai Teja",age:18,gender:"Male",branch:"CSE",contact:"9876543203"},
{roll:"104",name:"B. Harshitha",age:19,gender:"Female",branch:"ECE",contact:"9876543204"},
{roll:"105",name:"C. Rahul",age:18,gender:"Male",branch:"AI",contact:"9876543205"},
{roll:"106",name:"D. Nandini",age:18,gender:"Female",branch:"CSE",contact:"9876543206"},
{roll:"107",name:"E. Karthik",age:19,gender:"Male",branch:"IT",contact:"9876543207"},
{roll:"108",name:"F. Meghana",age:18,gender:"Female",branch:"ECE",contact:"9876543208"},
{roll:"109",name:"G. Vivek",age:19,gender:"Male",branch:"CSE-DS",contact:"9876543209"},
{roll:"110",name:"H. Sravani",age:18,gender:"Female",branch:"CSE",contact:"9876543210"},
{roll:"111",name:"I. Kiran",age:19,gender:"Male",branch:"CSE-AI",contact:"9876543211"},
{roll:"112",name:"J. Divya",age:18,gender:"Female",branch:"AI",contact:"9876543212"},
{roll:"113",name:"K. Praneeth",age:21,gender:"Male",branch:"IT",contact:"9876543213"},
{roll:"114",name:"L. Meghana",age:18,gender:"Female",branch:"CSE-DS",contact:"9876543214"},
{roll:"115",name:"M. Harsha",age:19,gender:"Male",branch:"ECE",contact:"9876543215"},
{roll:"116",name:"N. Lakshmi",age:18,gender:"Female",branch:"CSE",contact:"9876543216"},
{roll:"117",name:"O. Sandeep",age:20,gender:"Male",branch:"AI",contact:"9876543217"},
{roll:"118",name:"P. Bhavya",age:18,gender:"Female",branch:"IT",contact:"9876543218"},
{roll:"119",name:"Q. Naveen",age:19,gender:"Male",branch:"CSE",contact:"9876543219"},
{roll:"120",name:"R. Keerthana",age:18,gender:"Female",branch:"ECE",contact:"9876543220"},
{roll:"121",name:"S. Akhil",age:19,gender:"Male",branch:"CSE-DS",contact:"9876543221"},
{roll:"122",name:"T. Sneha",age:18,gender:"Female",branch:"AI",contact:"9876543222"},
{roll:"123",name:"U. Charan",age:20,gender:"Male",branch:"IT",contact:"9876543223"},
{roll:"124",name:"V. Sindhu",age:18,gender:"Female",branch:"CSE",contact:"9876543224"},
{roll:"125",name:"W. Arun",age:19,gender:"Male",branch:"ECE",contact:"9876543225"}
];

// Load once
let students = JSON.parse(localStorage.getItem("students"));
if (!students) {
    students = sampleStudents;
    localStorage.setItem("students", JSON.stringify(students));
}

// ===================== NAVIGATION =====================
const pages = document.querySelectorAll(".page");
const navs = document.querySelectorAll(".nav");

function openPage(pageName, btn = null) {
    pages.forEach(p => p.classList.remove("activePage"));
    document.getElementById(pageName)?.classList.add("activePage");

    navs.forEach(n => n.classList.remove("active"));
    if (btn) btn.classList.add("active");
}

navs.forEach(btn => {
    btn.onclick = () => openPage(btn.dataset.page, btn);
});

// ===================== ADD STUDENT =====================
const form = document.getElementById("studentForm");

if (form) {
form.onsubmit = function(e){
e.preventDefault();

const roll = document.getElementById("roll").value.trim();

if(students.some(s=>s.roll===roll)){
alert("Roll Number already exists!");
return;
}

students.push({
roll,
name:document.getElementById("name").value.trim(),
age:document.getElementById("age").value.trim(),
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
}
}

// ===================== GRADE =====================
function grade(p){
if(p>=90) return "A+";
if(p>=80) return "A";
if(p>=70) return "B";
if(p>=60) return "C";
if(p>=50) return "D";
return "F";
}

// ===================== MARKS =====================
function loadStudentForMarks(){

const roll=document.getElementById("marksRoll")?.value.trim();
const s=students.find(x=>x.roll===roll);

if(!s){
marksName.value="";
marksGender.value="";
marksBranch.value="";
return;
}

marksName.value=s.name;
marksGender.value=s.gender;
marksBranch.value=s.branch;

}

function saveMarks(){

const roll=marksRoll.value.trim();
const s=students.find(x=>x.roll===roll);

if(!s){
alert("Student Not Found!");
return;
}

const marks=[
Number(m1.value||0),
Number(m2.value||0),
Number(m3.value||0),
Number(m4.value||0),
Number(m5.value||0)
];

const total=marks.reduce((a,b)=>a+b,0);
const per=(total/5).toFixed(1);

s.total=total;
s.percentage=per;
s.grade=grade(Number(per));

localStorage.setItem("students",JSON.stringify(students));
loadTable();

alert("Marks Saved!");

marksRoll.value="";
marksName.value="";
marksGender.value="";
marksBranch.value="";
m1.value="";
m2.value="";
m3.value="";
m4.value="";
m5.value="";

}

// ===================== TABLE =====================
function loadTable(list=students){

const body=document.getElementById("tableBody");
if(!body) return;

body.innerHTML="";

list.forEach(stu=>{

const i=students.indexOf(stu);

body.innerHTML+=`
<tr>
<td>${stu.roll}</td>
<td>${stu.name}</td>
<td>${stu.age}</td>
<td>${stu.gender}</td>
<td>${stu.branch}</td>
<td>${stu.total??"-"}</td>
<td>${stu.percentage?stu.percentage+"%":"-"}</td>
<td>${stu.grade??"-"}</td>
<td>
<button class="action edit" onclick="editStudent(${i})">✏️</button>
<button class="action deleteBtn" onclick="removeStudent(${i})">🗑️</button>
</td>
</tr>`;
});

updateCards();

}

// ===================== DASHBOARD =====================
function updateCards(){

document.getElementById("totalStudents").textContent=students.length;
document.getElementById("todayEntries").textContent=students.length;

const branches=[...new Set(students.map(s=>s.branch))];
document.getElementById("totalBranches").textContent=branches.length;

const recent=document.getElementById("recentStudents");
if(recent){
recent.innerHTML="";
students.slice(-5).reverse().forEach(s=>{
recent.innerHTML+=`
<div class="recent-item">
<div><b>${s.name}</b><br><small>${s.branch}</small></div>
<div>#${s.roll}</div>
</div>`;
});
}

const stats=document.getElementById("branchStats");
if(stats){
stats.innerHTML="";
branches.forEach(b=>{
stats.innerHTML+=`
<div class="branch-box">
<div>${b}</div>
<h3>${students.filter(x=>x.branch===b).length}</h3>
</div>`;
});
}

}

// ===================== BRANCH FILTER =====================
function loadBranches(){

const box=document.getElementById("branchButtons");
if(!box) return;

box.innerHTML=`<button class="branchBtn" onclick="showAllStudents()">All Students</button>`;

[...new Set(students.map(s=>s.branch))].forEach(b=>{
box.innerHTML+=`<button class="branchBtn" onclick="filterBranch('${b}')">${b}</button>`;
});

}

document.getElementById("branchCard")?.addEventListener("click",()=>{
loadBranches();
openPage("branchPanel");
});

function filterBranch(branch){
loadTable(students.filter(s=>s.branch===branch));
openPage("view",document.querySelector('[data-page="view"]'));
}

function showAllStudents(){
loadTable();
openPage("view",document.querySelector('[data-page="view"]'));
}

// ===================== EDIT =====================
function editStudent(i){

const s=students[i];

roll.value=s.roll;
name.value=s.name;
age.value=s.age;
gender.value=s.gender;
branch.value=s.branch;
contact.value=s.contact;

students.splice(i,1);

localStorage.setItem("students",JSON.stringify(students));
loadTable();

openPage("add",document.querySelector('[data-page="add"]'));

}

// ===================== DELETE =====================
function removeStudent(i){

if(!confirm("Delete this student?")) return;

students.splice(i,1);

localStorage.setItem("students",JSON.stringify(students));

loadTable();
loadBranches();

}

// ===================== SEARCH =====================
function searchStudent(){

const key=searchBox.value.trim().toLowerCase();

const s=students.find(x=>
x.roll.toLowerCase()===key||
x.name.toLowerCase().includes(key));

searchResult.innerHTML=s?`
<div class="panel">
<h3>${s.name}</h3>
<p><b>Roll:</b> ${s.roll}</p>
<p><b>Age:</b> ${s.age}</p>
<p><b>Gender:</b> ${s.gender}</p>
<p><b>Branch:</b> ${s.branch}</p>
<p><b>Total:</b> ${s.total??"-"}</p>
<p><b>Percentage:</b> ${s.percentage??"-"}${s.percentage?"%":""}</p>
<p><b>Grade:</b> ${s.grade??"-"}</p>
</div>`:
"<p style='color:red'>Student Not Found</p>";

}

// ===================== UPDATE =====================
function loadStudentForUpdate(){

const rollNo=updateRoll.value.trim();

const s=students.find(x=>x.roll===rollNo);

if(!s){
updateArea.innerHTML="<p style='color:red'>Student Not Found</p>";
return;
}

updateArea.innerHTML=`
<div class="grid">
<input id="uName" value="${s.name}">
<input id="uAge" value="${s.age}">
<select id="uGender">
<option ${s.gender==="Male"?"selected":""}>Male</option>
<option ${s.gender==="Female"?"selected":""}>Female</option>
<option ${s.gender==="Other"?"selected":""}>Other</option>
</select>
<input id="uBranch" value="${s.branch}">
<input id="uContact" value="${s.contact}">
</div>
<br>
<button class="primary" onclick="saveUpdate('${rollNo}')">Save Changes</button>`;

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

alert("Student Updated Successfully!");

}

// ===================== DELETE BY ROLL =====================
function deleteByRoll(){

const rollNo=deleteRoll.value.trim();

students=students.filter(s=>s.roll!==rollNo);

localStorage.setItem("students",JSON.stringify(students));

loadTable();
loadBranches();

deleteRoll.value="";

alert("Student Deleted!");

}

// ===================== LIVE SEARCH =====================
document.getElementById("searchInput")?.addEventListener("keyup",function(){

const key=this.value.toLowerCase();

document.querySelectorAll("#tableBody tr").forEach(r=>{
r.style.display=r.innerText.toLowerCase().includes(key)?"":"none";
});

});

// ===================== LOGOUT =====================
document.querySelector(".logout")?.addEventListener("click",()=>{
if(confirm("Logout?"))
openPage("dashboard",document.querySelector('[data-page="dashboard"]'));
});

// ===================== START =====================
loadTable();
loadBranches();
openPage("dashboard",document.querySelector('[data-page="dashboard"]'));
