module.exports = ({ uid, clientId }) => {
  return `
      <h1>${clientId}</h1>
      <form autocomplete="off" action="/${process.env.SERVER_PREFIX}/interaction/${uid}/login" method="post">
        <input required type="email" name="email" placeholder="Enter bot email" autofocus="on">
        <input required type="password" name="password" placeholder="and password">
        <button type="submit">Sign-in</button>
      </form>
      <div>
        <a href="/${process.env.SERVER_PREFIX}/interaction/${uid}/abort">[ Abort ]</a>
      </div>
        `
}
