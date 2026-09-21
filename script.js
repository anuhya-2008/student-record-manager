// =========================================
// STUDENT RECORD MANAGEMENT SYSTEM
// =========================================

// ---------- Default 25 Students ----------
const sampleStudents = [
{roll:"25B11CS001",name:"A. Anuradha",age:18,gender:"Female",branch:"CSE",contact:"9876543201"},
{roll:"25B11CS002",name:"B. Sai Kiran",age:19,gender:"Male",branch:"CSE",contact:"9876543202"},
{roll:"25B11CS003",name:"C. Nikhitha",age:18,gender:"Female",branch:"CSE-DS",contact:"9876543203"},
{roll:"25B11CS004",name:"D. Harsha",age:19,gender:"Male",branch:"ECE",contact:"9876543204"},
{roll:"25B11CS005",name:"E. Meghana",age:18,gender:"Female",branch:"AI",contact:"9876543205"},
{roll:"25B11CS006",name:"F. Praneeth",age:19,gender:"Male",branch:"IT",contact:"9876543206"},
{roll:"25B11CS007",name:"G. Divya",age:18,gender:"Female",branch:"CSE",contact:"9876543207"},
{roll:"25B11CS008",name:"H. Sravani",age:18,gender:"Female",branch:"CSE",contact:"9876543208"},
{roll:"25B11CS009",name:"I. Kiran",age:19,gender:"Male",branch:"CSE-AI",contact:"9876543209"},
{roll:"25B11CS010",name:"J. Akhil",age:18,gender:"Male",branch:"IT",contact:"9876543210"},
{roll:"25B11CS011",name:"K. Parimala",age:19,gender:"Female",branch:"CSE-DS",contact:"9876543211"},
{roll:"25B11CS012",name:"L. Meghana",age:18,gender:"Female",branch:"CSE",contact:"9876543212"},
{roll:"25B11CS013",name:"M. Rohith",age:19,gender:"Male",branch:"ECE",contact:"9876543213"},
{roll:"25B11CS014",name:"N. Sri Harshita",age:18,gender:"Female",branch:"CSE",contact:"9876543214"},
{roll:"25B11CS015",name:"O. Charan",age:19,gender:"Male",branch:"AI",contact:"9876543215"},
{roll:"25B11CS016",name:"P. Nandini",age:18,gender:"Female",branch:"CSE",contact:"9876543216"},
{roll:"25B11CS017",name:"Q. Vamshi",age:19,gender:"Male",branch:"IT",contact:"9876543217"},
{roll:"25B11CS018",name:"R. Divya",age:18,gender:"Female",branch:"CSE",contact:"9876543218"},
{roll:"25B11CS019",name:"S. Keerthana",age:18,gender:"Female",branch:"CSE",contact:"9876543219"},
{roll:"25B11CS020",name:"T. Rakesh",age:19,gender:"Male",branch:"ECE",contact:"9876543220"},
{roll:"25B11CS021",name:"U. Manasa",age:18,gender:"Female",branch:"AI",contact:"9876543221"},
{roll:"25B11CS022",name:"V. Sai Teja",age:19,gender:"Male",branch:"CSE",contact:"9876543222"},
{roll:"25B11CS023",name:"W. Bhavya",age:18,gender:"Female",branch:"IT",contact:"9876543223"},
{roll:"25B11CS024",name:"X. Harini",age:18,gender:"Female",branch:"ECE",contact:"9876543224"},
{roll:"25B11CS025",name:"Y. Preethi",age:18,gender:"Female",branch:"CSE-DS",contact:"9876543225"}
];

// ---------- Local Storage ----------
let students = JSON.parse(localStorage.getItem("students"));

if(!students || students.length===0){
    students = sampleStudents;
    localStorage.setItem("students",JSON.stringify(students));
}

// ---------- Navigation ----------
const pages=document.querySelectorAll(".page");
const navButtons=document.querySelectorAll(".nav");

function openPage(pageName,btn){
    pages.forEach(p=>p.classList.remove("activePage"));
    const page=document.getElementById(pageName);
    if(page) page.classList.add("activePage");

    navButtons.forEach(b=>b.classList.remove("active"));
    if(btn) btn.classList.add("active");
}

