var c=document.getElementById("laserworks")
c.style.background="#000"
var ctx=c.getContext("2d")
ctx.canvas.width=1000
ctx.canvas.height=1100
ctx.lineCap="round"

//config

fps=30
interval=1000/fps
sfx=1

//

anistep=1
ani=0
tutorial_page=-1
piece_size=(1000/12)-10
dot_size=piece_size/5

//

mouse_coords={x:0,y:0}
mouse_pos={x:0,y:0}
click_coords={x:-1, y:-1}
prev={x:-1, y:-1}
menu_option=-1
selected={x:-1, y:-1}
dragging_piece=0
dragging_flipped=0
filter_default_value=128
tri_default_rot=0
brigthness_mod=0

//

board=[]
power_grid=[]

// Level data
current_level=0
total_levels=30
levels_completed=0
score=Array(total_levels).fill(999)
//tutorial levels
levelt0=[
[{x:1, y:8}, [10,0]],
[{x:8, y:8}, [11,0,256]],
]
levelt1=[
[{x:1, y:9}, [10,1]],
[{x:1, y:8}, [1,1]],
[{x:3, y:8}, [2,0]],
[{x:5, y:8}, [3,64]],
[{x:7, y:8}, [4,0]],
[{x:9, y:8}, [11,0,256]],
]
levelt2=[]
//normal levels
level0=[
[{x:1, y:1}, [10,0]],
[{x:7, y:7}, [11,0,256]],
]
level1=[
[{x:1, y:1}, [10,0]],
[{x:7, y:7}, [11,0,128]],
]
level2=[
[{x:1, y:1}, [10,0]],
[{x:4, y:4}, [11,0,128]],
[{x:7, y:7}, [11,0,128]],
]
level3=[
[{x:1, y:1}, [10,0]],
[{x:4, y:4}, [11,0,64]],
[{x:7, y:7}, [11,0,4]],
]
level4=[
[{x:1, y:1}, [10,0]],
[{x:7, y:7}, [11,0,100]],
]
level5=[
[{x:1, y:1}, [10,0]],
[{x:1, y:2}, [10,0]],
[{x:4, y:4}, [11,0,128]],
[{x:7, y:7}, [11,0,64]],
[{x:2, y:8}, [11,0,192]],
[{x:4, y:6}, [11,0,128]],
]
level6=[
[{x:0, y:1}, [10,0]],
[{x:9, y:1}, [10,2]],
[{x:4, y:4}, [11,0,128]],
[{x:7, y:7}, [11,0,64]],
[{x:2, y:8}, [11,0,192]],
[{x:4, y:6}, [11,0,128]],
]
level7=[
[{x:4, y:4}, [10,1]],
[{x:5, y:4}, [10,0]],
[{x:4, y:5}, [10,2]],
[{x:5, y:5}, [10,3]],
[{x:7, y:7}, [11,0,276]],
[{x:2, y:8}, [11,0,208]],
[{x:4, y:6}, [11,0,128]],
]
level8=[
[{x:3, y:2}, [10,3]],
[{x:3, y:6}, [11,0,1]],
[{x:4, y:6}, [11,0,1]],
[{x:5, y:6}, [11,0,1]],
[{x:6, y:6}, [11,0,1]],
]
level9=[
[{x:3, y:2}, [10,3]],
[{x:7, y:6}, [10,1]],
[{x:3, y:6}, [11,0,16]],
[{x:2, y:6}, [11,0,36]],
[{x:5, y:4}, [11,0,160]],
[{x:6, y:7}, [11,0,108]],
]
level10=[
[{x:0, y:0}, [10,3]],
[{x:9, y:9}, [10,1]],
[{x:3, y:6}, [11,0,8]],
[{x:2, y:6}, [11,0,4]],
[{x:5, y:4}, [11,0,97]],
[{x:6, y:7}, [11,0,9]],
[{x:1, y:8}, [11,0,160]],
[{x:0, y:4}, [11,0,42]],
[{x:6, y:0}, [11,0,96]],
]
level11=[
[{x:6, y:6}, [10,3]],
[{x:6, y:8}, [10,1]],
[{x:8, y:6}, [10,3]],
[{x:8, y:8}, [10,1]],
[{x:3, y:6}, [11,0,49]],
[{x:9, y:0}, [11,0,227]],
]
level12=[
[{x:1, y:1}, [10,1]],
[{x:0, y:0}, [10,3]],
[{x:2, y:2}, [10,2]],
[{x:3, y:3}, [10,0]],
[{x:3, y:6}, [11,0,72]],
[{x:2, y:6}, [11,0,128]],
[{x:5, y:4}, [11,0,72]],
[{x:7, y:8}, [11,0,272]],
[{x:9, y:0}, [11,0,128]],
[{x:9, y:9}, [11,0,80]],
]
level13=[
[{x:1, y:1}, [10,1]],
[{x:5, y:5}, [10,0]],
[{x:0, y:9}, [10,1]],
[{x:1, y:5}, [11,0,64]],
[{x:4, y:6}, [11,0,186]],
[{x:8, y:1}, [11,0,40]],
[{x:5, y:9}, [11,0,40]],
[{x:9, y:0}, [11,0,40]],
[{x:9, y:8}, [11,0,15]],
[{x:7, y:5}, [11,0,15]],
[{x:3, y:2}, [11,0,100]],
[{x:7, y:9}, [11,0,64]],
]
level14=[
[{x:0, y:0}, [10,0]],
[{x:0, y:1}, [10,0]],
[{x:0, y:2}, [10,0]],
[{x:0, y:3}, [10,0]],
[{x:0, y:4}, [10,0]],
[{x:0, y:5}, [10,0]],
[{x:3, y:2}, [11,0,336]],
[{x:7, y:9}, [11,0,336]],
]
level15=[
[{x:5, y:5}, [10,0]],
[{x:4, y:5}, [10,2]],
[{x:7, y:5}, [11,0,38]],
[{x:3, y:2}, [11,0,47]],
[{x:7, y:9}, [11,0,37]],
]
level16=[
[{x:5, y:0}, [10,3]],
[{x:7, y:5}, [11,0,90]],
[{x:3, y:2}, [11,0,86]],
[{x:7, y:9}, [11,0,48]],
]
level17=[
[{x:5, y:5}, [10,0]],
[{x:0, y:9}, [10,1]],
[{x:1, y:5}, [11,0,64]],
[{x:1, y:6}, [11,0,64]],
[{x:8, y:8}, [11,0,64]],
[{x:5, y:7}, [11,0,20]],
[{x:1, y:0}, [11,0,56]],
[{x:9, y:8}, [11,0,52]],
]
level18=[
[{x:0, y:9}, [10,1]],
[{x:1, y:0}, [11,0,47]],
[{x:9, y:8}, [11,0,13]],
]
level19=[
[{x:9, y:0}, [10,3]],
[{x:8, y:0}, [10,3]],
[{x:7, y:5}, [11,0,208]],
[{x:3, y:2}, [11,0,102]],
[{x:7, y:9}, [11,0,126]],
]
//Tri-splitters needed past this point
level20=[
[{x:3, y:7}, [10,0]],
[{x:7, y:5}, [11,0,85]],
[{x:3, y:2}, [11,0,85]],
[{x:7, y:9}, [11,0,85]],
]
level21=[
[{x:5, y:0}, [10,3]],
[{x:1, y:3}, [11,0,85]],
[{x:8, y:3}, [11,0,85]],
[{x:1, y:7}, [11,0,28]],
[{x:8, y:7}, [11,0,28]],
]
level22=[
[{x:5, y:0}, [10,3]],
[{x:1, y:3}, [11,0,56]],
[{x:8, y:3}, [11,0,42]],
[{x:1, y:7}, [11,0,42]],
[{x:8, y:7}, [11,0,70]],
]
level23=[
[{x:0, y:5}, [10,0]],
[{x:9, y:5}, [10,2]],
[{x:5, y:5}, [11,0,212]],
]
level24=[
[{x:0, y:5}, [10,0]],
[{x:9, y:5}, [10,2]],
[{x:5, y:5}, [11,0,261]],
[{x:4, y:5}, [11,0,17]],
]
level25=[
[{x:0, y:0}, [10,3]],
[{x:1, y:0}, [10,3]],
[{x:2, y:0}, [10,3]],
[{x:3, y:0}, [10,3]],
[{x:7, y:9}, [11,0,298]],
]
level26=[
[{x:2, y:8}, [10,0]],
[{x:4, y:8}, [10,2]],
[{x:7, y:5}, [11,0,212]],
[{x:3, y:2}, [11,0,106]],
]
level27=[
[{x:0, y:0}, [10,0]],
[{x:9, y:0}, [10,3]],
[{x:0, y:9}, [10,1]],
[{x:9, y:9}, [10,2]],
[{x:7, y:5}, [11,0,226]],
[{x:3, y:2}, [11,0,226]],
]
level28=[
[{x:9, y:3}, [10,3]],
[{x:7, y:9}, [11,0,65]],
[{x:0, y:0}, [11,0,34]],
]
level29=[
[{x:3, y:1}, [10,3]],
[{x:8, y:5}, [10,1]],
[{x:9, y:0}, [10,2]],
[{x:1, y:7}, [10,0]],
[{x:7, y:5}, [11,0,20]],
[{x:2, y:2}, [11,0,26]],
[{x:7, y:9}, [11,0,26]],
[{x:7, y:5}, [11,0,20]],
[{x:3, y:6}, [11,0,26]],
[{x:6, y:6}, [11,0,10]],
[{x:7, y:2}, [11,0,52]],
]

