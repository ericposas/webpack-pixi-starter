import './scss/style.scss';
import $ from 'jquery';
import * as PIXI from 'pixi.js';
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

// global vars
let loader = PIXI.loader;
loader
  .on('progress', load_progress)
  .load(start);

function load_progress(loader, resource){
  console.log(
    `loading: ${resource.url},`,
    `overall progress: ${loader.progress}`,
  );
}

function start(){
  // start creating our sprites, graphics, etc. once all the images/spritesheets are loaded

  set_resize();
}

function set_resize(){
  $(window).resize(()=>{
    // check to make sure all items are initialized before calling to resize them
    app.renderer.resize(innerWidth, innerHeight); //(innerWidth/16)*9);
  })
  $(window).trigger('resize');
}
