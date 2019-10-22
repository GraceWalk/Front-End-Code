fakeData();

let model = {
  data: {
    name: '',
    number: 0,
    id: ''
  },
  fetch(id){
    return axios.get(`/books/${id}`).then((response)=>{
      this.data = response.data
    })
  },
  update(id, data){
      return axios.put(`/books/${id}`, data).then((response)=>{
        this.data = response.data
    })
 }
}

let view = {
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
  `,
  render (data) {
    let newHtml = this.template.replace('__name__', data.name)
      .replace('__number__', data.number)
    $(this.el).html(newHtml)
  }
}


let controller = {
  init (options) {
  let {view, model} = options
  this.view = view
  this.model = model
  this.view.render(this.model.data)
  this.bindEvents()
  this.model.fetch(1)
    .then(()=>{
    this.view.render(this.model.data)
  })
  },
  addOne(){
    let oldNumber = $('#number').text();
    let newNumber = oldNumber - 0 + 1;
    axios.put('/books/1', {number: newNumber}).then( ()=> {
      view.render(model.data)
    })
  },
  minusOne(){
    let oldNumber = $('#number').text();
    let newNumber = oldNumber - 0 - 1;
    axios.put('/books/1', {number: newNumber}).then( ()=> {
      view.render(model.data)
    })
  },
  reset(){
    let newNumber = 0
    axios.put('/books/1', {number: newNumber}).then( ()=> {
      view.render(model.data)
    })
  },
  bindEvents(){
    $(this.view.el).on('click', '#addOne', this.addOne)
    $(this.view.el).on('click', '#minusOne', this.minusOne)
    $(this.view.el).on('click', '#reset', this.reset)
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
