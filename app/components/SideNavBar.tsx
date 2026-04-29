"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
    { name: 'Dashboard', icon: 'grid_view', path: '/dashboard' },
    { name: 'Analytics', icon: 'monitoring', path: '/analytics' },
    { name: 'Reports', icon: 'description', path: '/reports' },
]

export function SideNavBar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 h-screen bg-[#faf9f6] border-r border-[#4a7c59]/5 flex flex-col sticky top-0 left-0">
            {/* Logo Section */}
            <div className="p-8">
                <Link href="/dashboard" className="flex flex-col gap-1 group">
                    <h1 className="text-3xl font-black text-[#4a7c59] font-serif tracking-tighter group-hover:scale-[1.02] transition-transform">web Analytics</h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#aaa] ml-0.5">Rooted in growth</p>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 space-y-1">
                <p className="px-4 text-[10px] font-black uppercase tracking-widest text-[#aaa] mb-4">Main Menu</p>
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.path)
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${isActive
                                ? 'bg-[#e2ece6] text-[#4a7c59] shadow-sm'
                                : 'text-[#5c5c56] hover:bg-[#f4f4f2] hover:text-[#1c1c1a]'
                                }`}
                        >
                            <span className={`material-symbols-outlined text-xl ${isActive ? 'font-bold' : 'text-[#aaa] group-hover:text-[#5c5c56]'}`}>
                                {item.icon}
                            </span>
                            <span className={`text-sm font-bold ${isActive ? 'tracking-tight' : 'font-medium'}`}>
                                {item.name}
                            </span>
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 bg-[#4a7c59] rounded-full" />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* User Profile / Footer Section */}
            <div className="p-4 mt-auto">
                <div className="bg-white rounded-2xl p-4 border border-[#4a7c59]/5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#f4f4f2] flex items-center justify-center overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="User avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <p className="text-sm font-bold text-[#1c1c1a] truncate">X kişisi</p>
                            <p className="text-[10px] font-medium text-[#aaa] truncate">xkişisi@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
