import Profile from "./Profile"

export default function Gallery() {
    return (
        <section>
            <h1>Amazing Profiles</h1>
            <p>Those are the best profiles that we have</p>
            <div>
                <Profile />
                {/* <Profile />
                <Profile /> */}
            </div>
        </section>
    )
}
