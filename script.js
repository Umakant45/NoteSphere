

function downloadNote(subject){

  let unit = prompt(
    "Enter Unit Number"
  );

  const notes = {

    "Java": {
      1: "pdfs/java/java-unit-1.pdf",
      2: "pdfs/java/java-unit-2.pdf",
      3: "pdfs/java/java-unit-3.pdf",
      4: "pdfs/java/java-unit-4.pdf"
    },

    "Python": {
      1: "pdfs/python/python-unit-1.pdf",
      2: "pdfs/python/python-unit-2.pdf",
      3: "pdfs/python/python-unit-3.pdf",
      4: "pdfs/python/python-unit-4.pdf"
    },

    "C++": {
      1: "pdfs/cpp/cpp-unit-1.pdf",
      2: "pdfs/cpp/cpp-unit-2.pdf",
      3: "pdfs/cpp/cpp-unit-3.pdf",
      4: "pdfs/cpp/cpp-unit-4.pdf"
    },
    "Software Engineering": {
      1: "pdfs/Software-engineering/SE-unit-1.pdf",
      2: "pdfs/Software-engineering/SE-unit-2.pdf",
      3: "pdfs/Software-engineering/SE-unit-3.pdf",
      4: "pdfs/Software-engineering/SE-unit-4.pdf"
    },
    "Operating System": {
      1: "pdfs/Operating-system/OS-unit-1.pdf",
      2: "pdfs/Operating-system/OS-unit-2.pdf",
      3: "pdfs/Operating-system/OS-unit-3.pdf",
      4: "pdfs/Operating-system/OS-unit-4.pdf"
    },
    "Software Testing": {
      1: "pdfs/Software-testing/ST-unit-1.pdf",
      2: "pdfs/Software-testing/ST-unit-2.pdf",
      3: "pdfs/Software-testing/ST-unit-3.pdf",
      4: "pdfs/Software-testing/ST-unit-4.pdf"
    },
    "J2EE": {
      1: "pdfs/J2EE/j2ee-unit-1.pdf",
      2: "pdfs/J2EE/J2ee-unit-2.pdf",
      3: "pdfs/J2EE/J2ee-unit-3.pdf",
      4: "pdfs/J2EE/J2ee-unit-4.pdf"
    },
    "RDBMS": {
      1: "pdfs/RDBMS/RDBMS-unit-1.pdf",
      2: "pdfs/RDBMS/RDBMS-unit-2.pdf",
      3: "pdfs/RDBMS/RDBMS-unit-3.pdf",
      4: "pdfs/RDBMS/RDBMS-unit-4.pdf"
    },
    "Web Technology": {
      1: "pdfs/Web-technology/WT-unit-1.pdf",
      2: "pdfs/Web-technology/WT-unit-2.pdf",
      3: "pdfs/Web-technology/WT-unit-3.pdf",
      4: "pdfs/Web-technology/WT-unit-4.pdf"
    },
    "C Programming": {
      1: "pdfs/C-programming/C-unit-1.pdf",
      2: "pdfs/C-programming/C-unit-2.pdf",
      3: "pdfs/C-programming/C-unit-3.pdf",
      4: "pdfs/C-programming/C-unit-4.pdf"
    },
    "Computer Network": {
      1: "pdfs/Computer-Networks/CN-unit-1.pdf",
      2: "pdfs/Computer-Networks/CN-unit-2.pdf",
      3: "pdfs/Computer-Networks/CN-unit-3.pdf",
      4: "pdfs/Computer-Networks/CN-unit-4.pdf"
    },
    "DSA": {
      1: "pdfs/DSA/DSA-unit-1.pdf",
      2: "pdfs/DSA/DSA-unit-2.pdf",
      3: "pdfs/DSA/DSA-unit-3.pdf",
      4: "pdfs/DSA/DSA-unit-4.pdf"
    }

  };

  if(unit === null){
    return;
  }

  unit = unit.trim();

  if(notes[subject] && notes[subject][unit]){

    window.open(
      notes[subject][unit],
      "_blank"
    );

  } else {

    alert(
      "Notes not available for this unit!"
    );

  }

}

