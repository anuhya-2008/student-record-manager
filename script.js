// ===============================
// STUDENT RECORD MANAGEMENT SYSTEM
// ===============================

// ---------- Sample Students ----------
const sampleStudents = [
{roll:"25B11CS001",name:"K. Anuhya Keerthi",age:18,gender:"Female",branch:"CSE",contact:"9876543201"},
{roll:"25B11CS002",name:"K. Satya Suguna",age:18,gender:"Female",branch:"CSE",contact:"9876543202"},
{roll:"25B11CS003",name:"P. Nandini",age:18,gender:"Female",branch:"CSE-DS",contact:"9876543203"},
{roll:"25B11CS004",name:"N. Sri Harshita",age:18,gender:"Female",branch:"CSE",contact:"9876543204"},
{roll:"25B11CS005",name:"A. Sai Teja",age:19,gender:"Male",branch:"CSE",contact:"9876543205"},
{roll:"25B11CS006",name:"K. Parimala",age:19,gender:"Female",branch:"CSE-DS",contact:"9876543206"},
{roll:"25B11CS007",name:"H. Sravani",age:18,gender:"Female",branch:"CSE",contact:"9876543207"},
{roll:"25B11CS008",name:"I. Kiran",age:19,gender:"Male",branch:"CSE-AI",contact:"9876543208"},
{roll:"25B11CS009",name:"K. Praneeth",age:20,gender:"Male",branch:"IT",contact:"9876543209"},
{roll:"25B11CS010",name:"L. Meghana",age:18,gender:"Female",branch:"CSE-DS",contact:"9876543210"},
{roll:"25B11CS011",name:"A. Anuradha",age:19,gender:"Female",branch:"CSE",contact:"9876543211"},
{roll:"25B11CS012",name:"M. Rohit",age:18,gender:"Male",branch:"ECE",contact:"9876543212"},
{roll:"25B11CS013",name:"V. Charan",age:19,gender:"Male",branch:"CSE",contact:"9876543213"},
{roll:"25B11CS014",name:"P. Pavani",age:18,gender:"Female",branch:"AI",contact:"9876543214"},
{roll:"25B11CS015",name:"R. Manoj",age:20,gender:"Male",branch:"IT",contact:"9876543215"},
{roll:"25B11CS016",name:"B. Bhavya",age:18,gender:"Female",branch:"CSE",contact:"9876543216"},
{roll:"25B11CS017",name:"D. Tejaswini",age:18,gender:"Female",branch:"ECE",contact:"9876543217"},
{roll:"25B11CS018",name:"S. Vamsi",age:19,gender:"Male",branch:"CSE-DS",contact:"9876543218"},
{roll:"25B11CS019",name:"G. Lavanya",age:18,gender:"Female",branch:"CSE",contact:"9876543219"},
{roll:"25B11CS020",name:"T. Vivek",age:19,gender:"Male",branch:"CSE-AI",contact:"9876543220"},
{roll:"25B11CS021",name:"R. Divya",age:18,gender:"Female",branch:"CSE",contact:"9876543221"},
{roll:"25B11CS022",name:"Y. Harsha",age:19,gender:"Male",branch:"ECE",contact:"9876543222"},
{roll:"25B11CS023",name:"C. Nikhitha",age:18,gender:"Female",branch:"CSE-DS",contact:"9876543223"},
{roll:"25B11CS024",name:"J. Akhil",age:20,gender:"Male",branch:"IT",contact:"9876543224"},
{roll:"25B11CS025",name:"S. Keerthana",age:18,gender:"Female",branch:"CSE",contact:"9876543225"}
];

// ---------- Load Data ----------
let students = JSON.parse(localStorage.getItem("students"));

if (!students || students.length === 0) {
    students = [...sampleStudents];
    localStorage.setItem("students", JSON.stringify(students));
}

// ---------- Navigation ----------
const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav");

function openPage(pageName, btn = null) {
    pages.forEach(p => p.classList.remove("activePage"));
    document.getElementById(pageName)?.classList.add("activePage");

    navButtons.forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
}

navButtons.forEach(btn => {
    btn.onclick = () => openPage(btn.dataset.page, btn);
});

// ---------- Grade ----------
function calculateGrade(per){
    if(per>=90) return "A+";
    if(per>=80) return "A";
    if(per>=70) return "B";
    if(per>=60) return "C";
    if(per>=50) return "D";
    return "F";
}

// ---------- Dashboard ----------
function updateCards(){

    document.getElementById("totalStudents").textContent = students.length;
    document.getElementById("todayEntries").textContent = students.length;

    const branches=[...new Set(students.map(s=>s.branch))];
    document.getElementById("totalBranches").textContent=branches.length;

    const recent=document.getElementById("recentStudents");
    if(recent){
        recent.innerHTML="";
        students.slice(-5).reverse().forEach(s=>{
            recent.innerHTML+=`
            <div class="recent-item">
                <div class="avatar">${s.name[0]}</div>
                <div>
                    <b>${s.name}</b><br>
                    <small>${s.branch}</small>
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
                <h3>${b}</h3>
                <p>${count} Students</p>
            </div>`;
        });
    }
}

