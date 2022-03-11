import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './utils/dayjs'
import 'amfe-flexible'
import { Button, ImagePreview, Search, Loading, Divider, Popup, PullRefresh, List, Tab, Tabs, Icon, Dialog, Image as VanImage, Col, Row, NavBar, Form, Field, Cell, CellGroup, Toast, CountDown, Tabbar, TabbarItem, Grid, GridItem } from 'vant'
import router from '@/router'
import './styles/index.less'
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)
Vue.use(CountDown)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Cell)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(CellGroup)
Vue.use(Col)
Vue.use(Row)
Vue.use(VanImage)
Vue.use(Icon)
Vue.use(Search)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Popup)
Vue.use(Divider)
Vue.use(Loading)
Vue.use(ImagePreview)
Vue.config.productionTip = false

new Vue({
  Dialog,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