//Mobile detection (Disables menu alpha)

try{document.createEvent("TouchEvent"); mobile=1;}
catch(e){mobile=0}

//Adjusting css so canvas scales to fit window

if(window.innerWidth>window.innerHeight)
{
  document.getElementById("laserworks").style.width=""
  document.getElementById("laserworks").style.height="100%"
}

//Save/Load game

var storedlevel=window.localStorage.getItem('maxlevel', levels_completed);
if(storedlevel==null)
{
  window.localStorage.setItem('maxlevel', levels_completed)
  window.localStorage.setItem('score', JSON.stringify(score))
  window.localStorage.setItem('sfx', 1)
}
else
{
  levels_completed=storedlevel
  score=JSON.parse(window.localStorage.getItem('score'))
  //fill in extra levels added after save
  if(score.length<total_levels){score=score.concat(Array(total_levels-score.length).fill(999))}
  sfx=JSON.parse(window.localStorage.getItem('sfx'))
}

//Audio management

sounds=[
"menu_back",
"menu_select",
"menu_option",
]

au=new Object();
au.play=function(s)
{
  if (sfx==1){tem=eval("this."+s+".cloneNode();"); tem.play()}
}

function loader()
{
  for (i=0; i<sounds.length; i++)
  {
    it="./audio/"+sounds[i]+".wav";
    vname=sounds[i]
    eval("au."+vname+"=new Audio('"+it+"');");
  }
}

//Auxiliary draw functions

function draw_line(x1,y1,x2,y2)
{
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
}

function draw_circle(x,y,size,colour="white",alpha=1)
{
  pa=ctx.globalAlpha;
  if (colour!="black"){ctx.globalAlpha=alpha;}
  ctx.strokeStyle=colour;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2*Math.PI, true);
  ctx.stroke();
  ctx.globalAlpha=pa;
}

function fill_circle(x,y,size,colour="white",alpha=1)
{
  pa=ctx.globalAlpha;
  if (colour!="black"){ctx.globalAlpha=alpha;}
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2*Math.PI, true);
  ctx.fillStyle=colour;
  ctx.fill();
  ctx.stroke();
  ctx.globalAlpha=pa;
  ctx.fillStyle="white"
}

function draw_mirror(coords,rot=0)
{
  ctx.lineWidth=2
  c={x:coord_to_pixel(coords.x), y:coord_to_pixel(coords.y)}
  if(rot==0)      {draw_line(c.x-40,c.y-40,c.x+40,c.y+40)}
  else if(rot==1) {draw_line(c.x-40,c.y+40,c.x+40,c.y-40)}
  ctx.lineWidth=1
}

function draw_splitter(coords,rot=0)
{
  ctx.lineWidth=2
  c={x:coord_to_pixel(coords.x), y:coord_to_pixel(coords.y)}
  if(rot==0)
  {
    draw_line(c.x-40,c.y-40,c.x-24,c.y-24)
    draw_line(c.x-8,c.y-8,c.x+8,c.y+8)
    draw_line(c.x+24,c.y+24,c.x+40,c.y+40)
  }
  else if(rot==1)
  {
    draw_line(c.x-40,c.y+40,c.x-24,c.y+24)
    draw_line(c.x-8,c.y+8,c.x+8,c.y-8)
    draw_line(c.x+24,c.y-24,c.x+40,c.y-40)
  }
  ctx.lineWidth=1
}

