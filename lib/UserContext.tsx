import React, { useEffect, useState, createContext, useContext } from 'react'

const UserContext = createContext({ user: null, session: null })

// FIXME
export const UserContextProvider = (props: any) => {
  const { supabaseClient } = props
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const session = supabaseClient.auth.session()
    setSession(session)
    setUser(session?.user ?? null)
    // @ts-ignore
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    session,
    user,
  }
  return <UserContext.Provider value={value} {...props} />
}

export const useUser = (): any => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}