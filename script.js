/* ============================================================
   NOTESPHERE
   MAIN JAVASCRIPT
   ============================================================ */


/* ============================================================
   NOTES DOWNLOADS
   ============================================================ */

async function downloadNote(subject) {

    const unit = prompt("Enter Unit Number (1-4)");

    if (unit === null) {
        return;
    }

    const selectedUnit = unit.trim();

    if (!["1", "2", "3", "4"].includes(selectedUnit)) {
        alert("Please enter a valid unit number: 1, 2, 3, or 4.");
        return;
    }

    if (!window.noteSphereSupabase) {
        alert("Supabase is not configured.");
        return;
    }

    try {

        const { data, error } =
            await noteSphereSupabase
                .from("notes")
                .select("title, file_url")
                .eq("subject", subject)
                .eq("unit", Number(selectedUnit))
                .maybeSingle();

        if (error) {

            console.error("Notes error:", error);

            alert(
                "Unable to load note: " +
                error.message
            );

            return;
        }

        if (!data) {

            alert(
                `Notes not available for ${subject} - Unit ${selectedUnit}.`
            );

            return;
        }

        if (!data.file_url) {

            alert(
                "The note exists, but its PDF URL is missing."
            );

            return;
        }

        window.open(
            data.file_url,
            "_blank"
        );

    } catch (error) {

        console.error(
            "Download note error:",
            error
        );

        alert(
            "Unable to open note."
        );
    }
}


/* ============================================================
   SCROLL
   ============================================================ */

function scrollToSemester() {

    document
        .getElementById("semester")
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


/* ============================================================
   QUESTION PAPERS
   ============================================================ */

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

        window.open(
            papers[subject],
            "_blank"
        );

    } else {

        alert("Question paper not available.");

    }
}


/* ============================================================
   SYLLABUS
   ============================================================ */

function openSyllabus(year) {

    const syllabusFiles = {

        "1st-year":
            "pdfs/syllabus/1st-year-syllabus.pdf",

        "2nd-year":
            "pdfs/syllabus/2nd-year-syllabus.pdf",

        "3rd-year":
            "pdfs/syllabus/3rd-year-syllabus.pdf"

    };

    if (syllabusFiles[year]) {

        window.open(
            syllabusFiles[year],
            "_blank"
        );

    } else {

        alert("Syllabus PDF not found.");

    }
}


/* ============================================================
   AUTHENTICATION
   ============================================================ */

const NOTESPHERE_AUTH_DOMAIN = "@notesphere.local";


function authEmailFromStudentId(studentId) {

    return (
        studentId
            .trim()
            .toLowerCase()
        + NOTESPHERE_AUTH_DOMAIN
    );

}


/* ============================================================
   OPEN LOGIN MODAL
   ============================================================ */

function openAuthModal() {

    const modal = document.getElementById("authModal");

    if (!modal) {
        console.error("authModal not found");
        return;
    }

    modal.hidden = false;
    modal.classList.remove("hidden");

    document.getElementById("loginPanel")?.classList.remove("hidden");
    document.getElementById("registerPanel")?.classList.add("hidden");

    const status = document.getElementById("loginStatus");

    if (status) {
        status.textContent = "";
    }

    setTimeout(() => {
        document.getElementById("loginStudentId")?.focus();
    }, 100);
}

/* ============================================================
   CLOSE LOGIN MODAL
   ============================================================ */

function closeAuthModal() {

    const modal = document.getElementById("authModal");

    if (!modal) return;

    modal.hidden = true;
    modal.classList.add("hidden");
}


/* ============================================================
   LOGIN / REGISTER PANELS
   ============================================================ */

function showRegisterPanel() {

    document
        .getElementById("loginPanel")
        ?.classList.add("hidden");

    document
        .getElementById("registerPanel")
        ?.classList.remove("hidden");

}


function showLoginPanel() {

    document
        .getElementById("registerPanel")
        ?.classList.add("hidden");

    document
        .getElementById("loginPanel")
        ?.classList.remove("hidden");

}


/* ============================================================
   AUTH STATUS
   ============================================================ */

function setAuthStatus(id, message) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            message;

    }

}


/* ============================================================
   REGISTER STUDENT
   ============================================================ */