function draw_filter(coords,fv=128)
{
  ctx.lineWidth=2
  c={x:coord_to_pixel(coords.x), y:coord_to_pixel(coords.y)}
  ctx.strokeRect(c.x-20,c.y-20,40,40)
  ctx.font="20px sans-serif"
  ctx.fillText(fv,c.x-20,c.y)
}

function draw_trisplitter(coords,rot=0)
{
  ctx.lineWidth=2
  c={x:coord_to_pixel(coords.x), y:coord_to_pixel(coords.y)}
  ctx.strokeRect(c.x-20,c.y-20,40,40)
  if(rot==1)
  {
    draw_line(c.x-20,c.y-20,c.x,c.y)
    draw_line(c.x+20,c.y-20,c.x,c.y)
  }
  else if(rot==2)
  {
    draw_line(c.x+20,c.y-20,c.x,c.y)
    draw_line(c.x+20,c.y+20,c.x,c.y)
  }
  else if(rot==3)
  {
    draw_line(c.x-20,c.y+20,c.x,c.y)
    draw_line(c.x+20,c.y+20,c.x,c.y)
  }
  else if(rot==0)
  {
    draw_line(c.x-20,c.y+20,c.x,c.y)
    draw_line(c.x-20,c.y-20,c.x,c.y)
  }
}

function draw_meter(coords)
{
  ctx.lineWidth=2
  c={x:coord_to_pixel(coords.x), y:coord_to_pixel(coords.y)}
  draw_line(c.x,c.y,c.x-30,c.y+30)
  draw_circle(c.x+15,c.y-15,20)
  ctx.lineWidth=1
}

function draw_measure(coords)
{
  ctx.lineWidth=2
  c={x:coord_to_pixel(coords.x), y:coord_to_pixel(coords.y)}
  ctx.strokeRect(c.x-40,c.y-40,80,80)
  draw_line(c.x,c.y-50,c.x,c.y-30)
  draw_line(c.x,c.y+50,c.x,c.y+30)
  draw_line(c.x-50,c.y,c.x-30,c.y)
  draw_line(c.x+50,c.y,c.x+30,c.y)
  if(coords.y<10)
  {
    ctx.textAlign="center"
    ctx.font="15px sans-serif"
    ctx.fillText(power_grid[coords.y][coords.x],c.x+20,c.y-20)
  }
  ctx.lineWidth=1
  ctx.fillStyle="white"
  ctx.textAlign="start"
}

// 0-right, 1-down, 2-left, 3-up
function draw_laser(coords, or=0)
{
  ctx.lineWidth=2
  c={x:coord_to_pixel(coords.x), y:coord_to_pixel(coords.y)}
  if(or%2==0)
  {
    if(or==0){
      draw_line(c.x-20, c.y-20, c.x-20, c.y+20)
      draw_line(c.x-20, c.y+20, c.x+20, c.y)
      draw_line(c.x-20, c.y-20, c.x+20, c.y)
    }
    else
    {
      draw_line(c.x+20, c.y-20, c.x+20, c.y+20)
      draw_line(c.x+20, c.y+20, c.x-20, c.y)
      draw_line(c.x+20, c.y-20, c.x-20, c.y)
    }
  }
  else
  {
    if(or==1){
      draw_line(c.x-20, c.y+20, c.x+20, c.y+20)
      draw_line(c.x+20, c.y+20, c.x, c.y-20)
      draw_line(c.x-20, c.y+20, c.x, c.y-20)
    }
    else
    {
      draw_line(c.x-20, c.y-20, c.x+20, c.y-20)
      draw_line(c.x+20, c.y-20, c.x, c.y+20)
      draw_line(c.x-20, c.y-20, c.x, c.y+20)    
    }
  }
  ctx.lineWidth=1
}

function draw_target(coords, nd)
{
  c={x:coord_to_pixel(coords.x), y:coord_to_pixel(coords.y)}
  var pw=power_grid[coords.y][coords.x]
  ctx.lineWidth=2
  draw_circle(c.x,c.y,20)

  ctx.font="15px sans-serif"
  ctx.textAlign="center"
  ctx.fillText(Math.round(pw)+"/"+nd,c.x,c.y-25)
  ctx.textAlign="start"

  //progress bar
  ctx.beginPath();
  ctx.strokeStyle="green"
  ctx.lineWidth=6
  ctx.arc(c.x, c.y, 20, -Math.PI/2, (2*Math.PI*pw/nd)-(Math.PI/2));
  ctx.stroke()
  ctx.strokeStyle="white"

  //overload
  if(pw>nd)
  {
    var unit=2*Math.PI/nd
    ctx.beginPath();
    ctx.strokeStyle="red"
    ctx.lineWidth=6
    ctx.arc(c.x, c.y, 20, -Math.PI/2, (unit*(pw-nd))-(Math.PI/2));
    ctx.stroke()
    ctx.strokeStyle="white"
  }
}

function draw_grid()
{
  ctx.lineWidth=1;
  for (cx=100; cx<1000; cx+=100){
    for (cy=100; cy<1000; cy+=100){
      draw_line(cx-3,cy,cx+3,cy, "white");
      draw_line(cx,cy-3,cx,cy+3, "white");
    }
  }
  draw_line(0,1000,1000,1000)
  draw_mirror({x:1,y:10})
  draw_splitter({x:2,y:10})
  draw_filter({x:3,y:10},filter_default_value)
  draw_trisplitter({x:4,y:10},tri_default_rot)
  draw_meter({x:6,y:10})
  ctx.fillStyle="white"

  //option button
  ctx.font="25px sans-serif"
  ctx.strokeRect(10,1010,80,80)
  draw_line(90,1010,10,1090)
  ctx.fillText("BR+", 15,1035)
  ctx.textAlign="end"
  ctx.fillText("BR-",85,1085)

  //reset button
  ctx.textAlign="start"
  ctx.strokeRect(710,1010,80,80)
  draw_line(790,1010,710,1090)
  ctx.fillText("RST",715,1035)
  ctx.textAlign="end"
  ctx.fillText("ESC",785,1085)

  //level load
  if (check_pass()==1 || levels_completed-1>=current_level) {ctx.strokeStyle="green"}
  else {ctx.strokeStyle="red"}
  ctx.textAlign="center"
  ctx.strokeRect(810,1010,80,80)
  ctx.fillText(parseInt(current_level)+1,850,1070)
  ctx.font="20px sans-serif"
  ctx.fillText("LEVEL",850,1040)
  ctx.strokeStyle="white"
  ctx.textAlign="start"
}

