module.exports.up = (queryInterface) => {

   return queryInterface.renameColumn('userSessions', 'expiredAt', 'expiresAt');
};
