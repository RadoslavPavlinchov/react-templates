interface ReactElementProps {
    children: React.ReactElement
}

export default function Card({ children }: ReactElementProps) {
    return <div className="card">{children}</div>
}
