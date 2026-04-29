import { SideNavBar } from '@/app/components/SideNavBar'
import { TopAppBar } from '@/app/components/TopAppBar'
import WebsiteList from '@/app/components/WebsiteList'
import AddSiteButton from '../components/AddSiteButton'

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen bg-[#fdfcf8]">
            {/* Sidebar Bileşeni */}
            <SideNavBar />

            <div className="flex-1 flex flex-col">
                {/* Üst Bar Bileşeni */}
                <TopAppBar title="Dashboard" />

                <main className="p-10 max-w-7xl mx-auto w-full">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h1 className="text-4xl font-bold text-[#1c1c1a] tracking-tight mb-2 font-serif">Sitelerim</h1>
                            <p className="text-[#5c5c56] font-medium">Yönettiğiniz tüm web mülklerinin güncel durumu.</p>
                        </div>
                        <AddSiteButton />
                    </div>

                    {/* WebsiteList bileşeni */}
                    <WebsiteList />
                </main>
            </div>
        </div>
    )
}
