'use client'

import { Button, Card, Heading, Text, TextField } from '@radix-ui/themes'
import Image from 'next/image'
import React, { useState } from 'react'
import { Loginuser } from '@/lib/gql/queries'
import gqlclient from '@/lib/services/gql'

function Page() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<{ msg?: string }>({})

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError({})
    setLoading(true)

    try {
      const resp: { loginuser: boolean } = await gqlclient.request(Loginuser, {
        usercred: username,
        password
      })

      if (resp?.loginuser) {
        window.location.href = "/"
      } else {
        setError({ msg: "Invalid credentials!" })
      }
    } catch (err) {
      setError({ msg: "Something went wrong. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="h-screen flex justify-center items-center">
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          width: "28rem",
          boxShadow: "0 4px 14px rgba(0,0,0,0.1)"
        }}
      >
        <div className="relative h-16 w-16 rounded-full mb-4">
          <Image
            fill
            src="https://cdn-icons-png.freepik.com/512/9402/9402518.png"
            alt="logo"
          />
        </div>

        

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-3">
          <TextField.Root
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
            className="w-full"
          />
          <TextField.Root
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            className="w-full"
          />

          {error?.msg && (
            <Text style={{ color: "red", fontSize: "0.875rem" }}>
              {error.msg}
            </Text>
          )}

          <Button type="submit" disabled={loading} style={{ width: "100%" }}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    </main>
  )
}

export default Page