function draw_game()
{
  if(tutorial_page==-1){draw_grid()}

  for(i=0; i<board.length; i++)
  {
    for(j=0; j<board[0].length; j++)
    {
      ci=board[j][i]
      if(ci[0]==1)  {draw_mirror({x:i,y:j},ci[1])}
      if(ci[0]==2)  {draw_splitter({x:i,y:j},ci[1])}
      if(ci[0]==3)  {draw_filter({x:i,y:j},ci[1])}
      if(ci[0]==4)  {draw_trisplitter({x:i,y:j},ci[1])}
      if(ci[0]==10) {draw_laser({x:i,y:j},ci[1])}
      if(ci[0]==11) {draw_target({x:i,y:j},ci[2])}
    }
  }

  //Draw laser path
  reset_pgrid()
  lvd=eval("level"+current_level)
  for(i=0; i<lvd.length; i++) {if(lvd[i][1][0]==10){draw_laser_path(lvd[i])}}

  //Draw dragging piece
  ctx.strokeStyle="rgb(255,128,0)"
  if(dragging_piece==1)       {draw_mirror({x:mouse_coords.x, y: mouse_coords.y},dragging_flipped)}
  else if(dragging_piece==2)  {draw_splitter({x:mouse_coords.x, y: mouse_coords.y},dragging_flipped)}
  else if(dragging_piece==3)  {draw_filter({x:mouse_coords.x, y: mouse_coords.y},dragging_flipped)}
  else if(dragging_piece==4)  {draw_trisplitter({x:mouse_coords.x, y: mouse_coords.y},dragging_flipped)}
  else if(dragging_piece==6)  {draw_measure({x:mouse_coords.x, y: mouse_coords.y})}
  ctx.strokeStyle="white"

  if(tutorial_page==-1 || tutorial_page==2){draw_progress()}
}

function draw_progress()
{
  var lvd=eval("level"+current_level)
  var need=0
  var supplied=0
  for(i=0; i<lvd.length; i++)
  {
    if(lvd[i][1].length==3)//Process targets
    {
      need+=lvd[i][1][2]
      supplied+=power_grid[lvd[i][0].y][lvd[i][0].x]
    }
  }
  //progress bar
  ctx.beginPath();
  ctx.strokeStyle="green"
  ctx.lineWidth=4
  ctx.arc(950, 1050, 30, -Math.PI/2, (2*Math.PI*supplied/need)-(Math.PI/2));
  ctx.stroke()
  ctx.strokeStyle="white"
  ctx.textAlign="center"
  ctx.font="15px sans-serif"
  ctx.fillText(parseInt(supplied)+"/"+need,950,1055)
  ctx.textAlign="start"

  //overload bar
  if(supplied>need)
  {
    ctx.beginPath();
    ctx.strokeStyle="red"
    ctx.lineWidth=4
    ctx.arc(950, 1050, 30, -Math.PI/2, (2*Math.PI/need*(supplied-need))-(Math.PI/2));
    ctx.stroke()
    ctx.strokeStyle="white"
  }
}

// 0-right, 1-down, 2-left, 3-up
function draw_laser_path(start)
{
  ic={x: coord_to_pixel(start[0].x), y: coord_to_pixel(start[0].y)}
  next=[]
  ctx.lineWidth=3
  ctx.strokeStyle="rgb("+(256+brigthness_mod)+",0,0)"
  if(start[1][1]==0)
  {
    draw_line(ic.x+20, ic.y, ic.x+100, ic.y)
    next={x:start[0].x+1, y: start[0].y}
    from=0
  }
  if(start[1][1]==1)
  {
    draw_line(ic.x, ic.y-20, ic.x, ic.y-100)
    next={x:start[0].x, y: start[0].y-1}
    from=3
  }
  if(start[1][1]==2)
  {
    draw_line(ic.x-20, ic.y, ic.x-100, ic.y)
    next={x:start[0].x-1, y: start[0].y}
    from=2
  }
  if(start[1][1]==3)
  {
    draw_line(ic.x, ic.y+20, ic.x, ic.y+100)
    next={x:start[0].x, y: start[0].y+1}
    from=1
  }
  ctx.lineWidth=1
  follow_laser(next, from)
  ctx.strokeStyle="white"
}

