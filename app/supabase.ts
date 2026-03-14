import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ovswuedcpvaobukcxhbk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92c3d1ZWRjcHZhb2J1a2N4aGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NDE1OTYsImV4cCI6MjA4OTAxNzU5Nn0.QSplGIUif4QnON0NPNiSt9j4yRlsjQ4guLhH9sjCXs0";

export const supabase = createClient(supabaseUrl, supabaseKey);