function scrollToSemester(){

  document.getElementById("semester")
  .scrollIntoView({
    behavior:"smooth"
  });

}

function openPaper(subject) {

    const papers = {
        c: "pyq/c_paper.pdf",
        cn: "pyq/cn_paper.pdf",
        wt: "pyq/webtech_paper.pdf",

        cpp: "pyq/cpp_paper.pdf",
        dsa: "pyq/dsa_paper.pdf",
        rdbms: "pyq/rdbms_paper.pdf",

        python: "pyq/python_paper.pdf",
        java: "pyq/java_paper.pdf",
        se: "pyq/software_engineering_paper.pdf",

        os: "pyq/os_paper.pdf",
        st: "pyq/software_testing_paper.pdf",
        j2ee: "pyq/j2ee_paper.pdf"
    };

    if (papers[subject]) {
        window.open(papers[subject], "_blank");
    } else {
        alert("Question paper not available");
    }
}
function openSyllabus(year) {

  const syllabusFiles = {
    "1st-year": "pdfs/syllabus/1st-year-syllabus.pdf",
    "2nd-year": "pdfs/syllabus/2nd-year-syllabus.pdf",
    "3rd-year": "pdfs/syllabus/3rd-year-syllabus.pdf"
  };

  if (syllabusFiles[year]) {
    window.open(syllabusFiles[year], "_blank");
  } else {
    alert("Syllabus PDF not found.");
  }
}
/* ============================================================
   NoteSphere Phase 2 - Student Authentication
   ============================================================ */

const NOTESPHERE_AUTH_DOMAIN = "@notesphere.local";

function authEmailFromStudentId(studentId) {
  return `${studentId.trim().toLowerCase()}${NOTESPHERE_AUTH_DOMAIN}`;
}
function openAuthModal() {
    const modal = document.getElementById("authModal");

    if (!modal) {
        console.error("NoteSphere: authModal not found");
        return;
    }

    console.log("Opening login modal");

    modal.classList.add("auth-open");

    const loginPanel = document.getElementById("loginPanel");
    const registerPanel = document.getElementById("registerPanel");

    if (loginPanel) {
        loginPanel.classList.remove("hidden");
    }

    if (registerPanel) {
        registerPanel.classList.add("hidden");
    }

    const input = document.getElementById("loginStudentId");

    if (input) {
        setTimeout(function () {
            input.focus();
        }, 100);
    }
}


function closeAuthModal() {
    const modal = document.getElementById("authModal");

    if (!modal) return;

    console.log("Closing login modal");

    modal.classList.remove("auth-open");
}

function showRegisterPanel() {
  document.getElementById("loginPanel")?.classList.add("hidden");
  document.getElementById("registerPanel")?.classList.remove("hidden");
}

function showLoginPanel() {
  document.getElementById("registerPanel")?.classList.add("hidden");
  document.getElementById("loginPanel")?.classList.remove("hidden");
}

function setAuthStatus(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
}