// 0-from left, 1-from up, 2-from right, 3-from down
function follow_laser(coords,ori,str=256)
{
  if (coords.x<0 || coords.x>9 || coords.y<0 || coords.y>9){return 0}
    power_grid[coords.y][coords.x]+=str
  if (board[coords.y][coords.x][0]>9){return 0}

  var linestart={x: coord_to_pixel(coords.x), y: coord_to_pixel(coords.y)}
  var nextr=[]

  celltype=board[coords.y][coords.x][0]
  cellvalue=board[coords.y][coords.x][1]
  
  //ray from left side
  if(ori==0)
  {
    if(celltype==0 || celltype==3) {nextr=nextr.concat([[0,{x:+1, y:0},cellvalue]])}//nothing, filter
    if(celltype==1)//reflector
    {
      if(cellvalue==0) {nextr=nextr.concat([[1,{x:0, y:+1}]])}//Normal
      if(cellvalue==1) {nextr=nextr.concat([[3,{x:0, y:-1}]])}//Flipped
    }
    if(celltype==2)//splitter
    {
      if(cellvalue==0) {nextr=nextr.concat([[1,{x:0, y:+1}], [0,{x:+1, y:0}]])}//Normal
      if(cellvalue==1) {nextr=nextr.concat([[3,{x:0, y:-1}], [0,{x:+1, y:0}]])}//Flipped
    }
    if(celltype==4 && cellvalue==ori)//trisplitter in same orientation
    {
      nextr=nextr.concat([[3,{x:0,y:-1}],[1,{x:0,y:+1}],[0,{x:1,y:0}]])
    }
  }
  if(ori==1)//ray from top
  {
    if(celltype==0 || celltype==3) {nextr=nextr.concat([[1,{x:0, y:+1},1]])}//nothing, filter
    if(celltype==1)//reflector
    {
      if(cellvalue==0) {nextr=nextr.concat([[0,{x:+1, y:0},1]])} //Normal
      if(cellvalue==1) {nextr=nextr.concat([[2,{x:-1, y:0},1]])}//Flipped
    }
    if(celltype==2)//splitter
    {
      if(cellvalue==0) {nextr=nextr.concat([[0,{x:+1, y:0},2], [1,{x:0, y:+1},2]])}//Normal
      if(cellvalue==1) {nextr=nextr.concat([[2,{x:-1, y:0},2], [1,{x:0, y:+1},2]])}//Flipped
    }
    if(celltype==4 && cellvalue==ori)//trisplitter in same orientation
    {
      nextr=nextr.concat([[2,{x:-1,y:0}],[1,{x:0,y:+1}],[0,{x:1,y:0}]])
    }
  }
  if(ori==2)//ray from right side
  {
    if(celltype==0 || celltype==3) {nextr=nextr.concat([[2,{x:-1, y:0},1]])}//nothing, filter
    if(celltype==1)//reflector
    {
      if(cellvalue==0) {nextr=nextr.concat([[3,{x:0, y:-1},1]])}//Normal
      if(cellvalue==1) {nextr=nextr.concat([[1,{x:0, y:1},1]])}//Flipped
    }
    if(celltype==2)//splitter
    {
      if(cellvalue==0) {nextr=nextr.concat([[3,{x:0, y:-1},2], [2,{x:-1, y:0},2]])}//Normal
      if(cellvalue==1) {nextr=nextr.concat([[1,{x:0, y:1},2], [2,{x:-1, y:0},2]])}//Flipped
    }
    if(celltype==4 && cellvalue==ori)//trisplitter in same orientation
    {
      nextr=nextr.concat([[3,{x:0,y:-1}],[2,{x:-1,y:0}],[1,{x:0,y:+1}]])
    }
  }
  if(ori==3)//ray from bottom
  {
    if(celltype==0 || celltype==3) {nextr=nextr.concat([[3,{x:0, y:-1},1]])}//nothing, filter
    if(celltype==1)//reflector
    {
      if(cellvalue==0) {nextr=nextr.concat([[2,{x:-1, y:0},1]])}//Normal
      if(cellvalue==1) {nextr=nextr.concat([[0,{x:1, y:0},1]])}//Flipped
    }
    if(celltype==2)//splitter
    {
      if(cellvalue==0) {nextr=nextr.concat([[2,{x:-1, y:0},2], [3,{x:0, y:-1},2]])}//Normal
      if(cellvalue==1) {nextr=nextr.concat([[0,{x:1, y:0},2], [3,{x:0, y:-1},2]])}//Flipped
    }
    if(celltype==4 && cellvalue==ori)//trisplitter in same orientation
    {
      nextr=nextr.concat([[2,{x:-1,y:0}],[3,{x:0,y:-1}],[0,{x:1,y:0}]])
    }
  }

  var fstr=str
  //modify laser strength
  if(celltype==2)                       {fstr=Math.floor(str/2)}  //reflector processing
  else if(celltype==3 && str>cellvalue) {fstr=cellvalue}          //filter processing
  else if(celltype==4)                  {fstr=Math.floor(str/3)}  //trisplitter processing

  for(var i=0; i<nextr.length; i++)
  {
    var it=nextr[i]
    var next={x:coords.x+it[1].x, y:coords.y+it[1].y}

    //draw line
    ctx.lineWidth=3
    ctx.strokeStyle="rgb("+(fstr+brigthness_mod)+",0,0)"
    if(coords.y==9 && ori==1) {draw_line(linestart.x, linestart.y, linestart.x+(it[1].x*100), linestart.y+(it[1].y*50))} //exception for last row
    else                      {draw_line(linestart.x, linestart.y, linestart.x+(it[1].x*100), linestart.y+(it[1].y*100))}
    ctx.lineWidth=1

    //continue laser
    follow_laser(next, it[0], fstr)
  }
}

//Misc auxiliary functions

function pixel_to_coord(px)
{
  return Math.ceil(px/(100))-1
}

function coord_to_pixel(c)
{
  return (50)*(1+(c*2))
}

function menu_alpha(y)
{
  if (mobile==0){return Math.abs(y-mouse_pos.y)}
  else {return 50}
}

function check_pass()
{
  var lvd=eval("level"+current_level)
  var completed=1
  for(var i=0; i<lvd.length; i++)
  {
    if(lvd[i][1].length==3)//Process targets
    {
      if (lvd[i][1][2]!=power_grid[lvd[i][0].y][lvd[i][0].x]) //Check if the target has OK levels
      {
        return 0
      }
    }
  }
  return 1
}

function calculate_score()
{
  var tempscore=0
  for(var i=0; i<10; i++)
  {
    for(var j=0; j<10; j++)
    {
      var t=board[j][i][0]
      if(t!=10 && t!=11)
      {
        tempscore+=t
      }
    }
  }
  return tempscore
}

//Intro and menus

function logo_animation(i)
{
  ctx.clearRect(0,0,1000,1000)
  ctx.font="45px sans-serif";
  ctx.fillStyle="rgba(255,255,255,"+(anistep/80)+")";
  ctx.textAlign="center"
  ctx.fillText("愛智重工",500,500);
  ctx.font="20px quizma";
  ctx.fillText("Achi Heavy Industries",500,520)
  if (anistep==80){clearTimeout(ani);ani=setInterval(logo_animation, interval, 0)}
  if(i==1){anistep++;}else{anistep--;}
  if (anistep==0){clearTimeout(ani);ani=setInterval(title_animation, interval, 1)}
}

function title_animation(i)
{
  ctx.clearRect(0,0,1000,1000)
  ctx.font="100px spaceage";
  ctx.fillStyle="rgba(255,255,255,"+(anistep/80)+")";
  ctx.textAlign="center"
  ctx.fillText("Laserworks",500,500);
  if (anistep==80)
  {
    clearTimeout(ani);
    ctx.canvas.addEventListener("click", main_menu_listener, false);
    ani=setInterval(title_animation, interval, 0)
  }
  if(i==1){anistep++;}else{anistep--;}
  if (anistep==0){clearTimeout(ani);ani=setInterval(menu, interval, 1)}
}

function menu()
{
  ctx.canvas.removeEventListener("click", skip_to_menu);
  ctx.clearRect(0,0,1000,1100)
  malpha=anistep/30;
  ctx.lineWidth=1;

  ctx.fillStyle="rgba(255,255,255,"+malpha+")";
  ctx.textAlign="center";
  ctx.font="100px spaceage";
  ctx.fillText("Laserworks",500,160);

  ctx.font="bold 50px quizma";
  ctx.fillStyle="rgba(255,255,255,"+(30*malpha/menu_alpha(350))+")";
  if(levels_completed==0) {ctx.fillText("New game",500,360);}
  else                    {ctx.fillText("Continue",500,360)}
  ctx.fillStyle="rgba(255,255,255,"+(30*malpha/menu_alpha(450))+")";
  ctx.fillText("Levels",500,460);
  ctx.fillStyle="rgba(255,255,255,"+(30*malpha/menu_alpha(550))+")";
  ctx.fillText("Tutorial",500,560);
  ctx.fillStyle="rgba(255,255,255,"+(30*malpha/menu_alpha(750))+")";
  ctx.fillText("Settings",500,760);
  ctx.fillStyle="rgba(255,255,255,"+(30*malpha/menu_alpha(850))+")";
  ctx.fillText("Credits",500,860);

  if (anistep<30){anistep++;} 
}

