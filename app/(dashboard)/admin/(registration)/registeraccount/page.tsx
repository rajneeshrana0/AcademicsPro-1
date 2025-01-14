export default function Page() {

    return (
        <div>
            <h1>Account Registration</h1>
            <form>
                <label>
                    Account Name:
                    <input type="text" name="accountName" />
                </label>
                <label>
                    Address:
                    <input type="text" name="address" />
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
    )
}