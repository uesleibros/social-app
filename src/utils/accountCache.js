import getUserAccount from "@/utils/getUserAccount";

let cachedUser = null;

export default async function accountCache() {
  if (!cachedUser)
    cachedUser = await getUserAccount("@me");
  return cachedUser;
}