// 必要なパッケージをインポートする
import { GatewayIntentBits, Client, Partials, type Message } from 'discord.js'
import dotenv from 'dotenv'

// .envファイルを読み込む
dotenv.config()

// Botで使うGatewayIntents、partials
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel]
})

// Botがきちんと起動したか確認
client.once('ready', () => {
  console.log('Ready!')
  if (client.user != null) {
    console.log(client.user.tag)
  }
})

// !timeと入力すると現在時刻を返信するように
client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return
  if (message.content === '!time') {
    const date1 = new Date()
    void message.channel.send(date1.toLocaleString())
  }
})

// ボット作成時のトークンでDiscordと接続
void client.login(process.env.TOKEN)