async function registerStudent(event) {
  event.preventDefault();
  if (!noteSphereSupabase) {
    setAuthStatus("registerStatus", "Supabase is not configured.");
    return;
  }

  const studentId = document.getElementById("registerStudentId").value.trim();
  const fullName = document.getElementById("registerName").value.trim();
  const year = document.getElementById("registerYear").value;
  const course = document.getElementById("registerCourse").value.trim();
  const password = document.getElementById("registerPassword").value;

  if (!studentId || !fullName || !year || !course || password.length < 6) {
    setAuthStatus("registerStatus", "Please fill all fields correctly.");
    return;
  }

  setAuthStatus("registerStatus", "Creating account...");

  const { data, error } = await noteSphereSupabase.auth.signUp({
    email: authEmailFromStudentId(studentId),
    password,
    options: { data: { student_id: studentId, full_name: fullName, year, course } }
  });

  if (error) {
    setAuthStatus("registerStatus", error.message);
    return;
  }

  if (data.session) {
    setAuthStatus("registerStatus", "Account created successfully.");
    setTimeout(closeAuthModal, 700);
  } else {
    setAuthStatus(
      "registerStatus",
      "Account created, but email confirmation is required. Disable Confirm email in Supabase for this Student-ID-only development login."
    );
  }
}
async function loginStudent(event) {
  event.preventDefault();

  if (!noteSphereSupabase) {
    setAuthStatus("loginStatus", "Supabase is not configured.");
    return;
  }

  const studentId = document
    .getElementById("loginStudentId")
    .value
    .trim();

  const password = document
    .getElementById("loginPassword")
    .value;

  if (!studentId || !password) {
    setAuthStatus("loginStatus", "Enter Student ID and password.");
    return;
  }

  setAuthStatus("loginStatus", "Signing in...");

  console.log("Student ID:", studentId);
  console.log(
    "Auth email:",
    authEmailFromStudentId(studentId)
  );

  try {

    const loginPromise =
      noteSphereSupabase.auth.signInWithPassword({
        email: authEmailFromStudentId(studentId),
        password: password
      });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(
          new Error(
            "Login request timed out. Check your Supabase connection."
          )
        );
      }, 10000);
    });

    const { data, error } = await Promise.race([
      loginPromise,
      timeoutPromise
    ]);

    console.log("Login response:", data);
    console.log("Login error:", error);

    if (error) {
      setAuthStatus(
        "loginStatus",
        error.message
      );
      return;
    }

    if (!data || !data.session) {
      setAuthStatus(
        "loginStatus",
        "Login succeeded but no session was created."
      );
      return;
    }

setAuthStatus(
  "loginStatus",
  "Login successful!"
);

await refreshAuthUI();

// IMPORTANT: refresh Community Chat
await updateChatLoginState();

console.log("Community Chat updated after login");

setTimeout(() => {
  closeAuthModal();
}, 500);

  } catch (error) {

    console.error("Login exception:", error);

    setAuthStatus(
      "loginStatus",
      error.message || "Login failed."
    );
  }
}async function logoutStudent() {
  if (!noteSphereSupabase) {
    console.error("Supabase is not configured.");
    return;
  }

  const { error } = await noteSphereSupabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error);
    alert("Logout failed: " + error.message);
    return;
  }

  // Immediately update the UI
  const loginBtn = document.getElementById("openAuthBtn");
  const userBtn = document.getElementById("userNavBtn");
  const userMenu = document.getElementById("userMenu");

  loginBtn?.classList.remove("hidden");
  userBtn?.classList.add("hidden");
  userMenu?.classList.add("hidden");

  console.log("Logged out successfully");
  await updateChatLoginState();
}


function toggleUserMenu() {
  document.getElementById("userMenu")?.classList.toggle("hidden");
}

async function refreshAuthUI() {
  if (!noteSphereSupabase) return;

  const { data } = await noteSphereSupabase.auth.getSession();
  const session = data?.session;

  const loginBtn = document.getElementById("openAuthBtn");
  const userBtn = document.getElementById("userNavBtn");
  const userMenu = document.getElementById("userMenu");
  const userLabel = document.getElementById("loggedInStudent");
  const adminBtn = document.getElementById("adminPanelBtn");

  if (!session) {
    loginBtn?.classList.remove("hidden");
    userBtn?.classList.add("hidden");
    userMenu?.classList.add("hidden");
    adminBtn?.classList.add("hidden");

    if (userLabel) {
      userLabel.textContent = "";
    }

    return;
  }

  loginBtn?.classList.add("hidden");
  userBtn?.classList.remove("hidden");

  const { data: profile, error } = await noteSphereSupabase
    .from("profiles")
    .select("student_id, full_name, role, status")
    .eq("id", session.user.id)
    .maybeSingle();

  if (error) {
    console.error("Profile error:", error);
    return;
  }

  if (profile?.status === "banned") {
    await noteSphereSupabase.auth.signOut();
    alert("This account has been banned from NoteSphere.");
    return;
  }

  if (profile && userLabel) {
    userLabel.textContent =
      `${profile.full_name} • ${profile.student_id}`;
  }

  // Show Admin Panel only to admins
  if (profile?.role === "admin") {
    adminBtn?.classList.remove("hidden");
  } else {
    adminBtn?.classList.add("hidden");
  }
}
function openAdminPanel() {
  if (!noteSphereSupabase) return;

  window.location.href = "admin.html";
}
/* ============================================================
   NOTESPHERE LOGIN MODAL
   ============================================================ */

