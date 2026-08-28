const SUPABASE_URL = "https://cwkrlurwgvzrefraktqf.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_DU-L521ZLe9XsUFkJd6pJQ_mHDehUdn";

if (!window.supabase) {
    console.error("Supabase library did not load.");
} else {

    window.noteSphereSupabase = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );

    console.log("NoteSphere Supabase initialized successfully.");
}