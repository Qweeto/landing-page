/**
 * @returns {string}
 */
module.exports = () => {
  return `
    <h1>Registration Step 2</h1>
    <h2>Select OAuth2 provider</h2>
    <ul>
        <li><a href="/${process.env.SERVER_PREFIX}/connect/yandex">Yandex</a></li>
        <li><a href="/${process.env.SERVER_PREFIX}/connect/facebook">Facebook</a></li>
    </ul>
`;
};
