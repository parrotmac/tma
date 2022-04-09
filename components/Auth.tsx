import { SupabaseClient } from '@supabase/supabase-js'
import React, { FormEvent, useEffect, useState } from 'react'

interface AuthProps {
    supabaseClient: SupabaseClient,
    authView: React.ReactNode,
    setAuthView: any,
}

function Auth(props: AuthProps) {
  const { supabaseClient, authView, setAuthView } = props

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: signInError } = await supabaseClient.auth.signIn({
      email,
      password,
    })
    if (signInError) setError(signInError.message)

    setLoading(false)
  }

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: signUpError } = await supabaseClient.auth.signUp({
      email,
      password,
    })
    if (signUpError) setError(signUpError.message)

    setLoading(false)
  }

  const handlePasswordReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    const { error } = await supabaseClient.auth.api.resetPasswordForEmail(email)
    if (error) setError(error.message)
    else setMessage('Check your email for the password reset link')
    setLoading(false)
  }

  const handleMagicLinkSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    const { error } = await supabaseClient.auth.signIn({ email })
    if (error) setError(error.message)
    else setMessage('Check your email for the magic link')
    setLoading(false)
  }

  return (
    <>
      {loading && <h3>Loading..</h3>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {authView === 'sign_in' ? (
        <>
          <h4>Sign in</h4>
          <form onSubmit={(e) => handleSignIn(e)}>
            <label htmlFor="sign-in__email">Email</label>
            <input
              id="sign-in__email"
              autoComplete="email"
              placeholder="Type in your email address"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="sign-in__password">Password</label>
            <input
              id="sign-in__password"
              type="password"
              defaultValue={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">SignIn</button>
          </form>
          <hr />
          <a onClick={() => setAuthView('sign_up')}>Don&apos;t have an account? Sign up</a>
          <a onClick={() => setAuthView('forgotten_password')}>Forgot my password</a>
          <hr />
          <a onClick={() => setAuthView('magic_link')}>Send magic link email</a>
        </>
      ) : authView === 'sign_up' ? (
        <>
          <h4>Sign up</h4>
          <form onSubmit={(e) => handleSignUp(e)}>
            <label htmlFor="sign-up__email">Email</label>
            <input
              id="sign-up__email"
              autoComplete="email"
              placeholder="Type in your email address"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="sign-up__password">Password</label>
            <input
              id="sign-up__password"
              type="password"
              defaultValue={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">SignUp</button>
          </form>
          <hr />
          <a onClick={() => setAuthView('sign_in')}>Already have an account, Sign in</a>
          <a onClick={() => setAuthView('forgotten_password')}>Forgot my password</a>
          <hr />
          <a onClick={() => setAuthView('magic_link')}>Send magic link email</a>
        </>
      ) : authView === 'forgotten_password' ? (
        <>
          <h4>Forgotten password</h4>
          <form onSubmit={handlePasswordReset}>
            <label htmlFor="forgotten_password__email">Email</label>
            <input
              id="forgotten_password__email"
              autoComplete="email"
              placeholder="Type in your email address"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Send reset password instructions</button>
          </form>
          <hr />
          <a onClick={() => setAuthView('sign_up')}>Don&apos;t have an account? Sign up</a>
          <a onClick={() => setAuthView('sign_in')}>Already have an account, Sign in</a>
          <hr />
          <a onClick={() => setAuthView('magic_link')}>Send magic link email</a>
        </>
      ) : authView === 'magic_link' ? (
        <>
          <h4>Magic link</h4>
          <form onSubmit={handleMagicLinkSignIn}>
            <input
              autoComplete="email"
              placeholder="Type in your email address"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Send magic link</button>
          </form>
          <hr />
          <a onClick={() => setAuthView('sign_up')}>Don&apos;t have an account? Sign up</a>
          <a onClick={() => setAuthView('sign_in')}>Already have an account, Sign in</a>
        </>
      ) : null}
    </>
  )
}

interface UpdatePasswordProps {
    supabaseClient: SupabaseClient
}

function UpdatePassword(v: UpdatePasswordProps) {
    const { supabaseClient } = v;
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    const { error } = await supabaseClient.auth.update({ password })
    if (error) setError(error.message)
    else setMessage('Your password has been updated')
    setLoading(false)
  }

  return (
    <>
      {loading && <h3>Loading..</h3>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {message && <div style={{ color: 'green' }}>{message}</div>}
      <h4>Set a new password</h4>
      <form onSubmit={handlePasswordReset}>
        <input
          placeholder="Enter your new password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          Update password
        </button>
      </form>
    </>
  )
}

Auth.UpdatePassword = UpdatePassword;
export default Auth;