
export default function generateUniqueId() {
    const timestamp = new Date().getTime().toString(36);
    const randomString = Math.random().toString(36).substr(2, 5); // Generate a random string of length 5
    return `${timestamp}-${randomString}`;
}
