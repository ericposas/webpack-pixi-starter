import './scss/style.scss';
import $ from 'jquery';
import * as PIXI from 'pixi.js';
// json
import './option-b.json';
//images
// import..


let app = new PIXI.Application(innerWidth, (innerWidth/16)*9, {antialias:true,transparent:false});
document.body.appendChild(app.view);
app.stage.interactive = true;
app.renderer.backgroundColor = '0x000000';
app.renderer.autoResize = true;
app.renderer.view.style.margin = 'auto';
app.renderer.view.style.display = 'block';
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.top = app.renderer.view.style.bottom = 0;
$('html').css('margin', 0);
$('body').css({
  'margin':'auto',
  'overflow':'hidden',
  'display':'block',
  'position':'absolute',
  'top':0,
  'bottom':0,
  'right':0,
  'left':0
});

let loader = PIXI.loader;

// global vars
let text = new PIXI.Text('', {});
let json_text = '';
let big_num_text = new PIXI.Text('11,908', getBigNumTextStyle());

loader
  .add('./json/option-b.json')
  .on('progress', load_progress)
  .load(start);

function load_progress(loader, resource){
  console.log(
    `loading: ${resource.url},`,
    `overall progress: ${loader.progress}`,
  );
}

function getBigNumTextStyle(){
  return {
    fontSize:app.renderer.width/4,
    fontFamily:'Arial',
    fill:0xffffff
  };
}

function getTextStyle(){
  return {
    fontSize:app.renderer.width/200,
    fontFamily:'Arial',
    fill:0xffffff,
    wordWrap:true,
    wordWrapWidth:app.renderer.width+(app.renderer.width*.075)
  };
}

function start(){
  // start creating our sprites, graphics, etc. once all the images/spritesheets are loaded
  // parse the json file
  $.ajax({
    dataType:'json',
    url:'./json/option-b.json',
    // data:data,
    success:data=>{
      let json_text = '';
      data.forEach((item,i)=>{
        // let text = new PIXI.Text( JSON.stringify(item) );
        // app.stage.addChild(text);
        // json_text+= " | [" + item["Date Sent"] + "] - ";
        // json_text+= " " + item["Sender's Name"];
        json_text+= " " + item["Receiver's First Name"];
        json_text+= " " + item["Receiver's Last Name"];
        // json_text+= " " + item["Receiver's Department"];
        // json_text+= " " + item["Receiver's Job Title"];
        // json_text+= " " + item["Program Name"];
        // json_text+= " " + item["Recognition Message"];
        // json_text+= " - Award: " + item["Value Awarded (pretax)"];
      });
      json_text = json_text.toUpperCase();
      text = new PIXI.Text(json_text, getTextStyle());
      app.stage.addChild(text);
      // text.text = 'null';
      // let text = new PIXI.Text(json_text,{fontSize:10,fontFamily:'Arial',fill:0xffffff});
      /*$('body')
        .text(json_text.toUpperCase())
        .css({
          fontSize: 10, //(innerHeight/100) < 10 ? 10 : 15,
          lineHeight: '10px',  //(innerHeight/100) < 10 ? 10+'px' : 15+'px',
          width:'105%'
        });*/

      //countLines();
    }
  })
  // divide innerWidth by 6 to get the approximate number of letters/characters per line

  function countLines() {
    let el = document.body;
    let divHeight = el.offsetHeight
    let lineHeight = parseInt(el.style.lineHeight);
    let lines = divHeight / lineHeight;
    //alert("Lines: " + lines);
  }

  $(window).resize(()=>{
    // check to make sure all items are initialized before calling to resize them
    app.renderer.resize(innerWidth, innerHeight); //(innerWidth/16)*9);
    text.style = getTextStyle();
  })
  $(window).trigger('resize');
}