function openAdminPanel() {
  const adminPanel = document.getElementById("adminPanel");

  if (!adminPanel) {
    console.error("Admin panel not found.");
    return;
  }

  adminPanel.classList.remove("hidden");

  adminPanel.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  loadAdminStudents();
}


function closeAdminPanel() {
  const adminPanel = document.getElementById("adminPanel");

  if (!adminPanel) return;

  adminPanel.classList.add("hidden");
}


async function loadAdminStudents() {

  const table = document.getElementById("adminStudentTable");

  if (!table) return;

  table.innerHTML = `
    <tr>
      <td colspan="7" class="admin-loading">
        Loading students...
      </td>
    </tr>
  `;

  if (!noteSphereSupabase) {
    table.innerHTML = `
      <tr>
        <td colspan="7" class="admin-loading">
          Supabase is not configured.
        </td>
      </tr>
    `;
    return;
  }

  const { data: students, error } = await noteSphereSupabase
    .from("profiles")
    .select("id, student_id, full_name, year, course, role, status")
    .order("full_name");

  if (error) {
    console.error("Admin student loading error:", error);

    table.innerHTML = `
      <tr>
        <td colspan="7" class="admin-loading">
          Unable to load students.
        </td>
      </tr>
    `;

    return;
  }

  const total = students?.length || 0;

  const banned = students
    ? students.filter(student => student.status === "banned").length
    : 0;

  const active = total - banned;

  document.getElementById("totalStudents").textContent = total;
  document.getElementById("activeStudents").textContent = active;
  document.getElementById("bannedStudents").textContent = banned;

  if (!students || students.length === 0) {

    table.innerHTML = `
      <tr>
        <td colspan="7" class="admin-loading">
          No students found.
        </td>
      </tr>
    `;

    return;
  }

  table.innerHTML = students.map(student => {

    const status = student.status || "active";

    return `
      <tr>

        <td>${student.student_id || "-"}</td>

        <td>${student.full_name || "-"}</td>

        <td>${student.year || "-"}</td>

        <td>${student.course || "-"}</td>

        <td>
          <span class="admin-role">
            ${student.role || "student"}
          </span>
        </td>

        <td>
          <span class="${
            status === "banned"
              ? "admin-status-banned"
              : "admin-status-active"
          }">
            ${status}
          </span>
        </td>

       <td>

  ${
    student.role === "admin"
      ? `<span class="admin-protected">
           🔒 Protected
         </span>`
      : `
        <button
          class="admin-action-btn"
          onclick="toggleStudentBan('${student.id}', '${status}')">

          ${
            status === "banned"
              ? "Unban"
              : "Ban"
          }

        </button>
      `
  }

</td>

      </tr>
    `;

  }).join("");
}
async function toggleStudentBan(studentId, currentStatus) {

  if (!noteSphereSupabase) {
    alert("Supabase is not configured.");
    return;
  }

  console.log("BAN BUTTON CLICKED");
  console.log("Student ID:", studentId);
  console.log("Current status:", currentStatus);

  const newStatus =
    currentStatus === "banned"
      ? "active"
      : "banned";

  console.log("New status:", newStatus);

  const { data, error } = await noteSphereSupabase
    .from("profiles")
    .update({ status: newStatus })
    .eq("id", studentId)
    .select("id, student_id, status");

  console.log("Ban update data:", data);
  console.log("Ban update error:", error);

  if (error) {
    console.error("Status update error:", error);
    alert("Ban failed: " + error.message);
    return;
  }

  if (!data || data.length === 0) {
    alert("No student was updated. Check your Supabase RLS policy.");
    return;
  }

  alert(
    newStatus === "banned"
      ? "Student banned successfully."
      : "Student unbanned successfully."
  );

  await loadAdminStudents();
}
/* ============================================================
   NOTESPHERE COMMUNITY CHAT
   ============================================================ */

