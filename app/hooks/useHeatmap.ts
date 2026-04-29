import { useEffect, useState } from 'react'

interface Click {
    x: number
    y: number
    screenWidth: number
    screenHeight: number
    text: string | null
    tag: string
}

interface HeatmapData {
    clicks: Click[]
    scrollDepths: number[]
    timeOnPage: number[]

}


export function useHeatmap(websiteId: string) {
    const [data, setData] = useState<HeatmapData>({ clicks: [], scrollDepths: [], timeOnPage: [] })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/websites/${websiteId}/heatmap`)
            .then(res => {
                if (!res.ok) throw new Error('Veri alınamadı')
                return res.json()
            })
            .then(setData)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [websiteId])

    return { ...data, loading, error }
}