async function registerStudent(event) {

    event.preventDefault();

    if (!window.noteSphereSupabase) {

        setAuthStatus(
            "registerStatus",
            "Supabase is not configured."
        );

        return;
    }


    const studentId =
        document
            .getElementById("registerStudentId")
            .value
            .trim();

    const fullName =
        document
            .getElementById("registerName")
            .value
            .trim();

    const year =
        document
            .getElementById("registerYear")
            .value;

    const course =
        document
            .getElementById("registerCourse")
            .value
            .trim();

    const password =
        document
            .getElementById("registerPassword")
            .value;


    if (
        !studentId ||
        !fullName ||
        !year ||
        !course ||
        password.length < 6
    ) {

        setAuthStatus(
            "registerStatus",
            "Please fill all fields correctly."
        );

        return;
    }


    setAuthStatus(
        "registerStatus",
        "Creating account..."
    );


    try {

        const {
            data,
            error
        } =
            await noteSphereSupabase.auth.signUp({

                email:
                    authEmailFromStudentId(
                        studentId
                    ),

                password,

                options: {

                    data: {

                        student_id:
                            studentId,

                        full_name:
                            fullName,

                        year:
                            year,

                        course:
                            course

                    }

                }

            });


        if (error) {

            console.error(
                "Registration error:",
                error
            );

            setAuthStatus(
                "registerStatus",
                error.message
            );

            return;
        }


        if (data?.session) {

            setAuthStatus(
                "registerStatus",
                "Account created successfully!"
            );

            await refreshAuthUI();
            await updateChatLoginState();

            setTimeout(() => {

                closeAuthModal();

            }, 700);

        } else {

            setAuthStatus(
                "registerStatus",
                "Account created. If email confirmation is enabled in Supabase, confirm the account first."
            );

        }

    } catch (error) {

        console.error(
            "Registration exception:",
            error
        );

        setAuthStatus(
            "registerStatus",
            error.message ||
            "Registration failed."
        );

    }

}


/* ============================================================
   LOGIN STUDENT / ADMIN
   ============================================================ */

