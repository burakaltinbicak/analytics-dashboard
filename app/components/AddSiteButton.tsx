"use client"

import { useState } from 'react'
import AddSiteModal from './AddSiteModal'

export default function AddSiteButton() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-[#4a7c59] text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#3d664a] transition-all shadow-md shadow-[#4a7c59]/20 active:scale-[0.98]"
            >
                <span className="material-symbols-outlined">add</span>
                Yeni Site
            </button>
            <AddSiteModal open={open} onClose={() => setOpen(false)} />
        </>
    )
}