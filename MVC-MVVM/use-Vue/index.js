
fakeData();
//类
function Model(options){
  this.data = options.data
  this.resource = options.resource
}
Model.prototype.fetch = function(id){
    return axios.get(`/${this.resource}/${id}`).then((response)=>{
      this.data = response.data
      return response
    })
}
Model.prototype.update = function(data){
  let id = this.data.id
  return axios.put(`/${this.resource}/${id}`, data).then((response)=>{
        this.data = response.data
        return response
    })
}

let model = new Model({
  data: {
    name: '',
    number: 0,
    id: ''
  },
  resource: 'books'
})


let view = new Vue({
  el: '#app',
  data: {
    book: {
    name: '未命名',
    number: 0,
    id: ''
  },
    n: 1
    },
  template: `
<div>
  <div>
    书名：《{{book.name}}》
    数量：<span id="number">{{book.number}}</span>
  </div>
  <div>
    <input v-model="n">
  </div>
  <div>
    <button v-on:click="addOne">add</button>
    <button v-on:click="minusOne">minus</button>
    <button v-on:click="reset">reset</button>
  </div>
</div>
  `,
  methods: {
    addOne(){
      model.update({
        number: this.book.number + parseInt(this.n)
      }),then(()=>{
        this.book = model.data
      })
    },
    minusOne(){
      model.update({
        number: this.book.number - parseInt(this.n)
      }),then(()=>{
        this.book = model.data
      })
    },
    reset(){
      model.update({
        number: 0
      }),then(()=>{
        this.book = model.data
      })
    }
  },
  created(){
    model.fetch(1).then(()=>{
      this.book = model.data
    })
  }
})




function fakeData() {
let book = {
  name: 'JavaScript高级程序设计',
  number: 2,
  id: 1
}

axios.interceptors.response.use(function (response) {
  let {config: {method, url, data}} = response;
  if (url === '/books/1' && method === 'get') {
    response.statusCode = 200
    response.data = book;
  }else if (url === '/books/1' && method === 'put') {
    response.statusCode = 200
    data = JSON.parse(data)
    Object.assign(book, data)
    response.data = book
  }
  return response
})
}