async function loginStudent(event) {

    event.preventDefault();


    if (!window.noteSphereSupabase) {

        setAuthStatus(
            "loginStatus",
            "Supabase is not configured."
        );

        return;
    }


    const studentId =
        document
            .getElementById("loginStudentId")
            .value
            .trim();

    const password =
        document
            .getElementById("loginPassword")
            .value;


    if (!studentId || !password) {

        setAuthStatus(
            "loginStatus",
            "Enter Student ID and password."
        );

        return;
    }


    setAuthStatus(
        "loginStatus",
        "Signing in..."
    );


    try {

        const {
            data,
            error
        } =
            await noteSphereSupabase.auth
                .signInWithPassword({

                    email:
                        authEmailFromStudentId(
                            studentId
                        ),

                    password:
                        password

                });


        if (error) {

            console.error(
                "Login error:",
                error
            );

            setAuthStatus(
                "loginStatus",
                error.message
            );

            return;
        }


        if (!data?.session) {

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


        /*
         * IMPORTANT:
         * Update account UI
         * AND chat immediately.
         */

        await refreshAuthUI();

        await updateChatLoginState();


        setTimeout(() => {

            closeAuthModal();

        }, 500);


    } catch (error) {

        console.error(
            "Login exception:",
            error
        );

        setAuthStatus(
            "loginStatus",
            error.message ||
            "Login failed."
        );

    }

}


/* ============================================================
   LOGOUT
   ============================================================ */

async function logoutStudent() {

    if (!window.noteSphereSupabase) {

        alert(
            "Supabase is not configured."
        );

        return;
    }


    const {
        error
    } =
        await noteSphereSupabase.auth.signOut();


    if (error) {

        console.error(
            "Logout error:",
            error
        );

        alert(
            "Logout failed: " +
            error.message
        );

        return;
    }


    document
        .getElementById("openAuthBtn")
        ?.classList.remove("hidden");

    document
        .getElementById("userNavBtn")
        ?.classList.add("hidden");

    document
        .getElementById("userMenu")
        ?.classList.add("hidden");


    await updateChatLoginState();

}


/* ============================================================
   USER MENU
   ============================================================ */

function toggleUserMenu() {

    document
        .getElementById("userMenu")
        ?.classList.toggle("hidden");

}


/* ============================================================
   REFRESH AUTH UI
   ============================================================ */

async function refreshAuthUI() {

    if (!window.noteSphereSupabase) {
        return;
    }


    const {
        data
    } =
        await noteSphereSupabase.auth
            .getSession();


    const session =
        data?.session;


    const loginBtn =
        document.getElementById("openAuthBtn");

    const userBtn =
        document.getElementById("userNavBtn");

    const userMenu =
        document.getElementById("userMenu");

    const userLabel =
        document.getElementById("loggedInStudent");

    const adminBtn =
        document.getElementById("adminPanelBtn");


    /* LOGGED OUT */

    if (!session) {

        loginBtn
            ?.classList.remove("hidden");

        userBtn
            ?.classList.add("hidden");

        userMenu
            ?.classList.add("hidden");

        adminBtn
            ?.classList.add("hidden");

        if (userLabel) {

            userLabel.textContent = "";

        }

        return;
    }


    /* LOGGED IN */

    loginBtn
        ?.classList.add("hidden");

    userBtn
        ?.classList.remove("hidden");


    /* GET PROFILE */

    const {
        data: profile,
        error
    } =
        await noteSphereSupabase
            .from("profiles")
            .select(
                "student_id, full_name, role, status"
            )
            .eq(
                "id",
                session.user.id
            )
            .maybeSingle();


    if (error) {

        console.error(
            "Profile error:",
            error
        );

        return;
    }


    /* BANNED USER */

    if (
        profile?.status === "banned"
    ) {

        await noteSphereSupabase
            .auth
            .signOut();

        alert(
            "This account has been banned from NoteSphere."
        );

        return;
    }


    /* USER NAME */

    if (
        profile &&
        userLabel
    ) {

        userLabel.textContent =
            `${profile.full_name || "Student"} • ${profile.student_id || ""}`;

    }


    /* ADMIN */

    if (
        profile?.role === "admin"
    ) {

        adminBtn
            ?.classList.remove("hidden");

    } else {

        adminBtn
            ?.classList.add("hidden");

    }

}


/* ============================================================
   ADMIN PANEL
   ============================================================ */

function openAdminPanel() {

    window.location.href =
        "admin.html";

}


/* ============================================================
   COMMUNITY CHAT
   ============================================================ */


/*
 * OPEN / CLOSE CHAT
 */

function toggleCommunityChat() {

    const chat = document.getElementById("communityChatBox");

    if (!chat) {
        console.error("communityChatBox not found");
        return;
    }

    const isOpening = chat.classList.contains("hidden");

    if (isOpening) {

        // Open chat
        chat.classList.remove("hidden");
        chat.classList.add("chat-open");

        updateChatLoginState();

    } else {

        // Close chat
        chat.classList.remove("chat-open");
        chat.classList.add("hidden");

    }
}


/* ============================================================
   CHAT ENTER KEY
   ============================================================ */

function handleChatKey(event) {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        sendChatMessage();

    }

}


/* ============================================================
   UPDATE CHAT LOGIN STATE
   ============================================================ */

async function updateChatLoginState() {

    const messagesArea =
        document.getElementById("chatMessages");

    const inputArea =
        document.getElementById("chatInputArea");

    if (!messagesArea || !inputArea) {
        console.error("Chat elements not found.");
        return;
    }

    // Supabase unavailable
    if (!window.noteSphereSupabase) {

        messagesArea.innerHTML = `
            <div class="chat-welcome">

                <div class="chat-welcome-icon">
                    <i class="fas fa-exclamation-circle"></i>
                </div>

                <h4>Chat Unavailable</h4>

                <p>
                    Community Chat could not connect.
                </p>

            </div>
        `;

        return;
    }


    // Get current session
    const {
        data,
        error
    } =
        await noteSphereSupabase.auth.getSession();


    if (error) {

        console.error("Chat session error:", error);

        return;
    }


    const session = data?.session;


    // ==========================================
    // NOT LOGGED IN
    // ==========================================

    if (!session) {

        messagesArea.innerHTML = `

            <div class="chat-welcome">

                <div class="chat-welcome-icon">
                    <i class="fas fa-lock"></i>
                </div>

                <h4>
                    Login Required
                </h4>

                <p>
                    Please login to view and participate
                    in the NoteSphere Community Chat.
                </p>

                <button
                    type="button"
                    class="chat-login-btn"
                    onclick="openAuthModal()"
                >
                    <i class="fas fa-right-to-bracket"></i>
                    Login
                </button>

            </div>

        `;


        inputArea.innerHTML = `

            <div class="chat-login-required">

                <i class="fas fa-lock"></i>

                <span>
                    Login required to participate
                    in Community Chat.
                </span>

                <button
                    type="button"
                    onclick="openAuthModal()"
                >
                    Login
                </button>

            </div>

        `;

        return;
    }


    // ==========================================
    // LOGGED IN
    // ==========================================

    inputArea.innerHTML = `

        <input
            type="text"
            id="chatMessageInput"
            placeholder="Write a message..."
            maxlength="500"
            autocomplete="off"
            onkeydown="handleChatKey(event)"
        >

        <button
            type="button"
            onclick="sendChatMessage()"
            aria-label="Send message"
        >
            <i class="fas fa-paper-plane"></i>
        </button>

    `;


    // Load previous messages
    await loadCommunityMessages();


    setTimeout(() => {

        document
            .getElementById("chatMessageInput")
            ?.focus();

    }, 100);
}

