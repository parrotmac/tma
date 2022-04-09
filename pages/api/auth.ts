import { supabase } from '../../utils/initSupabase'

// @ts-ignore
export default function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res)
}
