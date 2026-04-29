import { useEffect, useState } from 'react'
import { Stats } from '@/types'

export function useStats(websiteId: string) {
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!websiteId) return

        setLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/websites/${websiteId}/stats`)
            .then(res => {
                if (!res.ok) throw new Error('İstatistikler alınamadı')
                return res.json()
            })
            .then(setStats)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [websiteId])

    return { stats, loading, error }
}