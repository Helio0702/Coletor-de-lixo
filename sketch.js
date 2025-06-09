let barco; //O jogo consiste em uma plataforma movida com as setinhas, e que precisa pegar os sacos de lixo que caem do céu, evitando deixá-los cair na água
let lixo = [];
let pontos = 0;
let lixoPerdido = 0;
let maxLixoPerdido = 10;
let jogoAtivo = true;

function setup() {
  createCanvas(800, 600);
  barco = new Barco();
  for (let i = 0; i < 5; i++) {
    lixo.push(new Lixo());
  }
}

function draw() {
  background(100, 150, 255); // céu
  desenhaRio();
  barco.mostrar();
  barco.mover();

  if (!jogoAtivo) {
    mostrarGameOver();
    return;
  }

  for (let i = lixo.length - 1; i >= 0; i--) {
    lixo[i].mostrar();
    lixo[i].mover();

    if (lixo[i].pego(barco)) {
      pontos++;
      lixo.splice(i, 1);
      lixo.push(new Lixo());
    } else if (lixo[i].y > height) {
      lixo.splice(i, 1);
      lixo.push(new Lixo());
      lixoPerdido++;
      if (lixoPerdido >= maxLixoPerdido) {
        jogoAtivo = false;
      }
    }
  }

  mostrarHUD();
}

function desenhaRio() {
  noStroke();
  fill(0, 100, 200);
  rect(0, 300, width, height - 300); // rio
}

function mostrarHUD() {
  fill(255);
  textSize(20);
  text("Pontos: " + pontos, 10, 25);
  text("Lixo perdido: " + lixoPerdido + "/" + maxLixoPerdido, 10, 50);
}

function mostrarGameOver() {
  fill(0, 150);
  rect(0, 0, width, height);
  fill(255);
  textSize(36);
  textAlign(CENTER);
  text("FIM DE JOGO", width / 2, height / 2 - 30);
  textSize(24);
  text("Você coletou " + pontos + " lixos!", width / 2, height / 2);
  text("Obrigado por cuidar da natureza!", width / 2, height / 2 + 40);
}

class Barco {
  constructor() {
    this.x = width / 2;
    this.y = 280;
    this.largura = 100;
    this.altura = 30;
  }

  mostrar() {
    fill(139, 69, 19);
    rect(this.x, this.y, this.largura, this.altura, 10);
  }

  mover() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    this.x = constrain(this.x, 0, width - this.largura);
  }
}

class Lixo {
  constructor() {
    this.x = random(50, width - 50);
    this.y = random(-300, -50);
    this.vel = random(2, 4);
    this.size = 30;
  }

  mostrar() {
    fill(100);
    ellipse(this.x, this.y, this.size);
  }

  mover() {
    this.y += this.vel;
  }

  pego(barco) {
    return (
      this.y + this.size / 2 > barco.y &&
      this.y - this.size / 2 < barco.y + barco.altura &&
      this.x > barco.x &&
      this.x < barco.x + barco.largura
    );
  }
}
