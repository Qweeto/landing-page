module.exports = ({ uid, details }) => {
  return `
        <ul>
          ${details.scopes.new.map((scope) => {
            return `<li>${scope}</li>`;
          })}
        </ul>
        <form autocomplete="off" action="/${process.env.SERVER_PREFIX}/interaction/${uid}/confirm" method="post">
          <button autofocus type="submit">Continue</button>
        </form>
        <div>
          <a href="/${process.env.SERVER_PREFIX}/interaction/${uid}/abort">[ Abort ]</a>
        </div>
  `;
};