function level_select()
{
  ctx.clearRect(0,0,1000,1000)
  var malpha=anistep/30;
  ctx.lineWidth=1;

  ctx.fillStyle="rgba(255,255,255,"+malpha+")";
  ctx.textAlign="center";
  ctx.font="100px spaceage";
  ctx.fillText("Laserworks",500,160);
  ctx.textAlign="end"
  ctx.font="60px quizma";
  ctx.fillText("Scores",950,200);

  ctx.textAlign="end"
  ctx.font="30px quizma";
  for(i=0; i<10; i++)
  {
    for(j=0; j<10; j++)
    {
      var sc=score[j*10+i]
      if(typeof(sc)!="undefined" && sc!=999)  {ctx.fillText(sc, 100+90*i, 350+90*j)}
      else if(sc==999)                        {ctx.fillText("--", 100+90*i, 350+90*j)}
    }
  }

  ctx.textAlign="center"
  ctx.font="bold 50px quizma";
  ctx.fillStyle="rgba(255,255,255,"+(30*malpha/menu_alpha(850))+")";
  ctx.fillText("Back",500,860);

  if (anistep<30){anistep++;} 
}

function tutorial()
{
  ctx.canvas.removeEventListener("click", main_menu_listener);
  ctx.clearRect(0,0,1000,1100)
  malpha=anistep/30;
  ctx.lineWidth=1;

  ctx.fillStyle="rgba(255,255,255,"+malpha+")";
  ctx.textAlign="center";
  ctx.font="100px spaceage";
  ctx.fillText("Laserworks",500,160);
  ctx.textAlign="end"
  ctx.font="60px quizma";
  ctx.fillText("Tutorial",950,200);
  ctx.textAlign="start" 

  if(tutorial_page==0){
    load_level("t0")
    ctx.font="bold 40px quizma";
    ctx.fillText("Welcome to Laserworks", 200,360)
    ctx.fillText("Your goal is to redirect lasers from ", 150,460)
    ctx.fillText("the sources (>) to the targets (O)", 150,510)
    ctx.fillText("Every source has a power of 255, the ", 150,560)
    ctx.fillText("power targets need is on top of them", 150,610)
  }
  if(tutorial_page==1){
    load_level("t1")
    ctx.font="bold 40px quizma";
    ctx.fillText("Here are the tools you have to", 150,360)
    ctx.fillText("redirect and modify lasers:", 150,410)
    ctx.fillText("Reflects a ray", 100,560)
    draw_line(150,580,150,750)
    ctx.fillText("Reflects half the ray", 300,610)
    draw_line(350,630,350,750)
    ctx.fillText("Absorbs excess power", 500,660)
    draw_line(550,680,550,750)
    ctx.fillText("Divides a ray in 3", 600,710)
    draw_line(752,730,752,750)
  }
  if(tutorial_page==2){
    load_level("t2")
    draw_grid()
    ctx.font="bold 40px quizma";
    ctx.fillText("This is where you'll be placing the tools", 150,310)
    ctx.fillText("use left/right mouse on buttons", 150,360)
    draw_line(140,450,50,450)
    draw_line(50,450,50,950)
    ctx.fillText("Laser brightness control", 150,460)
    ctx.fillText("    Tool area (drag and drop to place, right click", 150,510)
    ctx.fillText("    to change default value, mid click to delete)", 150,550)
    draw_line(170,500,150,500)
    draw_line(150,500,150,950)
    draw_line(150,950,450,950)
    ctx.textAlign="end"
    ctx.fillText("Meter: Drag over laser to see exact value", 950,610)
    draw_line(230,600,220,600)
    draw_line(220,600,220,850)
    draw_line(220,850,650,850)
    draw_line(650,850,650,950)
    ctx.fillText("Level completion indicator", 900,660)
    draw_line(920,650,950,650)
    draw_line(950,650,950,950)
    ctx.fillText("Current level indicator", 800,710)
    draw_line(820,700,850,700)
    draw_line(850,700,850,950)
    ctx.fillText("Reset level/Exit to menu", 700,760)
    draw_line(720,750,750,750)
    draw_line(750,750,750,950)
  }
  if(tutorial_page==3){
    ctx.font="bold 40px quizma";
    ctx.fillText("When all the targets are correctly fed, the ", 150,410)
    ctx.fillText("current level indicator will turn green: click", 150,460)
    ctx.fillText("on it to go to the next level, or right click ", 150,510)
    ctx.fillText("on it to go to the previous one", 150,560)
    ctx.fillText("Try using less pieces to solve a level to", 150,660)
    ctx.fillText("increase your score, and have fun!", 150,710)
  }

  ctx.font="bold 50px quizma";
  ctx.fillStyle="rgba(255,255,255,"+(30*malpha/menu_alpha(950))+")";
  if(tutorial_page!=3)  {ctx.fillText("Next",600,960);}
  else                  {ctx.fillText("Done",600,960)}
  ctx.fillStyle="white"
  draw_game()
  
  if (anistep<30){anistep++;} 
}

function credits()
{
  ctx.clearRect(0,0,1000,1000)
  calpha=anistep/30

  ctx.fillStyle="rgba(255,255,255,"+calpha+")";
  ctx.textAlign="center";
  ctx.font="100px spaceage";
  ctx.fillText("laserworks",500,160);
  ctx.textAlign="end"
  ctx.font="60px quizma";
  ctx.fillText("Credits",950,200);

  ctx.font="bold 50px quizma";
  ctx.fillText("Code",350,360);
  ctx.fillText("SFX",750,460);
  ctx.fillText("Fonts",350,560);
  
  ctx.textAlign="center"
  ctx.fillText("Special Thanks",500,760)
  ctx.fillStyle="rgba(255,255,255,"+(30*calpha/menu_alpha(950))+")";
  ctx.fillText("Back",500,960);

  ctx.fillStyle="white"
  ctx.font="20px quizma"
  ctx.fillText("❤",400,860)
  ctx.fillText("❤",600,860)
  ctx.font="45px quizma";
  
  ctx.fillText("Lea",500,860)
  ctx.textAlign="start"
  ctx.fillText("q3muyq3",650,860)
  ctx.textAlign="end"
  ctx.fillText("Klon",350,860)
  ctx.textAlign="center"

  ctx.fillStyle="rgba(255,255,255,"+(30*calpha/menu_alpha(350))+")";
  ctx.fillText("Achifaifa",500,360);
  ctx.fillStyle="rgba(255,255,255,"+(30*calpha/menu_alpha(450))+")";
  ctx.fillText("broumbroum",500,460);
  ctx.fillStyle="rgba(255,255,255,"+(50*calpha/menu_alpha(550))+")";
  ctx.fillText("Studio Typo",500,560);
  ctx.fillStyle="rgba(255,255,255,"+(50*calpha/menu_alpha(650))+")";
  ctx.fillText("Justin Callaghan",500,660);
  
  if (anistep<30){anistep++}
}