function openCommunityChat() {

  const chat =
    document.getElementById("communityChat");

  if (!chat) {
    console.error("communityChat element not found");
    return;
  }

  chat.classList.remove("hidden");

  updateChatLoginState();
}


function closeCommunityChat() {

  const chat = document.getElementById("communityChat");

  if (!chat) return;

  chat.classList.add("hidden");
}


function handleChatKey(event) {

  if (event.key === "Enter") {
    event.preventDefault();
    sendChatMessage();
  }

}


async function updateChatLoginState() {

  const inputArea = document.querySelector(".community-chat-input");
  const messagesArea = document.getElementById("chatMessages");

  if (!inputArea || !messagesArea) {
    console.error("Community chat elements not found");
    return;
  }

  if (!noteSphereSupabase) {
    showLoggedOutChat();
    return;
  }

  const { data, error } =
    await noteSphereSupabase.auth.getSession();

  if (error) {
    console.error("Chat session error:", error);
    showLoggedOutChat();
    return;
  }

  const session = data?.session;

  console.log("COMMUNITY CHAT SESSION:", session);

  /* =========================
     LOGGED OUT
     ========================= */

  if (!session) {

    messagesArea.innerHTML = `
      <div class="chat-welcome">
        <i class="fas fa-lock"></i>
        <h4>Login Required</h4>
        <p>Please login to view the Community Chat.</p>

        <button onclick="openAuthModal()">
          Login
        </button>
      </div>
    `;

    inputArea.innerHTML = `
      <div class="chat-login-required">
        🔒 Please login to participate in Community Chat.
        <button onclick="openAuthModal()">
          Login
        </button>
      </div>
    `;

    return;
  }

  /* =========================
     LOGGED IN
     ========================= */

  inputArea.innerHTML = `
    <input
      type="text"
      id="chatMessageInput"
      placeholder="Write a message..."
      maxlength="500"
      onkeydown="handleChatKey(event)"
    >

    <button
      type="button"
      onclick="sendChatMessage()"
    >
      <i class="fas fa-paper-plane"></i>
    </button>
  `;

  console.log("Community Chat: USER LOGGED IN");

  // Load chat history
  await loadCommunityMessages();
}


/* ============================================================
   SEND MESSAGE
   ============================================================ */

