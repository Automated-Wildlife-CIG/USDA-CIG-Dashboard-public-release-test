

export default async function fetchUsersAutocomplete(query) {

    console.log('fetchUsersAutocomplete query', query)
    try {
        const res = await fetch(`/api/user-names-autocomplete/${query}`);

        if (!res.ok) {
            console.log("No match for user");
        }

        const userNames = await res.json();
        console.log('userNames', userNames.rows)
        return userNames;
    } catch (error) {
        throw new Error("Server error. Failed to fetch user names");
    }
}
  