// ---------- Branch Buttons ----------
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

// ---------- Add Student ----------
const form=document.getElementById("studentForm");

if(form){
form.addEventListener("submit",e=>{
e.preventDefault();

const roll=document.getElementById("roll").value.trim();

if(students.some(s=>s.roll===roll)){
alert("Roll Number already exists!");
return;
}

students.push({
roll,
name:name.value.trim(),
age:age.value,
gender:gender.value,
branch:branch.value.trim(),
contact:contact.value.trim()
});

localStorage.setItem("students",JSON.stringify(students));
form.reset();
loadTable();
loadBranches();
alert("Student Added Successfully!");
openPage("view",document.querySelector('[data-page="view"]'));
});
}

// ---------- Marks ----------
function loadStudentForMarks(){
const roll=marksRoll.value.trim();
const s=students.find(x=>x.roll===roll);

if(s){
marksName.value=s.name;
marksGender.value=s.gender;
marksBranch.value=s.branch;
}else{
marksName.value="";
marksGender.value="";
marksBranch.value="";
}
}

function saveMarks(){

const s=students.find(x=>x.roll===marksRoll.value.trim());

if(!s){
alert("Student Not Found");
return;
}

const marks=[
Number(m1.value)||0,
Number(m2.value)||0,
Number(m3.value)||0,
Number(m4.value)||0,
Number(m5.value)||0
];

const total=marks.reduce((a,b)=>a+b,0);
const per=(total/5).toFixed(1);

s.marks=marks;
s.total=total;
s.percentage=per;
s.grade=calculateGrade(Number(per));

localStorage.setItem("students",JSON.stringify(students));

alert("Marks Saved");

marksRoll.value="";
marksName.value="";
marksGender.value="";
marksBranch.value="";
m1.value=m2.value=m3.value=m4.value=m5.value="";

loadTable();
}

// ---------- View Table ----------
function loadTable(list=students){

const body=document.getElementById("tableBody");
if(!body) return;

body.innerHTML="";

list.forEach(student=>{

const i=students.indexOf(student);

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
<button class="action edit" onclick="editStudent(${i})">✏️</button>
<button class="action deleteBtn" onclick="removeStudent(${i})">🗑️</button>
</td>
</tr>`;
});

updateCards();
}

// ---------- Edit ----------
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

// ---------- Delete ----------
function removeStudent(i){

if(!confirm("Delete this student?")) return;

students.splice(i,1);

localStorage.setItem("students",JSON.stringify(students));

loadTable();
loadBranches();
}

function deleteByRoll(){

const roll=deleteRoll.value.trim();

students=students.filter(s=>s.roll!==roll);

localStorage.setItem("students",JSON.stringify(students));

loadTable();
loadBranches();

deleteRoll.value="";
alert("Student Deleted");
}

// ---------- Search ----------
function searchStudent(){

const key=searchBox.value.trim().toLowerCase();

const s=students.find(x=>
x.roll.toLowerCase()===key||
x.name.toLowerCase().includes(key)
);

if(s){
searchResult.innerHTML=`
<div class="panel">
<h3>${s.name}</h3>
<p><b>Roll:</b> ${s.roll}</p>
<p><b>Gender:</b> ${s.gender}</p>
<p><b>Branch:</b> ${s.branch}</p>
<p><b>Total:</b> ${s.total??"-"}</p>
<p><b>Percentage:</b> ${s.percentage? s.percentage+"%":"-"}</p>
<p><b>Grade:</b> ${s.grade??"-"}</p>
</div>`;
}else{
searchResult.innerHTML="<p style='color:red'>Student Not Found</p>";
}
}

// ---------- Update ----------
function loadStudentForUpdate(){

const s=students.find(x=>x.roll===updateRoll.value.trim());

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
</div><br>
<button class="primary" onclick="saveUpdate('${s.roll}')">Save Changes</button>`;
}

function saveUpdate(roll){

const s=students.find(x=>x.roll===roll);

s.name=uName.value;
s.age=uAge.value;
s.gender=uGender.value;
s.branch=uBranch.value;
s.contact=uContact.value;

localStorage.setItem("students",JSON.stringify(students));

loadTable();

alert("Updated Successfully");
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
document.querySelector(".logout")?.addEventListener("click",()=>{
if(confirm("Logout?")){
openPage("dashboard",document.querySelector('[data-page="dashboard"]'));
}
});

// ---------- Initial Load ----------
loadTable();
loadBranches();
openPage("dashboard",document.querySelector('[data-page="dashboard"]'));
