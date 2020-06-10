import Vue from 'vue'
import {Button,Upload, Select,Option,Message,Container,Table,TableColumn, Header, Aside, Main, Menu,Submenu,MenuItemGroup, MenuItem,Form, FormItem,Input} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)



Vue.component(Message.name, Message);
Vue.prototype.$message = Message;





