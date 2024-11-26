export default async function fetchAllUserNames() {

  try {
    const res = await fetch(`/api/user-names`);
    if (!res.ok) {
      throw new Error("Failed to fetch user names");
    }
    const userNames = await res.json();
    return userNames;
  } catch (error) {
    throw new Error("Failed to fetch user names");
  }
}