function settings()
{
  ctx.clearRect(0,0,1000,1000)

  salpha=anistep/30

  ctx.fillStyle="rgba(255,255,255,"+salpha+")";
  ctx.textAlign="center";
  ctx.font="100px spaceage";
  ctx.fillText("laserworks",500,160);
  ctx.textAlign="end"
  ctx.font="60px quizma";
  ctx.fillText("Settings",950,200);

  ctx.textAlign="center"
  ctx.fillStyle="rgba(255,255,255,"+(30*salpha/menu_alpha(400))+")";
  if(sfx==1)  {ctx.fillText("SFX on",500,460);}
  else        {ctx.fillText("SFX off",500,460);}
  ctx.fillStyle="rgba(255,255,255,"+(30*salpha/menu_alpha(700))+")";
  ctx.fillText("Back",500,760);

  if (anistep<30){anistep++;}
}

function main_loop()
{
  ctx.clearRect(0,0,1000,1100);
  draw_grid();
  draw_game();
}

//Listeners

function skip_to_menu(e,mute=0)
{
  if (mute==0){au.play("menu_select")}
  clearTimeout(ani);
  anistep=1
  ai=0
  ctx.canvas.addEventListener("click", main_menu_listener, false);
  ani=setInterval(menu, interval, 1)
  ctx.canvas.removeEventListener("click", skip_to_menu);
}

function update_menu_option()
{
  if(mouse_pos.y>320 && mouse_pos.y<370){menu_option=1;}
  else if(mouse_pos.y>420 && mouse_pos.y<470){menu_option=2;}
  else if(mouse_pos.y>520 && mouse_pos.y<570){menu_option=3;}
  else if(mouse_pos.y>620 && mouse_pos.y<670){menu_option=4;}
  else if(mouse_pos.y>720 && mouse_pos.y<770){menu_option=5;}
  else if(mouse_pos.y>820 && mouse_pos.y<870){menu_option=6;}
  else if(mouse_pos.y>920 && mouse_pos.y<970){menu_option=7;}
  else {menu_option=-1}
}

function update_click_coords()
{
  click_coords={
    x: Math.ceil(pixel_to_coord(mouse_pos.x)),
    y: Math.ceil(pixel_to_coord(mouse_pos.y))
  }
}

function main_menu_listener()
{  
  valid_options=[1,2,3,5,6]

  if (valid_options.includes(menu_option))
  {
    ctx.canvas.removeEventListener("click", main_menu_listener, false);
    anistep=1;
    clearTimeout(ani);
    if (menu_option==1) 
    {
      var inilevel=0
      if(levels_completed>0)
      {
        inilevel=levels_completed
        if(inilevel>=total_levels) {inilevel=total_levels-1}
      }
      load_level(inilevel)
      au.play("menu_select")
      //ctx.canvas.addEventListener("click", main_game_listener, false);
      ctx.canvas.addEventListener("mousedown", mousedown);
      ctx.canvas.addEventListener("mouseup", mouseup);
      ctx.canvas.addEventListener("mousemove", dragmove);
      ani=setInterval(main_loop, interval, false);
    }
    if (menu_option==2){
      au.play("menu_select")
      initialize_board();
      ai=1
      ctx.canvas.addEventListener("click", levels_listener, false);
      ani=setInterval(level_select, interval, false);
    }
    if (menu_option==3){
      au.play("menu_select")
      tutorial_page=0
      ctx.canvas.addEventListener("click", tutorial_listener, false);
      ani=setInterval(tutorial, interval, false);
    }
    if (menu_option==5)
    {
      au.play("menu_select")
      ani=setInterval(settings, interval, 1);
      ctx.canvas.addEventListener("click", settings_menu_listener, false);
    }
    if (menu_option==6)
    {
      au.play("menu_select")
      ani=setInterval(credits, interval, 1);
      ctx.canvas.addEventListener("click", credits_menu_listener, false);
    }
  }
}

function tutorial_listener()
{
  if(menu_option==7){
    au.play("menu_select")
    tutorial_page+=1
  }
  if(tutorial_page==4){
      tutorial_page=-1
      ctx.canvas.removeEventListener("click", tutorial_listener, false);
      skip_to_menu(1,1)
  }
}

function levels_listener()
{
  valid_options=[7]
  if (valid_options.includes(menu_option))
  {
    ctx.canvas.removeEventListener("click", main_menu_listener, false);
    anistep=1;
    clearTimeout(ani);
  }
  if (menu_option==6)
  {
    au.play("menu_back")
    ctx.canvas.removeEventListener("click", levels_listener, false);
    skip_to_menu(1,1)
  } 
}

function settings_menu_listener()
{
  valid_options=[2,5]
  if (valid_options.includes(menu_option))
  {
    if (menu_option==2)
    {
      au.play("menu_option")
      sfx^=1
      window.localStorage.setItem('sfx',sfx)
    }
    else if (menu_option==5)
    {
      au.play("menu_back")
      ctx.canvas.removeEventListener("click", settings_menu_listener, false);
      skip_to_menu(1,1)
    } 
  }
}

function credits_menu_listener()
{
  valid_options=[1,2,3,7]
  {
    if (menu_option==1)
    {
      au.play("menu_option")
      window.open('https://achi.se')
    }
    if (menu_option==2)
    {
      au.play("menu_option")
      window.open('https://freesound.org/people/broumbroum/')
    }
    if (menu_option==3)
    {
      au.play("menu_option")
      window.open('http://www.studiotypo.com/')//https://fonts.webtoolhub.com/font-n29145-space-age.aspx?lic=1
    }    
    if (menu_option==4)
    {
      au.play("menu_option")
      window.open('https://fonts.webtoolhub.com/font-n29145-space-age.aspx?lic=1')
    }    
    if (menu_option==7)
    {
      au.play("menu_back")
      ctx.canvas.removeEventListener("click", credits_menu_listener, false);
      skip_to_menu(1,1)
    }
  }
}

