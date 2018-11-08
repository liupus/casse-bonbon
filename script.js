var canvas = document.getElementById("jeuxCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;
var vx = 3;
var vy = -3;

//brique

var brique = [];
for(var i=0; i<ligneBrique; i++) {
  brique[i] = [];
  for(var j=0; j<colonneBrique; j++) {
    brique[i][j] = { x: 0, y: 0, status: 1 };
  }
}

var colonneBrique = 10;
var ligneBrique = 7;
var briqueLargeur = 95;
var briqueHauteur = 30;
var briquePadding = 10;
var briquePositionHaut = 90;
var briquePositionGauche = 20;

function murBrique() {
  for(var i=0; i<ligneBrique; i++) {
    for(var j=0; j<colonneBrique; j++) {
      if(brique[i][j].status == 1) {
        var briqueX = (i*(briqueLargeur+briquePadding))+briquePositionGauche;
        var briqueY = (j*(briqueHauteur+briquePadding))+briquePositionHaut;
        brique[i][j].x = briqueX;
        brique[i][j].y = briqueY;
        ctx.beginPath();
        ctx.rect(briqueX, briqueY, briqueLargeur, briqueHauteur);
        ctx.fillStyle = "#128dce";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// boulet

var bouletRayon = 20;

function boulet () {
  ctx.beginPath();
  ctx.arc(x, y, bouletRayon, 0, Math.PI*2);
  ctx.fillStyle = "#f2695a";
  ctx.fill();
  ctx.closePath();
}

// palet

var paletHauteur = 10;
var paletLargeur = 75;
var positionPalet = (canvas.width-paletLargeur)/2;

function palet () {
  ctx.beginPath();
  ctx.rect(positionPalet, canvas.height-paletHauteur, paletLargeur, paletHauteur);
  ctx.fillStyle = "#F2AA5A";
  ctx.fill();
  ctx.closePath();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var flecheDroite = false;
var flecheGauche = false;

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    flecheDroite = true;
  }
  else if(e.keyCode == 37) {
    flecheGauche = true;
  }
}
function keyUpHandler(e) {
  if(e.keyCode == 39) {
    flecheDroite = false;
  }
  else if(e.keyCode == 37) {
    flecheGauche = false;
  }
}

// jeux + score

function collision () {
  for(var i=0; i<ligneBrique; i++) {
    for(var j=0; j<colonneBrique; j++) {
      var b = brique[i][j];
      if(b.status == 1) {
        if(x > b.x && x < b.x+briqueLargeur && y > b.y && y < b.y+briqueHauteur) {
          vy = -vy;
          b.status = 0;
          score++;
          if(score == colonneBrique*ligneBrique) {
            alert("Félicitations");
            document.location.reload();
          }
        }
      }
    }
  }
}

var score = 0;

function score() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}

var chances = 5;

function mesChances () {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Chances: "+chances, canvas.width-65, 20);
}

function jeux () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  murBrique();
  boulet ();
  palet ();
  score();
  mesChances ();
  collision ();

  if(x + vx > canvas.width-bouletRayon || x + vx < bouletRayon) {
    vx = -vx;
  }
  if(y + vy < bouletRayon) {
    vy = -vy;
  }
  else if(y + vy > canvas.height-bouletRayon) {
    if(x > positionPalet && x < positionPalet + paletLargeur) {
      vy = -vy;
    }
    else {
      chances--;
      if(!chances) {
        alert("Looser");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        vx = 3;
        vy = -3;
        positionPalet = (canvas.width-paletLargeur)/2;
      }
    }
  }

  if(flecheDroite && positionPalet < canvas.width-paletLargeur) {
    positionPalet += 7;
  }
  else if(flecheGauche && positionPalet > 0) {
    positionPalet -= 7;
  }

  x += vx;
  y += vy;
  requestAnimationFrame(jeux);
}

jeux();