navButtons.forEach(btn=>{
    btn.onclick=()=>openPage(btn.dataset.page,btn);
});

// ---------- Add Student ----------
const form=document.getElementById("studentForm");

if(form){
form.addEventListener("submit",function(e){
    e.preventDefault();

    const roll=document.getElementById("roll").value.trim();
    const name=document.getElementById("name").value.trim();
    const age=document.getElementById("age").value.trim();
    const gender=document.getElementById("gender").value;
    const branch=document.getElementById("branch").value.trim();
    const contact=document.getElementById("contact").value.trim();

    if(students.some(s=>s.roll===roll)){
        alert("Roll Number already exists!");
        return;
    }

    students.push({
        roll,name,age,gender,branch,contact
    });

    localStorage.setItem("students",JSON.stringify(students));

    form.reset();
    loadTable();
    updateCards();
    loadBranches();

    alert("Student Added Successfully!");

    openPage("view",document.querySelector('[data-page="view"]'));
});
}

// ---------- Grade ----------
function calculateGrade(per){
    if(per>=90) return "A+";
    if(per>=80) return "A";
    if(per>=70) return "B";
    if(per>=60) return "C";
    if(per>=50) return "D";
    return "F";
}

// ---------- Marks ----------
function loadStudentForMarks(){
    const roll=document.getElementById("marksRoll").value.trim();
    const student=students.find(s=>s.roll===roll);

    document.getElementById("marksName").value=student?student.name:"";
    document.getElementById("marksGender").value=student?student.gender:"";
    document.getElementById("marksBranch").value=student?student.branch:"";
}

function saveMarks(){

const roll=document.getElementById("marksRoll").value.trim();
const student=students.find(s=>s.roll===roll);

if(!student){
alert("Student not found!");
return;
}

const m1=Number(document.getElementById("m1").value||0);
const m2=Number(document.getElementById("m2").value||0);
const m3=Number(document.getElementById("m3").value||0);
const m4=Number(document.getElementById("m4").value||0);
const m5=Number(document.getElementById("m5").value||0);

const total=m1+m2+m3+m4+m5;
const percentage=(total/5).toFixed(1);

student.total=total;
student.percentage=percentage;
student.grade=calculateGrade(Number(percentage));

localStorage.setItem("students",JSON.stringify(students));

alert("Marks Saved!");

["marksRoll","marksName","marksGender","marksBranch","m1","m2","m3","m4","m5"].forEach(id=>document.getElementById(id).value="");

loadTable();
}

// ---------- Dashboard ----------
function updateCards(){

const total=document.getElementById("totalStudents");
const branch=document.getElementById("totalBranches");
const today=document.getElementById("todayEntries");

if(total) total.textContent=students.length;

const branches=[...new Set(students.map(s=>s.branch))];

if(branch) branch.textContent=branches.length;
if(today) today.textContent=students.length;

const recent=document.getElementById("recentStudents");

if(recent){

recent.innerHTML="";

students.slice(-5).reverse().forEach(s=>{

recent.innerHTML+=`
<div class="recent-item">
<div style="display:flex;gap:10px;align-items:center;">
<div class="avatar">${s.name.charAt(0)}</div>
<div><b>${s.name}</b><br><small>${s.branch}</small></div>
</div>
</div>`;

});

}

const stats=document.getElementById("branchStats");

if(stats){

stats.innerHTML="";

branches.forEach(b=>{

const count=students.filter(x=>x.branch===b).length;

stats.innerHTML+=`
<div class="branch-box">
<div>${b}</div>
<h3>${count}</h3>
</div>`;

});

}

}

