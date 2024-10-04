import { useEffect, useState } from "react"
import Avatar from "./Avatar"
import Card from "./Card"
import Loading from "./Loading"
import ErrorMsg from "./ErrorMsg"

interface Character {
    name: string
    height: string
    gender: string
    films: string[]
}

export default function Profile() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [character, setCharacter] = useState<Character | null>(null)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function isCharacter(data: any): data is Character {
        return (
            data &&
            "name" in data &&
            "height" in data &&
            "gender" in data &&
            "films" in data
            // typeof data.name === "string"
        )
    }

    useEffect(() => {
        // fetch("https://swapi.dev/api/people/1")
        //     .then((response) => response.json())
        //     .then((data: unknown) => {
        //         // console.log("name", data.name)
        //         if (isCharacter(data)) {
        //             console.log("name", data)

        //             setCharacter(data.name)
        //         }
        //     })

        const fetchCharacter = async () => {
            try {
                setLoading(true)

                const response = await fetch("https://swapi.dev/api/people/1")

                if (!response.ok) {
                    throw new Error(`HTTP error, status ${response.status}`)
                }

                const data: unknown = await response.json()

                if (isCharacter(data)) {
                    setCharacter(data)
                } else {
                    setError("Data does not match the Character interface.")
                }
            } catch (error) {
                setError(`Fetch error: ${(error as Error).message}`)
            } finally {
                setLoading(false)
                setError(null)
            }
        }

        fetchCharacter()
    }, [])

    console.log("STATE", loading, error, character)

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <ErrorMsg errorMsg={error} />
    }

    if (character) {
        return (
            <Card>
                <div>
                    <Avatar />
                    <h1>{character.name}</h1>
                    <h1>{character.gender}</h1>
                    <h1>{character.height}</h1>

                    {character.films &&
                        character.films.map((film) => <p key={film}>{film}</p>)}
                </div>
            </Card>
        )
    }

    return null
}
