import './scss/style.scss';
import $ from 'jquery';
import gsap from 'gsap';
import * as PIXI from 'pixi.js';
import PixiFps from 'pixi-fps';
// json
import './option-b.json';
//images


let app = new PIXI.Application(innerWidth, (innerWidth/16)*9, {antialias:true,transparent:false});
document.body.appendChild(app.view);
app.stage.interactive = true;
app.renderer.backgroundColor = '0x0000ff';
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

const fpsCounter = new PixiFps();

let loader = PIXI.loader;

// global vars
let text = new PIXI.Text('', {}),
    text_copy = new PIXI.Text('', {});
let json_text = '';
let big_num_text = new PIXI.Text('11,908', getBigNumTextStyle());
let masked_names_container = new PIXI.Container();
big_num_text.anchor.set(.5,.5);

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
    fill:0xffffff,
    fontWeight:'bold'
  };
}

function getTextStyle(){
  return {
    fontSize:getSmallFont(),
    fontFamily:'Arial',
    fill:0xffffff,
    lineHeight:getSmallFont(),
    wordWrap:true,
    wordWrapWidth:app.renderer.width+(app.renderer.width*.075)
  };
}

function getSmallFont(){
  return app.renderer.width/100;
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
        json_text+= " " + item["Receiver's First Name"];
        json_text+= " " + item["Receiver's Last Name"];
      });
      json_text = json_text.toUpperCase();
      text = new PIXI.Text(json_text, getTextStyle());
      text_copy = new PIXI.Text(json_text, getTextStyle());
      text.alpha = .5;
      text_copy.mask = big_num_text;
      masked_names_container.addChild(text, text_copy, big_num_text);
      app.stage.addChild(fpsCounter);

      for(let i = 0; i<app.renderer.height/getSmallFont(); i++){
        let strip = new PIXI.Sprite(app.renderer.generateTexture(masked_names_container));
        let mask = new PIXI.Graphics();
        mask.beginFill(0xFFFF00);
        // strip.lineStyle(1, 0x000000);
        mask.drawRect(0, 0, app.renderer.width, getSmallFont());
        mask.x = 0;
        mask.y = mask.height * i;
        strip.mask = mask;
        app.stage.addChild(strip);
      }
    }
  })

  $(window).resize(()=>{
    // check to make sure all items are initialized before calling to resize them
    app.renderer.resize(innerWidth, innerHeight); //(innerWidth/16)*9);
    big_num_text.style = getBigNumTextStyle();
    big_num_text.x = innerWidth/2;
    big_num_text.y = innerHeight/2;
    text_copy.style = text.style = getTextStyle();

  })
  $(window).trigger('resize');
}
