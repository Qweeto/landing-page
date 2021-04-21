const store = new Map();

class Account {
  constructor(id) {
    this.accountId = id;
    store.set(this.accountId, this);
  }
  // todo использовать scope и use для выборки
  // todo переделать под private API
  async claims(/* use, scope */) {
    console.log('claims');
    // const botInfo = await pool.connect(async (connection) => {
    //   const botTable = await connection.one(
    //     passportQueries.selectBotById(this.accountId),
    //   );
    //   return botTable;
    // });
    return {
      sub: this.accountId, // it is essential to always return a sub claim
      email: 'xxx@xxx.xxx', // почта бота
      // email: botInfo.email, // почта бота
      // email_verified: botInfo.activated, // fixme это неправильно считать так
      email_verified: true, // fixme это неправильно считать так
      client_id: '3555d074-b52b-4703-a8c4-96ad9edf43e9',
      // client_id: botInfo.passport_id,
      updated_at: '2020-04-16 11:46:25.689329',
      // updated_at: botInfo.updated_at,
    };
  }
  /**
   * Получение аккаунта и запись в стор
   *
   * @param {*} context - context
   * @param {*} id - id
   * @returns {Promise<any>}
   */
  static findAccount(context, id) {
    return new Promise((resolve) => {
      console.log('find account')
      // token is a reference to the token used for which a given account is being loaded,
      //  it is undefined in scenarios where account claims are returned from authorization endpoint
      if (!store.get(id)) {
        new Account(id);
      }
      const out = store.get(id);
      resolve(out);
    });
  }
}

module.exports = Account;
