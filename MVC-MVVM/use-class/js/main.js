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
}ccc
//类
function View({el, template}){
  this.el = el
  this.template = template
}
View.prototype.render = function(data){
  let newHtml = this.template
  for(let key in data){
    newHtml = newHtml.replace(`__${key}__`, data[key])
  }
    $(this.el).html(newHtml)
}



let model = new Model({
  data: {
    name: '',
    number: 0,
    id: ''
  },
  resource: 'books'
})

let view = new View({
  el: '#app',
  template: `
    <div>
书名：《__name__》
数量：<span id="number">__number__</span>
    </div>
<div>
<button id="addOne">add</button>
<button id="minusOne">minus</button>
<button id="reset">reset</button>
</div>
`
})



let controller = {
  init (options) {
  let {view, model} = options
  this.view = view
  this.model = model
  
  this.view.render(this.model.data)
  
  this.bindEvents()
  this.model.fetch(1).then(()=>{
    this.view.render(this.model.data)
  })
  },
  addOne(){
    let oldNumber = $('#number').text();
    let newNumber = oldNumber - 0 + 1;
    axios.put('/books/1', {number: newNumber}).then(()=>{
      this.view.render(this.model.data)
    })
  },
  minusOne(){
    let oldNumber = $('#number').text();
    let newNumber = oldNumber - 0 - 1;
    axios.put('/books/1', {number: newNumber}).then(()=>{
      this.view.render(this.model.data)
    })
  },
  reset(){
    let newNumber = 0
    axios.put('/books/1', {number: newNumber}).then(()=>{
      this.view.render(this.model.data)
    })
  },
  bindEvents(){
    $(this.view.el).on('click', '#addOne', this.addOne.bind(this))
    $(this.view.el).on('click', '#minusOne', this.minusOne.bind(this))
    $(this.view.el).on('click', '#reset', this.reset.bind(this))
  }
}


controller.init({view: view, model: model})



function fakeData() {
let book = {
  name: 'JavaScript高级程序设计',
  number: 2,
  id: 1
}

axios.interceptors.response.use(function (response) {
  let {config: {method, url, data}} = response;
  if (url === '/books/1' && method === 'get') {
    response.data = book;
  }else if (url === '/books/1' && method === 'put') {
    data = JSON.parse(data)
    Object.assign(book, data)
    response.data = book
  }
  return response
})  
}