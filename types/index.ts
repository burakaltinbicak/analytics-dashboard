export interface Website {
    id: string
    name: string
    domain: string
    sessionCount: number
    avgDuration: number
}

export interface Session {
    id: string
    website_id: string
    referrer: string | null
    language: string
    screen: string
    country: string | null
    browser: string
    os: string
    device: string
    createdAt: string
}

export interface Event {
    id: string
    website_id: string
    session_id: string
    eventname: string
    url_path: string
    event_data: Record<string, any> | null
    createdAt: string
}

export interface Stats {
    sessions: Session[]
    events: Event[]
}