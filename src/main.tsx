import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { Toaster } from '@/components/ui/toaster.tsx'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'

const router = createRouter({ routeTree })

const Main = () => {
    useEffect(() => {
        utools.onPluginEnter(({ code, type, payload }) => {
            console.log('用户进入插件应用', code, type, payload)
        })
    }, [])

    return (
        <React.StrictMode>
            <Toaster />
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Main />
)


