import { useEffect, useState } from 'react'
import { Website } from '@/types'

export function useWebsites() {
    const [websites, setWebsites] = useState<Website[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/websites`)
            .then(res => {
                if (!res.ok) throw new Error('Veri alınamadı')
                return res.json()
            })
            .then(setWebsites)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return { websites, loading, error }
}