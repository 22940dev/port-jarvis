export async function handler(event, context, callback) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "Hello from the other side...",
      lucky_num: `${Math.floor(Math.random() * 100)}`,
    }),
  };
}
