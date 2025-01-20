import { createClient } from '@supabase/supabase-js'
import type { Database } from './types/supabase'

const SUPABASE_URL = 'jxjejrktgvhurhnapfev'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4amVqcmt0Z3ZodXJobmFwZmV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxMDU0NjQsImV4cCI6MjA1MTY4MTQ2NH0.fRT7MN3jCUW5WyBpKoBLXZ7rzvop7s0-t1TOyIWJQHk'

export const fetchDataBase = createClient<Database>(`https://${SUPABASE_URL}.supabase.co`, SUPABASE_ANON_KEY)