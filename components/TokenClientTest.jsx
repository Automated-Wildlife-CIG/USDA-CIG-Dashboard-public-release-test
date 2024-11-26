'use client'
import React from 'react'
import { useSession} from "next-auth/react"

export default function TokenClientTest (){
    const { data: session } = useSession()
    console.log('cat ', session)
    // const { name } = session.user

    return <div>Name: </div>
}

