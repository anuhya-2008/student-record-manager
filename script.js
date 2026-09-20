// =========================================
// STUDENT RECORD MANAGER
// =========================================

// ---------- Navigation ----------

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav");

function openPage(pageName, btn = null) {
    pages.forEach(page => page.classList.remove("activePage"));

    const page = document.getElementById(pageName);

    if (page)
        page.classList.add("activePage");

    navButtons.forEach(b => b.classList.remove("active"));

    if (btn)
        btn.classList.add("active");
}

navButtons.forEach(btn => {
    btn.onclick = () => {
        openPage(btn.dataset.page, btn);
    };
});

// ---------- Data ----------

let students = JSON.parse(localStorage.getItem("students")) || [];

// ---------- Add Student ----------

const form = document.getElementById("studentForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const roll = document.getElementById("roll").value.trim();

        if (students.some(s => s.roll === roll)) {
            alert("Roll Number already exists!");
            return;
        }

        students.push({
            roll: roll,
            name: document.getElementById("name").value.trim(),
            age: document.getElementById("age").value.trim(),
            gender: document.getElementById("gender").value,
            branch: document.getElementById("branch").value.trim(),
            contact: document.getElementById("contact").value.trim(),
            marks: [],
            total: null,
            percentage: null,
            grade: null
        });

        localStorage.setItem("students", JSON.stringify(students));

        form.reset();

        loadTable();

        loadBranches();

        alert("Student Added Successfully!");

        openPage("view", document.querySelector('[data-page="view"]'));

    });

}

// ---------- Grade ----------

function calculateGrade(per) {

    if (per >= 90) return "A+";
    if (per >= 80) return "A";
    if (per >= 70) return "B";
    if (per >= 60) return "C";
    if (per >= 50) return "D";

    return "F";

}

// ---------- Marks Auto Fill ----------

function loadStudentForMarks() {

    const roll = document.getElementById("marksRoll").value.trim();

    const student = students.find(s => s.roll === roll);

    if (student) {

        document.getElementById("marksName").value = student.name;
        document.getElementById("marksGender").value = student.gender;
        document.getElementById("marksBranch").value = student.branch;

    } else {

        document.getElementById("marksName").value = "";
        document.getElementById("marksGender").value = "";
        document.getElementById("marksBranch").value = "";

    }

}

// ---------- Save Marks ----------

function saveMarks() {

    const roll = document.getElementById("marksRoll").value.trim();

    const student = students.find(s => s.roll === roll);

    if (!student) {

        alert("Student Not Found!");
        return;

    }

    const marks = [
        Number(document.getElementById("m1").value),
        Number(document.getElementById("m2").value),
        Number(document.getElementById("m3").value),
        Number(document.getElementById("m4").value),
        Number(document.getElementById("m5").value)
    ];

    const total = marks.reduce((a, b) => a + b, 0);

    const percentage = (total / 5).toFixed(1);

    student.marks = marks;
    student.total = total;
    student.percentage = percentage;
    student.grade = calculateGrade(Number(percentage));

    localStorage.setItem("students", JSON.stringify(students));

    alert("Marks Saved Successfully!");

    document.getElementById("marksRoll").value = "";
    document.getElementById("marksName").value = "";
    document.getElementById("marksGender").value = "";
    document.getElementById("marksBranch").value = "";

    ["m1", "m2", "m3", "m4", "m5"].forEach(id => {
        document.getElementById(id).value = "";
    });

    loadTable();

}

// ---------- Load Table ----------

