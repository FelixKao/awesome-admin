const Koa = require('Koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken')
const secret = require('./jwt/secret.js')

const router = new Router()
router.post('/api/login', async (ctx, next) => {
  const userDataList = require('./login/user.js')
  const params = ctx.request.body
  const username = params.username || ''
  const password = params.password || ''
  const user = userDataList.filter(item =>
    item.username === username)

  let response = {
    result: '',
    message: '',
    token: ''
  }

  if (user[0] && user[0].password === password) {
    response.result = 'SUCCEED'
    response.message = '登录验证通过！'
    response.token = jsonwebtoken.sign({
      data: username,
      exp: Date.now() + 10 * 60 * 1000
    }, secret)
  } else {
    response.result = 'FAILED'
    response.message = '用户名或密码错误！'
    response.token = ''
  }

  console.log(`
    登录页面 - 验证用户名密码
    输入用户名：${username}
    输入密码：${password}
    验证结果如下：
    result: ${response.result}
    message: ${response.message}
   token: ${response.token}\n
  `)

  ctx.body = response
})
router.post('/api/logout', async (ctx, next) => {
  const auth = ctx.header.authorization
  if (auth) {
    const token = auth.split(' ')[1]
    try {
      const payload = jsonwebtoken.verify(token, secret)
      const username = payload.data
      console.log(`用户${username}退出登录\n`)
      ctx.body = username
    } catch (err) {
      console.log(err)
    }
  }
})
router.get('/api/menu', async (ctx, next) => {
  const menu = require('./menu/menu')
  console.log('获取菜单\n')
  ctx.body = menu
})

const app = new Koa()
app
  .use(cors())
  .use(bodyParser())
  .use(jwt({secret}).unless({ path: [/\/api\/login/] }))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)
console.log(`Your server is running at port 3000\n`)