// ---------- Table ----------
function loadTable(list=students){

const body=document.getElementById("tableBody");

if(!body) return;

body.innerHTML="";

list.forEach(student=>{

const index=students.indexOf(student);

body.innerHTML+=`
<tr>
<td>${student.roll}</td>
<td>${student.name}</td>
<td>${student.age}</td>
<td>${student.gender}</td>
<td>${student.branch}</td>
<td>${student.total??"-"}</td>
<td>${student.percentage?student.percentage+"%":"-"}</td>
<td>${student.grade??"-"}</td>
<td>
<button class="action edit" onclick="editStudent(${index})">✏️</button>
<button class="action deleteBtn" onclick="removeStudent(${index})">🗑️</button>
</td>
</tr>`;

});

updateCards();

}

// ---------- Branch ----------
function loadBranches(){

const box=document.getElementById("branchButtons");

if(!box) return;

box.innerHTML="";

const branches=[...new Set(students.map(s=>s.branch))];

box.innerHTML+=`<button class="branchBtn" onclick="showAllStudents()">All Students</button>`;

branches.forEach(b=>{
box.innerHTML+=`<button class="branchBtn" onclick="filterBranch('${b}')">${b}</button>`;
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

// ---------- Edit ----------
function editStudent(index){

const s=students[index];

document.getElementById("roll").value=s.roll;
document.getElementById("name").value=s.name;
document.getElementById("age").value=s.age;
document.getElementById("gender").value=s.gender;
document.getElementById("branch").value=s.branch;
document.getElementById("contact").value=s.contact;

students.splice(index,1);

localStorage.setItem("students",JSON.stringify(students));

loadTable();

openPage("add",document.querySelector('[data-page="add"]'));

}

// ---------- Delete ----------
function removeStudent(index){

if(!confirm("Delete student?")) return;

students.splice(index,1);

localStorage.setItem("students",JSON.stringify(students));

loadTable();
loadBranches();

}

// ---------- Search ----------
function searchStudent(){

const key=document.getElementById("searchBox").value.toLowerCase();

const s=students.find(x=>x.roll.toLowerCase()===key||x.name.toLowerCase().includes(key));

const result=document.getElementById("searchResult");

if(s){

result.innerHTML=`
<div class="panel">
<h3>${s.name}</h3>
<p><b>Roll:</b> ${s.roll}</p>
<p><b>Branch:</b> ${s.branch}</p>
<p><b>Percentage:</b> ${s.percentage??"-"}</p>
</div>`;

}else{

result.innerHTML="<p style='color:red'>Student not found.</p>";

}

}

// ---------- Update ----------
function loadStudentForUpdate(){

const roll=document.getElementById("updateRoll").value.trim();

const s=students.find(x=>x.roll===roll);

const area=document.getElementById("updateArea");

if(!s){

area.innerHTML="<p style='color:red'>Student not found.</p>";
return;

}

area.innerHTML=`
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
</div><br>
<button class="primary" onclick="saveUpdate('${roll}')">Save Changes</button>`;

}

function saveUpdate(roll){

const s=students.find(x=>x.roll===roll);

s.name=document.getElementById("uName").value;
s.age=document.getElementById("uAge").value;
s.gender=document.getElementById("uGender").value;
s.branch=document.getElementById("uBranch").value;
s.contact=document.getElementById("uContact").value;

localStorage.setItem("students",JSON.stringify(students));

loadTable();

alert("Updated Successfully!");

}

// ---------- Delete by Roll ----------
function deleteByRoll(){

const roll=document.getElementById("deleteRoll").value.trim();

students=students.filter(s=>s.roll!==roll);

localStorage.setItem("students",JSON.stringify(students));

loadTable();
loadBranches();

alert("Deleted Successfully!");

}

// ---------- Live Search ----------
const searchInput=document.getElementById("searchInput");

if(searchInput){

searchInput.onkeyup=function(){

const key=this.value.toLowerCase();

document.querySelectorAll("#tableBody tr").forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(key)?"":"none";

});

};

}

// ---------- Logout ----------
const logout=document.querySelector(".logout");

if(logout){

logout.onclick=()=>{

if(confirm("Logout?")){

openPage("dashboard",document.querySelector('[data-page="dashboard"]'));

}

};

}

// ---------- Initial ----------
loadTable();
updateCards();
loadBranches();
openPage("dashboard",document.querySelector('[data-page="dashboard"]'));
