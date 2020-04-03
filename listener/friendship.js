
const { Friendship} = require('wechaty');

exports = module.exports = async function (friendship) {
  try {
    console.log(`received friend event.`);
    const contact = friendship.contact();
    switch (friendship.type()) {
      case Friendship.Type.Receive:
        console.log(`received friend event from ${contact.name()}`);
        const helloList = ['ding'];
        if (helloList.includes(friendship.hello())) {
          await friendship.accept();
        }
        break;

      case Friendship.Type.Confirm:
        console.log(`${contact},friend ship confirmed`);
        break;
    }
  } catch (e) {
    console.error(e);
  }
};
