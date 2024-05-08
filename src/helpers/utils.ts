export function getAvatarText(username: string) {
  const [firstName, lastName] = username.trim().split(" ");
  let result = firstName[0].toUpperCase();
  if (lastName) {
    result += lastName[0].toUpperCase();
  }
  return result;
}