/* ============================================================
   LOGGED OUT CHAT
   ============================================================ */

function showLoggedOutChat() {

    const messagesArea =
        document.getElementById(
            "chatMessages"
        );

    const inputArea =
        document.getElementById(
            "chatInputArea"
        );


    if (messagesArea) {

        messagesArea.innerHTML = `

            <div class="chat-welcome">

                <div class="chat-welcome-icon">
                    <i class="fas fa-lock"></i>
                </div>

                <h4>
                    Login Required
                </h4>

                <p>
                    Please login to use Community Chat.
                </p>

                <button
                    type="button"
                    onclick="openAuthModal()"
                >
                    Login
                </button>

            </div>

        `;

    }


    if (inputArea) {

        inputArea.innerHTML = `

            <div class="chat-login-required">

                🔒 Please login to participate in Community Chat.

                <button
                    type="button"
                    onclick="openAuthModal()"
                >
                    Login
                </button>

            </div>

        `;

    }

}


/* ============================================================
   SEND CHAT MESSAGE
   ============================================================ */

async function sendChatMessage() {

    const input =
        document.getElementById(
            "chatMessageInput"
        );


    if (!input) {

        await updateChatLoginState();

        openAuthModal();

        return;
    }


    const message =
        input.value.trim();


    if (!message) {
        return;
    }


    if (!window.noteSphereSupabase) {

        alert(
            "Supabase is not configured."
        );

        return;
    }


    const {
        data,
        error
    } =
        await noteSphereSupabase.auth
            .getSession();


    if (error) {

        console.error(
            "Session error:",
            error
        );

        alert(
            "Unable to verify login."
        );

        return;
    }


    const session =
        data?.session;


    if (!session) {

        alert(
            "Please login to participate in Community Chat."
        );

        openAuthModal();

        await updateChatLoginState();

        return;
    }


    /* INSERT */

    const {
        error: insertError
    } =
        await noteSphereSupabase
            .from("community_messages")
            .insert({

                user_id:
                    session.user.id,

                message:
                    message

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

}


/* ============================================================
   LOAD COMMUNITY MESSAGES
   ============================================================ */

async function loadCommunityMessages() {

    const messagesArea =
        document.getElementById(
            "chatMessages"
        );


    if (
        !messagesArea ||
        !window.noteSphereSupabase
    ) {

        return;
    }


    const {
        data: sessionData
    } =
        await noteSphereSupabase.auth
            .getSession();


    const session =
        sessionData?.session;


    if (!session) {

        showLoggedOutChat();

        return;
    }


    messagesArea.innerHTML = `

        <div class="chat-loading">
            Loading messages...
        </div>

    `;


    /* GET MESSAGES */

    const {
        data: messages,
        error
    } =
        await noteSphereSupabase
            .from("community_messages")
            .select(`
                id,
                user_id,
                message,
                created_at
            `)
            .order(
                "created_at",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "Unable to load messages:",
            error
        );

        messagesArea.innerHTML = `

            <div class="chat-welcome">

                <i class="fas fa-exclamation-circle"></i>

                <h4>
                    Unable to load messages
                </h4>

                <p>
                    ${escapeChatMessage(error.message)}
                </p>

            </div>

        `;

        return;
    }


    if (
        !messages ||
        messages.length === 0
    ) {

        messagesArea.innerHTML = `

            <div class="chat-welcome">

                <div class="chat-welcome-icon">
                    <i class="fas fa-users"></i>
                </div>

                <h4>
                    Welcome to NoteSphere Community
                </h4>

                <p>
                    No messages yet. Start the conversation!
                </p>

            </div>

        `;

        return;
    }


    /* GET USER IDs */

    const userIds =
        [
            ...new Set(
                messages.map(
                    msg => msg.user_id
                )
            )
        ];


    /* GET PROFILES */

    const {
        data: profiles,
        error: profileError
    } =
        await noteSphereSupabase
            .from("profiles")
            .select(
                "id, full_name, student_id"
            )
            .in(
                "id",
                userIds
            );


    if (profileError) {

        console.error(
            "Profile loading error:",
            profileError
        );

    }


    /* PROFILE MAP */

    const profileMap = {};


    (profiles || []).forEach(
        profile => {

            profileMap[
                profile.id
            ] = profile;

        }
    );


    /* DISPLAY */

    messagesArea.innerHTML =
        messages
            .map(message => {

                const profile =
                    profileMap[
                        message.user_id
                    ];


                const userName =
                    profile?.full_name ||
                    profile?.student_id ||
                    "Student";


                const isOwnMessage =
                    message.user_id ===
                    session.user.id;


                return `

                    <div
                        class="chat-message ${
                            isOwnMessage
                                ? "own-message"
                                : ""
                        }"
                    >

                        <div class="chat-message-user">

                            ${escapeChatMessage(userName)}

                        </div>


                        <div class="chat-message-text">

                            ${escapeChatMessage(message.message)}

                        </div>


                        <div class="chat-message-time">

                            ${formatChatTime(
                                message.created_at
                            )}

                        </div>


                        ${
                            isOwnMessage
                                ? `

                                    <button
                                        type="button"
                                        class="chat-delete-btn"
                                        onclick="deleteChatMessage('${message.id}')"
                                    >

                                        <i class="fas fa-trash"></i>
                                        Delete

                                    </button>

                                  `
                                : ""
                        }

                    </div>

                `;

            })
            .join("");


    messagesArea.scrollTop =
        messagesArea.scrollHeight;

}


/* ============================================================
   ESCAPE CHAT MESSAGE
   ============================================================ */

function escapeChatMessage(message) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        message ?? "";

    return div.innerHTML;

}


