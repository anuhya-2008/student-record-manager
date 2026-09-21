// ================= STUDENT RECORD MANAGEMENT =================

// ---------- Navigation ----------
const pages=document.querySelectorAll(".page");
const navButtons=document.querySelectorAll(".nav");

function openPage(pageName,btn=null){
    pages.forEach(p=>p.classList.remove("activePage"));
    document.getElementById(pageName)?.classList.add("activePage");
    navButtons.forEach(b=>b.classList.remove("active"));
    if(btn) btn.classList.add("active");
}

navButtons.forEach(btn=>{
    btn.onclick=()=>openPage(btn.dataset.page,btn);
});

// ---------- 25 Sample Students ----------
const sampleStudents=[
{roll:"25B11CS001",name:"Rahul Kumar",age:18,gender:"Male",branch:"CSE",contact:"9876543201"},
{roll:"25B11CS002",name:"Priya Sharma",age:18,gender:"Female",branch:"CSE",contact:"9876543202"},
{roll:"25B11CS003",name:"Arjun Reddy",age:19,gender:"Male",branch:"CSE-DS",contact:"9876543203"},
{roll:"25B11CS004",name:"Sneha Patel",age:18,gender:"Female",branch:"ECE",contact:"9876543204"},
{roll:"25B11CS005",name:"Kiran Sai",age:19,gender:"Male",branch:"AI",contact:"9876543205"},
{roll:"25B11CS006",name:"Divya Rao",age:18,gender:"Female",branch:"CSE",contact:"9876543206"},
{roll:"25B11CS007",name:"Harsha Vardhan",age:19,gender:"Male",branch:"ECE",contact:"9876543207"},
{roll:"25B11CS008",name:"Nandini",age:18,gender:"Female",branch:"AI",contact:"9876543208"},
{roll:"25B11CS009",name:"Vivek",age:19,gender:"Male",branch:"CSE-DS",contact:"9876543209"},
{roll:"25B11CS010",name:"Meghana",age:18,gender:"Female",branch:"CSE",contact:"9876543210"},
{roll:"25B11CS011",name:"Siddharth",age:18,gender:"Male",branch:"IT",contact:"9876543211"},
{roll:"25B11CS012",name:"Ananya",age:19,gender:"Female",branch:"AIML",contact:"9876543212"},
{roll:"25B11CS013",name:"Rohit",age:18,gender:"Male",branch:"ECE",contact:"9876543213"},
{roll:"25B11CS014",name:"Keerthana",age:18,gender:"Female",branch:"CSE",contact:"9876543214"},
{roll:"25B11CS015",name:"Ajay",age:19,gender:"Male",branch:"AI",contact:"9876543215"},
{roll:"25B11CS016",name:"Bhavya",age:18,gender:"Female",branch:"IT",contact:"9876543216"},
{roll:"25B11CS017",name:"Manoj",age:19,gender:"Male",branch:"CSE-DS",contact:"9876543217"},
{roll:"25B11CS018",name:"Lavanya",age:18,gender:"Female",branch:"ECE",contact:"9876543218"},
{roll:"25B11CS019",name:"Nikhil",age:18,gender:"Male",branch:"AIML",contact:"9876543219"},
{roll:"25B11CS020",name:"Sravani",age:19,gender:"Female",branch:"CSE",contact:"9876543220"},
{roll:"25B11CS021",name:"Sai Teja",age:18,gender:"Male",branch:"AI",contact:"9876543221"},
{roll:"25B11CS022",name:"Pooja",age:18,gender:"Female",branch:"CSE",contact:"9876543222"},
{roll:"25B11CS023",name:"Yash",age:19,gender:"Male",branch:"ECE",contact:"9876543223"},
{roll:"25B11CS024",name:"Deepika",age:18,gender:"Female",branch:"IT",contact:"9876543224"},
{roll:"25B11CS025",name:"Tarun",age:18,gender:"Male",branch:"CSE-DS",contact:"9876543225"}
];

// ---------- Load Data ----------
let students=JSON.parse(localStorage.getItem("students"))||[];

if(!localStorage.getItem("sampleLoaded")){
    const rolls=new Set(students.map(s=>s.roll));
    sampleStudents.forEach(s=>{
        if(!rolls.has(s.roll)) students.push({...s,total:null,percentage:null,grade:null});
    });
    localStorage.setItem("students",JSON.stringify(students));
    localStorage.setItem("sampleLoaded","true");
}

// ---------- Grade ----------
function grade(p){
    if(p>=90) return "A+";
    if(p>=80) return "A";
    if(p>=70) return "B";
    if(p>=60) return "C";
    if(p>=50) return "D";
    return "F";
}

// ---------- Add Student ----------
const form=document.getElementById("studentForm");