function loadTable(list = students) {

    const body = document.getElementById("tableBody");

    if (!body) return;

    body.innerHTML = "";

    list.forEach(student => {

        const realIndex = students.indexOf(student);

        body.innerHTML += `
        <tr>

            <td>${student.roll}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.gender}</td>
            <td>${student.branch}</td>
            <td>${student.total ?? "-"}</td>
            <td>${student.percentage ?? "-"}${student.percentage ? "%" : ""}</td>
            <td>${student.grade ?? "-"}</td>

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

function updateCards() {

    const total = document.getElementById("totalStudents");
    const branch = document.getElementById("totalBranches");
    const today = document.getElementById("todayEntries");

    if (total)
        total.textContent = students.length;

    const branches = [...new Set(students.map(s => s.branch))];

    if (branch)
        branch.textContent = branches.length;

    if (today)
        today.textContent = students.length;

    const recent = document.getElementById("recentStudents");

    if (recent) {

        recent.innerHTML = "";

        students.slice(-5).reverse().forEach(s => {

            recent.innerHTML += `
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

    const stats = document.getElementById("branchStats");

    if (stats) {

        stats.innerHTML = "";

        branches.forEach(b => {

            const count = students.filter(x => x.branch === b).length;

            stats.innerHTML += `
            <div class="branch-box">

                <div>${b}</div>

                <h3>${count}</h3>

            </div>
            `;

        });

    }

}

// ---------- Branch Filter ----------

function loadBranches() {

    const container = document.getElementById("branchButtons");

    if (!container) return;

    container.innerHTML = "";

    const branches = [...new Set(students.map(s => s.branch))];

    container.innerHTML += `
    <button class="branchBtn"
    onclick="showAllStudents()">

    All Students

    </button>
    `;

    branches.forEach(branch => {

        container.innerHTML += `
        <button class="branchBtn"
        onclick="filterBranch('${branch}')">

        ${branch}

        </button>
        `;

    });

}

const branchCard = document.getElementById("branchCard");

if (branchCard) {

    branchCard.onclick = () => {

        loadBranches();

        openPage("branchPanel");

    };

}

function filterBranch(branch) {

    const filtered = students.filter(s => s.branch === branch);

    loadTable(filtered);

    openPage("view", document.querySelector('[data-page="view"]'));

}

function showAllStudents() {

    loadTable();

    openPage("view", document.querySelector('[data-page="view"]'));

}

// ---------- Edit ----------

function editStudent(index) {

    const s = students[index];

    document.getElementById("roll").value = s.roll;
    document.getElementById("name").value = s.name;
    document.getElementById("age").value = s.age;
    document.getElementById("gender").value = s.gender;
    document.getElementById("branch").value = s.branch;
    document.getElementById("contact").value = s.contact;

    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    loadTable();

    openPage("add", document.querySelector('[data-page="add"]'));

}

// ---------- Delete ----------

function removeStudent(index) {

    if (!confirm("Delete this student?")) return;

    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    loadTable();

    loadBranches();

}

// ---------- Search ----------

function searchStudent() {

    const key = document.getElementById("searchBox").value.trim().toLowerCase();

    const student = students.find(s =>
        s.roll.toLowerCase() === key ||
        s.name.toLowerCase().includes(key)
    );

    const result = document.getElementById("searchResult");

    if (student) {

        result.innerHTML = `
        <div class="panel">

            <h3>${student.name}</h3>

            <p><b>Roll:</b> ${student.roll}</p>
            <p><b>Age:</b> ${student.age}</p>
            <p><b>Gender:</b> ${student.gender}</p>
            <p><b>Branch:</b> ${student.branch}</p>
            <p><b>Total:</b> ${student.total ?? "-"}</p>
            <p><b>Percentage:</b> ${student.percentage ?? "-"}${student.percentage ? "%" : ""}</p>
            <p><b>Grade:</b> ${student.grade ?? "-"}</p>

        </div>
        `;

    } else {

        result.innerHTML = "<p style='color:red'>Student Not Found</p>";

    }

}

// ---------- Update ----------

function loadStudentForUpdate() {

    const rollNo = document.getElementById("updateRoll").value.trim();

    const student = students.find(s => s.roll === rollNo);

    const area = document.getElementById("updateArea");

    if (!student) {

        area.innerHTML = "<p style='color:red'>Student Not Found</p>";

        return;

    }

    area.innerHTML = `
    <div class="grid">

        <input id="uName" value="${student.name}">
        <input id="uAge" value="${student.age}">

        <select id="uGender">

            <option ${student.gender === "Male" ? "selected" : ""}>Male</option>
            <option ${student.gender === "Female" ? "selected" : ""}>Female</option>
            <option ${student.gender === "Other" ? "selected" : ""}>Other</option>

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

function saveUpdate(rollNo) {

    const student = students.find(s => s.roll === rollNo);

    student.name = document.getElementById("uName").value;
    student.age = document.getElementById("uAge").value;
    student.gender = document.getElementById("uGender").value;
    student.branch = document.getElementById("uBranch").value;
    student.contact = document.getElementById("uContact").value;

    localStorage.setItem("students", JSON.stringify(students));

    loadTable();

    alert("Student Updated Successfully!");

}

// ---------- Delete by Roll ----------

function deleteByRoll() {

    const rollNo = document.getElementById("deleteRoll").value.trim();

    students = students.filter(s => s.roll !== rollNo);

    localStorage.setItem("students", JSON.stringify(students));

    loadTable();

    loadBranches();

    document.getElementById("deleteRoll").value = "";

    alert("Student Deleted!");

}

// ---------- Live Search ----------

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.onkeyup = function () {

        const key = this.value.toLowerCase();

        document.querySelectorAll("#tableBody tr").forEach(row => {

            row.style.display = row.innerText.toLowerCase().includes(key) ? "" : "none";

        });

    };

}

// ---------- Logout ----------

const logout = document.querySelector(".logout");

if (logout) {

    logout.onclick = () => {

        if (confirm("Logout?")) {

            location.reload();

        }

    };

}

// ---------- Initial ----------

loadTable();
loadBranches();
openPage("dashboard", document.querySelector('[data-page="dashboard"]'));