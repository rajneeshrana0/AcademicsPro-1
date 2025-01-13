export default function Page() {
    return (
        <div>
            <h1>Teacher Registration</h1>
            <form>
                <label>
                    First Name:
                    <input type="text" name="firstName" />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastName" />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <label>
                    Confirm Password:
                    <input type="password" name="confirmPassword" />
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}