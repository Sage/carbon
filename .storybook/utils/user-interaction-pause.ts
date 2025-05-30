// Function to mimic how a user would pause between interactions
function userInteractionPause(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default userInteractionPause;