/* ============================================================
   CHAT TIME
   ============================================================ */

function formatChatTime(timestamp) {

    if (!timestamp) {
        return "";
    }


    return new Date(timestamp)
        .toLocaleString(
            [],
            {
                dateStyle: "short",
                timeStyle: "short"
            }
        );

}


/* ============================================================
   DELETE MESSAGE
   ============================================================ */

async function deleteChatMessage(messageId) {

    if (!window.noteSphereSupabase) {
        return;
    }


    const {
        data
    } =
        await noteSphereSupabase.auth
            .getSession();


    if (!data?.session) {

        alert(
            "Please login first."
        );

        return;
    }


    if (
        !confirm(
            "Delete this message?"
        )
    ) {

        return;
    }


    const {
        error
    } =
        await noteSphereSupabase
            .from("community_messages")
            .delete()
            .eq(
                "id",
                messageId
            )
            .eq(
                "user_id",
                data.session.user.id
            );


    if (error) {

        console.error(
            "Delete message error:",
            error
        );

        alert(
            "Unable to delete message: " +
            error.message
        );

        return;
    }


    await loadCommunityMessages();

}


/* ============================================================
   REALTIME CHAT
   ============================================================ */

function startCommunityRealtime() {

    if (!window.noteSphereSupabase) {

        console.error(
            "Supabase unavailable for realtime."
        );

        return;
    }


    noteSphereSupabase
        .channel(
            "notesphere-community-chat"
        )
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "community_messages"
            },
            async () => {

                const {
                    data
                } =
                    await noteSphereSupabase
                        .auth
                        .getSession();


                if (!data?.session) {
                    return;
                }


                const chat =
                    document.getElementById(
                        "communityChatBox"
                    );


                if (
                    chat &&
                    !chat.classList.contains(
                        "hidden"
                    )
                ) {

                    await loadCommunityMessages();

                }

            }
        )
        .subscribe(
            status => {

                console.log(
                    "Community realtime:",
                    status
                );

            }
        );

}


/* ============================================================
   INITIALIZATION
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        console.log(
            "NoteSphere initialized."
        );


        if (!window.noteSphereSupabase) {

            console.error(
                "Supabase configuration not found."
            );

            return;
        }


        await refreshAuthUI();

        await updateChatLoginState();

        startCommunityRealtime();

    }
);


/* ============================================================
   QBANK
   ============================================================ */

function openQBank() {

    window.open(
        "https://placementqbank.netlify.app/",
        "_blank"
    );

}