function skip_listener()
{
  ctx.canvas.removeEventListener("click", skip_listener);
  skip_to_menu();
}

//Game logic

function initialize_board()
{
  for (i=0; i<10; i++) {board[i]=Array(10).fill([0,0])}
}

function reset_pgrid()
{
  for (i=0; i<10; i++){power_grid[i]=Array(10).fill(0)}
}

function load_level(lv)
{
  initialize_board()
  reset_pgrid()
  eval("cl=level"+lv)
  for(i=0; i<cl.length; i++)
  {
    piece=cl[i]
    board[piece[0].y][piece[0].x]=piece[1]
  }
  current_level=lv
}

//Always-on listeners

function mouse_position(c, e) {
  var rect=c.getBoundingClientRect();
  scalex=ctx.canvas.width/rect.width;  
  scaley=ctx.canvas.height/rect.height;  
  return {
    x: (e.clientX-rect.left)*scalex,
    y: (e.clientY-rect.top)*scaley
  };
}

function mousedown(e)
{
  //left click, drag
  if(e.buttons==1)
  {
    if(mouse_coords.y==10)
    {
      if(mouse_coords.x==6) //meter
      {
        dragging_piece=6
      }
      if(mouse_coords.x>0 && mouse_coords.x<5) //component
      {
        dragging_piece=mouse_coords.x
        dragging_flipped=0
        if(mouse_coords.x==3){dragging_flipped=filter_default_value}
        if(mouse_coords.x==4){dragging_flipped=tri_default_rot}
      }
      else if(mouse_coords.x==0) //brightness+
      {
        brigthness_mod+=32
        au.play("menu_option")
      }
      else if(mouse_coords.x==8) //next level
      {
        var nextl=current_level+1
        if(nextl>=total_levels)
        {
          nextl=current_level
        }
        if(check_pass()==1 && levels_completed<nextl)
        {
          levels_completed=nextl
        }
        if(levels_completed>=nextl)
        {
          au.play("menu_select")
          var sc=calculate_score()
          if(sc<score[current_level] && sc!=0)
          {
            score[current_level]=sc
          }
          current_level=nextl
          load_level(nextl)
          window.localStorage.setItem('maxlevel', levels_completed)
          window.localStorage.setItem('score', JSON.stringify(score))
        }
      }
      else if(mouse_coords.x==7) //Reset button
      {
        au.play("menu_back")
        load_level(current_level)
      }
    }
    else if(board[mouse_coords.y][mouse_coords.x][0]<10)
    {
      dragging_piece=board[mouse_coords.y][mouse_coords.x][0]
      dragging_flipped=board[mouse_coords.y][mouse_coords.x][1]
      board[mouse_coords.y][mouse_coords.x]=[0,0]
    }
  }
  //right click, flip
  else if(e.buttons==2)
  {
    if(mouse_coords.y<10 && board[mouse_coords.y][mouse_coords.x][0]<10)
    {
      if(board[mouse_coords.y][mouse_coords.x][0]==3)//filter value change
      {
        au.play("menu_option")
        if(board[mouse_coords.y][mouse_coords.x][1]==8)
        {
          board[mouse_coords.y][mouse_coords.x][1]=128
        }
        else
        {
          board[mouse_coords.y][mouse_coords.x][1]/=2
        }
      }
      else if(board[mouse_coords.y][mouse_coords.x][0]==4)//trisplitter rotation
      {
        au.play("menu_option")
        board[mouse_coords.y][mouse_coords.x][1]=(board[mouse_coords.y][mouse_coords.x][1]+1)%4
      }
      else
      {
        au.play("menu_option")
        board[mouse_coords.y][mouse_coords.x][1]^=1 //flip piece
      }
    }
    if(mouse_coords.y==10)
    {
      if(mouse_coords.x==0)
      {
        au.play("menu_option")
        brigthness_mod-=32
      }
      if(mouse_coords.x==3)
      {
        au.play("menu_option")
        if(filter_default_value==8){filter_default_value=128}  //default filter mod
        else{filter_default_value/=2}
      }
      if(mouse_coords.x==4)
      {
        au.play("menu_option")
        tri_default_rot=(tri_default_rot+1)%4
      }
      if(mouse_coords.x==7)
      {
        anistep=1;
        au.play("menu_back")
        clearTimeout(ani);
        ctx.canvas.removeEventListener("mousedown", mousedown);
        ctx.canvas.removeEventListener("mouseup", mouseup);
        ctx.canvas.removeEventListener("mousemove", dragmove);
        ctx.canvas.addEventListener("click", main_menu_listener)
        ani=setInterval(menu, interval, false);
      }
      if(mouse_coords.x==8) // previous level
      {
        var nextl=current_level-1
        if(nextl>=0){au.play("menu_back")}
        if(nextl<0)
        {
          nextl=0
        }
        if(levels_completed-1>=nextl)
        {
          current_level=nextl
          load_level(current_level)
        }
      }
    } 
  }
  //middle click, delete
  else if(e.buttons==4)
  {
    if(mouse_coords.y<10 && board[mouse_coords.y][mouse_coords.x][0]<10)
    {
      au.play("menu_option")
      board[mouse_coords.y][mouse_coords.x]=[0,0]
    }
  }  
}

function mouseup(e)
{
  if(mouse_coords.y<10 && dragging_piece!=0 && dragging_piece!=6)
  {
    if(board[mouse_coords.y][mouse_coords.x][0]<10)
    {
      board[mouse_coords.y][mouse_coords.x]=[dragging_piece,dragging_flipped]
      dragging_piece=0
    }
  }
  dragging_piece=0
}

function dragmove(e)
{
  if(dragging_piece!=0)
  {
    ctx.strokeStyle="rgb(255,128,0)"
    switch(dragging_piece)
    {
      case 1: draw_mirror(mouse_coords, dragging_flipped)       ;break
      case 2: draw_splitter(mouse_coords, dragging_flipped)     ;break
      case 3: draw_filter(mouse_coords, dragging_flipped)       ;break
      case 4: draw_trisplitter(mouse_coords, dragging_flipped)  ;break
    }
    ctx.strokeStyle="white"
  }
}

ctx.canvas.addEventListener("click", update_menu_option);
ctx.canvas.addEventListener('mousemove', function(e){
  mouse_pos=mouse_position(ctx.canvas, e);
  mouse_coords={x: pixel_to_coord(mouse_pos.x), y: pixel_to_coord(mouse_pos.y)}
}, false);

//Main listener

ctx.canvas.addEventListener("click", skip_to_menu);
loader()
ani=setInterval(logo_animation, interval, 1);
