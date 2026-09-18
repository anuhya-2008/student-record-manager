// =========================================
// STUDENT RECORD MANAGER
// =========================================

// ---------- Navigation ----------

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav");

function openPage(pageName, btn = null) {

    pages.forEach(page => page.classList.remove("activePage"));

    const page = document.getElementById(pageName);

    if(page)
        page.classList.add("activePage");

    navButtons.forEach(b => b.classList.remove("active"));

    if(btn)
        btn.classList.add("active");
}

navButtons.forEach(btn=>{

    btn.onclick=()=>{

        openPage(btn.dataset.page,btn);

    };

});

// ---------- Data ----------

let students=JSON.parse(localStorage.getItem("students"))||[];

// ---------- Add Student ----------

const form=document.getElementById("studentForm");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

const roll=document.getElementById("roll").value.trim();

if(students.some(s=>s.roll===roll)){

alert("Roll Number already exists!");

return;

}

students.push({

roll:roll,
name:name.value.trim(),
age:age.value.trim(),
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

// ---------- Grade ----------

function calculateGrade(per){

if(per>=90) return "A+";

if(per>=80) return "A";

if(per>=70) return "B";

if(per>=60) return "C";

if(per>=50) return "D";

return "F";

}

// ---------- Marks Auto Fill ----------

function loadStudentForMarks(){

const roll=document.getElementById("marksRoll").value.trim();

const student=students.find(s=>s.roll===roll);

if(student){

marksName.value=student.name;

marksGender.value=student.gender;

marksBranch.value=student.branch;

}else{

marksName.value="";
marksGender.value="";
marksBranch.value="";

}

}

// ---------- Save Marks ----------

function saveMarks(){

const roll=document.getElementById("marksRoll").value.trim();

const student=students.find(s=>s.roll===roll);

if(!student){

alert("Student Not Found!");

return;

}

const marks=[

Number(m1.value),
Number(m2.value),
Number(m3.value),
Number(m4.value),
Number(m5.value)

];

const total=marks.reduce((a,b)=>a+b,0);

const percentage=(total/5).toFixed(1);

student.marks=marks;
student.total=total;
student.percentage=percentage;
student.grade=calculateGrade(Number(percentage));

localStorage.setItem("students",JSON.stringify(students));

alert("Marks Saved Successfully!");

marksRoll.value="";
marksName.value="";
marksGender.value="";
marksBranch.value="";
m1.value="";
m2.value="";
m3.value="";
m4.value="";
m5.value="";

loadTable();

}

// ---------- Load Table ----------

function loadTable(list=students){

const body=document.getElementById("tableBody");

if(!body) return;

body.innerHTML="";

list.forEach(student=>{

const realIndex=students.indexOf(student);

body.innerHTML+=`

<tr>

<td>${student.roll}</td>

<td>${student.name}</td>

<td>${student.age}</td>

<td>${student.gender}</td>

<td>${student.branch}</td>

<td>${student.total??"-"}</td>

<td>${student.percentage??"-"}${student.percentage?"%":""}</td>

<td>${student.grade??"-"}</td>

<td>

<button class="action edit"
onclick="editStudent(${realIndex})">

✏️

</button>

<button class="action deleteBtn"
onclick="removeStudent(${realIndex})">

🗑️

</button>

</td>

</tr>

`;

});

updateCards();

}

// ---------- Dashboard ----------

function updateCards(){

const total=document.getElementById("totalStudents");

const branch=document.getElementById("totalBranches");

const today=document.getElementById("todayEntries");

if(total)
total.textContent=students.length;

const branches=[...new Set(students.map(s=>s.branch))];

if(branch)
branch.textContent=branches.length;

if(today)
today.textContent=students.length;

// Recent Students

const recent=document.getElementById("recentStudents");

if(recent){

recent.innerHTML="";

students.slice(-5).reverse().forEach(s=>{

recent.innerHTML+=`

<div class="recent-item">

<div style="display:flex;gap:12px;align-items:center;">

<div class="avatar">

${s.name.charAt(0)}

</div>

<div>

<b>${s.name}</b><br>

<small>${s.branch}</small>

</div>

</div>

<span>#${s.roll}</span>

</div>

`;

});

}

// Branch Stats

const stats=document.getElementById("branchStats");

if(stats){

stats.innerHTML="";

branches.forEach(b=>{

const count=students.filter(x=>x.branch===b).length;

stats.innerHTML+=`

<div class="branch-box">

<div>${b}</div>

<h3>${count}</h3>

</div>

`;

});

}

}

// ---------- Branch Filter ----------

function loadBranches(){

const container=document.getElementById("branchButtons");

if(!container) return;

container.innerHTML="";

const branches=[...new Set(students.map(s=>s.branch))];

container.innerHTML+=`

<button class="branchBtn"
onclick="showAllStudents()">

All Students

</button>

`;

branches.forEach(branch=>{

container.innerHTML+=`

<button class="branchBtn"
onclick="filterBranch('${branch}')">

${branch}

</button>

`;

});

}

const branchCard=document.getElementById("branchCard");

if(branchCard){

branchCard.onclick=()=>{

loadBranches();

openPage("branchPanel");

};

}

function filterBranch(branch){

const filtered=students.filter(s=>s.branch===branch);

loadTable(filtered);

openPage("view",document.querySelector('[data-page="view"]'));

}

function showAllStudents(){

loadTable();

openPage("view",document.querySelector('[data-page="view"]'));

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

if(!confirm("Delete this student?")) return;

students.splice(index,1);

localStorage.setItem("students",JSON.stringify(students));

loadTable();

loadBranches();

}

// ---------- Search ----------

function searchStudent(){

const key=searchBox.value.trim().toLowerCase();

const student=students.find(s=>

s.roll.toLowerCase()===key||

s.name.toLowerCase().includes(key)

);

if(student){

searchResult.innerHTML=`

<div class="panel">

<h3>${student.name}</h3>

<p><b>Roll:</b> ${student.roll}</p>

<p><b>Age:</b> ${student.age}</p>

<p><b>Gender:</b> ${student.gender}</p>

<p><b>Branch:</b> ${student.branch}</p>

<p><b>Total:</b> ${student.total??"-"}</p>

<p><b>Percentage:</b> ${student.percentage??"-"}${student.percentage?"%":""}</p>

<p><b>Grade:</b> ${student.grade??"-"}</p>

</div>

`;

}else{

searchResult.innerHTML="<p style='color:red'>Student Not Found</p>";

}

}

// ---------- Update ----------

function loadStudentForUpdate(){

const rollNo=updateRoll.value.trim();

const student=students.find(s=>s.roll===rollNo);

if(!student){

updateArea.innerHTML="<p style='color:red'>Student Not Found</p>";

return;

}

updateArea.innerHTML=`

<div class="grid">

<input id="uName" value="${student.name}">

<input id="uAge" value="${student.age}">

<select id="uGender">

<option ${student.gender==="Male"?"selected":""}>Male</option>

<option ${student.gender==="Female"?"selected":""}>Female</option>

<option ${student.gender==="Other"?"selected":""}>Other</option>

</select>

<input id="uBranch" value="${student.branch}">

<input id="uContact" value="${student.contact}">

</div>

<br>

<button class="primary"
onclick="saveUpdate('${rollNo}')">

Save Changes

</button>

`;

}

function saveUpdate(rollNo){

const student=students.find(s=>s.roll===rollNo);

student.name=uName.value;
student.age=uAge.value;
student.gender=uGender.value;
student.branch=uBranch.value;
student.contact=uContact.value;

localStorage.setItem("students",JSON.stringify(students));

loadTable();

alert("Student Updated Successfully!");

}

// ---------- Delete by Roll ----------

function deleteByRoll(){

const rollNo=deleteRoll.value.trim();

students=students.filter(s=>s.roll!==rollNo);

localStorage.setItem("students",JSON.stringify(students));

loadTable();

loadBranches();

deleteRoll.value="";

alert("Student Deleted!");

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

loadBranches();

openPage("dashboard",document.querySelector('[data-page="dashboard"]'));