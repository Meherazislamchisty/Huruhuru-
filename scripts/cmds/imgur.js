const axios = require('axios');
const a = 'xyz';

module.exports = {
  config: {
    name: 'imgur',
    aliases: ['imgur'],
    role: 0,
    author: 'Ullash ッ ☆𝐀𝐁𝐇𝐑𝐀𝐍𝐈𝐋☆',
    countDown: 5,
    longDescription: 'Upload images to Imgur.',
    category: 'image',
    guide: {
      en: '${pn} reply to an image to upload it to Imgur.'
    }
  },
  onStart: async function ({ message, api, event }) {
    if (this.config.author !== 'Ullash ッ ☆𝐀𝐁𝐇𝐑𝐀𝐍𝐈𝐋☆') {
      return message.reply('❌| Configuration error: "author" has been modified.');
    }

    if (!event.messageReply || !event.messageReply.attachments || !event.messageReply.attachments[0]) {
      return message.reply('Please reply to an image to upload it to Imgur.');
    }

    const imgUrl = event.messageReply.attachments[0].url;
    const imgurUrl = `https://smfahim.${a}/imgur?url=${encodeURIComponent(imgUrl)}`;

    try {
      const response = await axios.get(imgurUrl);
      const data = response.data;

      if (data.uploaded && data.uploaded.status === 'success') {
        message.reply(`${data.uploaded.image}`);
      } else {
        message.reply('❌| Image upload failed.');
      }

    } catch (error) {
      message.reply('❌| There was an error uploading your image.');
      console.error(error);
    }
  }
};