async function sendChatMessage() {

  const input =
    document.getElementById("chatMessageInput");

  if (!input) {
    alert("Please login to use Community Chat.");
    return;
  }


  const message =
    input.value.trim();


  if (!message) return;


  if (!noteSphereSupabase) {

    alert("Please login to use Community Chat.");

    return;
  }


  /* =========================
     CHECK SESSION AGAIN
     ========================= */

  const {
    data,
    error
  } = await noteSphereSupabase.auth.getSession();


  if (error) {

    console.error(
      "Session check failed:",
      error
    );

    alert("Unable to verify login.");

    return;
  }


  const session =
    data?.session;


  /* =========================
     NOT LOGGED IN
     ========================= */

  if (!session) {

    alert(
      "Please login to participate in the Community Chat."
    );

    await updateChatLoginState();

    return;
  }


  console.log(
    "Sending message as:",
    session.user.id
  );


  /* =========================
     INSERT MESSAGE
     ========================= */

  const {
    error: insertError
  } = await noteSphereSupabase
    .from("community_messages")
    .insert({
      user_id: session.user.id,
      message: message
    });


  if (insertError) {

    console.error(
      "Community message error:",
      insertError
    );

    alert(
      "Unable to send message: " +
      insertError.message
    );

    return;
  }


  input.value = "";
  await loadCommunityMessages();

  console.log(
    "Message sent successfully"
  );
}
async function loadCommunityMessages() {

  const messagesArea = document.getElementById("chatMessages");

  if (!messagesArea || !noteSphereSupabase) return;

  // Check login
  const { data: sessionData } =
    await noteSphereSupabase.auth.getSession();

  const session = sessionData?.session;

  if (!session) {
    return;
  }

  messagesArea.innerHTML = `
    <div class="chat-loading">
      Loading messages...
    </div>
  `;

  // Get messages
  const { data: messages, error } =
    await noteSphereSupabase
      .from("community_messages")
      .select(`
        id,
        user_id,
        message,
        created_at
      `)
      .order("created_at", { ascending: true });

  if (error) {
    console.error("Unable to load community messages:", error);

    messagesArea.innerHTML = `
      <div class="chat-welcome">
        <i class="fas fa-exclamation-circle"></i>
        <h4>Unable to load messages</h4>
        <p>${error.message}</p>
      </div>
    `;

    return;
  }

  if (!messages || messages.length === 0) {

    messagesArea.innerHTML = `
      <div class="chat-welcome">
        <i class="fas fa-users"></i>
        <h4>Welcome to NoteSphere Community</h4>
        <p>No messages yet. Start the conversation!</p>
      </div>
    `;

    return;
  }

  // Get unique user IDs
  const userIds = [
    ...new Set(messages.map(msg => msg.user_id))
  ];

  // Get student profiles
  const { data: profiles, error: profileError } =
    await noteSphereSupabase
      .from("profiles")
      .select("id, full_name, student_id")
      .in("id", userIds);

  if (profileError) {
    console.error("Unable to load chat profiles:", profileError);
  }

  // Create profile lookup
  const profileMap = {};

  (profiles || []).forEach(profile => {
    profileMap[profile.id] = profile;
  });

  messagesArea.innerHTML = messages.map(msg => {

    const profile = profileMap[msg.user_id];

    const userName =
      profile?.full_name ||
      profile?.student_id ||
      "Student";

    const isOwnMessage =
      msg.user_id === session.user.id;
      console.log(
  "Message owner:",
  msg.user_id,
  "Logged in user:",
  session.user.id,
  "Own:",
  isOwnMessage
);

    return `
      <div class="chat-message ${
        isOwnMessage ? "own-message" : ""
      }">

        <div class="chat-message-user">
          ${escapeChatMessage(userName)}
        </div>

        <div class="chat-message-text">
          ${escapeChatMessage(msg.message)}
        </div>

       <div class="chat-message-time">
  ${formatChatTime(msg.created_at)}
</div>

${
  isOwnMessage
    ? `
      <button
        class="chat-delete-btn"
        onclick="deleteChatMessage('${msg.id}')">
        <i class="fas fa-trash"></i> Delete
      </button>
    `
    : ""
}

      </div>
    `;

  }).join("");

  messagesArea.scrollTop =
    messagesArea.scrollHeight;
}
function escapeChatMessage(message) {

  const div = document.createElement("div");

  div.textContent = message;

  return div.innerHTML;
}


function formatChatTime(timestamp) {

  if (!timestamp) return "";

  return new Date(timestamp).toLocaleString([], {
    dateStyle: "short",
    timeStyle: "short"
  });
}
document.addEventListener("DOMContentLoaded", async () => {
  await refreshAuthUI();
  await updateChatLoginState();
  startCommunityRealtime();
});
function startCommunityRealtime() {

  if (!noteSphereSupabase) return;

  noteSphereSupabase
    .channel("community-chat")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "community_messages"
      },
      async () => {

        console.log("New community message received");

        // Only reload if user is logged in
        const { data } =
          await noteSphereSupabase.auth.getSession();

        if (!data?.session) return;

        await loadCommunityMessages();
      }
    )
    .subscribe((status) => {

      console.log(
        "Community realtime status:",
        status
      );

    });
}
async function deleteChatMessage(messageId) {

  if (!noteSphereSupabase) return;

  const { data } = await noteSphereSupabase.auth.getSession();

  if (!data?.session) {
    alert("Please login first.");
    return;
  }

  const confirmDelete = confirm("Delete this message?");

  if (!confirmDelete) return;

  const { error } = await noteSphereSupabase
    .from("community_messages")
    .delete()
    .eq("id", messageId)
    .eq("user_id", data.session.user.id);

  if (error) {
    console.error("Delete message error:", error);
    alert("Unable to delete message: " + error.message);
    return;
  }

  await loadCommunityMessages();
}
function openQBank() {
  window.open(
    "https://placementqbank.netlify.app/",
    "_blank"
  );
}