if(form){
form.onsubmit=function(e){
e.preventDefault();

const roll=document.getElementById("roll").value.trim();

if(students.some(s=>s.roll===roll)){
    alert("Roll Number already exists!");
    return;
}

students.push({
roll,
name:name.value,
age:age.value,
gender:gender.value,
branch:branch.value,
contact:contact.value,
total:null,
percentage:null,
grade:null
});

localStorage.setItem("students",JSON.stringify(students));

form.reset();

loadTable();

loadBranches();

alert("Student Added Successfully!");

openPage("view",document.querySelector('[data-page="view"]'));
};
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
alert("Student Not Found!");
return;
}

const total=(+m1.value)+(+m2.value)+(+m3.value)+(+m4.value)+(+m5.value);

const per=(total/5).toFixed(1);

s.total=total;
s.percentage=per;
s.grade=grade(Number(per));

localStorage.setItem("students",JSON.stringify(students));

loadTable();

alert("Marks Saved!");

["marksRoll","marksName","marksGender","marksBranch","m1","m2","m3","m4","m5"].forEach(id=>document.getElementById(id).value="");

}

// ---------- Dashboard ----------
function updateCards(){

const branches=[...new Set(students.map(s=>s.branch))];

totalStudents.textContent=students.length;
totalBranches.textContent=branches.length;
todayEntries.textContent=students.length;

if(recentStudents){

recentStudents.innerHTML="";

students.slice(-5).reverse().forEach(s=>{
recentStudents.innerHTML+=`
<div class="recent-item">
<div class="avatar">${s.name.charAt(0)}</div>
<div><b>${s.name}</b><br><small>${s.branch}</small></div>
</div>`;
});

}

if(branchStats){

branchStats.innerHTML="";

branches.forEach(b=>{
branchStats.innerHTML+=`
<div class="branch-box">
<b>${b}</b><br>${students.filter(x=>x.branch===b).length}
</div>`;
});

}

}

// ---------- View Table ----------
function loadTable(list=students){

tableBody.innerHTML="";

list.forEach(st=>{

const i=students.indexOf(st);

tableBody.innerHTML+=`
<tr>
<td>${st.roll}</td>
<td>${st.name}</td>
<td>${st.age}</td>
<td>${st.gender}</td>
<td>${st.branch}</td>
<td>${st.total??"-"}</td>
<td>${st.percentage?st.percentage+"%":"-"}</td>
<td>${st.grade??"-"}</td>
<td>
<button class="action edit" onclick="editStudent(${i})">✏️</button>
<button class="action deleteBtn" onclick="removeStudent(${i})">🗑️</button>
</td>
</tr>`;
});

updateCards();

}

// ---------- Branch Filter ----------
function loadBranches(){

if(!branchButtons) return;

branchButtons.innerHTML='<button class="branchBtn" onclick="showAllStudents()">All Students</button>';

[...new Set(students.map(s=>s.branch))].forEach(b=>{

branchButtons.innerHTML+=`<button class="branchBtn" onclick="filterBranch('${b}')">${b}</button>`;

});

}

branchCard?.addEventListener("click",()=>{
loadBranches();
openPage("branchPanel");
});

function filterBranch(b){
loadTable(students.filter(s=>s.branch===b));
openPage("view",document.querySelector('[data-page="view"]'));
}

function showAllStudents(){
loadTable();
openPage("view",document.querySelector('[data-page="view"]'));
}

// ---------- Search ----------
function searchStudent(){

const key=searchBox.value.toLowerCase().trim();

const s=students.find(x=>x.roll.toLowerCase()===key||x.name.toLowerCase().includes(key));

searchResult.innerHTML=s?`
<div class="panel">
<h3>${s.name}</h3>
<p>Roll: ${s.roll}</p>
<p>Gender: ${s.gender}</p>
<p>Branch: ${s.branch}</p>
<p>Total: ${s.total??"-"}</p>
<p>Grade: ${s.grade??"-"}</p>
</div>`:"<p style='color:red'>Student Not Found</p>";

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

function saveUpdate(r){

const s=students.find(x=>x.roll===r);

s.name=uName.value;
s.age=uAge.value;
s.gender=uGender.value;
s.branch=uBranch.value;
s.contact=uContact.value;

localStorage.setItem("students",JSON.stringify(students));

loadTable();

alert("Updated Successfully!");

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

students=students.filter(s=>s.roll!==deleteRoll.value.trim());

localStorage.setItem("students",JSON.stringify(students));

deleteRoll.value="";

loadTable();

loadBranches();

alert("Deleted Successfully!");

}

// ---------- Live Search ----------
searchInput?.addEventListener("keyup",function(){

const key=this.value.toLowerCase();

document.querySelectorAll("#tableBody tr").forEach(r=>{

r.style.display=r.innerText.toLowerCase().includes(key)?"":"none";

});

});

// ---------- Logout ----------
document.querySelector(".logout")?.addEventListener("click",()=>{

if(confirm("Logout?"))
location.reload();

});

// ---------- Initial ----------
loadTable();
loadBranches();
openPage("dashboard",document.querySelector('[data-page="dashboard"]'));
