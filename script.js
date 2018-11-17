var canvas = document.getElementById("jeuxCanvas");
var ctx = canvas.getContext("2d");

var x = 540;
var y = 790;

// Objet boulet

var boulet = {
  rayon: 20,
  dessineMoiUnBoulet: function() {
  ctx.beginPath();
  ctx.arc(x, y, this.rayon, 0, Math.PI*2);
  ctx.fillStyle = "#f2695a";
  ctx.fill();
  ctx.closePath();
  },
}

//brique

var colonneBrique = 10;
var ligneBrique = 7;

var brique = [];

for(var i=0; i<ligneBrique; i++) {
  brique[i] = [];
  for(var j=0; j<colonneBrique; j++) {
    brique[i][j] = { x: 0, y: 0, status: 1 };
  }
}

var briqueLargeur = 95;
var briqueHauteur = 30;
var briquePadding = 10;
var briquePositionHaut = 90;
var briquePositionGauche = 20;

function dessinMurBrique() {
  for(var i=0; i<ligneBrique; i++) {
    for(var j=0; j<colonneBrique; j++) {
      if(brique[i][j].status == 1) {
        var briqueX = (j*(briqueLargeur+briquePadding))+briquePositionGauche;
        var briqueY = (i*(briqueHauteur+briquePadding))+briquePositionHaut;
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

// Objet palet

var palet = {
  hauteur: 20,
  largeur: 90,
  position: (canvas.width-this.largeur)/2,
  dessineMoiUnPalet: function () {
  ctx.beginPath();
  ctx.rect(this.position, canvas.height-this.hauteur, this.largeur, this.hauteur);
  ctx.fillStyle = "#F2AA5A";
  ctx.fill();
  ctx.closePath();
  },
}


// Bouge le palet


document.addEventListener("keydown", toucheBas, false);
document.addEventListener("keyup", toucheHaut, false);

var flecheDroite = false;
var flecheGauche = false;

function toucheBas(e) {
  if(e.keyCode == 39) {
    flecheDroite = true;
  }
  else if(e.keyCode == 37) {
    flecheGauche = true;
  }
}
function toucheHaut(e) {
  if(e.keyCode == 39) {
    flecheDroite = false;
  }
  else if(e.keyCode == 37) {
    flecheGauche = false;
  }
}

// jeux + score

function choc () {
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
function monScore() {
  ctx.fillStyle = "#128dce";
  ctx.font = "20px Arial";
  ctx.fillText("Score: "+score, 25, 30);
}

var vx = 6;
var vy = -6;

function lanceLeJeux () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  boulet.dessineMoiUnBoulet ();
  palet.dessineMoiUnPalet ();
  dessinMurBrique();
  choc ();
  monScore();
  
  x += vx;
  y += vy;

  if(x + vx > canvas.width-boulet.rayon || x + vx < boulet.rayon) {
    vx = -vx;
  }
  if(y + vy < boulet.rayon) {
    vy = -vy;
  }
  else if(y + vy > canvas.height-boulet.rayon) {
    if(x > palet.position && x < palet.position + palet.largeur) {
      vy = -vy;
    }
    else {
        alert("Looser");
        document.location.reload();
      }
    }
  if(flecheDroite && palet.position < canvas.width-palet.largeur) {
    palet.position += 14;
  }
  else if(flecheGauche && palet.position > 0) {
    palet.position -= 14;
  }
}
setInterval (lanceLeJeux, 10);