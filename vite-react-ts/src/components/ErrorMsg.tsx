interface Error {
    errorMsg: string
}

export default function ErrorMsg({ errorMsg }: Error) {
    return (
        <div>
            <p>{errorMsg}</p>
        </div>
    )
}
