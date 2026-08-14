// NoteSphere Supabase configuration - Phase 2
// Browser-safe publishable key only. Never use sb_secret_ or service_role here.

const NOTESPHERE_SUPABASE_URL = "https://cwkrlurwgvzrefraktqf.supabase.co";
const NOTESPHERE_SUPABASE_KEY = "sb_publishable_DU-L521ZLe9XsUFkJd6pJQ_mHDehUdn";

let noteSphereSupabase = null;

if (window.supabase) {
  noteSphereSupabase = window.supabase.createClient(
    NOTESPHERE_SUPABASE_URL,
    NOTESPHERE_SUPABASE_KEY
  );
  console.log("NoteSphere: Supabase client initialized.");
} else {
  console.error("NoteSphere: Supabase JS library did not load.");
}
