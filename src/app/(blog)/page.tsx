import { fetchAllUsers } from "@/db/queries/test";

export default async function BlogHome() {
  const users = await fetchAllUsers();
  
  return (
    <div>
      {users.length ? users.map(u => <p key={u.id}>{u.name}</p>) : 'no users'}
    </div>
  );
}
