document.body.style.backgroundColor = 'red'
import $ from 'jquery'
import moment from 'moment'

// import './css/index.css'
// import './css/index.less'
import './css/index.scss'

$('body').append('<button>我是按钮</button>')
$('button').click(()=>{

    alert( moment().format('YYYY-MM-DD') )
})

$('body').append('<h1>新的h1</h1>')
$('body').append('<h3>这是h3</h3>');